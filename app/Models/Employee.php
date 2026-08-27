<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $table = 'employees';

    protected $fillable = [
        'name',
        'nipp',
        'position',
        'unit',
        'gender',
        'dob',
        'photo_url',
        'cert_image',
        'cert_type',
        'cert_number',
        'cert_expiry',
        'cert_status',
        'skill_image',
        'skill_type',
        'skill_number',
        'skill_expiry',
        'skill_status',
        'station_id',
    ];

    public function station()
    {
        return $this->belongsTo(Station::class);
    }

    public function dutyAssignments()
    {
        return $this->hasMany(DutyAssignment::class);
    }

    public function dutyRosters()
    {
        return $this->belongsToMany(DutyRoster::class, 'duty_assignments')
                    ->withPivot(['day', 'duty_shift_id', 'notes'])
                    ->withTimestamps();
    }

    /**
     * Scope untuk sort employee berdasarkan position order
     */
    public function scopeOrderByPosition($query)
    {
        $positionOrder = [
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

        // Create CASE statement for ordering
        $cases = [];
        $bindings = [];
        foreach ($positionOrder as $position => $order) {
            $cases[] = "WHEN position = ? THEN ?";
            $bindings[] = $position;
            $bindings[] = $order;
        }

        $caseStatement = "CASE " . implode(" ", $cases) . " ELSE 999 END";

        return $query->orderByRaw($caseStatement, $bindings);
    }
}
