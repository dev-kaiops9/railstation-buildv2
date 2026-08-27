<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KRSMData extends Model
{
    protected $table = 'krsm_data';

    protected $fillable = [
        'krsm_id',
        'date',
        'kr_awal',
        'kr_akhir',
        'kr_keterangan',
        'sm_awal',
        'sm_akhir',
        'sm_keterangan'
    ];

    public function krsm()
    {
        return $this->belongsTo(KRSM::class, 'krsm_id', 'id');
    }
}
