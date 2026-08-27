<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class DutyRoster extends Model
{
    protected $fillable = [
        'station_id',
        'year',
        'month',
        'title',
        'notes',
        'status'
    ];

    protected $casts = [
        'year' => 'integer',
        'month' => 'integer'
    ];

    public function station()
    {
        return $this->belongsTo(Station::class);
    }

    public function dutyAssignments()
    {
        return $this->hasMany(DutyAssignment::class);
    }

    public function employees()
    {
        return $this->belongsToMany(Employee::class, 'duty_assignments')
                    ->withPivot(['day', 'duty_shift_id', 'notes'])
                    ->withTimestamps();
    }

    public function getMonthNameAttribute()
    {
        $months = [
            1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
            5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
            9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember'
        ];
        return $months[$this->month];
    }

    public function getFormattedTitleAttribute()
    {
        return $this->title ?: "Daftar Dinasan {$this->month_name} {$this->year}";
    }

    public function getDaysInMonthAttribute()
    {
        return Carbon::create($this->year, $this->month, 1)->daysInMonth;
    }

    public function getAssignmentsForEmployee($employeeId)
    {
        return $this->dutyAssignments()
                    ->where('employee_id', $employeeId)
                    ->with('dutyShift')
                    ->orderBy('day')
                    ->get()
                    ->keyBy('day');
    }

    public function getEmployeesWithAssignments($page = 1, $perPage = 10)
    {
        $daysInMonth = $this->days_in_month;
        $employees = $this->station->employees()
            ->orderByPosition()
            ->paginate($perPage, ['*'], 'page', $page)
            ->onEachSide(0);

        return $employees->map(function ($employee) use ($daysInMonth) {
            $assignments = $this->getAssignmentsForEmployee($employee->id);
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
    }

    public static function createForMonth($stationId, $year, $month)
    {
        return self::create([
            'station_id' => $stationId,
            'year' => $year,
            'month' => $month,
            'status' => 'draft'
        ]);
    }
}
