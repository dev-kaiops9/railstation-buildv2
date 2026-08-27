@extends('layouts.app')

@section('content')
<div class="bg-white rounded-xl shadow-md p-6 mb-8">
    <button
        class="mb-4 bg-gray-200 text-gray-700 py-2 px-4 rounded-full hover:bg-gray-300 transition-colors duration-300"
        onclick="window.location.href = '/employee';">
        <i class="fas fa-arrow-left mr-2"></i> Kembali
    </button>
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Detail Pegawai</h1>
        @if(auth()->user()->role != 'station_master' || (auth()->user()->role == 'station_master' && auth()->user()->station_id == $employee->station_id))
        <div id="employee-detail-edit-buttons-container" class="flex space-x-2">
            <button id="employee-detail-edit-btn"
                class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Edit
                Data</button>
            <button id="employee-detail-save-btn"
                class="bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300 hidden">Simpan</button>
            <button id="employee-detail-cancel-btn"
                class="bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300 hidden">Batal</button>
        </div>
        @endif
    </div> 

    <div id="employee-detail-view-mode">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-center">
            <div class="flex flex-col items-center justify-center">
    <img class="w-48 h-48 rounded-full object-cover shadow-lg"
    src="{{ $employee->photo_url ? asset('storage/'.$employee->photo_url) : 'https://placehold.co/192x192/D1D5DB/1F2937?text=Foto' }}">            </div>
            <div class="bg-gray-50 rounded-xl p-6 w-full max-w-sm lg:max-w-full text-center">
                <input type="hidden" id="employee-id" value="{{ $employee->id }}">
                <h2 id="employee-name" class="text-2xl font-bold text-gray-900">{{ $employee->name }}</h2>
                <p id="employee-position" class="text-gray-500 text-sm">{{ $employee->position }}</p>
                <div class="mt-4 space-y-2 text-left text-gray-700">
                    <p><strong>NIPP:</strong> {{ $employee->nipp }}</p>
                    <p><strong>Jenis Kelamin:</strong> {{ $employee->gender }}</p>
                    <p><strong>Tanggal Lahir:</strong> {{ $employee->dob }}</p>
                    <p><strong>Unit:</strong> {{ $employee->unit }}</p>
                    <p><strong>Stasiun:</strong> {{ $employee->station->name }}</p>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="w-full bg-gray-50 rounded-xl p-4 text-center">
                <h3 class="text-lg font-bold text-gray-900 mb-2">Kartu Sertifikasi</h3>
                <img id="cert-image-preview" class="w-full h-auto rounded-lg shadow-md"
                    src="{{ $employee->cert_image ? asset('storage/'.$employee->cert_image) : 'https://placehold.co/300x200/4B5563/FFFFFF?text=Sertifikasi' }}"
                    alt="Sertifikasi Pegawai">
                <div class="mt-4 space-y-2 text-left text-gray-700">
                    <p><strong>Jenis:</strong> {{ $employee->cert_type ?? '-' }}</p>
                    <p><strong>Nomor:</strong> {{ $employee->cert_number ?? '-' }}</p>
                    <p><strong>Masa Berlaku:</strong> {{ $employee->cert_expiry ?? '-' }}</p>
                    <p><strong>Status:</strong> <span
                            class="font-semibold {{ $employee->cert_status === 'Aktif' ? 'text-green-600' : 'text-red-600' }}">{{
                            $employee->cert_status ?? '-' }}</span></p>
                </div>
            </div>
            <div class="w-full bg-gray-50 rounded-xl p-4 text-center">
                <h3 class="text-lg font-bold text-gray-900 mb-2">Tanda Kecakapan</h3>
                <img id="skill-image-preview" class="w-full h-auto rounded-lg shadow-md"
                    src="{{ $employee->skill_image ? asset('storage/'.$employee->skill_image) : 'https://placehold.co/300x200/4B5563/FFFFFF?text=Tanda+Kecakapan' }}"
                    alt="Tanda Kecakapan Pegawai">
                <div class="mt-4 space-y-2 text-left text-gray-700">
                    <p><strong>Jenis:</strong> {{ $employee->skill_type ?? '-' }}</p>
                    <p><strong>Nomor:</strong> {{ $employee->skill_number ?? '-' }}</p>
                    <p><strong>Masa Berlaku:</strong> {{ $employee->skill_expiry ?? '-' }}</p>
                    <p><strong>Status:</strong> <span
                            class="font-semibold {{ $employee->skill_status === 'Aktif' ? 'text-green-600' : 'text-red-600' }}">{{
                            $employee->skill_status ?? '-' }}</span></p>
                </div>
            </div>
        </div>
    </div>

    <div id="employee-detail-edit-mode" class="hidden">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-center">
            <div class="flex flex-col items-center justify-center">
                <img id="employee-photo-edit-preview" class="w-48 h-48 rounded-full object-cover shadow-lg mb-4"
                    src="{{ $employee->photo_url ? asset('storage/'.$employee->photo_url) : 'https://placehold.co/192x192/D1D5DB/1F2937?text=Foto' }}"
                    alt="Foto Pegawai">
                <input type="file" id="employee-photo-upload" class="mb-4 text-sm text-gray-500">
            </div>
            <div class="bg-gray-50 rounded-xl p-6 w-full max-w-sm lg:max-w-full text-left space-y-2">
                <div>
                    <label for="edit-name" class="block text-sm font-bold text-gray-700">Nama:</label>
                    <input type="text" id="edit-name" value="{{ $employee->name }}"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                </div>
                <div>
                    <label for="edit-position" class="block text-sm font-bold text-gray-700">Jabatan:</label>
                    <input type="text" id="edit-position" value="{{ $employee->position }}"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                </div>
                <div>
                    <label for="edit-nipp" class="block text-sm font-bold text-gray-700">NIPP:</label>
                    <input type="text" id="edit-nipp" value="{{ $employee->nipp }}"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                </div>
                <div>
                    <label for="edit-gender" class="block text-sm font-bold text-gray-700">Jenis Kelamin:</label>
                    <select id="edit-gender" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                        <option value="Laki-laki" {{ $employee->gender === 'Laki-laki' ? 'selected' : '' }}>Laki-laki
                        </option>
                        <option value="Perempuan" {{ $employee->gender === 'Perempuan' ? 'selected' : '' }}>Perempuan
                        </option>
                    </select>
                </div>
                <div>
                    <label for="edit-dob" class="block text-sm font-bold text-gray-700">Tanggal Lahir:</label>
                    <input type="date" id="edit-dob" value="{{ $employee->dob }}"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                </div>
                <div>
                    <label for="edit-unit" class="block text-sm font-bold text-gray-700">Unit:</label>
                    <input type="text" id="edit-unit" value="{{ $employee->unit }}"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                </div>
                <div>
                    <label for="edit-station" class="block text-sm font-bold text-gray-700">Stasiun:</label>
                    <select id="edit-station" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                        @foreach ($stationData as $id => $name)
                        <option value="{{ $id }}" {{ $employee->station->name == $name ? 'selected' : '' }}>{{ $name
                            }}</option>
                        @endforeach
                    </select>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="w-full bg-gray-50 rounded-xl p-4 text-center">
                <h3 class="text-lg font-bold text-gray-900 mb-2">Kartu Sertifikasi</h3>
                <img id="cert-image-edit-preview" class="w-full h-auto rounded-lg shadow-md mb-2"
                    src="{{ $employee->cert_image ? asset('storage/'.$employee->cert_image) : 'https://placehold.co/300x200/4B5563/FFFFFF?text=Sertifikasi' }}"
                    alt="Sertifikasi Pegawai">
                <input type="file" id="cert-image-upload" class="mb-4 text-sm text-gray-500">
                <div class="mt-4 space-y-2 text-left text-gray-700">
                    <div>
                        <label for="edit-cert-type" class="block text-sm font-bold text-gray-700">Jenis:</label>
                        <input type="text" id="edit-cert-type" value="{{ $employee->cert_type }}"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                    </div>
                    <div>
                        <label for="edit-cert-number" class="block text-sm font-bold text-gray-700">Nomor:</label>
                        <input type="text" id="edit-cert-number" value="{{ $employee->cert_number }}"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                    </div>
                    <div>
                        <label for="edit-cert-expiry" class="block text-sm font-bold text-gray-700">Masa
                            Berlaku:</label>
                        <input type="date" id="edit-cert-expiry" value="{{ $employee->cert_expiry }}"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                    </div>
                </div>
            </div>
            <div class="w-full bg-gray-50 rounded-xl p-4 text-center">
                <h3 class="text-lg font-bold text-gray-900 mb-2">Tanda Kecakapan</h3>
                <img id="skill-image-edit-preview" class="w-full h-auto rounded-lg shadow-md mb-2"
                    src="{{ $employee->skill_image ? asset('storage/'.$employee->skill_image) : 'https://placehold.co/300x200/4B5563/FFFFFF?text=Tanda+Kecakapan' }}"
                    alt="Tanda Kecakapan Pegawai">
                <input type="file" id="skill-image-upload" class="mb-4 text-sm text-gray-500">
                <div class="mt-4 space-y-2 text-left text-gray-700">
                    <div>
                        <label for="edit-skill-type" class="block text-sm font-bold text-gray-700">Jenis:</label>
                        <input type="text" id="edit-skill-type" value="{{ $employee->skill_type }}"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                    </div>
                    <div>
                        <label for="edit-skill-number" class="block text-sm font-bold text-gray-700">Nomor:</label>
                        <input type="text" id="edit-skill-number" value="{{ $employee->skill_number }}"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                    </div>
                    <div>
                        <label for="edit-skill-expiry" class="block text-sm font-bold text-gray-700">Masa
                            Berlaku:</label>
                        <input type="date" id="edit-skill-expiry" value="{{ $employee->skill_expiry }}"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script src="{{ asset('assets/js/employee-detail.js') }}"></script>
@endpush