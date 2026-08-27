<?php

namespace App\Http\Controllers;

use App\Models\KRSM;
use App\Models\KRSMData;
use Illuminate\Http\Request;

class KRSMController extends Controller
{
    protected $station;

    public function __construct()
    {
        $this->station = $this->checkStation();
        view()->share('station', $this->station);
    }

    public function index()
    {
        $pihakA = KRSM::where('station_id', $this->station->id)->where('pihak', 'A')->first();
        $pihakB = KRSM::where('station_id', $this->station->id)->where('pihak', 'B')->first();

        return view('krsm', compact('pihakA', 'pihakB'));
    }

    public function get(Request $request)
    {
        $pihak = $request->get('pihak', 'A');
        $perPage = $request->get('per_page', 10);
        $page = $request->get('page', 1);

        $krsm = KRSM::where('station_id', $this->station->id)->where('pihak', $pihak)->first();

        if (!$krsm) {
            return response()->json(['data' => [], 'total' => 0]);
        }

        $data = $krsm->data()->orderBy('date', 'desc')->paginate($perPage, ['*'], 'page', $page)->onEachSide(0);

        return response()->json($data);
    }

    public function save(Request $request)
    {
        $request->validate([
            'pihak' => 'required|in:A,B',
            'krsm' => 'required|array',
            'krsm.*.date' => 'required|date',
            'krsm.*.kr_awal' => 'nullable|integer',
            'krsm.*.kr_akhir' => 'nullable|integer',
            'krsm.*.kr_keterangan' => 'nullable|string',
            'krsm.*.sm_awal' => 'nullable|integer',
            'krsm.*.sm_akhir' => 'nullable|integer',
            'krsm.*.sm_keterangan' => 'nullable|string',
        ]);

        if (!$this->checkUserAccess()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        try {
            $krsm = KRSM::where('station_id', $this->station->id)->where('pihak', $request->pihak)->first();

            if (!$krsm) {
                return response()->json(['message' => 'KRSM record tidak ditemukan'], 404);
            }

            $data = [];
            foreach ($request->krsm as $krsmData) {
                $data[] = KRSMData::updateOrCreate(['id' => $krsmData['id']], [
                    'krsm_id' => $krsm->id,
                    'date' => $krsmData['date'],
                    'kr_awal' => $krsmData['kr_awal'],
                    'kr_akhir' => $krsmData['kr_akhir'],
                    'kr_keterangan' => $krsmData['kr_keterangan'],
                    'sm_awal' => $krsmData['sm_awal'],
                    'sm_akhir' => $krsmData['sm_akhir'],
                    'sm_keterangan' => $krsmData['sm_keterangan'],
                ]);
            }

            return response()->json(['message' => 'Data berhasil ditambahkan', 'data' => $data], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Gagal menambahkan data: ' . $e->getMessage()], 500);
        }
    }

    public function destroy(Request $request)
    {
        if (!$this->checkUserAccess()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        try {
            $data = KRSMData::find($request->id);

            if (!$data) {
                return response()->json(['message' => 'Data tidak ditemukan'], 404);
            }

            $data->delete();

            return response()->json(['message' => 'Data berhasil dihapus']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Gagal menghapus data: ' . $e->getMessage()], 500);
        }
    }
}
