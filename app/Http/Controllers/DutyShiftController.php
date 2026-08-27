<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DutyShift;

class DutyShiftController extends Controller
{
    protected $station;

    public function __construct()
    {
        $this->station = $this->checkStation();
        view()->share('station', $this->station);
    }

    public function get(Request $request)
    {
        $dutyShifts = DutyShift::where('station_id', $this->station->id)->get();
        return response()->json($dutyShifts);
    }

    public function store(Request $request)
    {
        $request->validate([
            'shifts' => 'required|array',
            'shifts.*.id' => 'nullable|integer|exists:duty_shifts,id',
            'shifts.*.code' => 'required|string|max:5',
            'shifts.*.name' => 'required|string|max:255',
            'shifts.*.start_time' => 'required|date_format:H:i',
            'shifts.*.end_time' => 'required|date_format:H:i',
        ]);


        if (!$this->checkUserAccess()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $shifts = [];
        foreach ($request->shifts as $shiftData) {
            $shiftData['code'] = strtoupper($shiftData['code']);
            $shiftData['color'] = $this->chooseColor($shiftData['code']);
            $shiftData['station_id'] = $this->station->id;
            $shiftData['is_active'] = filter_var($shiftData['is_active'], FILTER_VALIDATE_BOOLEAN);

            $shifts[] = DutyShift::updateOrCreate(['id' => $shiftData['id']], $shiftData);
        }

        return response()->json($shifts);
    }

    public function destroy(Request $request)
    {
        $dutyShift = DutyShift::find($request->id);
        $dutyShift->delete();
        return response()->json($dutyShift);
    }

    private function chooseColor($code)
    {
        $colors = ['#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#3B82F6', '#6366F1', '#14B8A6', '#FCD34D', '#EC4899', '#06B6D4'];
        shuffle($colors);

        $usedColors = DutyShift::where('station_id', $this->station->id)->pluck('color')->unique()->toArray();
        $availableColors = array_diff($colors, $usedColors);

        if ($code == 'P' && in_array('#10B981', $availableColors)) {
            return '#10B981';
        } elseif ($code == 'S' && in_array('#F59E0B', $availableColors)) {
            return '#F59E0B';
        } elseif ($code == 'M' && in_array('#8B5CF6', $availableColors)) {
            return '#8B5CF6';
        } elseif ($code == 'L' && in_array('#EF4444', $availableColors)) {
            return '#EF4444';
        }

        if (count($availableColors) > 0) {
            return $availableColors[array_rand($availableColors)];
        }

        return '#' . substr(md5(microtime()), 0, 6);
    }
}
