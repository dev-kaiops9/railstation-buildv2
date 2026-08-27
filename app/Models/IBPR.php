<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IBPR extends Model
{
    protected $table = 'ibpr';

    protected $fillable = [
        'station_id',
        'hazard_description',
        'control_explanation',
        'control_reference',
        'effectiveness',
        'responsible_position',
        'risk_explanation',
        'probability',
        'impact',
        'action_plan_explanation',
        'action_plan_reference',
        'action_plan_responsible',
        'completion_date',
        'after_probability',
        'after_impact',
    ];

    public function station()
    {
        return $this->belongsTo(Station::class);
    }
}

