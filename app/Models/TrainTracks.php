<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TrainTracks extends Model
{
    protected $fillable = [
        'station_id',
        'train_id',
        'track_id'
    ];

    public function station()
    {
        return $this->belongsTo(Station::class);
    }

    public function train()
    {
        return $this->belongsTo(Train::class);
    }

    public function track()
    {
        return $this->belongsTo(Track::class);
    }
}
