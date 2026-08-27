<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Track extends Model
{
    protected $fillable = [
        'station_id',
        'track',
        'max_length',
        'effective_length',
        'train',
        'GB',
        'GD',
        'GT',
        'GK',
        'remarks'
    ];
}
