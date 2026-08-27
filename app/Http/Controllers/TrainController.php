<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Train;
use App\Models\Track;
use App\Models\TrainTracks;
use Carbon\Carbon;

class TrainController extends Controller
{
    protected $station;

    public function __construct()
    {
        $this->station = $this->checkStation();
        view()->share('station', $this->station);
    }

    public function index()
    {
        return view('train');
    }

    public function get()
    {
        $trains = $this->station->trains()->get();

        $trains->transform(function($train) {
            $train->arrival_time = $train->arrival_time ? Carbon::parse($train->arrival_time)->format('H:i') : '-';
            $train->departure_time = Carbon::parse($train->departure_time)->format('H:i');
            return $train;
        });

        return response()->json($trains);
    }

    public function store(Request $request)
    {
        $request->validate([
            'trains' => 'required|array',
            'trains.*.id' => 'nullable|integer|exists:trains,id',
            'trains.*.number' => 'required|string',
            'trains.*.name' => 'required|string',
            'trains.*.route' => 'required|string',
            'trains.*.arrival_time' => 'nullable|date_format:H:i',
            'trains.*.departure_time' => 'required|date_format:H:i',
            'trains.*.track' => 'required|string',
            'trains.*.status' => 'required|in:Berhenti,Langsung',
        ]);

        if (!$this->checkUserAccess()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $trains = [];
        foreach ($request->trains as $trainData) {
            $trainData['station_id'] = $this->station->id;
            $train = Train::updateOrCreate(['id' => $trainData['id']], $trainData);
            $track = Track::where('station_id', $this->station->id)->where('track', $train->track)->first();

            if ($track) {
                TrainTracks::updateOrCreate(['train_id' => $train->id, 'station_id' => $this->station->id], ['track_id' => $track->id]);
            }

            $trains[] = $train;
        }

        return response()->json($trains);
    }

    public function destroy(Request $request)
    {
        if (!$this->checkUserAccess()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $train = Train::find($request->id);
        $train->delete();
        return response()->json($train);
    }
}
