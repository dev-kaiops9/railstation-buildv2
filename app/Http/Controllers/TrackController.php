<?php

namespace App\Http\Controllers;

use App\Models\Track;
use Illuminate\Http\Request;

class TrackController extends Controller
{
    protected $station;

    public function __construct()
    {
        $this->station = $this->checkStation();
        view()->share('station', $this->station);
    }
    
    public function get(Request $request)
    {
        $tracks = $this->station->tracks()->orderBy('track')->get();

        return response()->json($tracks);
    }

    public function store(Request $request)
    {
        $request->validate([
            'tracks' => 'required|array',
            'tracks.*.id' => 'nullable|integer|exists:tracks,id',
            'tracks.*.track' => 'required|string',
            'tracks.*.max_length' => 'required|string',
            'tracks.*.effective_length' => 'required|string',
            'tracks.*.train' => 'nullable|string',
            'tracks.*.GB' => 'nullable|string',
            'tracks.*.GD' => 'nullable|string',
            'tracks.*.GT' => 'nullable|string',
            'tracks.*.GK' => 'nullable|string',
            'tracks.*.remarks' => 'nullable|string',
        ]);

        if (!$this->checkUserAccess()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $tracks = [];
        foreach ($request->tracks as $trackData) {
            $trackData['station_id'] = $this->station->id;
            $tracks[] = Track::updateOrCreate(['id' => $trackData['id']], $trackData);
        }

        return response()->json($tracks);
    }

    public function destroy(Request $request)
    {
        if (!$this->checkUserAccess()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $track = Track::find($request->id);
        $track->delete();
        return response()->json($track);
    }
}
