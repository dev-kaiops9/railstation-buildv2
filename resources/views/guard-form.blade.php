@extends('layouts.app')

@section('content')
<div class="bg-white rounded-xl shadow-md p-6 mb-8">
    <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 class="text-2xl font-bold text-gray-900">Penjagaan Bentuk - Bentuk</h1>
        @if(auth()->user()->role != 'station_master' || (auth()->user()->role == 'station_master' && auth()->user()->station_id == $station->id))
        <div id="penjagaan-bentuk-edit-buttons-container" class="flex space-x-2">
            <button id="penjagaan-bentuk-edit-btn" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">
                Edit Data
            </button>
            <button id="penjagaan-bentuk-save-btn" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300 hidden">
                Simpan
            </button>
            <button id="penjagaan-bentuk-cancel-btn" class="bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300 hidden">
                Batal
            </button>
        </div>
        @endif
    </div>

    <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 border">
            <thead class="bg-blue-600 text-white">
                <tr>
                    <th rowspan="2"
                        class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider align-middle">TANGGAL
                    </th>
                    <th colspan="4" class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">NO BENTUK
                    </th>
                    <th rowspan="2"
                        class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider align-middle">CATATAN
                    </th>
                    <th rowspan="2" id="penjagaan-bentuk-opsi-header"
                        class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider align-middle hidden">
                        Opsi</th>
                </tr>
                <tr>
                    <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">PTP</th>
                    <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">BH</th>
                    <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">BK</th>
                    <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">MS</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200" id="penjagaan-bentuk-table-body">
                <!-- Data will be populated by JavaScript -->
            </tbody>
        </table>
    </div>
    <div id="add-penjagaan-bentuk-row-container" class="mt-4 text-center hidden">
        <button id="add-penjagaan-bentuk-row-btn"
            class="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Tambah
            Baris</button>
    </div>

    <x-pagination :paginationId="'guard-form'"/>
</div>
@endsection

@push('scripts')
<script src="{{ asset('assets/js/guard-form.js') }}"></script>
@endpush
