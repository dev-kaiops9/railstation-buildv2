<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TrainTracks;
use App\Models\Track;
use Carbon\Carbon;

class TrainTracksController extends Controller
{
    protected $station;

    public function __construct()
    {
        $this->station = $this->checkStation();
        view()->share('station', $this->station);
    }
    
    public function get(Request $request)
    {
        $trainTracks = TrainTracks::where('station_id', $this->station->id)->with('train', 'track')->orderBy('train_id')->get();
        $trainTracks->transform(function($trainTrack) {
            $trainTrack->train->arrival_time = $trainTrack->train->arrival_time ? Carbon::parse($trainTrack->train->arrival_time)->format('H:i') : '-';
            $trainTrack->train->departure_time = Carbon::parse($trainTrack->train->departure_time)->format('H:i');
            return $trainTrack;
        });

        return response()->json($trainTracks);
    }

    public function store(Request $request)
    {
        $request->validate([
            'trainTracks' => 'required|array',
            'trainTracks.*.id' => 'nullable|integer|exists:train_tracks,id',
            'trainTracks.*.train_id' => 'required|integer|exists:trains,id',
            'trainTracks.*.track_id' => 'required|integer|exists:tracks,id',
        ]);

        if (!$this->checkUserAccess()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $trainTracks = [];
        foreach ($request->trainTracks as $trainTrackData) {
            $trainTrackData['station_id'] = $this->station->id;
            $trainTrack = TrainTracks::updateOrCreate(['id' => $trainTrackData['id']], $trainTrackData);
            $track = Track::where('track', $trainTrack->train->track)->where('station_id', $trainTrack->station_id)->first();

            if ($trainTrack->track_id != $track->id) {
                $trainTrack->train->update(['track' => $trainTrack->track->track]);
            }

            $trainTracks[] = $trainTrack;
        }

        return response()->json($trainTracks);
    }

    public function destroy(Request $request)
    {
        $trainTrack = TrainTracks::find($request->id);
        $trainTrack->delete();
        return response()->json($trainTrack);
    }
}
