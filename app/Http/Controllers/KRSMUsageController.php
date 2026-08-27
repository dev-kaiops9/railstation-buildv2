<?php

namespace App\Http\Controllers;

use App\Models\KRSMUsage;
use Illuminate\Http\Request;
use Carbon\Carbon;

class KRSMUsageController extends Controller
{
    protected $station;

    public function __construct()
    {
        $this->station = $this->checkStation();
        view()->share('station', $this->station);
    }

    /**
     * Display the KRSM Usage page
     */
    public function index()
    {
        return view('krsm-usage');
    }

    /**
     * Get all KRSM Usage data grouped by pihak
     */
    public function get(Request $request)
    {
        $pihak = $request->get('pihak', 'A');
        $perPage = $request->get('per_page', 100);
        $page = $request->get('page', 1);

        $usages = $this->station->krsmUsages()
            ->where('pihak', $pihak)
            ->orderBy('date', 'desc')
            ->paginate($perPage, ['*'], 'page', $page)
            ->onEachSide(0);

        $usages->getCollection()->transform(function($usage) {
            $usage->date_formatted = Carbon::parse($usage->date)->format('Y-m-d');
            $usage->kr_usage = $usage->getKRUsage();
            $usage->sm_usage = $usage->getSMUsage();
            return $usage;
        });

        return response()->json($usages);
    }

    /**
     * Store a new KRSM Usage record
     */
    public function store(Request $request)
    {
        $request->validate([
            'pihak' => 'required|in:A,B',
            'date' => 'required|date',
            'kr_awal' => 'nullable|integer|min:0',
            'kr_akhir' => 'nullable|integer|min:0',
            'kr_keterangan' => 'nullable|string|max:500',
            'sm_awal' => 'nullable|integer|min:0',
            'sm_akhir' => 'nullable|integer|min:0',
            'sm_keterangan' => 'nullable|string|max:500',
        ]);

        if (!$this->checkUserAccess()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        try {
            // Check if record already exists for this date and pihak
            $existing = KRSMUsage::where('station_id', $this->station->id)
                ->where('pihak', $request->pihak)
                ->where('date', $request->date)
                ->first();

            if ($existing) {
                return response()->json([
                    'message' => 'Data untuk tanggal dan pihak ini sudah ada'
                ], 422);
            }

            $usage = KRSMUsage::create([
                'station_id' => $this->station->id,
                'pihak' => $request->pihak,
                'date' => $request->date,
                'kr_awal' => $request->kr_awal,
                'kr_akhir' => $request->kr_akhir,
                'kr_keterangan' => $request->kr_keterangan,
                'sm_awal' => $request->sm_awal,
                'sm_akhir' => $request->sm_akhir,
                'sm_keterangan' => $request->sm_keterangan,
            ]);

            return response()->json([
                'message' => 'Data berhasil ditambahkan',
                'data' => $usage
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal menambahkan data: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update KRSM Usage record
     */
    public function update(Request $request, KRSMUsage $usage)
    {
        $request->validate([
            'pihak' => 'required|in:A,B',
            'date' => 'required|date',
            'kr_awal' => 'nullable|integer|min:0',
            'kr_akhir' => 'nullable|integer|min:0',
            'kr_keterangan' => 'nullable|string|max:500',
            'sm_awal' => 'nullable|integer|min:0',
            'sm_akhir' => 'nullable|integer|min:0',
            'sm_keterangan' => 'nullable|string|max:500',
        ]);

        if (!$this->checkUserAccess()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        try {
            // Check if another record exists with same date and pihak
            $existing = KRSMUsage::where('station_id', $this->station->id)
                ->where('pihak', $request->pihak)
                ->where('date', $request->date)
                ->where('id', '!=', $usage->id)
                ->first();

            if ($existing) {
                return response()->json([
                    'message' => 'Data untuk tanggal dan pihak ini sudah ada'
                ], 422);
            }

            $usage->update([
                'pihak' => $request->pihak,
                'date' => $request->date,
                'kr_awal' => $request->kr_awal,
                'kr_akhir' => $request->kr_akhir,
                'kr_keterangan' => $request->kr_keterangan,
                'sm_awal' => $request->sm_awal,
                'sm_akhir' => $request->sm_akhir,
                'sm_keterangan' => $request->sm_keterangan,
            ]);

            return response()->json([
                'message' => 'Data berhasil diupdate',
                'data' => $usage
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal mengupdate data: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete KRSM Usage record
     */
    public function destroy(Request $request)
    {
        if (!$this->checkUserAccess()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        try {
            $usage = KRSMUsage::find($request->id);

            if (!$usage) {
                return response()->json(['message' => 'Data tidak ditemukan'], 404);
            }

            $usage->delete();

            return response()->json([
                'message' => 'Data berhasil dihapus'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal menghapus data: ' . $e->getMessage()
            ], 500);
        }
    }
}

