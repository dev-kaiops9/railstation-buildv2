@extends('layouts.app')

@section('content')
<div class="bg-white rounded-xl shadow-md p-6 mb-8">
    <h1 class="text-2xl font-bold text-gray-900 mb-4">Data Perjalanan Kereta Api</h1>
    <p class="text-gray-700">Informasi real-time kedatangan dan keberangkatan kereta api.</p>
</div>

<!-- Timeline Section -->
<section class="timeline-section">
    <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-gray-900">Timeline Perjalanan</h2>
        <span id="current-time-display" class="text-gray-500 text-sm">Waktu saat ini: --:--:--</span>
    </div>
    <div class="timeline">
        <div class="timeline-inner">
            <div class="timeline-hours"></div>
            <div class="timeline-minutes"></div>
            <div class="timeline-now" id="timeline-now" data-current-time=""></div>
            <div class="timeline-trains" id="timeline-trains"></div>
        </div>
    </div>
</section>

<!-- Table Section -->
<section class="table-section">
    <div class="flex justify-between items-center mb-4 flex-wrap">
        <h2 class="text-xl font-semibold text-gray-900 mb-2">Daftar Perjalanan</h2>
        <div class="flex items-center mb-4 gap-4">
            @if(auth()->user()->role != 'station_master' || (auth()->user()->role == 'station_master' &&
                    auth()->user()->station_id == $station->id))
            <div id="perka-edit-buttons-container" class="flex space-x-2">
                <button id="perka-edit-btn"
                    class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300 w-full">Edit</button>
                <button id="perka-save-btn"
                    class="bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300 hidden">Simpan</button>
                <button id="perka-cancel-btn"
                    class="bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300 hidden">Batal</button>
            </div>
            @endif
            <div class="search-box mt-4 md:mt-0">
                <i class="fas fa-search"></i>
                <input type="text" id="search-train" placeholder="Cari KA, rute...">
            </div>
        </div>
    </div>
    <div class="train-table-container">
        <table class="train-table min-w-full divide-y divide-gray-200 border border-gray-300">
            <thead class="bg-blue-600 text-white">
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. KA
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama KA
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rute</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jam
                        Datang</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jam
                        Berangkat</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jalur
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status
                    </th>
                    <th id="perka-opsi-header"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden">
                        Opsi</th>
                </tr>
            </thead>
            <tbody id="train-table-body" class="bg-white divide-y divide-gray-200">
                <!-- Data will be populated by JavaScript -->
            </tbody>
        </table>
    </div>
    <div id="add-perka-row-container" class="mt-4 text-center hidden">
        <button id="add-perka-row-btn"
            class="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Tambah
            Baris</button>
    </div>
</section>

<!-- Emplasemen Section -->
<div class="grid grid-cols-1 gap-8 mb-8">
    <div class="bg-white rounded-xl shadow-md p-6">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold text-gray-900">Gambar Emplasemen</h2>
            @if(auth()->user()->role != 'station_master' || (auth()->user()->role == 'station_master' &&
                    auth()->user()->station_id == $station->id))
            <div id="emplasemen-edit-buttons-container" class="flex space-x-2">
                <button id="emplasemen-edit-btn"
                    class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Edit</button>
                <button id="emplasemen-save-btn"
                    class="bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300 hidden">Simpan</button>
                <button id="emplasemen-cancel-btn"
                    class="bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300 hidden">Batal</button>
            </div>
            @endif
        </div>
        <div id="emplasemen-view-mode">
            @php
                $file = $station->emplasemen;
                $ext = $file ? pathinfo($file, PATHINFO_EXTENSION) : null;
            @endphp

            @if($file && in_array($ext, ['jpg','jpeg','png']))
                <img id="emplasemen-image"
                    src="{{ asset($file) }}"
                    class="w-full h-auto rounded-lg object-contain">
            @elseif($file && $ext == 'pdf')
                <iframe 
                    src="{{ asset($file) }}" 
                    width="100%" 
                    height="500px"
                    class="rounded-lg">
                </iframe>
            @else
                <img src="https://placehold.co/800x400/E0E7FF/1E40AF?text=Gambar+Emplasemen"
                    class="w-full h-auto rounded-lg">
            @endif
        </div>
        <div id="emplasemen-edit-mode" class="hidden">
        @php
            $file = $station->emplasemen;
            $ext = $file ? pathinfo($file, PATHINFO_EXTENSION) : null;
        @endphp

        <!-- 🔥 TAMBAHKAN CONTAINER DI SINI -->
        <div id="emplasemen-preview-container">
            @if($file && in_array($ext, ['jpg','jpeg','png']))
                <img id="emplasemen-image-preview"
                    src="{{ asset($file) }}"
                    class="w-full h-auto rounded-lg mb-4 object-contain">
            @elseif($file && $ext == 'pdf')
                <iframe 
                    src="{{ asset($file) }}" 
                    width="100%" 
                    height="400px"
                    class="rounded-lg mb-4">
                </iframe>
            @else
                <img src="https://placehold.co/800x400/E0E7FF/1E40AF?text=Preview"
                    class="w-full h-auto rounded-lg mb-4">
            @endif
        </div>

        <input type="file" id="emplasemen-upload" accept=".jpg,.jpeg,.png,.pdf"
            class="block w-full text-sm text-gray-500 ...">
    </div>
                
        </div>
    </div>
</div>

<!-- Jalur Info Section -->
<section class="jalur-info-section">
    <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-gray-900">Informasi Jalur</h2>
        @if(auth()->user()->role != 'station_master' || (auth()->user()->role == 'station_master' &&
                    auth()->user()->station_id == $station->id))
        <div id="jalur-edit-buttons-container" class="flex space-x-2">
            <button id="jalur-edit-btn"
                class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Edit</button>
            <button id="jalur-save-btn"
                class="bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300 hidden">Simpan</button>
            <button id="jalur-cancel-btn"
                class="bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300 hidden">Batal</button>
        </div>
        @endif
    </div>
    <div class="mb-4">
        <label for="jalur-mulai-berlaku" class="text-sm font-semibold text-gray-700">Mulai Berlaku :
        </label>
        <input type="text" id="mulai-berlaku-text"
            class="p-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            value="{{ $station->track_validity_period }}" readonly>
        <input type="date" id="mulai-berlaku-date"
            class="p-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm hidden"
            value="{{ $station->track_validity_period ? \Carbon\Carbon::parse($station->track_validity_period)->format('Y-m-d') : '' }}">
    </div>
    <div class="jalur-table-container">
        <table class="jalur-table min-w-full divide-y divide-gray-200 border border-gray-300">
            <thead>
                <tr class="bg-blue-600 text-white">
                    <th rowspan="2"
                        class="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider align-middle">Jalur
                    </th>
                    <th rowspan="2"
                        class="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider align-middle">Panjang
                    </th>
                    <th rowspan="2"
                        class="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider align-middle">Efektif
                    </th>
                    <th colspan="5"
                        class="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider align-middle">
                        Kapasitas</th>
                    <th rowspan="2"
                        class="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider align-middle">JENIS</th>
                    <th rowspan="2"
                        class="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider align-middle hidden"
                        id="jalur-opsi-header">Opsi</th>
                </tr>
                <tr class="bg-blue-600 text-white">
                    <th class="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider">Kereta</th>
                    <th class="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider">GB</th>
                    <th class="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider">GD</th>
                    <th class="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider">GT</th>
                    <th class="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider">GK</th>
                </tr>
            </thead>
            <tbody id="jalur-table-body">
                <!-- Data will be populated by JavaScript -->
            </tbody>
        </table>
    </div>
    <div id="add-jalur-row-container" class="mt-4 text-center hidden">
        <button id="add-jalur-row-btn"
            class="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Tambah
            Baris</button>
    </div>
    <div class="mt-6">
        <p class="font-semibold text-gray-700">Keterangan :</p>
        <div class="mt-1 p-3 border border-gray-200 rounded-md bg-gray-50 text-sm text-gray-800">
            <div class="flex space-x-8">
                <div>
                    <p class="whitespace-nowrap"><strong>CC201, 203, 204 :</strong> 15.214 mm</p>
                    <p class="whitespace-nowrap"><strong>CC202, 205 :</strong> 18.942 mm</p>
                    <p class="whitespace-nowrap"><strong>CC206 :</strong> 15.849mm</p>
                </div>
                <div>
                    <p class="whitespace-nowrap"><strong>KERETA :</strong> 21.000 mm</p>
                    <p class="whitespace-nowrap"><strong>GD :</strong> 14.700 mm</p>
                    <p class="whitespace-nowrap"><strong>GB, GT :</strong> 13.200 mm</p>
                    <p class="whitespace-nowrap"><strong>GK :</strong> 12.500 mm</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Daftar Jalur Section -->
<section class="table-section mt-8">
    <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-gray-900">Daftar Jalur yang Harus Dilalui</h2>
        @if(auth()->user()->role != 'station_master' || (auth()->user()->role == 'station_master' &&
                    auth()->user()->station_id == $station->id))
        <div id="jalur-dilalui-edit-buttons-container" class="flex space-x-2">
            <button id="jalur-dilalui-edit-btn"
                class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Edit</button>
            <button id="jalur-dilalui-save-btn"
                class="bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300 hidden">Simpan</button>
            <button id="jalur-dilalui-cancel-btn"
                class="bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300 hidden">Batal</button>
        </div>
        @endif
    </div>
    <div class="train-table-container">
        <table class="train-table" id="jalur-dilalui-table">
            <thead id="jalur-dilalui-table-head">
                <tr class="bg-blue-600 text-white">
                    <th rowspan="2"
                        class="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider align-middle">JALUR
                    </th>
                    <th rowspan="2"
                        class="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider align-middle">NOMOR KA
                    </th>
                    <th colspan="2" class="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider">JAM</th>
                    <th colspan="2" class="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider">JURUSAN
                    </th>
                    <th rowspan="2"
                        class="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider align-middle hidden"
                        id="jalur-dilalui-opsi-header">Opsi</th>
                </tr>
                <tr class="bg-blue-600 text-white">
                    <th class="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider">DATANG</th>
                    <th class="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider">BERANGKAT</th>
                    <th class="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider">DARI</th>
                    <th class="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider">KE</th>
                </tr>
            </thead>
            <tbody id="jalur-dilalui-table-body">
                <!-- Data will be populated by JavaScript -->
            </tbody>
        </table>
    </div>
    <div id="add-jalur-dilalui-row-container" class="mt-4 text-center hidden">
        <button id="add-jalur-dilalui-row-btn"
            class="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Tambah
            Baris</button>
    </div>
</section>
@endsection

@push('scripts')
<script src="{{ asset('assets/js/train.js') }}"></script>
@endpush
