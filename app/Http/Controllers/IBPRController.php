<?php

namespace App\Http\Controllers;

use App\Models\IBPR;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\IbprImport;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;

class IBPRController extends Controller
{
    protected $station;

    public function __construct()
    {
        $this->station = $this->checkStation();
        view()->share('station', $this->station);
    }

    public function index()
    {
        return view('ibpr');
    }

    public function get(Request $request)
    {

        $perPage = $request->get('per_page', 10);
        $page = $request->get('page', 1);

        $query = $this->station->ibprs();

        if ($request->search) {

            $search = $request->search;

            $query->where(function($q) use ($search){

                $q->where('hazard_description','like',"%$search%")
                ->orWhere('control_explanation','like',"%$search%")
                ->orWhere('control_reference','like',"%$search%")
                ->orWhere('responsible_position','like',"%$search%")
                ->orWhere('risk_explanation','like',"%$search%");

            });

        }

        if ($request->probability) {
            $query->where('probability',$request->probability);
        }

        if ($request->impact) {
            $query->where('impact',$request->impact);
        }

        if ($request->effectiveness) {
            $query->where('effectiveness',$request->effectiveness);
        }

        $ibprs = $query
            ->orderBy('created_at','desc')
            ->paginate($perPage,['*'],'page',$page);

        return response()->json($ibprs);
    }

    public function store(Request $request)
    {
        $request->validate([
            'ibprs' => 'required|array',
            'ibprs.*.id' => 'nullable|integer',
            'ibprs.*.hazard_description' => 'nullable|string',
            'ibprs.*.control_explanation' => 'nullable|string',
            'ibprs.*.control_reference' => 'nullable|string',
            'ibprs.*.effectiveness' => 'nullable|string',
            'ibprs.*.responsible_position' => 'nullable|string',
            'ibprs.*.risk_explanation' => 'nullable|string',
            'ibprs.*.probability' => 'nullable|integer',
            'ibprs.*.impact' => 'nullable|integer',
            'ibprs.*.action_plan_explanation' => 'nullable|string',
            'ibprs.*.action_plan_reference' => 'nullable|string',
            'ibprs.*.action_plan_responsible' => 'nullable|string',
            'ibprs.*.completion_date' => 'nullable|date',
            'ibprs.*.after_probability' => 'nullable|integer',
            'ibprs.*.after_impact' => 'nullable|integer',
        ]);

        if (!$this->checkUserAccess()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $ibprs = [];
        foreach ($request->ibprs as $ibprData) {
            $ibprData['station_id'] = $this->station->id;

            $ibprs[] = IBPR::updateOrCreate(['id' => $ibprData['id']], $ibprData);
        }

        return response()->json($ibprs);
    }

    public function destroy(Request $request)
    {
        if (!$this->checkUserAccess()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $ibpr = IBPR::find($request->id);
        $ibpr->delete();

        return response()->json($ibpr);
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,csv'
        ]);

        $station_id = $this->station->id;

        Excel::import(new \App\Imports\IbprImport($station_id), $request->file('file'));

        return back()->with('success', 'Data IBPR berhasil diimport');
    }

    public function exportPdf(Request $request)
    {
        // jika user memilih checkbox
        if ($request->ids && count($request->ids) > 0) {

            $data = IBPR::whereIn('id', $request->ids)->get();

        } else {

            // jika export berdasarkan search / filter
            $query = $this->station->ibprs();

            if ($request->search) {

                $search = $request->search;

                $query->where(function ($q) use ($search) {

                    $q->where('hazard_description', 'like', "%$search%")
                    ->orWhere('risk_explanation', 'like', "%$search%")
                    ->orWhere('responsible_position', 'like', "%$search%");

                });
            }

            if ($request->probability) {
                $query->where('probability', $request->probability);
            }

            if ($request->impact) {
                $query->where('impact', $request->impact);
            }

            $data = $query->get();
        }

        $pdf = Pdf::loadView('ibpr.pdf', compact('data'))
        ->setPaper('a4','landscape');

        return $pdf->download('laporan-ibpr.pdf');
    }

}
