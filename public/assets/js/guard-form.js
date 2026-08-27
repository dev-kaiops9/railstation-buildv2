let guardFormData = [];
let currentPage = 1;
let perPage = 15;
const paginationHelper = new PaginationHelper('guard-form');

// --- Start of Penjagaan Bentuk functions ---
function loadPenjagaanBentuk(page = 1) {
    const tableBody = document.getElementById('penjagaan-bentuk-table-body');

    if (tableBody) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="px-6 py-4">
                    <div class="inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50 my-4">
                        <div class="text-center">
                            <i class="fas fa-spinner fa-spin text-3xl text-blue-500 mb-2"></i>
                            <p class="text-gray-600">Memuat data...</p>
                        </div>
                    </div>
                </td>
            </tr>
        `;
    }

    $.ajax({
        url: "/guard-form/get",
        type: "GET",
        data: { page: page, per_page: perPage },
        success: function (response) {
            guardFormData = response.data;
            currentPage = response.current_page;

            renderPenjagaanBentukTable(false);
            paginationHelper.render(response, (page) => loadPenjagaanBentuk(page));
        },
        error: function (error) {
            if (tableBody) {
                tableBody.innerHTML = `
                    <tr>
                        <td colspan="7" class="px-6 py-4 text-center text-sm text-red-500">
                            Gagal memuat data
                        </td>
                    </tr>
                `;
            }
        },
    });
}

function savePenjagaanBentuk(guardForms) {
    $.ajax({
        url: "/guard-form/save",
        type: "POST",
        data: { _token: token, guard_forms: guardForms },
        success: function (response) {
            loadPenjagaanBentuk();
            togglePenjagaanBentukEditMode(false);
        },
        error: function (error) {
            showMessage('Gagal menyimpan data', 'error');
        },
    });
}

function deletePenjagaanBentuk(id) {
    if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) return;

    $.ajax({
        url: "/guard-form/delete",
        type: "POST",
        data: { _token: token, id },
        success: function (response) {
            guardFormData = guardFormData.filter((item) => item.id !== id);
            renderPenjagaanBentukTable(true);
        },
        error: function (error) {
            showMessage('Gagal menghapus data', 'error');
        },
    });
}

function renderPenjagaanBentukTable(isEditing = false) {
    const tableBody = document.getElementById('penjagaan-bentuk-table-body');
    const opsiHeader = document.getElementById('penjagaan-bentuk-opsi-header');

    if (!tableBody || !opsiHeader) return;

    tableBody.innerHTML = '';

    if (isEditing) {
        opsiHeader.classList.remove('hidden');
    } else {
        opsiHeader.classList.add('hidden');
    }

    if (guardFormData.length === 0 && !isEditing) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td colspan="7" class="px-6 py-4 text-center text-sm text-gray-500">
                Data tidak ditemukan
            </td>
        `;
        tableBody.appendChild(row);
    } else {
        guardFormData.forEach(item => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', item.id);

            if (isEditing) {
                row.innerHTML = `
                    <td class="px-2 py-2 border"><input type="date" value="${item.date}" class="w-full p-1 border rounded"></td>
                    <td class="px-2 py-2 border"><input type="text" value="${item.ptp}" class="w-full p-1 border rounded"></td>
                    <td class="px-2 py-2 border"><input type="text" value="${item.bh}" class="w-full p-1 border rounded"></td>
                    <td class="px-2 py-2 border"><input type="text" value="${item.bk}" class="w-full p-1 border rounded"></td>
                    <td class="px-2 py-2 border"><input type="text" value="${item.ms}" class="w-full p-1 border rounded"></td>
                    <td class="px-2 py-2 border"><textarea class="w-full p-1 border rounded">${item.notes}</textarea></td>
                    <td class="px-2 py-2 border text-center"><button class="text-red-500 hover:text-red-700 font-semibold" onclick="deletePenjagaanBentuk(${item.id})">Hapus</button></td>
                `;
            } else {
                row.innerHTML = `
                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 text-center border">${item.date}</td>
                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 text-center border">${item.ptp}</td>
                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 text-center border">${item.bh}</td>
                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 text-center border">${item.bk}</td>
                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 text-center border">${item.ms}</td>
                    <td class="px-4 py-2 text-sm text-gray-800 text-left border">${item.notes}</td>
                `;
            }
            tableBody.appendChild(row);
        });
    }
}

function togglePenjagaanBentukEditMode(isEditing) {
    const editBtn = document.getElementById('penjagaan-bentuk-edit-btn');
    const saveBtn = document.getElementById('penjagaan-bentuk-save-btn');
    const cancelBtn = document.getElementById('penjagaan-bentuk-cancel-btn');
    const addRowContainer = document.getElementById('add-penjagaan-bentuk-row-container');

    if (isEditing) {
        editBtn.classList.add('hidden');
        saveBtn.classList.remove('hidden');
        cancelBtn.classList.remove('hidden');
        addRowContainer.classList.remove('hidden');
    } else {
        editBtn.classList.remove('hidden');
        saveBtn.classList.add('hidden');
        cancelBtn.classList.add('hidden');
        addRowContainer.classList.add('hidden');
    }

    renderPenjagaanBentukTable(isEditing);
}

function savePenjagaanBentukChanges() {
    const tableRows = document.querySelectorAll('#penjagaan-bentuk-table-body tr');
    const newData = [];

    tableRows.forEach(row => {
        const inputs = row.querySelectorAll('input, textarea');
        const guardFormId = row.dataset.id ? parseInt(row.dataset.id, 10) : null;
        const data = {
            id: guardFormId,
            date: inputs[0].value,
            ptp: inputs[1].value,
            bh: inputs[2].value,
            bk: inputs[3].value,
            ms: inputs[4].value,
            notes: inputs[5].value
        };

        if (guardFormId) {
            const oldData = guardFormData.find(item => item.id === guardFormId);
            const hasChanges = oldData.date !== data.date ||
                oldData.ptp !== data.ptp ||
                oldData.bh !== data.bh ||
                oldData.bk !== data.bk ||
                oldData.ms !== data.ms ||
                oldData.notes !== data.notes;

            if (hasChanges) {
                newData.push(data);
            }
        } else {
            if (data.date && (data.ptp || data.bh || data.bk || data.ms || data.notes)) {
                newData.push(data);
            }
        }
    });

    if (newData.length > 0) {
        savePenjagaanBentuk(newData);
    } else {
        togglePenjagaanBentukEditMode(false);
    }
}

function addPenjagaanBentukRow() {
    const tableBody = document.getElementById('penjagaan-bentuk-table-body');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td class="px-2 py-2 border"><input type="date" class="w-full p-1 border rounded"></td>
        <td class="px-2 py-2 border"><input type="text" class="w-full p-1 border rounded"></td>
        <td class="px-2 py-2 border"><input type="text" class="w-full p-1 border rounded"></td>
        <td class="px-2 py-2 border"><input type="text" class="w-full p-1 border rounded"></td>
        <td class="px-2 py-2 border"><input type="text" class="w-full p-1 border rounded"></td>
        <td class="px-2 py-2 border"><textarea class="w-full p-1 border rounded"></textarea></td>
        <td class="px-2 py-2 border text-center"><button class="text-red-500 hover:text-red-700 font-semibold" onclick="this.closest('tr').remove()">Hapus</button></td>
    `;
    tableBody.appendChild(newRow);
}
// --- End of Penjagaan Bentuk functions ---

$(document).ready(function() {
    loadPenjagaanBentuk();
});

const penjagaanBentukEditBtn = document.getElementById('penjagaan-bentuk-edit-btn');
const penjagaanBentukSaveBtn = document.getElementById('penjagaan-bentuk-save-btn');
const penjagaanBentukCancelBtn = document.getElementById('penjagaan-bentuk-cancel-btn');
const addPenjagaanBentukRowBtn = document.getElementById('add-penjagaan-bentuk-row-btn');

if (penjagaanBentukEditBtn) penjagaanBentukEditBtn.addEventListener('click', () => togglePenjagaanBentukEditMode(true));
if (penjagaanBentukSaveBtn) penjagaanBentukSaveBtn.addEventListener('click', savePenjagaanBentukChanges);
if (penjagaanBentukCancelBtn) penjagaanBentukCancelBtn.addEventListener('click', () => togglePenjagaanBentukEditMode(false));
if (addPenjagaanBentukRowBtn) addPenjagaanBentukRowBtn.addEventListener('click', addPenjagaanBentukRow);
