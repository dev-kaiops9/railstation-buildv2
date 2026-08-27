<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EmployeeRequirement;
use Illuminate\Support\Facades\Auth;

class EmployeeRequirementController extends Controller
{
    protected $station;

    public function __construct()
    {
        $this->station = $this->checkStation();
        view()->share('station', $this->station);
    }

    public function get(Request $request)
    {
        $requirements = EmployeeRequirement::where('station_id', $this->station->id)->get();
        return response()->json($requirements);
    }

    public function store(Request $request)
    {
        $request->validate([
            'requirements' => 'required|array',
            'requirements.*.id' => 'nullable|integer|exists:employee_requirements,id',
            'requirements.*.position' => 'required|string',
            'requirements.*.required' => 'required|integer',
            'requirements.*.available' => 'required|integer',
            'requirements.*.shortage' => 'required|integer',
            'requirements.*.excess' => 'required|integer',
        ]);

        if (!$this->checkUserAccess()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $requirements = [];
        foreach ($request->requirements as $requirementData) {
            $requirementData['shortage'] = max(0, $requirementData['required'] - $requirementData['available']);
            $requirementData['excess'] = max(0, $requirementData['available'] - $requirementData['required']);
            $requirementData['station_id'] = $this->station->id;

            $requirements[] = EmployeeRequirement::updateOrCreate(['id' => $requirementData['id']], $requirementData);
        }

        return response()->json($requirements);
    }

    public function destroy(Request $request)
    {
        $requirement = EmployeeRequirement::find($request->id);
        $requirement->delete();
        return response()->json($requirement);
    }
}
