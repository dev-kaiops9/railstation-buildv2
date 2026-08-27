<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DutyAssignment extends Model
{
    protected $fillable = [
        'duty_roster_id',
        'employee_id',
        'day',
        'duty_shift_id',
        'notes'
    ];

    protected $casts = [
        'day' => 'integer'
    ];

    public function dutyRoster()
    {
        return $this->belongsTo(DutyRoster::class);
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function dutyShift()
    {
        return $this->belongsTo(DutyShift::class);
    }

    public function getDateAttribute()
    {
        return \Carbon\Carbon::create(
            $this->dutyRoster->year,
            $this->dutyRoster->month,
            $this->day
        );
    }

    public function getFormattedDateAttribute()
    {
        return $this->date->format('d/m/Y');
    }

    public static function assignShift($dutyRosterId, $employeeId, $day, $shiftId, $notes = null)
    {
        return self::updateOrCreate(
            [
                'duty_roster_id' => $dutyRosterId,
                'employee_id' => $employeeId,
                'day' => $day
            ],
            [
                'duty_shift_id' => $shiftId,
                'notes' => $notes
            ]
        );
    }

    public static function bulkAssign($dutyRosterId, $assignments)
    {
        foreach ($assignments as $assignment) {
            self::assignShift(
                $dutyRosterId,
                $assignment['employee_id'],
                $assignment['day'],
                $assignment['shift_id'],
                $assignment['notes'] ?? null
            );
        }
    }
}
