<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OperationalDisruption extends Model
{
    protected $fillable = [
        'station_id',
        'date',
        'disruption_type',
        'report_to',
        'time',
        'handling',
        'officer',
    ];

    public function station()
    {
        return $this->belongsTo(Station::class);
    }
}

