<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Station;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class EmployeeController extends Controller
{
    protected $station;

    public function __construct()
    {
        $this->station = $this->checkStation();
        view()->share('station', $this->station);
    }

    public function index()
    {
        $certificationStatus = $this->getChartData('cert_status');
        $skillStatus = $this->getChartData('skill_status');

        return view('employee', compact('certificationStatus', 'skillStatus'));
    }

    public function get(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $page = $request->get('page', 1);

        $employees = $this->station->employees()
            ->orderByPosition()
            ->paginate($perPage, ['*'], 'page', $page)
            ->onEachSide(0);

        $employees->getCollection()->transform(function($employee) {
            $employee->station = $employee->station;
            return $employee;
        });

        return response()->json($employees);
    }

    public function show($id)
    {
        $employee = Employee::find($id);

        return view('employee-detail', compact('employee'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'employees' => 'required|array',
            'employees.*.name' => 'required',
            'employees.*.nipp' => 'required',
            'employees.*.position' => 'required',
            'employees.*.unit' => 'required',
        ]);

        if (!$this->checkUserAccess()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $employees = [];
        foreach ($request->employees as $employeeData) {
            $employeeData['station_id'] = $this->station->id;
            $employees[] = Employee::updateOrCreate(['id' => $employeeData['id']], $employeeData);
        }

        return response()->json($employees);
    }

    public function update(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'name' => 'required',
            'nipp' => 'required',
            'position' => 'required',
            'unit' => 'required',
        ]);

        if (!$this->checkUserAccess()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $employee = Employee::find($request->id);

        // FOTO PEGAWAI
        if ($request->hasFile('photo_url')) {
            $path = $request->file('photo_url')->store('employees', 'public');
            $request->merge(['photo_url' => $path]);
        } elseif ($request->has('photo_url') && strpos($request->photo_url, 'data:image') === 0) {
            $photoName = $this->storeImage($request->photo_url);
            $request->merge(['photo_url' => 'employees/' . $photoName]);
        }

        // SERTIFIKASI
        if ($request->hasFile('cert_image')) {
            $path = $request->file('cert_image')->store('employees', 'public');
            $request->merge(['cert_image' => $path]);
        } elseif ($request->has('cert_image') && strpos($request->cert_image, 'data:image') === 0) {
            $certName = $this->storeImage($request->cert_image);
            $request->merge(['cert_image' => 'employees/' . $certName]);
        }

        // SKILL
        if ($request->hasFile('skill_image')) {
            $path = $request->file('skill_image')->store('employees', 'public');
            $request->merge(['skill_image' => $path]);
        } elseif ($request->has('skill_image') && strpos($request->skill_image, 'data:image') === 0) {
            $skillName = $this->storeImage($request->skill_image);
            $request->merge(['skill_image' => 'employees/' . $skillName]);
        }

        $employee->update($request->all());

        return response()->json($employee);
    }

    public function destroy(Request $request)
    {
        if (!$this->checkUserAccess()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $employee = Employee::find($request->id);
        $employee->delete();

        return response()->json($employee);
    }

    public function positions()
    {
        $positionOrder = $this->getPositionOrder();
        $positions = Employee::select('position', DB::raw('count(*) as total'))
            ->where('station_id', $this->station->id)
            ->groupBy('position')
            ->get()
            ->sortBy(function($item) use ($positionOrder) {
                return $positionOrder[$item->position] ?? 999;
            })
            ->values();

        return response()->json($positions);
    }

    public function move(Request $request)
    {
        if (!$this->checkUserAccess()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $employee = Employee::find($request->id);
        $newStation = Station::where('name', $request->station)->first();
        $employee->station_id = $newStation->id ?? $employee->station_id;
        $employee->save();

        return response()->json($employee);
    }

    private function getPositionOrder()
    {
        return [
            'Kepala Stasiun' => 1,
            'Wakil Kepala Stasiun' => 2,
            'PPKA' => 3,
            'PRS' => 4,
            'PLR' => 5,
            'PJL' => 6,
            'Loket' => 7,
            'Customer Service' => 8,
            'Announcer' => 9,
            'Security' => 10,
            'Cleaning Service' => 11,
        ];
    }

    private function getChartData($field)
    {
        $active = Employee::where($field, 'Aktif')->where('station_id', $this->station->id)->count();
        $inactive = Employee::where($field, '!=', 'Aktif')->where('station_id', $this->station->id)->count();
        $total = $active + $inactive;
        $percentage = $total > 0 ? round(($active / $total) * 100) : 0;

        return [
            'Aktif' => $active,
            'Nonaktif' => $inactive,
            'percentage' => $percentage,
            'total' => $total,
        ];
    }

    private function storeImage($image)
    {
        $image = str_replace('data:image/png;base64,', '', $image);
        $image = str_replace('data:image/jpg;base64,', '', $image);
        $image = str_replace('data:image/jpeg;base64,', '', $image);
        $image = str_replace(' ', '+', $image);
        $imageName = 'photo_' . time() . '_' . uniqid() . '.png';

        Storage::disk('public')->put('employees/' . $imageName, base64_decode($image));

        return $imageName;
    }
}
