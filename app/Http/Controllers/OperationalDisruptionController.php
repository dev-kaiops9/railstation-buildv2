<?php

namespace App\Http\Controllers;

use App\Models\OperationalDisruption;
use Illuminate\Http\Request;
use Carbon\Carbon;

class OperationalDisruptionController extends Controller
{
    protected $station;

    public function __construct()
    {
        $this->station = $this->checkStation();
        view()->share('station', $this->station);
    }

    public function index()
    {
        return view('operational-disruption');
    }

    public function get(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $page = $request->get('page', 1);

        $disruptions = $this->station->operationalDisruptions()
            ->orderBy('date', 'desc')
            ->paginate($perPage, ['*'], 'page', $page)
            ->onEachSide(0);;

        $disruptions->getCollection()->transform(function($disruption) {
            $disruption->date = Carbon::parse($disruption->date)->format('Y-m-d');
            $disruption->time = $disruption->time ? Carbon::parse($disruption->time)->format('H:i') : '';
            return $disruption;
        });

        return response()->json($disruptions);
    }

    public function store(Request $request)
    {
        $request->validate([
            'operational_disruptions' => 'required|array',
            'operational_disruptions.*.id' => 'nullable|integer|exists:operational_disruptions,id',
            'operational_disruptions.*.date' => 'required|date',
            'operational_disruptions.*.disruption_type' => 'required|string',
            'operational_disruptions.*.report_to' => 'nullable|string',
            'operational_disruptions.*.time' => 'nullable|date_format:H:i',
            'operational_disruptions.*.handling' => 'nullable|string',
            'operational_disruptions.*.officer' => 'nullable|string',
        ]);

        if (!$this->checkUserAccess()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $disruptions = [];

        foreach ($request->operational_disruptions as $disruptionData) {
            $disruptionData['station_id'] = $this->station->id;
            $disruptions[] = OperationalDisruption::updateOrCreate(
                ['id' => $disruptionData['id'] ?? null],
                $disruptionData
            );
        }

        return response()->json($disruptions);
    }

    public function destroy(Request $request)
    {
        if (!$this->checkUserAccess()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $disruption = OperationalDisruption::find($request->id);
        $disruption->delete();

        return response()->json($disruption);
    }
}

