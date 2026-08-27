<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DutyShift extends Model
{
    protected $fillable = [
        'code',
        'name',
        'start_time',
        'end_time',
        'color',
        'is_active',
        'station_id'
    ];

    protected $casts = [
        'start_time' => 'datetime:H:i',
        'end_time' => 'datetime:H:i',
        'is_active' => 'boolean'
    ];

    public function dutyAssignments()
    {
        return $this->hasMany(DutyAssignment::class);
    }

    public function getFormattedTimeAttribute()
    {
        return $this->start_time->format('H:i') . ' - ' . $this->end_time->format('H:i');
    }

    public static function getDefaultShifts()
    {
        return [
            ['code' => 'P', 'name' => 'Dinas Pagi', 'start_time' => '07:00', 'end_time' => '15:00', 'color' => '#10B981'],
            ['code' => 'S', 'name' => 'Dinas Siang', 'start_time' => '15:00', 'end_time' => '23:00', 'color' => '#F59E0B'],
            ['code' => 'M', 'name' => 'Dinas Malam', 'start_time' => '23:00', 'end_time' => '07:00', 'color' => '#8B5CF6'],
            ['code' => 'L', 'name' => 'Libur', 'start_time' => '00:00', 'end_time' => '00:00', 'color' => '#EF4444'],
        ];
    }
}
