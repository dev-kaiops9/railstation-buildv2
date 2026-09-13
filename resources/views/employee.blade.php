@extends('layouts.app')

@section('content')
<div id="pegawai-list-view" data-section="{{ request('section', 'employee') }}">
    <div class="tabs employee-tabs" aria-label="Menu data pegawai">
        <a href="{{ route('employee') }}" class="tab-btn {{ request('section', 'employee') === 'employee' ? 'active' : '' }}"><span class="tab-icon"><i class="fas fa-users"></i></span><span class="tab-copy"><span class="tab-title">Pegawai</span><span class="tab-desc">Data pegawai stasiun</span></span></a>
        <a href="{{ route('employee', ['section' => 'duty']) }}" class="tab-btn {{ request('section') === 'duty' ? 'active' : '' }}"><span class="tab-icon"><i class="fas fa-clock"></i></span><span class="tab-copy"><span class="tab-title">Jadwal Dinas</span><span class="tab-desc">Jadwal shift dan dinas pegawai</span></span></a>
        <a href="{{ route('employee', ['section' => 'certification']) }}" class="tab-btn {{ request('section') === 'certification' ? 'active' : '' }}"><span class="tab-icon"><i class="fas fa-award"></i></span><span class="tab-copy"><span class="tab-title">Sertifikasi & Kecakapan</span><span class="tab-desc">Sertifikat dan kompetensi pegawai</span></span></a>
        <a href="{{ route('employee', ['section' => 'ijk']) }}" class="tab-btn {{ request('section') === 'ijk' ? 'active' : '' }}"><span class="tab-icon"><i class="fas fa-clipboard"></i></span><span class="tab-copy"><span class="tab-title">IJK & Kebutuhan Pegawai</span><span class="tab-desc">Ikhtisar jam kerja dan kebutuhan pegawai</span></span></a>
    </div>
    <div class="bg-white rounded-xl shadow-md p-6 mb-8">
        <div class="flex justify-between items-center mb-4 employee-section-title">
            <h1 class="text-2xl font-bold text-gray-900">Data Pegawai</h1>
        </div>
        <p class="text-gray-700">Ini adalah halaman data pegawai. Di sini Anda bisa mengelola daftar pegawai.</p>
        <div id="employee-table-section" class="bg-white rounded-xl shadow-md p-6">
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
                                Foto</th><th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nama</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                NIPP</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Jabatan</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Unit</th><th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Grade</th>
                            <th id="options-header" scope="col" class="px-3 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                Opsi
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
        </div>
        
        <!-- Bagian Jadwal Dinas -->
        <div
            id="duty-roster-view"
            class="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8 mt-10 mb-8 mx-2 md:mx-4 w-auto">

        <!-- Header Jadwal Dinas -->
        <div class="flex justify-between items-start gap-4 mb-6 duty-roster-header">

        <div>
            <h2 class="text-2xl md:text-3xl font-bold text-gray-900">
                Daftar Dinasan
            </h2>

            <p class="text-sm text-gray-500 mt-1">
                Jadwal dinas pegawai berdasarkan bulan
            </p>
        </div>

            @if(auth()->user()->role != 'station_master' ||
                (auth()->user()->role == 'station_master' &&
                auth()->user()->station_id == $station->id))

                <div id="duty-roster-action-buttons"
                    class="flex-shrink-0">
                </div>

            @endif

        </div>

        <!-- Filter Bulan & Tahun -->
        <div
            id="duty-roster-filter"
            class="mb-6 flex justify-center md:justify-start">
        </div>

        <!-- Tabel Daftar Dinasan -->
        <div
            id="duty-roster-container"
            class="relative w-full overflow-x-auto">
        </div>

        <!-- Pagination -->
        <div
            id="duty-roster-pagination"
            class="mt-6">
        </div>
    </div>

        <!-- Bagian Sertifikasi dan Tanda Kecakapan -->
        <div id="certification-section"
            class="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8 mt-10 mb-8 mx-2 md:mx-4">

        <!-- HEADER -->
        <div class="mb-8">
            <h2 class="text-xl md:text-2xl font-semibold text-gray-900">
                Sertifikasi & Kecakapan
            </h2>

            <p class="text-xs text-gray-500 mt-1">
                Data sertifikasi dan tanda kecakapan pegawai
            </p>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div class="bg-gray-50 rounded-2xl border border-gray-200 p-5">

            <!-- HEADER CONTAINER -->
            <div class="flex justify-between items-center mb-5 gap-3">

                <div>
                    <h3 class="text-sm font-semibold text-gray-800 flex items-center gap-2">Sertifikasi</h3>
                    <p class="text-xs text-gray-500 mt-1">
                        Data sertifikasi pegawai
                    </p>
                </div>

                <button
                    type="button"
                    id="add-certification-btn"
                    class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300 whitespace-nowrap">
                    + Tambah
                </button>

            </div>


            <!-- TABLE -->
            <div class="overflow-x-auto bg-white border border-gray-200 rounded-xl">

                <table class="min-w-full">

                    <thead class="bg-gray-100">

                        <tr>

                            <th class="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                Foto
                            </th>

                            <th class="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                Nama
                            </th>

                            <th class="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                Jenis
                            </th>

                            <th class="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                Nomor
                            </th>

                            <th class="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                Berlaku
                            </th>

                            <th class="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                Status
                            </th>

                        </tr>

                    </thead>

                    <tbody id="certification-table-body"
                           class="divide-y divide-gray-100">
                    </tbody>

                </table>

            </div>

        </div>

        <div class="bg-gray-50 rounded-2xl border border-gray-200 p-5">

            <!-- HEADER CONTAINER -->
            <div class="flex justify-between items-center mb-5 gap-3">

                <div>
                    <h3 class="text-sm font-semibold text-gray-800 flex items-center gap-2">Kecakapan</h3>
                    <p class="text-xs text-gray-500 mt-1">
                        Data tanda kecakapan pegawai
                    </p>
                </div>

                <button
                    type="button"
                    id="add-skill-btn"
                    class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300 whitespace-nowrap">
                    + Tambah
                </button>

            </div>


            <!-- TABLE -->
            <div class="overflow-x-auto bg-white border border-gray-200 rounded-xl">

                <table class="min-w-full">

                    <thead class="bg-gray-100">

                        <tr>

                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                                Foto
                            </th>

                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                                Nama
                            </th>

                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                                Jenis
                            </th>

                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                                Nomor
                            </th>

                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                                Berlaku
                            </th>

                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                                Status
                            </th>

                        </tr>

                    </thead>

                    <tbody id="skill-table-body"
                           class="divide-y divide-gray-100">
                    </tbody>

                </table>

            </div>

        </div>

    </div>

</div>

        <!-- Tabel Kebutuhan dan Jam Kerja -->
        <div id="ijk-section" class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
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




