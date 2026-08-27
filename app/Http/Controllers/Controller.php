<?php

namespace App\Http\Controllers;

use App\Models\Station;
use Illuminate\Support\Facades\Auth;

abstract class Controller
{
    protected function checkStation()
    {
        $stationId = session('station_id');

        if (!$stationId && Auth::user()->role == 'station_master' && Auth::user()->station_id) {
            $station = Auth::user()->station;
            session(['station' => $station->name, 'station_id' => $station->id]);
        } elseif (!$stationId) {
            $stationName = 'Mrawan';
            $station = Station::where('name', $stationName)->first();
            $stationId = $station->id;
            session(['station' => $station->name, 'station_id' => $station->id]);
        } else {
            $station = Station::find($stationId);
        }

        return $station;
    }

    protected function checkUserAccess()
    {
        $station = $this->checkStation();

        if (Auth::user()->role == 'station_master') {
            if (Auth::user()->station_id == $station->id) {
                return true;
            } else {
                return false;
            }
        } elseif (Auth::user()->role == 'admin' || Auth::user()->role == 'area_manager') {
            return true;
        } else {
            return false;
        }
    }
}
