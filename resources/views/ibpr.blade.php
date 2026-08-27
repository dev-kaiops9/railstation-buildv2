@extends('layouts.app')

@section('content')
<div class="bg-white rounded-xl shadow-md p-6 mb-8">
    <div class="flex justify-between items-center mb-6 flex-wrap gap-4">

    <h1 class="text-2xl font-bold text-gray-900">
        Identifikasi Bahaya dan Penilaian Risiko (IBPR)
    </h1>

        <div class="flex items-center space-x-2 flex-wrap">

            <!-- Upload Excel -->
            <form action="{{ route('ibpr.import') }}" method="POST" enctype="multipart/form-data" class="flex items-center space-x-2">
                @csrf

                <input type="file" name="file"
                    class="border rounded-lg px-2 py-1 text-sm"
                    required>

                <button type="submit"
                    class="bg-purple-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-purple-600 transition-colors duration-300">
                    Upload Excel
                </button>
            </form>

            @if(auth()->user()->role != 'station_master' || (auth()->user()->role == 'station_master' &&
                        auth()->user()->station_id == $station->id))

            <div id="ibpr-edit-buttons-container" class="flex space-x-2">

                <button id="ibpr-edit-btn"
                    class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">
                    Edit Data
                </button>

                <button id="ibpr-save-btn"
                    class="bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300 hidden">
                    Simpan
                </button>

                <button id="ibpr-cancel-btn"
                    class="bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300 hidden">
                    Batal
                </button>

            </div>

            @endif
        </div>

    </div>
    <div class="flex flex-wrap gap-3 mb-4">

    <input type="text" id="search"
    placeholder="Cari bahaya, risiko, penanggung jawab..."
    class="border rounded-lg px-3 py-2 text-sm">

    <select id="filter_probability" class="border rounded-lg px-3 py-2">
    <option value="">Probabilitas</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    </select>

    <select id="filter_impact" class="border rounded-lg px-3 py-2">
    <option value="">Dampak</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    </select>

    <select id="filter_effectiveness" class="border rounded-lg px-3 py-2">
    <option value="">Efektivitas</option>
    <option value="tinggi">Tinggi</option>
    <option value="sedang">Sedang</option>
    <option value="rendah">Rendah</option>
    </select>

    <button id="export-btn"
    class="bg-red-500 text-white px-4 py-2 rounded-lg">
    Export PDF
    </button>

    </div>
    <div class="ibpr-table-container">
        <table class="ibpr-table">
            <thead class="bg-blue-600 text-white">
                <tr>
                    <th rowspan="3">
                        <input type="checkbox" id="select-all">
                    </th>
                    <th colspan="2">Identifikasi Bahaya</th>
                    <th colspan="6">Kontrol yang Ada</th>
                    <th colspan="4">Penilaian Risiko</th>
                    <th colspan="4">Rencana Tindak Lanjut</th>
                    <th colspan="3">Penilaian Risiko Setelah Tindak Lanjut</th>
                    <th rowspan="3" id="ibpr-opsi-header" class="hidden">Opsi</th>
                </tr>
                <tr>
                    <th rowspan="2">ID</th>
                    <th rowspan="2">Bahaya</th>
                    <th rowspan="2">Penjelasan Kontrol</th>
                    <th rowspan="2">Referensi</th>
                    <th colspan="3">Efektivitas</th>
                    <th rowspan="2">Posisi Penanggung Jawab</th>
                    <th rowspan="2">Penjelasan Risiko</th>
                    <th rowspan="2">Probabilitas</th>
                    <th rowspan="2">Dampak</th>
                    <th rowspan="2">Nilai Risiko</th>
                    <th rowspan="2">Penjelasan Rencana Tindak Lanjut</th>
                    <th rowspan="2">Referensi</th>
                    <th rowspan="2">Posisi Penanggung Jawab</th>
                    <th rowspan="2">Tanggal Selesai</th>
                    <th rowspan="2">Probabilitas</th>
                    <th rowspan="2">Dampak</th>
                    <th rowspan="2">Nilai Risiko</th>
                </tr>
                <tr>
                    <th class="efektivitas">Tinggi</th>
                    <th class="efektivitas">Sedang</th>
                    <th class="efektivitas">Rendah</th>
                </tr>
            </thead>
            <tbody id="ibpr-table-body">
                <!-- Data will be populated by JavaScript -->
            </tbody>
        </table>
    </div>
    <div id="add-ibpr-row-container" class="mt-4 text-center hidden">
        <button id="add-ibpr-row-btn"
            class="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Tambah
            Baris</button>
    </div>

    <x-pagination :paginationId="'ibpr'" />
</div>
@endsection

@push('scripts')
<script src="{{ asset('assets/js/ibpr.js') }}"></script>
@endpush
