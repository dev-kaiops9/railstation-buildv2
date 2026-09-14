@extends('layouts.app')

@section('content')
<div class="tabs train-tabs" aria-label="Menu data perka">
    <button class="tab-btn active" id="tab-daftar-waktu" type="button" data-tab="daftar-waktu">
        <span class="tab-icon"><i class="fas fa-train"></i></span>
        <span class="tab-copy">
            <span class="tab-title">Daftar Waktu</span>
            <span class="tab-desc">Data perjalanan KA di stasiun</span>
        </span>
    </button>
    <button class="tab-btn" id="tab-jalur-emplasemen" type="button" data-tab="jalur-emplasemen">
        <span class="tab-icon"><i class="fas fa-route"></i></span>
        <span class="tab-copy">
            <span class="tab-title">Jalur & Emplasemen</span>
            <span class="tab-desc">Spesifikasi jalur dan emplasemen</span>
        </span>
    </button>
</div>

<!-- ==================== DAFTAR WAKTU ==================== -->
<div id="daftar-waktu-view" class="perka-tab-view">
    <section class="table-section">
        <div class="flex justify-between items-center mb-4 flex-wrap gap-3">
            <h2 class="text-xl font-semibold text-gray-900">Daftar Waktu</h2>
            <div class="flex items-center gap-2 flex-wrap">
                @if(auth()->user()->role != 'station_master' || (auth()->user()->role == 'station_master' && auth()->user()->station_id == $station->id))
                <button id="edit-station-btn" type="button" class="perka-action secondary">Edit Stasiun</button>
                <button id="perka-edit-btn" type="button" class="perka-action primary">Edit Data</button>
                <button id="add-train-btn" type="button" class="perka-action secondary hidden">Tambah KA</button>
                <button id="perka-save-btn" type="button" class="perka-action success hidden">Simpan</button>
                <button id="perka-cancel-btn" type="button" class="perka-action danger hidden">Batal</button>
                @endif
            </div>
        </div>

        <div class="train-table-container schedule-matrix-container">
            <table class="train-table schedule-matrix" id="schedule-matrix-table">
                <thead id="schedule-table-head"></thead>
                <tbody id="schedule-table-body"></tbody>
            </table>
        </div>
        <div id="schedule-empty-help" class="hidden mt-3 text-sm text-gray-500">
            Belum ada jadwal pada database untuk KA di stasiun ini. Tambahkan jadwal melalui mode <strong>Edit Data</strong>.
        </div>
    </section>
</div>

<!-- ==================== JALUR & EMPLASEMEN ==================== -->
<div id="jalur-emplasemen-view" class="perka-tab-view hidden">
    <!-- Emplasemen -->
    <section class="table-section emplasemen-section mb-8">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold text-gray-900">Gambar Emplasemen</h2>
            @if(auth()->user()->role != 'station_master' || (auth()->user()->role == 'station_master' && auth()->user()->station_id == $station->id))
            <div class="flex space-x-2">
                <button id="emplasemen-edit-btn" type="button" class="perka-action primary">Edit</button>
                <button id="emplasemen-save-btn" type="button" class="perka-action success hidden">Simpan</button>
                <button id="emplasemen-cancel-btn" type="button" class="perka-action danger hidden">Batal</button>
            </div>
            @endif
        </div>

        @php
            $file = $station->emplasemen;
            $ext = $file ? strtolower(pathinfo($file, PATHINFO_EXTENSION)) : null;
        @endphp

        <div id="emplasemen-view-mode" class="bg-white rounded-xl p-4 border border-gray-200">
            @if($file && in_array($ext, ['jpg','jpeg','png']))
                <img id="emplasemen-image" src="{{ asset($file) }}" class="w-full h-auto max-h-[650px] rounded-lg object-contain" alt="Gambar emplasemen">
            @elseif($file && $ext === 'pdf')
                <iframe id="emplasemen-pdf" src="{{ asset($file) }}" width="100%" height="550" class="rounded-lg border-0" title="Dokumen emplasemen"></iframe>
            @else
                <div class="emplasemen-placeholder">
                    <i class="fas fa-image text-4xl mb-3"></i>
                    <span>Belum ada gambar/dokumen emplasemen</span>
                </div>
            @endif
        </div>

        <div id="emplasemen-edit-mode" class="hidden bg-white rounded-xl p-4 border border-gray-200">
            <div id="emplasemen-preview-container" class="mb-4">
                @if($file && in_array($ext, ['jpg','jpeg','png']))
                    <img id="emplasemen-image-preview" src="{{ asset($file) }}" class="w-full h-auto max-h-[550px] rounded-lg object-contain" alt="Preview emplasemen">
                @elseif($file && $ext === 'pdf')
                    <iframe id="emplasemen-pdf-preview" src="{{ asset($file) }}" width="100%" height="450" class="rounded-lg border-0" title="Preview dokumen emplasemen"></iframe>
                @else
                    <div class="emplasemen-placeholder"><i class="fas fa-image text-4xl mb-3"></i><span>Preview</span></div>
                @endif
            </div>
            <input type="file" id="emplasemen-upload" accept=".jpg,.jpeg,.png,.pdf" class="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg p-2">
            <p class="text-xs text-gray-500 mt-2">Format: JPG, JPEG, PNG, atau PDF. Maksimal 10 MB.</p>
        </div>
    </section>

    <!-- Informasi Jalur -->
    <section class="jalur-info-section mb-8">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-900">Informasi Jalur</h2>
            @if(auth()->user()->role != 'station_master' || (auth()->user()->role == 'station_master' && auth()->user()->station_id == $station->id))
            <div class="flex space-x-2">
                <button id="jalur-edit-btn" type="button" class="perka-action primary">Edit</button>
                <button id="jalur-save-btn" type="button" class="perka-action success hidden">Simpan</button>
                <button id="jalur-cancel-btn" type="button" class="perka-action danger hidden">Batal</button>
            </div>
            @endif
        </div>

        <div class="mb-4">
            <label for="mulai-berlaku-date" class="text-sm font-semibold text-gray-700">Mulai Berlaku:</label>
            <input type="text" id="mulai-berlaku-text" class="p-2 border border-gray-300 rounded-md shadow-sm text-sm ml-2" value="{{ $station->track_validity_period ? \Carbon\Carbon::parse($station->track_validity_period)->locale('id')->translatedFormat('d F Y') : '-' }}" readonly>
            <input type="date" id="mulai-berlaku-date" class="p-2 border border-gray-300 rounded-md shadow-sm text-sm ml-2 hidden" value="{{ $station->track_validity_period ? \Carbon\Carbon::parse($station->track_validity_period)->format('Y-m-d') : '' }}">
        </div>

        <div class="jalur-table-container">
            <table class="jalur-table min-w-full" id="jalur-table">
                <thead>
                    <tr>
                        <th rowspan="2">Jalur</th>
                        <th rowspan="2">Panjang</th>
                        <th rowspan="2">Efektif</th>
                        <th colspan="5">Kapasitas</th>
                        <th rowspan="2">Jenis</th>
                        <th rowspan="2" id="jalur-opsi-header" class="hidden">Opsi</th>
                    </tr>
                    <tr>
                        <th>Kereta</th><th>GB</th><th>GD</th><th>GT</th><th>GK</th>
                    </tr>
                </thead>
                <tbody id="jalur-table-body"></tbody>
            </table>
        </div>
        <div id="add-jalur-row-container" class="mt-4 text-center hidden">
            <button id="add-jalur-row-btn" type="button" class="perka-action primary">Tambah Jalur</button>
        </div>
        <div class="mt-6 p-3 border border-gray-200 rounded-md bg-gray-50 text-sm text-gray-800">
            <p class="font-semibold mb-2">Keterangan:</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p><strong>CC201, 203, 204:</strong> 15.214 mm</p>
                    <p><strong>CC202, 205:</strong> 18.942 mm</p>
                    <p><strong>CC206:</strong> 15.849 mm</p>
                </div>
                <div>
                    <p><strong>KERETA:</strong> 21.000 mm</p>
                    <p><strong>GD:</strong> 14.700 mm</p>
                    <p><strong>GB, GT:</strong> 13.200 mm</p>
                    <p><strong>GK:</strong> 12.500 mm</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Jalur yang Harus Dilalui -->
    <section class="table-section mt-8">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-900">Daftar Jalur yang Harus Dilalui</h2>
            @if(auth()->user()->role != 'station_master' || (auth()->user()->role == 'station_master' && auth()->user()->station_id == $station->id))
            <div class="flex space-x-2">
                <button id="jalur-dilalui-edit-btn" type="button" class="perka-action primary">Edit</button>
                <button id="jalur-dilalui-save-btn" type="button" class="perka-action success hidden">Simpan</button>
                <button id="jalur-dilalui-cancel-btn" type="button" class="perka-action danger hidden">Batal</button>
            </div>
            @endif
        </div>
        <div class="train-table-container">
            <table class="train-table min-w-full" id="jalur-dilalui-table">
                <thead>
                    <tr>
                        <th>Jalur</th><th>Nomor KA</th><th>Datang</th><th>Berangkat</th><th>Dari</th><th>Ke</th>
                        <th id="jalur-dilalui-opsi-header" class="hidden">Opsi</th>
                    </tr>
                </thead>
                <tbody id="jalur-dilalui-table-body"></tbody>
            </table>
        </div>
        <div id="add-jalur-dilalui-row-container" class="mt-4 text-center hidden">
            <button id="add-jalur-dilalui-row-btn" type="button" class="perka-action primary">Tambah Baris</button>
        </div>
    </section>
</div>


<!-- Modal tambah KA untuk Daftar Waktu -->
<div id="add-train-modal" class="fixed inset-0 z-[110] hidden items-center justify-center bg-black/40 p-4">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-xl">
        <div class="flex justify-between items-center p-5 border-b border-gray-200">
            <div>
                <h3 class="text-lg font-bold text-gray-900">Tambah Data KA</h3>
                <p class="text-sm text-gray-500">Tambahkan KA yang akan dikelola pada stasiun ini.</p>
            </div>
            <button id="close-add-train-modal" type="button" class="text-gray-400 hover:text-gray-700 text-xl"><i class="fas fa-times"></i></button>
        </div>
        <form id="add-train-form" class="p-5 space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Nomor KA *</label>
                    <input id="new-train-number" type="text" required class="w-full p-2.5 border border-gray-300 rounded-lg" placeholder="Contoh: 211F">
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Nama KA *</label>
                    <input id="new-train-name" type="text" required class="w-full p-2.5 border border-gray-300 rounded-lg" placeholder="Contoh: Mutiara Timur">
                </div>
            </div>
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Relasi *</label>
                <input id="new-train-route" type="text" required class="w-full p-2.5 border border-gray-300 rounded-lg" placeholder="Contoh: SGU - KTG">
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Datang</label>
                    <input id="new-train-arrival" type="time" class="w-full p-2.5 border border-gray-300 rounded-lg">
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Berangkat</label>
                    <input id="new-train-departure" type="time" class="w-full p-2.5 border border-gray-300 rounded-lg">
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                    <select id="new-train-status" class="w-full p-2.5 border border-gray-300 rounded-lg">
                        <option value="Berhenti">Berhenti</option>
                        <option value="Langsung">Langsung</option>
                    </select>
                </div>
            </div>
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Jalur awal (opsional)</label>
                <select id="new-train-track" class="w-full p-2.5 border border-gray-300 rounded-lg">
                    <option value="">Pilih jalur</option>
                </select>
            </div>
            <div class="flex justify-end gap-2 pt-2">
                <button id="cancel-add-train" type="button" class="perka-action danger">Batal</button>
                <button type="submit" class="perka-action success">Simpan KA</button>
            </div>
        </form>
    </div>
</div>

<!-- Modal pemilihan stasiun untuk kolom Daftar Waktu -->
<div id="station-selector-modal" class="fixed inset-0 z-[100] hidden items-center justify-center bg-black/40 p-4">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col">
        <div class="flex justify-between items-center p-5 border-b border-gray-200">
            <div>
                <h3 class="text-lg font-bold text-gray-900">Pilih Stasiun</h3>
                <p class="text-sm text-gray-500">Pilih stasiun yang akan menjadi kolom pada Daftar Waktu.</p>
            </div>
            <button id="close-station-modal" type="button" class="text-gray-400 hover:text-gray-700 text-xl"><i class="fas fa-times"></i></button>
        </div>
        <div id="station-selector-list" class="p-5 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-2"></div>
        <div class="flex justify-end gap-2 p-5 border-t border-gray-200">
            <button id="cancel-station-selection" type="button" class="perka-action danger">Batal</button>
            <button id="apply-station-selection" type="button" class="perka-action primary">Terapkan</button>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script src="{{ asset('assets/js/train.js') }}"></script>
@endpush
