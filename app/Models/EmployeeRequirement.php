<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeeRequirement extends Model
{
    protected $table = 'employee_requirements';

    protected $fillable = [
        'position',
        'required',
        'available',
        'shortage',
        'excess',
        'station_id',
    ];
}
