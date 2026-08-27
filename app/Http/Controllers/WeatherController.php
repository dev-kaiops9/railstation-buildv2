<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WeatherController extends Controller
{
    public function index()
    {
        // Ambil data HTML dari BMKG
        $response = Http::get('https://stamet-juanda.bmkg.go.id/kai/daop9.html');

        // Jika sukses
        if ($response->successful()) {
            $weatherData = $response->body(); // ambil isi HTML
        } else {
            $weatherData = '<p>Tidak dapat memuat data cuaca dari BMKG.</p>';
        }

        // kirim ke view
        return view('weather.index', compact('weatherData'));
    }
}
