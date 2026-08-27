@extends('layouts.app')

@section('content')
<div class="bg-white rounded-xl shadow-md p-6 mb-8">
    <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold text-gray-900">Profil Stasiun</h1>
        @if(auth()->user()->role != 'station_master' || (auth()->user()->role == 'station_master' &&
        auth()->user()->station_id == $station->id))
        <div id="profil-edit-buttons-container" class="flex space-x-2">
            <button id="profil-edit-btn"
                class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Edit
                Data</button>
            <button id="profil-save-btn"
                class="bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300 hidden">Simpan</button>
            <button id="profil-cancel-btn"
                class="bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300 hidden">Batal</button>
        </div>
        @endif
    </div>

    <div id="profil-view-mode">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Kartu 1: Informasi Stasiun -->
            <div class="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:scale-105">
                <h2 class="text-xl font-bold text-blue-600 flex items-center">
                    <i class="fas fa-info-circle mr-2"></i> Informasi Stasiun
                </h2>
                <div class="title-divider"></div>
                <ul id="info-stasiun-list" class="text-gray-700 space-y-2">
                    <li><strong>Nama Stasiun:</strong> <span id="view-station-name">{{ $station->name }}</span></li>
                    <li><strong>Singkatan:</strong> <span id="view-abbreviation">{{ $station->abbreviation }}</span>
                    </li>
                    <li><strong>Kelas:</strong> <span id="view-grade">{{ $station->grade }}</span></li>
                    <li><strong>Kode:</strong> <span id="view-code">{{ $station->code }}</span></li>
                    <li><strong>Waktu Operasional:</strong> <span id="view-operational-hours">{{
                            $station->operational_hours }}</span></li>
                </ul>
            </div>

            <!-- Kartu 2: Lokasi -->
            <div class="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:scale-105">
                <h2 class="text-xl font-bold text-blue-600 flex items-center">
                    <i class="fas fa-map-marker-alt mr-2"></i> Lokasi
                </h2>
                <div class="title-divider"></div>
                <ul id="lokasi-list" class="text-gray-700 space-y-2">
                    <li><strong>Letak KM:</strong> <span id="view-km-location">{{ $station->km_location}}</span></li>
                    <li><strong>Ketinggian:</strong> <span id="view-altitude">{{ $station->altitude }}</span></li>
                    <li><strong>Alamat:</strong> <span id="view-address">{{ $station->address }}</span></li>
                    <li><strong>Jarak dari Jalan Raya:</strong> <span id="view-road-distance">{{ $station->road_distance
                            }}</span></li>
                    <li><strong>Wilayah:</strong> <span id="view-region">{{ $station->region }}</span></li>
                </ul>
            </div>

            <!-- Kartu 3: Fasilitas Stasiun -->
            <div class="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:scale-105">
                <h2 class="text-xl font-bold text-blue-600 flex items-center">
                    <i class="fas fa-building mr-2"></i> Fasilitas Stasiun
                </h2>
                <div class="title-divider"></div>
                <ul id="view-facilities-list" class="text-gray-700 list-disc list-inside space-y-2">
                    @foreach (explode("\n", $station->facilities) as $fasilitas)
                    <li>{{ $fasilitas }}</li>
                    @endforeach
                </ul>
            </div>

            <!-- Kartu 4: Fasilitas & Lokasi Terdekat -->
            <div class="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:scale-105">
                <h2 class="text-xl font-bold text-blue-600 flex items-center">
                    <i class="fas fa-map-marked-alt mr-2"></i> Fasilitas & Lokasi Terdekat
                </h2>
                <div class="title-divider"></div>
                <ul id="view-nearby-facilities-list" class="text-gray-700 list-disc list-inside space-y-2">
                    @foreach (explode("\n", $station->nearby_facilities) as $fasilitas)
                    <li>{{ $fasilitas }}</li>
                    @endforeach
                </ul>
            </div>
        </div>
    </div>

    <div id="profil-edit-mode" class="hidden">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Kartu 1: Informasi Stasiun -->
            <div class="bg-white rounded-xl shadow-md p-6">
                <h2 class="text-xl font-bold text-blue-600 flex items-center">
                    <i class="fas fa-info-circle mr-2"></i> Informasi Stasiun
                </h2>
                <div class="title-divider"></div>
                <div class="text-gray-700 space-y-2">
                    <div>
                        <label for="edit-station-name" class="block text-sm font-bold text-gray-700">Nama
                            Stasiun:</label>
                        <input type="text" id="edit-station-name"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value="{{ $station->name }}">
                    </div>
                    <div>
                        <label for="edit-abbreviation" class="block text-sm font-bold text-gray-700">Singkatan:</label>
                        <input type="text" id="edit-abbreviation"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value="{{ $station->abbreviation }}">
                    </div>
                    <div>
                        <label for="edit-grade" class="block text-sm font-bold text-gray-700">Kelas:</label>
                        <input type="text" id="edit-grade"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value="{{ $station->grade }}">
                    </div>
                    <div>
                        <label for="edit-code" class="block text-sm font-bold text-gray-700">Kode:</label>
                        <input type="text" id="edit-code"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value="{{ $station->code }}">
                    </div>
                    <div>
                        <label for="edit-operational-hours" class="block text-sm font-bold text-gray-700">Waktu
                            Operasional:</label>
                        <input type="text" id="edit-operational-hours"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value="{{ $station->operational_hours }}">
                    </div>
                </div>
            </div>

            <!-- Kartu 2: Lokasi -->
            <div class="bg-white rounded-xl shadow-md p-6">
                <h2 class="text-xl font-bold text-blue-600 flex items-center">
                    <i class="fas fa-map-marker-alt mr-2"></i> Lokasi
                </h2>
                <div class="title-divider"></div>
                <div class="text-gray-700 space-y-2">
                    <div>
                        <label for="edit-km-location" class="block text-sm font-bold text-gray-700">Letak
                            KM:</label>
                        <input type="text" id="edit-km-location"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value="{{ $station->km_location }}">
                    </div>
                    <div>
                        <label for="edit-altitude" class="block text-sm font-bold text-gray-700">Ketinggian:</label>
                        <input type="text" id="edit-altitude"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value="{{ $station->altitude }}">
                    </div>
                    <div>
                        <label for="edit-address" class="block text-sm font-bold text-gray-700">Alamat:</label>
                        <textarea id="edit-address" rows="3"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">{{ $station->address }}</textarea>
                    </div>
                    <div>
                        <label for="edit-road-distance" class="block text-sm font-bold text-gray-700">Jarak
                            dari Jalan Raya:</label>
                        <input type="text" id="edit-road-distance"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value="{{ $station->road_distance }}">
                    </div>
                    <div>
                        <label for="edit-region" class="block text-sm font-bold text-gray-700">Wilayah:</label>
                        <input type="text" id="edit-region"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value="{{ $station->region }}">
                    </div>
                </div>
            </div>

            <!-- Kartu 3: Fasilitas Stasiun -->
            <div class="bg-white rounded-xl shadow-md p-6">
                <h2 class="text-xl font-bold text-blue-600 flex items-center">
                    <i class="fas fa-building mr-2"></i> Fasilitas Stasiun
                </h2>
                <div class="title-divider"></div>
                <div>
                    <label for="edit-facilities" class="block text-sm font-bold text-gray-700">Daftar
                        Fasilitas:</label>
                    <textarea id="edit-facilities" rows="5"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">{{ $station->facilities }}</textarea>
                </div>
            </div>

            <!-- Kartu 4: Fasilitas & Lokasi Terdekat -->
            <div class="bg-white rounded-xl shadow-md p-6">
                <h2 class="text-xl font-bold text-blue-600 flex items-center">
                    <i class="fas fa-map-marked-alt mr-2"></i> Fasilitas & Lokasi Terdekat
                </h2>
                <div class="title-divider"></div>
                <div>
                    <label for="edit-nearby-facilities" class="block text-sm font-bold text-gray-700">Daftar
                        Fasilitas & Lokasi:</label>
                    <textarea id="edit-nearby-facilities" rows="5"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">{{ $station->nearby_facilities }}</textarea>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Section Baru: Kereta Api yang Berhenti -->
<div class="bg-white rounded-xl shadow-md p-6 mt-8">
    <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-gray-900">Kereta Api yang Berhenti</h2>
        @if(auth()->user()->role != 'station_master' || (auth()->user()->role == 'station_master' &&
        auth()->user()->station_id == $station->id))
        <div id="train-edit-buttons-container" class="flex space-x-2">
            <a href="{{ route('train') }}"
                class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Edit
                Data</a>
        </div>
        @endif
    </div>

    <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        No. KA</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nama KA</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rute</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Jam Datang</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Jam Berangkat</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200" id="stopping-trains-table-body">
                @foreach ($stoppingTrains as $train)
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ $train->number }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ $train->name }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ $train->route }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ $train->arrival_time }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ $train->departure_time }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    <div id="add-train-row-container" class="mt-4 text-center hidden">
        <button id="add-train-row-btn"
            class="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Tambah
            Baris</button>
    </div>
</div>
@endsection

@push('scripts')
<script src="{{ asset('assets/js/profile.js') }}"></script>
@endpush
