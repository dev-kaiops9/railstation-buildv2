<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\GuardForm;
use App\Models\OperationalDisruption;
use App\Models\DutyShift;
use App\Models\Train;
use App\Models\Track;
use App\Models\TrainTracks;
use App\Models\RaiLibrary;
use Illuminate\Database\Seeder;

class TestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        // Create 1 Kepala Stasiun
        Employee::create([
            'name' => fake()->name(),
            'nipp' => fake()->unique()->numberBetween(10000, 99999),
            'position' => 'Kepala Stasiun',
            'unit' => 'Operasional',
            'station_id' => 17,
            'cert_status' => rand(0, 1) ? 'Aktif' : 'Nonaktif',
            'skill_status' => rand(0, 1) ? 'Aktif' : 'Nonaktif',
        ]);
        Employee::create([
            'name' => fake()->name(),
            'nipp' => fake()->unique()->numberBetween(10000, 99999),
            'position' => 'Kepala Stasiun',
            'unit' => 'Operasional',
            'station_id' => 15,
            'cert_status' => rand(0, 1) ? 'Aktif' : 'Nonaktif',
            'skill_status' => rand(0, 1) ? 'Aktif' : 'Nonaktif',
        ]);

        // Create 1 Wakil Kepala Stasiun
        Employee::create([
            'name' => fake()->name(),
            'nipp' => fake()->unique()->numberBetween(10000, 99999),
            'position' => 'Wakil Kepala Stasiun',
            'unit' => 'Operasional',
            'station_id' => 17,
            'cert_status' => rand(0, 1) ? 'Aktif' : 'Nonaktif',
            'skill_status' => rand(0, 1) ? 'Aktif' : 'Nonaktif',
        ]);
        Employee::create([
            'name' => fake()->name(),
            'nipp' => fake()->unique()->numberBetween(10000, 99999),
            'position' => 'Wakil Kepala Stasiun',
            'unit' => 'Operasional',
            'station_id' => 15,
            'cert_status' => rand(0, 1) ? 'Aktif' : 'Nonaktif',
            'skill_status' => rand(0, 1) ? 'Aktif' : 'Nonaktif',
        ]);

        // Create 5 employees for each of the remaining positions
        $otherPositions = [
            ['PPKA', 'Operasional'],
            ['Loket', 'Pelayanan'],
            ['Customer Service', 'Pelayanan'],
            ['PLR', 'Operasional'],
            ['Announcer', 'Pelayanan'],
            ['PJL', 'Operasional'],
            ['Security', 'Pelayanan'],
            ['PRS', 'Operasional'],
            ['Cleaning Service', 'Pelayanan'],
        ];

        foreach ($otherPositions as $position) {
            for ($i = 0; $i < 5; $i++) {
                Employee::create([
                    'name' => fake()->name(),
                    'nipp' => fake()->unique()->numberBetween(10000, 99999),
                    'position' => $position[0],
                    'unit' => $position[1],
                    'station_id' => 17,
                    'cert_status' => rand(0, 1) ? 'Aktif' : 'Nonaktif',
                    'skill_status' => rand(0, 1) ? 'Aktif' : 'Nonaktif',
                ]);
            }
        }

        foreach ($otherPositions as $position) {
            for ($i = 0; $i < 2; $i++) {
                Employee::create([
                    'name' => fake()->name(),
                    'nipp' => fake()->unique()->numberBetween(10000, 99999),
                    'position' => $position[0],
                    'unit' => $position[1],
                    'station_id' => 15,
                    'cert_status' => rand(0, 1) ? 'Aktif' : 'Nonaktif',
                    'skill_status' => rand(0, 1) ? 'Aktif' : 'Nonaktif',
                ]);
            }
        }

        $shifts = DutyShift::getDefaultShifts();

        foreach ($shifts as $shift) {
            $shift['station_id'] = 17;

            DutyShift::create($shift);
        }

        foreach ($shifts as $shift) {
            $shift['station_id'] = 15;

            DutyShift::create($shift);
        }

        $trains = [
            ['number' => '125', 'name' => 'Gajayana', 'route' => 'Gambir - Malang', 'arrival_time' => '04:30', 'departure_time' => '04:45', 'track' => '1', 'status' => 'Berhenti'],
            ['number' => '76', 'name' => 'Bima', 'route' => 'Gambir - Surabaya', 'arrival_time' => '05:15', 'departure_time' => '05:30', 'track' => '2', 'status' => 'Berhenti'],
            ['number' => '60', 'name' => 'Argo Lawu', 'route' => 'Gambir - Solo', 'arrival_time' => '06:45', 'departure_time' => '07:00', 'track' => '1', 'status' => 'Berhenti'],
            ['number' => '7', 'name' => 'Turangga', 'route' => 'Bandung - Surabaya', 'arrival_time' => '08:20', 'departure_time' => '08:35', 'track' => '3', 'status' => 'Berhenti'],
            ['number' => '109', 'name' => 'Taksaka', 'route' => 'Gambir - Yogyakarta', 'arrival_time' => '09:10', 'departure_time' => '09:25', 'track' => '2', 'status' => 'Berhenti'],
            ['number' => '42', 'name' => 'Harina', 'route' => 'Bandung - Surabaya', 'arrival_time' => '10:40', 'departure_time' => '10:55', 'track' => '4', 'status' => 'Berhenti'],
            ['number' => '135', 'name' => 'Bangunkarta', 'route' => 'Jakarta - Jombang', 'arrival_time' => '12:30', 'departure_time' => '12:45', 'track' => '1', 'status' => 'Berhenti'],
            ['number' => '89', 'name' => 'Mutiara Selatan', 'route' => 'Bandung - Surabaya', 'arrival_time' => '14:15', 'departure_time' => '14:30', 'track' => '3', 'status' => 'Berhenti'],
            ['number' => '121', 'name' => 'Brantas', 'route' => 'Jakarta - Blitar', 'arrival_time' => '18:40', 'departure_time' => '18:55', 'track' => '4', 'status' => 'Berhenti'],
        ];

        foreach ($trains as $train) {
            $train['station_id'] = 17;

            Train::create($train);
        }

        $tracks = [
            ['track' => '1', 'max_length' => '1000m', 'effective_length' => '950m', 'train' => 'KA 125 Gajayana', 'GB' => '1', 'GD' => '2', 'GT' => '3', 'GK' => '4', 'remarks' => 'CC201, 203, 204 : 15.214 mm', 'station_id' => 17],
            ['track' => '2', 'max_length' => '1000m', 'effective_length' => '950m', 'train' => 'KA 76 Bima', 'GB' => '1', 'GD' => '2', 'GT' => '3', 'GK' => '4', 'remarks' => 'CC202, 205 : 18.942 mm', 'station_id' => 17],
            ['track' => '3', 'max_length' => '1000m', 'effective_length' => '950m', 'train' => 'Kosong', 'GB' => '1', 'GD' => '2', 'GT' => '3', 'GK' => '4', 'remarks' => 'CC206 : 15.849mm', 'station_id' => 17],
            ['track' => '4', 'max_length' => '1000m', 'effective_length' => '950m', 'train' => 'Kosong', 'GB' => '1', 'GD' => '2', 'GT' => '3', 'GK' => '4', 'remarks' => 'CC207 : 15.849mm', 'station_id' => 17],
        ];

        foreach ($tracks as $track) {
            Track::create($track);
        }

        $trains = Train::where('station_id', 17)->get();

        foreach ($trains as $train) {
            $track = Track::where('station_id', 17)->where('track', $train->track)->first();

            TrainTracks::create([
                'train_id' => $train->id,
                'track_id' => $track->id,
                'station_id' => 17,
            ]);
        }
        
        $guardForms = [
            ['date' => '2025-10-28', 'ptp' => 'PTP-01', 'bh' => 'BH-01', 'bk' => 'BK-01', 'ms' => 'MS-01', 'notes' => 'Pemeriksaan rutin, semua normal.', 'station_id' => 17],
            ['date' => '2025-10-29', 'ptp' => 'PTP-02', 'bh' => 'BH-02', 'bk' => 'BK-02', 'ms' => 'MS-02', 'notes' => 'Ada sedikit kendala pada MS-02, perlu perhatian.', 'station_id' => 17],
        ];

        for ($i = 0; $i < 100; $i++) {
            $guardForms[] = [
                'date' => fake()->date(),
                'ptp' => fake()->word(),
                'bh' => fake()->word(),
                'bk' => fake()->word(),
                'ms' => fake()->word(),
                'notes' => fake()->sentence(),
                'station_id' => 17,
            ];
        }
        foreach ($guardForms as $guardForm) {
            GuardForm::create($guardForm);
        }

        $operationalDisruptions = [
            ['date' => '2025-10-28', 'disruption_type' => 'Gangguan Listrik', 'report_to' => 'Bagian Listrik', 'time' => '08:00', 'handling' => 'Sudah selesai', 'officer' => 'John Doe', 'station_id' => 17],
            ['date' => '2025-10-29', 'disruption_type' => 'Gangguan Sinyal', 'report_to' => 'Bagian Sinyal', 'time' => '09:00', 'handling' => 'Sudah selesai', 'officer' => 'Jane Doe', 'station_id' => 17],
        ];

        for ($i = 0; $i < 100; $i++) {
            $operationalDisruptions[] = [
                'date' => fake()->date(),
                'disruption_type' => fake()->word(),
                'report_to' => fake()->word(),
                'time' => fake()->time(),
                'handling' => fake()->sentence(),
                'officer' => fake()->name(),
                'station_id' => 17,
            ];
        }

        foreach ($operationalDisruptions as $operationalDisruption) {
            OperationalDisruption::create($operationalDisruption);
        }

        $raiLibraries = [
            ['name' => 'Panduan Operasional Stasiun', 'file_path' => 'railibrary/1762088988_Data penjualan produk terlaku selama 3 bulan di logica kreasi komputer.pdf', 'file_extension' => 'pdf', 'station_id' => 17],
            ['name' => 'Laporan Bulanan', 'file_path' => 'sample.xlsx', 'file_extension' => 'xlsx', 'station_id' => 17],
        ];

        for ($i = 0; $i < 100; $i++) {
            $raiLibraries[] = [
                'name' => fake()->word(),
                'file_path' => 'railibrary/1762088988_Data penjualan produk terlaku selama 3 bulan di logica kreasi komputer.pdf',
                'file_extension' => 'pdf',
                'station_id' => 17,
            ];
        }

        foreach ($raiLibraries as $raiLibrary) {
            RaiLibrary::create($raiLibrary);
        }
    }
}
