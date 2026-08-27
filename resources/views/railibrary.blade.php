@extends('layouts.app')

@section('content')
<div class="bg-white rounded-xl shadow-md p-6 mb-8">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
            <h1 class="text-3xl font-bold text-gray-900">RaiLibrary</h1>
            <p class="text-gray-600 text-sm mt-1">Kelola berbagai dokumen, panduan, dan referensi yang berkaitan dengan operasional kereta api di sini.</p>
        </div>
        @if(auth()->user()->role != 'station_master' || (auth()->user()->role == 'station_master' && auth()->user()->station_id == $station->id))
        <button id="btn-add-library" class="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300 flex items-center gap-2">
            <i class="fas fa-plus"></i>
            Tambah Dokumen
        </button>
        @endif
    </div>

    <!-- Cards Grid -->
    <div id="railibrary-cards-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <!-- Loading State -->
        <div class="col-span-full flex items-center justify-center py-12">
            <div class="text-center">
                <i class="fas fa-spinner fa-spin text-4xl text-blue-500 mb-3"></i>
                <p class="text-gray-600">Memuat dokumen...</p>
            </div>
        </div>
    </div>

    <x-pagination :paginationId="'railibrary'"/>
</div>

<!-- Modal Tambah/Edit Dokumen -->
<div id="modal-form-library" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h2 id="modal-form-title" class="text-xl font-bold text-gray-900">Tambah Dokumen</h2>
            <button onclick="closeFormModal()" class="text-gray-500 hover:text-gray-700">
                <i class="fas fa-times text-xl"></i>
            </button>
        </div>

        <form id="form-library" class="p-6 space-y-4">
            @csrf
            <input type="hidden" id="library-id" name="id">

            <!-- Nama Dokumen -->
            <div>
                <label for="library-name" class="block text-sm font-medium text-gray-700 mb-2">Nama Dokumen</label>
                <input type="text" id="library-name" name="name" placeholder="Masukkan nama dokumen" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
                <span class="text-red-500 text-sm hidden" id="error-name"></span>
            </div>

            <!-- File Upload -->
            <div>
                <label for="library-file" class="block text-sm font-medium text-gray-700 mb-2">File</label>
                <div class="relative">
                    <input type="file" id="library-file" name="file" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip">
                    <p class="text-xs text-gray-500 mt-1">Max 100MB. Format: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, ZIP</p>
                </div>
                <span class="text-red-500 text-sm hidden" id="error-file"></span>
            </div>

            <!-- File Info (untuk edit) -->
            <div id="file-info-container" class="hidden bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p class="text-sm text-gray-700">
                    <span class="font-medium">File saat ini:</span>
                    <span id="current-file-name" class="text-blue-600"></span>
                </p>
                <p class="text-xs text-gray-600 mt-1">Pilih file baru untuk mengganti file lama</p>
            </div>

            <!-- Buttons -->
            <div class="flex gap-3 pt-4">
                <button type="button" onclick="closeFormModal()" class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                    Batal
                </button>
                <button type="button" onclick="saveRaiLibrary()" class="flex-1 px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors">
                    Simpan
                </button>
            </div>
        </form>
    </div>
</div>

<!-- Modal Preview Dokumen -->
<div id="modal-preview-library" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h2 id="preview-title" class="text-xl font-bold text-gray-900">Preview Dokumen</h2>
            <button onclick="closePreviewModal()" class="text-gray-500 hover:text-gray-700">
                <i class="fas fa-times text-xl"></i>
            </button>
        </div>

        <div class="p-6">
            <!-- PDF Preview -->
            <div id="pdf-preview-container" class="hidden">
                <iframe id="pdf-viewer" class="w-full h-[600px] border border-gray-300 rounded-lg" frameborder="0"></iframe>
            </div>

            <!-- File Info & Download -->
            <div id="file-info-preview" class="space-y-4">
                <div class="bg-gray-50 rounded-lg p-4">
                    <p class="text-sm text-gray-600 mb-2">Nama File</p>
                    <p id="preview-file-name" class="text-lg font-semibold text-gray-900"></p>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="bg-gray-50 rounded-lg p-4">
                        <p class="text-sm text-gray-600 mb-2">Ukuran File</p>
                        <p id="preview-file-size" class="text-lg font-semibold text-gray-900"></p>
                    </div>
                    <div class="bg-gray-50 rounded-lg p-4">
                        <p class="text-sm text-gray-600 mb-2">Tipe File</p>
                        <p id="preview-file-type" class="text-lg font-semibold text-gray-900"></p>
                    </div>
                </div>

                <div class="bg-gray-50 rounded-lg p-4">
                    <p class="text-sm text-gray-600 mb-2">Terakhir Diperbarui</p>
                    <p id="preview-updated-at" class="text-lg font-semibold text-gray-900"></p>
                </div>

                <a id="download-link" href="#" class="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors">
                    <i class="fas fa-download"></i>
                    Download File
                </a>
            </div>
        </div>

        <!-- Actions -->
        <div class="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-3 justify-end">
            @if(auth()->user()->role != 'station_master' || (auth()->user()->role == 'station_master' && auth()->user()->station_id == $station->id))
            <button id="btn-edit-preview" onclick="editFromPreview()" class="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
                Edit
            </button>
            <button id="btn-delete-preview" onclick="deleteFromPreview()" class="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2">
                Hapus
            </button>
            @endif
            <button onclick="closePreviewModal()" class="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                Tutup
            </button>
        </div>
    </div>
</div>

<!-- Message Modal -->
<div id="message-modal" class="fixed inset-0 bg-black bg-opacity-50 z-[1001] hidden flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-sm w-full">
        <div class="p-6">
            <div class="flex items-center gap-3 mb-4">
                <i id="message-icon" class="fas fa-check-circle text-2xl text-green-500"></i>
                <h3 id="message-title" class="text-lg font-bold text-gray-900">Sukses</h3>
            </div>
            <p id="message-text" class="text-gray-600 mb-6"></p>
            <button onclick="closeMessageModal()" class="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors">
                OK
            </button>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script src="{{ asset('assets/js/railibrary.js') }}"></script>
@endpush
