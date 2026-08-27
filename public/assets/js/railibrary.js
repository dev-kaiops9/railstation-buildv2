let raiLibraryData = [];
let currentPage = 1;
let perPage = 12;
let currentEditingId = null;
const paginationHelper = new PaginationHelper('railibrary');

function loadRaiLibrary(page = 1) {
    const container = document.getElementById('railibrary-cards-container');

    if (container) {
        container.innerHTML = `
            <div class="col-span-full flex items-center justify-center py-12">
                <div class="text-center">
                    <i class="fas fa-spinner fa-spin text-4xl text-blue-500 mb-3"></i>
                    <p class="text-gray-600">Memuat dokumen...</p>
                </div>
            </div>
        `;
    }

    $.ajax({
        url: "/railibrary/get",
        type: "GET",
        data: { page: page, per_page: perPage },
        success: function (response) {
            raiLibraryData = response.data;
            currentPage = response.current_page;

            renderCards();
            paginationHelper.render(response, (page) => loadRaiLibrary(page));
        },
        error: function (error) {
            if (container) {
                container.innerHTML = `
                    <div class="col-span-full flex items-center justify-center py-12">
                        <div class="text-center">
                            <i class="fas fa-exclamation-circle text-4xl text-red-500 mb-3"></i>
                            <p class="text-gray-600">Gagal memuat dokumen</p>
                        </div>
                    </div>
                `;
            }
        },
    });
}

function renderCards() {
    const container = document.getElementById('railibrary-cards-container');

    if (!container) return;

    container.innerHTML = '';

    if (raiLibraryData.length === 0) {
        container.innerHTML = `
            <div class="col-span-full flex items-center justify-center py-12">
                <div class="text-center">
                    <i class="fas fa-inbox text-4xl text-gray-400 mb-3"></i>
                    <p class="text-gray-600">Tidak ada dokumen</p>
                </div>
            </div>
        `;
        return;
    }

    raiLibraryData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer group';
        
        const fileIcon = getFileIcon(item.file_extension);
        
        card.innerHTML = `
            <div class="p-4 h-full flex flex-col">
                <div class="flex items-start gap-3 mb-4 pb-4 border-b border-gray-200" onclick="openPreviewModal(${item.id})">
                    <div class="text-3xl text-blue-500">
                        <i class="${fileIcon}"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors" title="${item.name}">
                            ${item.name}
                        </h3>
                        <p class="text-xs text-gray-500 mt-1">${item.file_extension.toUpperCase()}</p>
                    </div>
                </div>

                <div class="flex-1 mb-4">
                    <p class="text-xs text-gray-600 mb-2">
                        <i class="fas fa-calendar-alt mr-1"></i>
                        ${item.updated_at_formatted}
                    </p>
                    <p class="text-xs text-gray-600">
                        <i class="fas fa-database mr-1"></i>
                        ${item.file_size_readable}
                    </p>
                </div>

                <div class="flex gap-2 pt-4 border-t border-gray-200">
                    <button onclick="openEditModal(${item.id})" class="flex-1 px-3 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition-colors flex items-center justify-center gap-1">
                        Edit
                    </button>
                    <button onclick="deleteRaiLibrary(${item.id})" class="flex-1 px-3 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition-colors flex items-center justify-center gap-1">
                        Hapus
                    </button>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

function getFileIcon(extension) {
    const iconMap = {
        'pdf': 'fas fa-file-pdf',
        'doc': 'fas fa-file-word',
        'docx': 'fas fa-file-word',
        'xls': 'fas fa-file-excel',
        'xlsx': 'fas fa-file-excel',
        'ppt': 'fas fa-file-powerpoint',
        'pptx': 'fas fa-file-powerpoint',
        'txt': 'fas fa-file-alt',
        'zip': 'fas fa-file-archive',
    };

    return iconMap[extension.toLowerCase()] || 'fas fa-file';
}

function openAddModal() {
    currentEditingId = null;
    document.getElementById('library-id').value = '';
    document.getElementById('form-library').reset();
    document.getElementById('modal-form-title').textContent = 'Tambah Dokumen';
    document.getElementById('file-info-container').classList.add('hidden');
    document.getElementById('library-file').required = true;
    document.getElementById('modal-form-library').classList.remove('hidden');
}

function openEditModal(id) {
    const library = raiLibraryData.find(item => item.id === id);
    if (!library) return;

    currentEditingId = id;
    document.getElementById('library-id').value = id;
    document.getElementById('library-name').value = library.name;
    document.getElementById('library-file').value = '';
    document.getElementById('library-file').required = false;
    document.getElementById('modal-form-title').textContent = 'Edit Dokumen';
    document.getElementById('current-file-name').textContent = library.name + ' (' + library.file_size_readable + ')';
    document.getElementById('file-info-container').classList.remove('hidden');
    document.getElementById('modal-form-library').classList.remove('hidden');
}

function closeFormModal() {
    document.getElementById('modal-form-library').classList.add('hidden');
    document.getElementById('form-library').reset();
    currentEditingId = null;
}

function saveRaiLibrary() {
    const id = document.getElementById('library-id').value;
    const name = document.getElementById('library-name').value;
    const file = document.getElementById('library-file').files[0];

    if (!name.trim()) {
        showError('error-name', 'Nama dokumen harus diisi');
        return;
    }

    if (!id && !file) {
        showError('error-file', 'File harus dipilih');
        return;
    }

    const formData = new FormData();
    formData.append('name', name);
    if (file) {
        formData.append('file', file);
    }
    formData.append('_token', token);

    const url = id ? `/railibrary/update/${id}` : '/railibrary/store';
    const method = id ? 'POST' : 'POST';

    $.ajax({
        url: url,
        type: method,
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            closeFormModal();
            loadRaiLibrary(currentPage);
            showMessage(response.message || 'Data berhasil disimpan', 'success');
        },
        error: function (error) {
            const message = error.responseJSON?.message || 'Gagal menyimpan data';
            showMessage(message, 'error');
        },
    });
}

function deleteRaiLibrary(id) {
    if (!confirm('Apakah Anda yakin ingin menghapus dokumen ini?')) return;

    $.ajax({
        url: '/railibrary/delete',
        type: 'POST',
        data: { _token: token, id: id },
        success: function (response) {
            loadRaiLibrary();
            showMessage('Dokumen berhasil dihapus', 'success');
        },
        error: function (error) {
            const message = error.responseJSON?.message || 'Gagal menghapus dokumen';
            showMessage(message, 'error');
        },
    });
}

function openPreviewModal(id) {
    const library = raiLibraryData.find(item => item.id === id);
    if (!library) return;

    currentEditingId = id;

    document.getElementById('preview-title').textContent = library.name;
    document.getElementById('preview-file-name').textContent = library.name;
    document.getElementById('preview-file-size').textContent = library.file_size_readable;
    document.getElementById('preview-file-type').textContent = library.file_extension.toUpperCase();
    document.getElementById('preview-updated-at').textContent = library.updated_at_formatted;
    document.getElementById('download-link').href = `/railibrary/${id}/download`;

    const pdfContainer = document.getElementById('pdf-preview-container');
    const fileInfoPreview = document.getElementById('file-info-preview');

    if (library.file_extension === 'pdf') {
        pdfContainer.classList.remove('hidden');
        fileInfoPreview.classList.add('hidden');
        document.getElementById('pdf-viewer').src = `/railibrary/${id}/stream-pdf`;
    } else {
        pdfContainer.classList.add('hidden');
        fileInfoPreview.classList.remove('hidden');
    }

    document.getElementById('modal-preview-library').classList.remove('hidden');
}

function closePreviewModal() {
    document.getElementById('modal-preview-library').classList.add('hidden');
    document.getElementById('pdf-viewer').src = '';
}

function editFromPreview() {
    closePreviewModal();
    openEditModal(currentEditingId);
}

function deleteFromPreview() {
    closePreviewModal();
    deleteRaiLibrary(currentEditingId);
}

function showMessage(message, type = 'success') {
    const modal = document.getElementById('message-modal');
    const icon = document.getElementById('message-icon');
    const title = document.getElementById('message-title');
    const text = document.getElementById('message-text');

    if (type === 'success') {
        icon.className = 'fas fa-check-circle text-2xl text-green-500';
        title.textContent = 'Sukses';
    } else {
        icon.className = 'fas fa-exclamation-circle text-2xl text-red-500';
        title.textContent = 'Error';
    }

    text.textContent = message;
    modal.classList.remove('hidden');
}

function closeMessageModal() {
    document.getElementById('message-modal').classList.add('hidden');
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.classList.remove('hidden');
    }
}

function clearErrors() {
    document.querySelectorAll('[id^="error-"]').forEach(el => {
        el.textContent = '';
        el.classList.add('hidden');
    });
}

$(document).ready(function () {
    loadRaiLibrary();
});

document.getElementById('btn-add-library')?.addEventListener('click', openAddModal);
document.getElementById('library-name')?.addEventListener('input', () => clearErrors());
document.getElementById('library-file')?.addEventListener('change', () => clearErrors());

