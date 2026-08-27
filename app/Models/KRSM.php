<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KRSM extends Model
{
    protected $table = 'krsm';

    protected $fillable = [
        'station_id',
        'pihak',
        'station_name',
    ];

    public function station()
    {
        return $this->belongsTo(Station::class);
    }

    public function data()
    {
        return $this->hasMany(KRSMData::class, 'krsm_id', 'id');
    }
}
