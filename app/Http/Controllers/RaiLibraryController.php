<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RaiLibrary;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class RaiLibraryController extends Controller
{
    protected $station;

    public function __construct()
    {
        $this->station = $this->checkStation();
        view()->share('station', $this->station);
    }
    public function index()
    {
        return view('railibrary');
    }

    public function get(Request $request)
    {
        $perPage = $request->get('per_page', 12);
        $page = $request->get('page', 1);

        $libraries = $this->station->raiLibraries()
            ->orderBy('created_at', 'desc')
            ->paginate($perPage, ['*'], 'page', $page)
            ->onEachSide(0);

        $libraries->getCollection()->transform(function($library) {
            $library->updated_at_formatted = Carbon::parse($library->updated_at)->format('d M Y H:i');
            $library->file_extension = strtolower(pathinfo($library->file_path, PATHINFO_EXTENSION));
            $library->file_size_readable = $this->getReadableFileSize($library->file_size);
            return $library;
        });

        return response()->json($libraries);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'file' => 'required|file|max:102400', // Max 100MB
        ]);

        if (!$this->checkUserAccess()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        try {
            $file = $request->file('file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('railibrary', $fileName, 'public');

            $library = RaiLibrary::create([
                'station_id' => $this->station->id,
                'name' => $request->name,
                'file_path' => $filePath,
                'file_extension' => strtolower($file->getClientOriginalExtension()),
                'file_size' => $file->getSize(),
            ]);

            return response()->json([
                'message' => 'File berhasil diupload',
                'data' => $library
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal mengupload file: ' . $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, RaiLibrary $library)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'file' => 'nullable|file|max:102400',
        ]);

        if (!$this->checkUserAccess()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        try {
            $library->name = $request->name;

            if ($request->hasFile('file')) {
                if (Storage::disk('public')->exists($library->file_path)) {
                    Storage::disk('public')->delete($library->file_path);
                }

                $file = $request->file('file');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $filePath = $file->storeAs('railibrary', $fileName, 'public');

                $library->file_path = $filePath;
                $library->file_extension = strtolower($file->getClientOriginalExtension());
                $library->file_size = $file->getSize();
            }

            $library->save();

            return response()->json([
                'message' => 'Data berhasil diupdate',
                'data' => $library
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal mengupdate data: ' . $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Request $request)
    {
        if (!$this->checkUserAccess()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        try {
            $library = RaiLibrary::find($request->id);

            if (Storage::disk('public')->exists($library->file_path)) {
                Storage::disk('public')->delete($library->file_path);
            }

            $library->delete();

            return response()->json([
                'message' => 'Data berhasil dihapus'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal menghapus data: ' . $e->getMessage()
            ], 500);
        }
    }

    public function streamPdf(RaiLibrary $library)
    {
        if (!Storage::disk('public')->exists($library->file_path)) {
            abort(404);
        }

        return Storage::disk('public')->response($library->file_path);
    }

    public function download(RaiLibrary $library)
    {
        if (!Storage::disk('public')->exists($library->file_path)) {
            abort(404);
        }

        return Storage::disk('public')->download($library->file_path, $library->name);
    }

    private function getReadableFileSize($bytes)
    {
        $units = ['B', 'KB', 'MB', 'GB'];
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);
        $bytes /= (1 << (10 * $pow));

        return round($bytes, 2) . ' ' . $units[$pow];
    }
}
