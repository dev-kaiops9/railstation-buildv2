<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Station;

class UsersSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            ['name' => 'Admin', 'email' => 'admin@railstation.com', 'password' => 'admin', 'role' => 'admin', 'station_id' => null],
            ['name' => 'Area Manager', 'email' => 'area_manager@railstation.com', 'password' => 'areamanager', 'role' => 'area_manager', 'station_id' => null],
        ];

        $stations = Station::all();
        foreach ($stations as $station) {
            $users[] = ['name' => 'KS ' . $station->name, 'email' => 'ks_' . strtolower(str_replace(' ', '_', $station->abbreviation)) . '@railstation.com', 'password' => 'kepalastasiun', 'role' => 'station_master', 'station_id' => $station->id];
        }

        foreach ($users as $user) {
            User::create([
                'name' => $user['name'],
                'email' => $user['email'],
                'password' => bcrypt($user['password']),
                'role' => $user['role'],
                'station_id' => $user['station_id'],
            ]);
        }
    }
}
