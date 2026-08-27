@extends('layouts.app')

@section('content')
<div class="bg-white rounded-xl shadow-md p-6 mb-8">
    <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 class="text-2xl font-bold text-gray-900">Penggunaan KR dan SM</h1>
        <div id="krsm-usage-edit-buttons-container-1" class="flex space-x-2">
            <button id="krsm-usage-edit-btn-1"
                class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Edit
                Data</button>
            <button id="krsm-usage-save-btn-1"
                class="bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300 hidden">Simpan</button>
            <button id="krsm-usage-cancel-btn-1"
                class="bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300 hidden">Batal</button>
        </div>
    </div>

    <!-- Pihak A Section -->
    <div class="mb-4 text-sm">
        <label for="pihak-stasiun-input-1" class="font-semibold text-gray-700">Pihak Stasiun : </label>
        <span id="pihak-stasiun-view-1" class="text-gray-900">A</span>
        <input type="hidden" id="pihak-stasiun-input-1" value="A">
    </div>

    <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 border">
            <thead class="bg-blue-600 text-white">
                <tr>
                    <th rowspan="2"
                        class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider align-middle">NO.</th>
                    <th rowspan="2"
                        class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider align-middle">TANGGAL
                    </th>
                    <th colspan="3" class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">COUNTER
                        KR 1</th>
                    <th colspan="3" class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">COUNTER
                        SM 1</th>
                    <th rowspan="2" id="krsm-usage-opsi-header-1"
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
            <tbody class="bg-white divide-y divide-gray-200" id="krsm-usage-table-body-1">
                <!-- Data will be populated by JavaScript -->
            </tbody>
        </table>
    </div>

    <div id="add-krsm-usage-row-container-1" class="mt-4 text-center hidden">
        <button id="add-krsm-usage-row-btn-1"
            class="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Tambah
            Baris</button>
    </div>

    <hr class="my-8 border-t-2 border-gray-300">

    <!-- Pihak B Section -->
    <div class="flex justify-end items-center mb-6 flex-wrap gap-4">
        <div id="krsm-usage-edit-buttons-container-2" class="flex space-x-2">
            <button id="krsm-usage-edit-btn-2"
                class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Edit
                Data</button>
            <button id="krsm-usage-save-btn-2"
                class="bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300 hidden">Simpan</button>
            <button id="krsm-usage-cancel-btn-2"
                class="bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300 hidden">Batal</button>
        </div>
    </div>

    <div class="mb-4 text-sm">
        <label for="pihak-stasiun-input-2" class="font-semibold text-gray-700">Pihak Stasiun : </label>
        <span id="pihak-stasiun-view-2" class="text-gray-900">B</span>
        <input type="hidden" id="pihak-stasiun-input-2" value="B">
    </div>

    <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 border">
            <thead class="bg-blue-600 text-white">
                <tr>
                    <th rowspan="2"
                        class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider align-middle">NO.</th>
                    <th rowspan="2"
                        class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider align-middle">TANGGAL
                    </th>
                    <th colspan="3" class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">COUNTER
                        KR 1</th>
                    <th colspan="3" class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">COUNTER
                        SM 1</th>
                    <th rowspan="2" id="krsm-usage-opsi-header-2"
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
            <tbody class="bg-white divide-y divide-gray-200" id="krsm-usage-table-body-2">
                <!-- Data will be populated by JavaScript -->
            </tbody>
        </table>
    </div>

    <div id="add-krsm-usage-row-container-2" class="mt-4 text-center hidden">
        <button id="add-krsm-usage-row-btn-2"
            class="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Tambah
            Baris</button>
    </div>

</div>
@endsection

@push('scripts')
<script src="{{ asset('assets/js/krsm-usage.js') }}"></script>
@endpush

