<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Station extends Model
{
    protected $table = 'stations';

    protected $fillable = [
        'name',
        'abbreviation',
        'grade',
        'code',
        'operational_hours',
        'km_location',
        'altitude',
        'address',
        'road_distance',
        'region',
        'facilities',
        'nearby_facilities',
        'emplasemen',
        'track_validity_period',
        'weather_city'
    ];

    public function employees()
    {
        return $this->hasMany(Employee::class);
    }

    public function trains()
    {
        return $this->hasMany(Train::class);
    }

    public function tracks()
    {
        return $this->hasMany(Track::class);
    }

    public function trainTracks()
    {
        return $this->hasMany(TrainTracks::class);
    }

    public function guardForms()
    {
        return $this->hasMany(GuardForm::class);
    }

    public function operationalDisruptions()
    {
        return $this->hasMany(OperationalDisruption::class);
    }

    public function ibprs()
    {
        return $this->hasMany(IBPR::class);
    }

    public function raiLibraries()
    {
        return $this->hasMany(RaiLibrary::class);
    }

    public function krsm()
    {
        return $this->hasMany(KRSM::class);
    }
}
