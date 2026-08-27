<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Train extends Model
{
    protected $fillable = [
        'station_id', 
        'number', 
        'name', 
        'route', 
        'arrival_time', 
        'departure_time', 
        'track',
        'status'
    ];
}
