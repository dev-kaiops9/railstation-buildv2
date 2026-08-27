<?php

namespace App\Http\Controllers;

use App\Models\Station;
use App\Models\DutyShift;
use App\Models\DutyRoster;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class DashboardController extends Controller
{

    public function index()
    {
        $station = $this->checkStation();
        $totalEmployees = $station->employees()->count();
        $totalTrains = $station->trains()->count();

        $today = now()->day;
        $currentMonth = now()->month;
        $currentYear = now()->year;

        $now = Carbon::now()->format('H:i');

        $dutyRoster = DutyRoster::where('station_id', $station->id)
            ->where('year', $currentYear)
            ->where('month', $currentMonth)
            ->first();

        $activeShift = null;
        $employees = collect();

        if ($dutyRoster) {

            $shifts = DutyShift::where('station_id', $station->id)
                ->where('is_active', true)
                ->get();

            foreach ($shifts as $shift) {

                $start = Carbon::parse($shift->start_time)->format('H:i');
                $end = Carbon::parse($shift->end_time)->format('H:i');

                // Jika shift normal (tidak melewati tengah malam)
                if ($start <= $end) {

                    if ($now >= $start && $now <= $end) {
                        $activeShift = $shift;
                    }

                } else {

                    // Jika shift melewati tengah malam
                    if ($now >= $start || $now <= $end) {
                        $activeShift = $shift;
                    }

                }

                if ($activeShift) {

                    $employees = $dutyRoster->dutyAssignments()
                        ->where('day', $today)
                        ->where('duty_shift_id', $shift->id)
                        ->with('employee')
                        ->get()
                        ->pluck('employee')
                        ->sortBy(function($employee){
                            $positionOrder = [
                                'Kepala Stasiun' => 1,
                                'Wakil Kepala Stasiun' => 2,
                                'PPKA' => 3,
                                'PRS' => 4,
                                'PLR' => 5,
                                'PJL' => 6,
                                'Loket' => 7,
                                'Customer Service' => 8,
                                'Announcer' => 9,
                                'Security' => 10,
                                'Cleaning Service' => 11,
                            ];
                            return $positionOrder[$employee->position] ?? 999;
                        })
                        ->values();

                    break;
                }
            }
        }

        // 🔵 Ambil cuaca dari BMKG
        $city = $station->weather_city ?? 'Banyuwangi';
        $weatherData = Cache::remember('weather_'.$city, 1800, function () use ($city) {
            return $this->getWeatherBMKG($city);
        });

        // Pastikan selalu ada data fallback
        $weather = [
            'temperature' => $weatherData['temperature'] ?? '27',
            'weather' => $this->weatherCode($weatherData['weather'] ?? '0')
        ];

        return view('dashboard', compact(
            'station',
            'totalEmployees',
            'totalTrains',
            'employees',
            'activeShift',
            'weather'
        ));
    }

    public function getWeatherBMKG($city)
    {
        try {
            $url = "https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-Indonesia.xml";
            $response = Http::timeout(10)->get($url);
            if (!$response->successful()) return null;

            libxml_use_internal_errors(true);
            $xml = simplexml_load_string($response->body());
            if (!$xml) return null;

            foreach ($xml->forecast->area as $area) {
                if (stripos((string)$area['description'], $city) !== false) {
                    $temperature = null;
                    $weatherCode = null;

                    foreach ($area->parameter as $param) {
                        $id = (string)$param['id'];
                        if ($id == 't') $temperature = (string)$param->timerange[0]->value;
                        if ($id == 'weather') $weatherCode = (string)$param->timerange[0]->value;
                    }

                    if ($temperature !== null && $weatherCode !== null) {
                        return ['temperature' => $temperature, 'weather' => $weatherCode];
                    }
                }
            }

            // fallback
            return ['temperature' => '27', 'weather' => '0'];

        } catch (\Exception $e) {
            return ['temperature' => '30', 'weather' => '0'];
        }
    }

    public function weatherCode($code)
    {
        $weatherList = [
            "0" => "Cerah",
            "1" => "Cerah Berawan",
            "2" => "Cerah Berawan",
            "3" => "Berawan",
            "4" => "Berawan Tebal",
            "5" => "Udara Kabur",
            "10" => "Asap",
            "45" => "Kabut",
            "60" => "Hujan Ringan",
            "61" => "Hujan Sedang",
            "63" => "Hujan Lebat",
            "80" => "Hujan Lokal",
            "95" => "Hujan Petir"
        ];

        return $weatherList[$code] ?? "Tidak diketahui";
    }
}
