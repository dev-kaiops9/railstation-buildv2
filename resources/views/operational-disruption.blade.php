@extends('layouts.app')

@section('content')
<div class="bg-white rounded-xl shadow-md p-6 mb-8">
    <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 class="text-2xl font-bold text-gray-900">Laporan Gangguan Operasional</h1>
        @if(auth()->user()->role != 'station_master' || (auth()->user()->role == 'station_master' &&
                    auth()->user()->station_id == $station->id))
        <div id="operational-disruption-edit-buttons-container" class="flex space-x-2">
            <button id="operational-disruption-edit-btn"
                class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Edit
                Data</button>
            <button id="operational-disruption-save-btn"
                class="bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300 hidden">Simpan</button>
            <button id="operational-disruption-cancel-btn"
                class="bg-gray-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-gray-600 transition-colors duration-300 hidden">Batal</button>
        </div>
        @endif
    </div>

    <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 border">
            <thead class="bg-blue-600 text-white">
                <tr>
                    <th rowspan="2"
                        class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider align-middle">Tanggal
                    </th>
                    <th rowspan="2"
                        class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider align-middle">Jenis
                        Gangguan</th>
                    <th colspan="3" class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">Tindak
                        Lanjut</th>
                    <th rowspan="2"
                        class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider align-middle">Petugas
                    </th>
                    <th rowspan="2" id="operational-disruption-opsi-header"
                        class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider align-middle hidden">
                        Opsi</th>
                </tr>
                <tr>
                    <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">Lapor Ke</th>
                    <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">Jam</th>
                    <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">Penanganan Gangguan
                    </th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200" id="operational-disruption-table-body">
                <!-- Data will be populated by JavaScript -->
            </tbody>
        </table>
    </div>
    <div id="add-operational-disruption-row-container" class="mt-4 text-center hidden">
        <button id="add-operational-disruption-row-btn"
            class="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Tambah
            Baris</button>
    </div>

    <x-pagination :paginationId="'operational-disruption'"/>
</div>
@endsection

@push('scripts')
<script src="{{ asset('assets/js/operational-disruption.js') }}"></script>
@endpush
