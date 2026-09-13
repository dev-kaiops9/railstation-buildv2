<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TrainSchedule extends Model
{
    protected $fillable = [
        'train_id',
        'station_id',
        'arrival_time',
        'departure_time',
        'track_id',
    ];

    public function train()
    {
        return $this->belongsTo(Train::class);
    }

    public function station()
    {
        return $this->belongsTo(Station::class);
    }

    public function track()
    {
        return $this->belongsTo(Track::class);
    }
}