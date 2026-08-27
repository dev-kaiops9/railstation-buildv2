@extends('layouts.app')

@section('content')
<div class="bg-white rounded-xl shadow-md p-6 mb-8">
    <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 class="text-2xl font-bold text-gray-900">Penggunaan KR dan SM</h1>
        @if((auth()->user()->role != 'station_master' || (auth()->user()->role == 'station_master' && auth()->user()->station_id == $station->id)) && $pihakA)
        <div id="krsm-edit-buttons-container-A" class="flex space-x-2">
            <button id="krsm-edit-btn-A"
                class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Edit
                Data</button>
            <button id="krsm-save-btn-A"
                class="bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300 hidden">Simpan</button>
            <button id="krsm-cancel-btn-A"
                class="bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300 hidden">Batal</button>
        </div>
        @endif
    </div>

    @if($pihakA)
    <div id="pihakA">
        <div class="mb-4 text-sm">
            <label for="pihak-stasiun-input-A" class="font-semibold text-gray-700">Pihak Stasiun : </label>
            <span id="pihak-stasiun-view-A" class="text-gray-900"></span>
            <input type="text" id="pihak-stasiun-input-A" class="p-1 border border-gray-300 rounded-md shadow-sm hidden">
        </div>
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 border border-gray-300">
                <thead class="bg-blue-600 text-white">
                    <tr>
                        <th rowspan="2"
                            class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider align-middle">TANGGAL
                        </th>
                        <th colspan="3" class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">COUNTER
                            KR 1</th>
                        <th colspan="3" class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">COUNTER
                            SM 1</th>
                        <th rowspan="2" id="krsm-opsi-header-A"
                            class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider align-middle hidden">
                            Opsi</th>
                    </tr>
                    <tr>
                        <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">AWAL</th>
                        <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">AKHIR</th>
                        <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">KETERANGAN</th>
                        <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">AWAL</th>
                        <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">AKHIR</th>
                        <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">KETERANGAN</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200" id="krsm-table-body-A">
                    <!-- Data will be populated by JavaScript -->
                </tbody>
            </table>
        </div>
        <div id="add-krsm-row-container-A" class="mt-4 text-center hidden">
            <button id="add-krsm-row-btn-A"
                class="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Tambah
                Baris</button>
        </div>

        <x-pagination :paginationId="'krsm-a'" />
    </div>
    @endif

    <hr class="my-8 border-t-2 border-gray-300">

    @if($pihakB)
    <div id="pihakB">
        <div class="flex justify-end items-center mb-6 flex-wrap gap-4">
            @if((auth()->user()->role != 'station_master' || (auth()->user()->role == 'station_master' && auth()->user()->station_id == $station->id)) && $pihakB)
            <div id="krsm-edit-buttons-container-B" class="flex space-x-2">
                <button id="krsm-edit-btn-B"
                    class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Edit
                    Data</button>
                <button id="krsm-save-btn-B"
                    class="bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300 hidden">Simpan</button>
                <button id="krsm-cancel-btn-B"
                    class="bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300 hidden">Batal</button>
            </div>
            @endif
        </div>
        <div class="mb-4 text-sm">
            <label for="pihak-stasiun-input-B" class="font-semibold text-gray-700">Pihak Stasiun : </label>
            <span id="pihak-stasiun-view-B" class="text-gray-900"></span>
            <input type="text" id="pihak-stasiun-input-B" class="p-1 border border-gray-300 rounded-md shadow-sm hidden">
        </div>
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 border">
                <thead class="bg-blue-600 text-white">
                    <tr>
                        <th rowspan="2"
                            class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider align-middle">TANGGAL
                        </th>
                        <th colspan="3" class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">COUNTER
                            KR 1</th>
                        <th colspan="3" class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">COUNTER
                            SM 1</th>
                        <th rowspan="2" id="krsm-opsi-header-B"
                            class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider align-middle hidden">
                            Opsi</th>
                    </tr>
                    <tr>
                        <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">AWAL</th>
                        <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">AKHIR</th>
                        <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">KETERANGAN</th>
                        <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">AWAL</th>
                        <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">AKHIR</th>
                        <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">KETERANGAN</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200" id="krsm-table-body-B">
                    <!-- Data will be populated by JavaScript -->
                </tbody>
            </table>
        </div>
        <div id="add-krsm-row-container-B" class="mt-4 text-center hidden">
            <button id="add-krsm-row-btn-B"
                class="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Tambah
                Baris</button>
        </div>

        <x-pagination :paginationId="'krsm-b'" />
    </div>
    @endif

</div>
@endsection

@push('scripts')
<script src="{{ asset('assets/js/krsm.js') }}"></script>
@endpush
