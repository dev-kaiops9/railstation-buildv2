<?php

namespace App\Http\Controllers;

use App\Models\GuardForm;
use Illuminate\Http\Request;
use Carbon\Carbon;

class GuardFormController extends Controller
{
    protected $station;

    public function __construct()
    {
        $this->station = $this->checkStation();
        view()->share('station', $this->station);
    }

    public function index()
    {
        return view('guard-form');
    }

    public function get(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $page = $request->get('page', 1);

        $guardForms = $this->station->guardForms()->orderBy('date', 'desc')->paginate($perPage, ['*'], 'page', $page)->onEachSide(0);;

        $guardForms->getCollection()->transform(function($guardForm) {
            $guardForm->date = Carbon::parse($guardForm->date)->format('Y-m-d');
            return $guardForm;
        });

        return response()->json($guardForms);
    }

    public function store(Request $request)
    {
        $request->validate([
            'guard_forms' => 'required|array',
            'guard_forms.*.id' => 'nullable|integer|exists:guard_forms,id',
            'guard_forms.*.date' => 'required|date',
            'guard_forms.*.ptp' => 'nullable|string',
            'guard_forms.*.bh' => 'nullable|string',
            'guard_forms.*.bk' => 'nullable|string',
            'guard_forms.*.ms' => 'nullable|string',
            'guard_forms.*.notes' => 'nullable|string',
        ]);

        if (!$this->checkUserAccess()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $guardForms = [];

        foreach ($request->guard_forms as $formData) {
            $formData['station_id'] = $this->station->id;
            $guardForms[] = GuardForm::updateOrCreate(
                ['id' => $formData['id']],
                $formData
            );
        }

        return response()->json($guardForms);
    }

    public function destroy(Request $request)
    {
        if (!$this->checkUserAccess()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $guardForm = GuardForm::find($request->id);
        $guardForm->delete();

        return response()->json($guardForm);
    }
}
