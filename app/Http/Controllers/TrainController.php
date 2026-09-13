<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Train;
use App\Models\Track;
use App\Models\TrainTracks;
use App\Models\TrainSchedule;
use App\Models\Station;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

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

    /** Legacy/simple train list used by other parts of the page. */
    public function get()
    {
        $trains = $this->station->trains()->orderBy('departure_time')->get();

        $trains->transform(function ($train) {
            $train->arrival_time = $train->arrival_time
                ? Carbon::parse($train->arrival_time)->format('H:i')
                : null;
            $train->departure_time = $train->departure_time
                ? Carbon::parse($train->departure_time)->format('H:i')
                : null;
            return $train;
        });

        return response()->json($trains);
    }

    public function store(Request $request)
    {
        if (!$this->checkUserAccess()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $request->validate([
            'trains' => 'required|array',
            'trains.*.id' => 'nullable|integer',
            'trains.*.number' => 'required|string|max:50',
            'trains.*.name' => 'required|string|max:255',
            'trains.*.route' => 'required|string|max:255',
            'trains.*.arrival_time' => 'nullable|date_format:H:i',
            'trains.*.departure_time' => 'nullable|date_format:H:i',
            'trains.*.track' => 'nullable|string|max:50',
            'trains.*.status' => 'required|in:Berhenti,Langsung',
        ]);

        $saved = [];

        DB::transaction(function () use ($request, &$saved) {
            foreach ($request->input('trains') as $trainData) {
                $id = $trainData['id'] ?? null;
                unset($trainData['id']);
                $trainData['station_id'] = $this->station->id;

                if ($id) {
                    $train = $this->station->trains()->whereKey($id)->firstOrFail();
                    $train->update($trainData);
                } else {
                    $train = Train::create($trainData);
                }

                // Keep the legacy train_tracks relation in sync with the selected
                // track at this station, without changing the existing schema.
                if (!empty($train->track)) {
                    $track = Track::where('station_id', $this->station->id)
                        ->where('track', $train->track)
                        ->first();

                    if ($track) {
                        TrainTracks::updateOrCreate(
                            [
                                'train_id' => $train->id,
                                'station_id' => $this->station->id,
                            ],
                            ['track_id' => $track->id]
                        );
                    }
                }

                $saved[] = $train->fresh();
            }
        });

        return response()->json($saved);
    }

    public function destroy(Request $request)
    {
        if (!$this->checkUserAccess()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $train = $this->station->trains()->find($request->integer('id'));
        if (!$train) {
            return response()->json(['message' => 'Data KA tidak ditemukan'], 404);
        }

        $train->delete();
        return response()->json(['success' => true]);
    }

    /**
     * Return the schedule matrix data without changing the existing database.
     *
     * trains    = KA belonging to the currently selected station
     * stations  = all stations, so Edit Stasiun can choose visible columns
     * schedules = schedules belonging to those trains across stations
     */
    public function getSchedules()
    {
        $trains = $this->station->trains()
            ->orderBy('departure_time')
            ->get(['id', 'station_id', 'number', 'name', 'route', 'arrival_time', 'departure_time', 'track', 'status']);

        $trainIds = $trains->pluck('id');

        $schedules = TrainSchedule::with([
                'station:id,name,abbreviation',
                'track:id,station_id,track',
            ])
            ->whereIn('train_id', $trainIds)
            ->orderBy('station_id')
            ->get(['id', 'train_id', 'station_id', 'arrival_time', 'departure_time', 'track_id']);

        $stations = Station::orderBy('id')
            ->get(['id', 'name', 'abbreviation']);

        return response()->json([
            'current_station_id' => $this->station->id,
            'trains' => $trains,
            'stations' => $stations,
            'schedules' => $schedules,
        ]);
    }

    public function saveSchedules(Request $request)
    {
        if (!$this->checkUserAccess()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $request->validate([
            'train_id' => 'required|integer|exists:trains,id',
            'schedules' => 'required|array',
            'schedules.*.station_id' => 'required|integer|exists:stations,id',
            'schedules.*.arrival_time' => 'nullable|date_format:H:i',
            'schedules.*.departure_time' => 'nullable|date_format:H:i',
            'schedules.*.track_id' => 'nullable|integer|exists:tracks,id',
        ]);

        $train = $this->station->trains()->find($request->integer('train_id'));
        if (!$train) {
            return response()->json(['message' => 'KA tidak berasal dari stasiun aktif'], 422);
        }

        DB::transaction(function () use ($request, $train) {
            foreach ($request->input('schedules', []) as $scheduleData) {
                $stationId = (int) $scheduleData['station_id'];
                $arrival = $scheduleData['arrival_time'] ?? null;
                $departure = $scheduleData['departure_time'] ?? null;
                $trackId = $scheduleData['track_id'] ?? null;

                if ($trackId) {
                    $trackBelongsToStation = Track::whereKey($trackId)
                        ->where('station_id', $stationId)
                        ->exists();

                    if (!$trackBelongsToStation) {
                        abort(response()->json([
                            'message' => 'Jalur tidak sesuai dengan stasiun jadwal.'
                        ], 422));
                    }
                }

                // An entirely empty station cell means the KA does not stop/pass
                // there, so remove the old schedule row instead of keeping an
                // invisible empty record.
                if (!$arrival && !$departure && !$trackId) {
                    TrainSchedule::where('train_id', $train->id)
                        ->where('station_id', $stationId)
                        ->delete();
                    continue;
                }

                TrainSchedule::updateOrCreate(
                    [
                        'train_id' => $train->id,
                        'station_id' => $stationId,
                    ],
                    [
                        'arrival_time' => $arrival,
                        'departure_time' => $departure,
                        'track_id' => $trackId ?: null,
                    ]
                );
            }
        });

        return response()->json(['message' => 'Jadwal berhasil disimpan']);
    }
}
