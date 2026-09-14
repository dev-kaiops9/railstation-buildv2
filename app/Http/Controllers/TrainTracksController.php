<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TrainTracks;
use App\Models\Train;
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

    /**
     * Ambil daftar jalur yang harus dilalui
     */
    public function get(Request $request)
    {
        $trainTracks = TrainTracks::where('station_id', $this->station->id)
            ->with([
                'train',
                'track'
            ])
            ->orderBy('train_id')
            ->get();

        $trainTracks->transform(function ($item) {

            if ($item->train) {

                $item->train->arrival_time = $item->train->arrival_time
                    ? Carbon::parse($item->train->arrival_time)->format('H:i')
                    : null;

                $item->train->departure_time = $item->train->departure_time
                    ? Carbon::parse($item->train->departure_time)->format('H:i')
                    : null;
            }

            return $item;
        });

        return response()->json($trainTracks);
    }

    /**
     * Simpan / update daftar jalur yang harus dilalui
     */
    public function store(Request $request)
    {
        if (!$this->checkUserAccess()) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        $request->validate([
            'trainTracks' => 'required|array|min:1',

            'trainTracks.*.id' =>
                'nullable|integer|exists:train_tracks,id',

            'trainTracks.*.train_id' =>
                'required|integer|exists:trains,id',

            'trainTracks.*.track_id' =>
                'required|integer|exists:tracks,id',
        ]);

        $saved = [];

        foreach ($request->trainTracks as $data) {

            /*
             * Pastikan KA memang berada pada stasiun aktif
             */
            $train = Train::where('id', $data['train_id'])
                ->where('station_id', $this->station->id)
                ->first();

            if (!$train) {
                return response()->json([
                    'message' => 'KA tidak ditemukan pada stasiun ini.'
                ], 422);
            }

            /*
             * Pastikan jalur memang milik stasiun aktif
             */
            $track = Track::where('id', $data['track_id'])
                ->where('station_id', $this->station->id)
                ->first();

            if (!$track) {
                return response()->json([
                    'message' => 'Jalur tidak ditemukan pada stasiun ini.'
                ], 422);
            }

            /*
             * Ambil ID jika ada.
             * Untuk data baru, ID memang tidak dikirim.
             */
            $id = $data['id'] ?? null;

            /*
             * Jika ID diberikan → update.
             * Jika ID kosong → create.
             */
            if (!empty($id)) {

                // UPDATE data lama
                $trainTrack = TrainTracks::where('id', $id)
                    ->where('station_id', $this->station->id)
                    ->first();

                if (!$trainTrack) {
                    return response()->json([
                        'message' => 'Data jalur KA tidak ditemukan.'
                    ], 404);
                }

                $trainTrack->update([
                    'train_id' => $train->id,
                    'track_id' => $track->id,
                ]);

            } else {

                // INSERT data baru
                $trainTrack = TrainTracks::updateOrCreate(
                    [
                        'station_id' => $this->station->id,
                        'train_id' => $train->id,
                    ],
                    [
                        'track_id' => $track->id,
                    ]
                );
            }

            /*
             * Sinkronkan kolom track lama pada tabel trains.
             *
             * Ini menjaga kompatibilitas dengan fitur
             * Daftar Waktu yang masih menggunakan trains.track.
             */
            $train->update([
                'track' => $track->track
            ]);

            $saved[] = $trainTrack->load([
                'train',
                'track'
            ]);
        }

        return response()->json([
            'message' => 'Daftar jalur berhasil disimpan.',
            'data' => $saved
        ]);
    }

    /**
     * Hapus daftar jalur KA
     */
    public function destroy(Request $request)
    {
        if (!$this->checkUserAccess()) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        $request->validate([
            'id' => 'required|integer|exists:train_tracks,id'
        ]);

        $trainTrack = TrainTracks::where('id', $request->id)
            ->where('station_id', $this->station->id)
            ->first();

        if (!$trainTrack) {
            return response()->json([
                'message' => 'Data tidak ditemukan.'
            ], 404);
        }

        $trainTrack->delete();

        return response()->json([
            'message' => 'Data jalur berhasil dihapus.'
        ]);
    }
}