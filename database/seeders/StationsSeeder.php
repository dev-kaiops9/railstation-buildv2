<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Station;

class StationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $stations = ['Arjasa', 'Kotok', 'Kalisat', 'Ledokombo', 'Sempolan', 'Garahan', 'Mrawan', 'Kalibaru', 'Glenmore', 'Sumberwadung', 'Kalisetail', 'Temuguruh', 'Singojuruh', 'Rogojampi', 'Banyuwangi Kota', 'Argopuro', 'Ketapang'];
        $abbreviations = ['AJ', 'KTK', 'KLT', 'LDO', 'SPL', 'GRN', 'MRW', 'KBR', 'GLM', 'SWD', 'KSL', 'TGR', 'SGJ', 'RGP', 'BW', 'AGO', 'KTG'];

        foreach ($stations as $key => $station) {
            Station::create([
                'name' => $station,
                'abbreviation' => $abbreviations[$key],
                'grade' => '-',
                'code' => '-',
                'operational_hours' => '-',
                'km_location' => '-',
                'altitude' => '-',
                'address' => '-',
                'road_distance' => '-',
                'region' => '-',
                'facilities' => '-',
                'nearby_facilities' => '-',
            ]);
        }
    }
}
