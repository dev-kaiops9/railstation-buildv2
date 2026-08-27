<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Station;
use App\Models\KRSM;

class KRSMSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $stations = ['Arjasa', 'Kotok', 'Kalisat', 'Ledokombo', 'Sempolan', 'Garahan', 'Mrawan', 'Kalibaru', 'Glenmore', 'Sumberwadung', 'Kalisetail', 'Temuguruh', 'Singojuruh', 'Rogojampi', 'Banyuwangi Kota', 'Argopuro', 'Ketapang'];

        foreach ($stations as $index => $station) {
            $currentStation = Station::where('name', $station)->first();

            // Pihak A (stasiun sebelumnya)
            if ($index === 0) {
                // Stasiun pertama (Arjasa), pihak A adalah Jember
                KRSM::create([
                    'station_id' => $currentStation->id,
                    'pihak' => 'A',
                    'station_name' => 'Jember',
                ]);
            } else {
                // Stasiun sebelumnya
                KRSM::create([
                    'station_id' => $currentStation->id,
                    'pihak' => 'A',
                    'station_name' => Station::where('name', $stations[$index - 1])->first()->name,
                ]);
            }


            // Pihak B (stasiun selanjutnya)
            // Stasiun terakhir tidak memiliki pihak B
            if ($index < count($stations) - 1) {
                $pihakBStation = Station::where('name', $stations[$index + 1])->first();

                KRSM::create([
                    'station_id' => $currentStation->id,
                    'pihak' => 'B',
                    'station_name' => $pihakBStation->name,
                ]);
            }
        }
    }
}
