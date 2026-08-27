@extends('layouts.app')

@section('content')
<div id="pegawai-list-view">
    <div class="bg-white rounded-xl shadow-md p-6 mb-8">
        <div class="flex justify-between items-center mb-4">
            <h1 class="text-2xl font-bold text-gray-900">Data Pegawai</h1>
        </div>
        <p class="text-gray-700">Ini adalah halaman data pegawai. Di sini Anda bisa mengelola daftar pegawai.</p>

        <!-- Card Grid untuk Ringkasan Pegawai -->
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 my-4" id="position-cards">
            <div class="bg-white rounded-xl shadow-md p-4 text-center">
                <div class="inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
                    <div class="text-center">
                        <i class="fas fa-spinner fa-spin text-3xl text-blue-500 mb-2"></i>
                        <p class="text-gray-600">Memuat data...</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-xl shadow-md p-6">
            @if(auth()->user()->role != 'station_master' || (auth()->user()->role == 'station_master' &&
            auth()->user()->station_id == $station->id))
            <div class="flex justify-end">
                <div id="main-employee-edit-buttons" class="flex space-x-2">
                    <button id="main-employee-edit-btn"
                        class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Edit
                        Data</button>
                    <button id="main-employee-save-btn"
                        class="bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300 hidden">Simpan</button>
                    <button id="main-employee-cancel-btn"
                        class="bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300 hidden">Batal</button>
                </div>
            </div>
            @endif

            <div class="mt-4 overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200 border border-gray-300">
                    <thead class="bg-blue-600 text-white">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Nama</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                NIPP</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Jabatan</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Unit</th>
                            <th id="options-header" scope="col"
                                class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider hidden">Opsi
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200" id="employee-table-body">
                    </tbody>
                </table>
            </div>

            <!-- Tombol Tambah Pegawai (Tersembunyi secara default) -->
            <div id="add-employee-row-container" class="mt-8 text-center hidden">
                <button id="add-employee-row-btn"
                    class="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Tambah
                    Pegawai</button>
            </div>

            <x-pagination :paginationId="'employee'" />
        </div>

        <div class="bg-white rounded-xl shadow-md p-6 mt-12 mb-8 w-full" id="duty-roster-view">
            <div class="flex justify-between items-center mb-2">
                <div class="flex items-center space-x-4">
                    <h2 class="text-2xl font-bold text-gray-900">Daftar Dinasan</h2>
                </div>
                @if(auth()->user()->role != 'station_master' || (auth()->user()->role == 'station_master' &&
                auth()->user()->station_id == $station->id))
                <div id="duty-roster-action-buttons" class="flex space-x-2"></div>
                @endif
            </div>
            <div id="duty-roster-filter" class="mb-4"></div>

            <div id="duty-roster-container" class="relative">
                <!-- Content loaded by JavaScript -->
            </div>

            <div id="duty-roster-pagination" class="mt-6"></div>
        </div>

        <!-- Bagian Sertifikasi dan Tanda Kecakapan -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <!-- Kartu Data Sertifikasi -->
            <div class="bg-white rounded-xl shadow-md p-6">
                <h2 class="text-xl font-bold text-gray-900 mb-4 text-center">Data Sertifikasi</h2>
                <div class="flex flex-col items-center justify-center">
                    <div class="chart-circle"
                        style="background-image: conic-gradient(#22C55E 0% {{ $certificationStatus['percentage'] }}%, #EF4444 {{ $certificationStatus['percentage'] }}% 100%);">                        <span class="chart-text">{{ $certificationStatus['percentage'] }}%</span>
                    </div>
                    <div class="flex justify-center space-x-8 mt-4">
    
                        <div class="flex items-center space-x-2">
                            <span class="w-3 h-3 bg-green-500 rounded-sm"></span>
                            <p class="text-gray-700 text-sm">Aktif</p>
                            <p class="text-gray-900 text-lg font-bold">{{ $certificationStatus['Aktif'] }}</p>
                        </div>

                        <div class="flex items-center space-x-2">
                            <span class="w-3 h-3 bg-red-500 rounded-sm"></span>
                            <p class="text-gray-700 text-sm">Nonaktif</p>
                            <p class="text-gray-900 text-lg font-bold">{{ $certificationStatus['Nonaktif'] }}</p>
                        </div>

                    </div>
                </div>
            </div>

            <!-- Kartu Data Tanda Kecakapan -->
            <div class="bg-white rounded-xl shadow-md p-6">
                <h2 class="text-xl font-bold text-gray-900 mb-4 text-center">Data Tanda Kecakapan</h2>
                <div class="flex flex-col items-center justify-center">
                    <div class="chart-circle"
                        style="background-image: conic-gradient(#22C55E 0% {{ $certificationStatus['percentage'] }}%, #EF4444 {{ $certificationStatus['percentage'] }}% 100%);">                        <span class="chart-text">{{ $skillStatus['percentage'] }}%</span>
                    </div>
                    <div class="flex justify-center space-x-8 mt-4">
    
                        <div class="flex items-center space-x-2">
                            <span class="w-3 h-3 bg-green-500 rounded-sm"></span>
                            <p class="text-gray-700 text-sm">Aktif</p>
                            <p class="text-gray-900 text-lg font-bold">{{ $skillStatus['Aktif'] }}</p>
                        </div>

                        <div class="flex items-center space-x-2">
                            <span class="w-3 h-3 bg-red-500 rounded-sm"></span>
                            <p class="text-gray-700 text-sm">Nonaktif</p>
                            <p class="text-gray-900 text-lg font-bold">{{ $skillStatus['Nonaktif'] }}</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <!-- Tabel Kebutuhan dan Jam Kerja -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            <!-- Tabel Kebutuhan Pegawai -->
            <div class="bg-white rounded-xl shadow-md p-6">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-bold text-gray-900">Kebutuhan Pegawai</h2>
                    @if(auth()->user()->role != 'station_master' || (auth()->user()->role == 'station_master' &&
                    auth()->user()->station_id == $station->id))
                    <div id="kebutuhan-edit-buttons-container" class="flex space-x-2">
                        <button id="kebutuhan-edit-btn"
                            class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Edit</button>
                        <button id="kebutuhan-save-btn"
                            class="bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300 hidden">Simpan</button>
                        <button id="kebutuhan-cancel-btn"
                            class="bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300 hidden">Batal</button>
                    </div>
                    @endif
                </div>
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200 border border-gray-300" id="kebutuhan-table">
                        <thead class="bg-blue-600 text-white">
                            <tr>
                                <th class="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">Jabatan
                                </th>
                                <th class="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">Kebutuhan
                                </th>
                                <th class="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">Adanya</th>
                                <th class="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">Kurang</th>
                                <th class="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">Lebih</th>
                                <th class="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider hidden"
                                    id="kebutuhan-opsi-header">Opsi</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200" id="kebutuhan-table-body"></tbody>
                    </table>
                </div>
                <div id="add-kebutuhan-row-container" class="mt-4 text-center hidden">
                    <button id="add-kebutuhan-row-btn"
                        class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Tambah
                        Baris</button>
                </div>
            </div>

            <!-- Tabel Ikhtisar Jam Kerja -->
            <div class="bg-white rounded-xl shadow-md p-6">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-bold text-gray-900">Ikhtisar Jam Kerja (IJK)</h2>
                    @if(auth()->user()->role != 'station_master' || (auth()->user()->role == 'station_master' &&
                    auth()->user()->station_id == $station->id))
                    <div id="jamkerja-edit-buttons-container" class="flex space-x-2">
                        <button id="jamkerja-edit-btn"
                            class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Edit</button>
                        <button id="jamkerja-save-btn"
                            class="bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300 hidden">Simpan</button>
                        <button id="jamkerja-cancel-btn"
                            class="bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300 hidden">Batal</button>
                    </div>
                    @endif
                </div>
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-gray-200 border border-gray-300" id="jamkerja-table">
                        <thead class="bg-blue-600 text-white">
                            <tr>
                                <th class="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">Kode</th>
                                <th class="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">Dinas</th>
                                <th class="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">Mulai Dinas
                                </th>
                                <th class="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">Akhir Dinas
                                </th>
                                <th class="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                                <th class="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider hidden"
                                    id="jamkerja-opsi-header">Opsi</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200" id="jamkerja-table-body"></tbody>
                    </table>
                </div>
                <div id="add-jamkerja-row-container" class="mt-4 text-center hidden">
                    <button id="add-jamkerja-row-btn"
                        class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Tambah
                        Baris</button>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('modals')
<div id="move-employee-modal" class="login-modal hidden">
    <div class="modal-content">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-bold text-gray-900">Pindahkan Pegawai</h2>
            <button id="close-move-modal-btn" class="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
        </div>
        <form id="move-employee-form">
            <input type="hidden" id="move-employee-id">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                    Nama Pegawai
                </label>
                <input
                    class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 bg-gray-100 leading-tight focus:outline-none"
                    id="move-employee-name" type="text" readonly>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                    NIPP
                </label>
                <input
                    class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 bg-gray-100 leading-tight focus:outline-none"
                    id="move-employee-nipp" type="text" readonly>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                    Jabatan
                </label>
                <input
                    class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 bg-gray-100 leading-tight focus:outline-none"
                    id="move-employee-position" type="text" readonly>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                    Stasiun Lama
                </label>
                <input
                    class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 bg-gray-100 leading-tight focus:outline-none"
                    id="move-employee-old-station" value="{{ $station->name }}" type="text" readonly>
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="move-employee-new-station">
                    Pindahkan Ke Stasiun Baru
                </label>
                <select id="move-employee-new-station"
                    class="shadow border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500">
                </select>
            </div>
            <div class="flex items-center justify-end space-x-2">
                <button id="cancel-move-btn"
                    class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                    type="button">
                    Batal
                </button>
                <button id="save-move-btn"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                    type="button">
                    Simpan
                </button>
            </div>
        </form>
    </div>
</div>
@endsection

@push('scripts')
<script src="{{ asset('assets/js/duty-roster.js') }}"></script>
<script src="{{ asset('assets/js/employee.js') }}"></script>
@endpush
