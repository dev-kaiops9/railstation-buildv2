<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GuardForm extends Model
{
    protected $fillable = [
        'station_id',
        'date',
        'ptp',
        'bh',
        'bk',
        'ms',
        'notes'
    ];

    public function station()
    {
        return $this->belongsTo(Station::class);
    }
}
