<?php

namespace App\Http\Controllers;

use App\Models\DutyRoster;
use App\Models\DutyShift;
use App\Models\DutyAssignment;
use App\Models\Employee;
use Illuminate\Http\Request;
use Carbon\Carbon;

class DutyRosterController extends Controller
{
    protected $station;

    public function __construct()
    {
        $this->station = $this->checkStation();
        view()->share('station', $this->station);
    }

    public function index(Request $request)
    {
        $year = $request->get('year', date('Y'));
        $month = $request->get('month', date('n'));

        $dutyRoster = DutyRoster::firstOrCreate(['station_id' => $this->station->id, 'year' => $year, 'month' => $month], ['status' => 'draft']);
        $dutyShifts = DutyShift::where('station_id', $this->station->id)->where('is_active', true)->get();
        $employeesWithSchedule = $dutyRoster->getEmployeesWithAssignments();

        return response()->json([
            'duty_roster' => $dutyRoster,
            'employees' => $employeesWithSchedule,
            'duty_shifts' => $dutyShifts,
            'days_in_month' => $dutyRoster->days_in_month,
            'month_name' => $dutyRoster->month_name,
            'year' => $year,
            'month' => $month
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'year' => 'required|integer',
            'month' => 'required|integer|min:1|max:12',
            'title' => 'nullable|string|max:255',
            'notes' => 'nullable|string'
        ]);

        $dutyRoster = DutyRoster::create([
            'station_id' => $this->station->id,
            'year' => $request->year,
            'month' => $request->month,
            'title' => $request->title,
            'notes' => $request->notes,
            'status' => 'draft'
        ]);

        return response()->json([
            'success' => true,
            'duty_roster' => $dutyRoster,
            'message' => 'Daftar dinasan berhasil dibuat'
        ]);
    }

    public function update(Request $request, $id)
    {
        $dutyRoster = DutyRoster::findOrFail($id);

        $request->validate([
            'title' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'status' => 'in:draft,published,archived'
        ]);

        $dutyRoster->update($request->only(['title', 'notes', 'status']));

        return response()->json([
            'success' => true,
            'duty_roster' => $dutyRoster,
            'message' => 'Daftar dinasan berhasil diperbarui'
        ]);
    }

    public function assignShift(Request $request)
    {
        $request->validate([
            'duty_roster_id' => 'required|exists:duty_rosters,id',
            'employee_id' => 'required|exists:employees,id',
            'day' => 'required|integer|min:1|max:31',
            'shift_code' => 'nullable|string|exists:duty_shifts,code',
            'notes' => 'nullable|string'
        ]);

        $dutyShift = null;
        if ($request->shift_code) {
            $dutyShift = DutyShift::where('code', $request->shift_code)->first();
        }

        $assignment = DutyAssignment::assignShift(
            $request->duty_roster_id,
            $request->employee_id,
            $request->day,
            $dutyShift?->id,
            $request->notes
        );

        return response()->json([
            'success' => true,
            'assignment' => $assignment->load('dutyShift'),
            'message' => 'Jadwal dinas berhasil disimpan'
        ]);
    }

    public function bulkAssign(Request $request)
    {
        $request->validate([
            'duty_roster_id' => 'required|exists:duty_rosters,id',
            'assignments' => 'required|array',
            'assignments.*.employee_id' => 'required|exists:employees,id',
            'assignments.*.day' => 'required|integer|min:1|max:31',
            'assignments.*.shift_code' => 'nullable|string',
            'assignments.*.notes' => 'nullable|string'
        ]);

        $dutyRoster = DutyRoster::findOrFail($request->duty_roster_id);

        if (!$dutyRoster) {
            return response()->json([
                'success' => false,
                'message' => 'Daftar dinasan tidak ditemukan'
            ]);
        }

        $processedAssignments = [];

        foreach ($request->assignments as $assignmentData) {
            $dutyShift = null;
            if (!empty($assignmentData['shift_code'])) {
                $dutyShift = DutyShift::where('code', $assignmentData['shift_code'])->where('station_id', $dutyRoster->station_id)->first();
            }

            $assignment = DutyAssignment::assignShift(
                $request->duty_roster_id,
                $assignmentData['employee_id'],
                $assignmentData['day'],
                $dutyShift?->id,
                $assignmentData['notes'] ?? null
            );

            $processedAssignments[] = $assignment->load('dutyShift');
        }

        return response()->json([
            'success' => true,
            'assignments' => $processedAssignments,
            'message' => 'Jadwal dinas berhasil disimpan secara massal'
        ]);
    }

    public function getDutyShifts()
    {
        $dutyShifts = DutyShift::where('station_id', $this->station->id)->where('is_active', true)->get();

        return response()->json([
            'duty_shifts' => $dutyShifts
        ]);
    }

    public function getMonthlyRoster(Request $request)
    {
        $year = $request->get('year', date('Y'));
        $month = $request->get('month', date('n'));
        $page = $request->get('page', 1);
        $perPage = $request->get('per_page', 10);

        $dutyRoster = DutyRoster::where('station_id', $this->station->id)->where('year', $year)->where('month', $month)->first();

        if (!$dutyRoster) {
            return response()->json([
                'success' => false,
                'message' => 'Daftar dinasan tidak ditemukan untuk bulan ini'
            ]);
        }

        $daysInMonth = $dutyRoster->days_in_month;
        $dutyShifts = DutyShift::where('station_id', $this->station->id)->where('is_active', true)->get();
        $employees = $this->station->employees()
            ->orderByPosition()
            ->paginate($perPage, ['*'], 'page', $page)
            ->onEachSide(0);

        $employeesWithSchedule = $employees->getCollection()->map(function ($employee) use ($daysInMonth, $dutyRoster) {
            $assignments = $dutyRoster->getAssignmentsForEmployee($employee->id);
            $schedule = [];

            for ($day = 1; $day <= $daysInMonth; $day++) {
                $assignment = $assignments->get($day);
                $schedule[$day] = [
                    'shift_code' => $assignment ? $assignment->dutyShift?->code : '',
                    'shift_name' => $assignment ? $assignment->dutyShift?->name : '',
                    'shift_color' => $assignment ? $assignment->dutyShift?->color : '#6B7280',
                    'notes' => $assignment ? $assignment->notes : ''
                ];
            }

            return [
                'employee' => $employee,
                'schedule' => $schedule
            ];
        });

        return response()->json([
            'success' => true,
            'duty_roster' => $dutyRoster,
            'employees' => $employeesWithSchedule,
            'duty_shifts' => $dutyShifts,
            'days_in_month' => $dutyRoster->days_in_month,
            'pagination' => [
                'current_page' => $employees->currentPage(),
                'per_page' => $employees->perPage(),
                'total' => $employees->total(),
                'last_page' => $employees->lastPage(),
                'next_page_url' => $employees->nextPageUrl(),
                'prev_page_url' => $employees->previousPageUrl(),
                'links' => $employees->linkCollection()->toArray()
            ]
        ]);
    }

    public function copyFromPreviousMonth(Request $request)
    {
        $request->validate([
            'duty_roster_id' => 'required|exists:duty_rosters,id',
            'source_year' => 'required|integer',
            'source_month' => 'required|integer|min:1|max:12'
        ]);

        $targetRoster = DutyRoster::findOrFail($request->duty_roster_id);
        $sourceRoster = DutyRoster::where('station_id', $targetRoster->station_id)
                                  ->where('year', $request->source_year)
                                  ->where('month', $request->source_month)
                                  ->first();

        if (!$sourceRoster) {
            return response()->json([
                'success' => false,
                'message' => 'Daftar dinasan sumber tidak ditemukan'
            ], 404);
        }

        // Copy assignments
        $sourceAssignments = $sourceRoster->dutyAssignments()->with('dutyShift')->get();
        $targetDaysInMonth = $targetRoster->days_in_month;

        foreach ($sourceAssignments as $sourceAssignment) {
            // Only copy if the day exists in target month
            if ($sourceAssignment->day <= $targetDaysInMonth) {
                DutyAssignment::assignShift(
                    $targetRoster->id,
                    $sourceAssignment->employee_id,
                    $sourceAssignment->day,
                    $sourceAssignment->duty_shift_id,
                    $sourceAssignment->notes
                );
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Jadwal berhasil disalin dari bulan sebelumnya'
        ]);
    }

    public function destroy($id)
    {
        $dutyRoster = DutyRoster::findOrFail($id);
        $dutyRoster->delete();

        return response()->json([
            'success' => true,
            'message' => 'Daftar dinasan berhasil dihapus'
        ]);
    }
}
