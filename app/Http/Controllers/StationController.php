<?php

namespace App\Http\Controllers;

use App\Models\Station;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class StationController extends Controller
{
    protected $station;

    public function __construct()
    {
        $this->station = $this->checkStation();
        view()->share('station', $this->station);
    }

    public function index()
    {
        $stoppingTrains = $this->station->trains()->where('status', 'Berhenti')->get();
        $stoppingTrains->transform(function($train) {
            $train->arrival_time = $train->arrival_time ? Carbon::parse($train->arrival_time)->format('H:i') : '-';
            $train->departure_time = Carbon::parse($train->departure_time)->format('H:i');
            return $train;
        });

        return view('profile', compact('stoppingTrains'));
    }

    public function changeStation(Request $request)
    {
        $stationName = $request->input('station');
        $station = Station::where('name', $stationName)->first();
        session(['station' => $station->name, 'station_id' => $station->id]);

        return response()->json(['success' => true]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'abbreviation' => 'required',
            'grade' => 'required',
            'code' => 'required',
        ]);

        if (!$this->checkUserAccess()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $request->merge(['id' => $this->station->id]);
        $this->station->update($request->all());

        return response()->json($this->station);
    }

    public function updateEmplasemen(Request $request)
    {
        if (!$this->checkUserAccess()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $request->validate([
            'file' => 'required|file|mimes:jpg,jpeg,png,pdf|max:10240',
        ]);

        $station = $this->station;
        if (!$station) {
            return response()->json(['message' => 'Station tidak ditemukan'], 404);
        }

        // Remove the previous file when it is stored on the public disk.
        if ($station->emplasemen) {
            $oldPath = $station->emplasemen;
            if (str_starts_with($oldPath, 'storage/')) {
                $oldPath = substr($oldPath, strlen('storage/'));
            }
            if (Storage::disk('public')->exists($oldPath)) {
                Storage::disk('public')->delete($oldPath);
            }
        }

        $path = $request->file('file')->store('emplasemen', 'public');
        $station->update(['emplasemen' => 'storage/' . $path]);

        return response()->json([
            'success' => true,
            'path' => asset('storage/' . $path),
        ]);
    }

    public function updateTrackValidity(Request $request)
    {
        if (!$this->checkUserAccess()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $this->station->update(['track_validity_period' => $request->input('validity')]);

        return response()->json($this->station);
    }

    private function storeImage($image)
    {
        $image = str_replace('data:image/png;base64,', '', $image);
        $image = str_replace('data:image/jpg;base64,', '', $image);
        $image = str_replace('data:image/jpeg;base64,', '', $image);
        $image = str_replace(' ', '+', $image);
        $imageName = 'emplasemen_' . time() . '_' . uniqid() . '.png';

        Storage::disk('public')->put('stations/' . $imageName, base64_decode($image));

        return $imageName;
    }
}
