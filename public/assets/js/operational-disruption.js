let operationalDisruptionData = [];
let currentPage = 1;
let perPage = 15;
const paginationHelper = new PaginationHelper('operational-disruption');

// --- Start of Operational Disruption functions ---
function loadOperationalDisruption(page = 1) {
    const tableBody = document.getElementById('operational-disruption-table-body');

    if (tableBody) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" class="px-6 py-4">
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
        url: "/operational-disruption/get",
        type: "GET",
        data: { page: page, per_page: perPage },
        success: function (response) {
            operationalDisruptionData = response.data;
            currentPage = response.current_page;

            renderOperationalDisruptionTable(false);
            paginationHelper.render(response, (page) => loadOperationalDisruption(page));
        },
        error: function (error) {
            if (tableBody) {
                tableBody.innerHTML = `
                    <tr>
                        <td colspan="8" class="px-6 py-4 text-center text-sm text-red-500">
                            Gagal memuat data
                        </td>
                    </tr>
                `;
            }
        },
    });
}

function saveOperationalDisruption(disruptions) {
    $.ajax({
        url: "/operational-disruption/save",
        type: "POST",
        data: { _token: token, operational_disruptions: disruptions },
        success: function (response) {
            loadOperationalDisruption();
            toggleOperationalDisruptionEditMode(false);
            showMessage('Data berhasil disimpan', 'success');
        },
        error: function (error) {
            showMessage('Gagal menyimpan data', 'error');
        },
    });
}

function deleteOperationalDisruption(id) {
    if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) return;

    $.ajax({
        url: "/operational-disruption/delete",
        type: "POST",
        data: { _token: token, id },
        success: function (response) {
            operationalDisruptionData = operationalDisruptionData.filter((item) => item.id !== id);
            renderOperationalDisruptionTable(true);
            showMessage('Data berhasil dihapus', 'success');
        },
        error: function (error) {
            showMessage('Gagal menghapus data', 'error');
        },
    });
}

function renderOperationalDisruptionTable(isEditing = false) {
    const tableBody = document.getElementById('operational-disruption-table-body');
    const opsiHeader = document.getElementById('operational-disruption-opsi-header');

    if (!tableBody || !opsiHeader) return;

    tableBody.innerHTML = '';

    if (isEditing) {
        opsiHeader.classList.remove('hidden');
    } else {
        opsiHeader.classList.add('hidden');
    }

    if (operationalDisruptionData.length === 0 && !isEditing) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500">
                Data tidak ditemukan
            </td>
        `;
        tableBody.appendChild(row);
    } else {
        operationalDisruptionData.forEach(item => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', item.id);

            if (isEditing) {
                row.innerHTML = `
                    <td class="px-2 py-2 border"><input type="date" value="${item.date}" class="w-full p-1 border rounded text-sm"></td>
                    <td class="px-2 py-2 border"><input type="text" value="${item.disruption_type || ''}" class="w-full p-1 border rounded text-sm"></td>
                    <td class="px-2 py-2 border"><input type="text" value="${item.report_to || ''}" class="w-full p-1 border rounded text-sm"></td>
                    <td class="px-2 py-2 border"><input type="time" value="${item.time || ''}" class="w-full p-1 border rounded text-sm"></td>
                    <td class="px-2 py-2 border"><textarea class="w-full p-1 border rounded text-sm">${item.handling || ''}</textarea></td>
                    <td class="px-2 py-2 border"><input type="text" value="${item.officer || ''}" class="w-full p-1 border rounded text-sm"></td>
                    <td class="px-2 py-2 border text-center"><button class="text-red-500 hover:text-red-700 font-semibold" onclick="deleteOperationalDisruption(${item.id})">Hapus</button></td>
                `;
            } else {
                row.innerHTML = `
                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 text-center border">${item.date}</td>
                    <td class="px-4 py-2 text-sm text-gray-800 text-left border">${item.disruption_type || '-'}</td>
                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 text-center border">${item.report_to || '-'}</td>
                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 text-center border">${item.time || '-'}</td>
                    <td class="px-4 py-2 text-sm text-gray-800 text-left border">${item.handling || '-'}</td>
                    <td class="px-4 py-2 text-sm text-gray-800 text-left border">${item.officer || '-'}</td>
                `;
            }
            tableBody.appendChild(row);
        });
    }
}

function toggleOperationalDisruptionEditMode(isEditing) {
    const editBtn = document.getElementById('operational-disruption-edit-btn');
    const saveBtn = document.getElementById('operational-disruption-save-btn');
    const cancelBtn = document.getElementById('operational-disruption-cancel-btn');
    const addRowContainer = document.getElementById('add-operational-disruption-row-container');

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

    renderOperationalDisruptionTable(isEditing);
}

function saveOperationalDisruptionChanges() {
    const tableRows = document.querySelectorAll('#operational-disruption-table-body tr');
    const newData = [];

    tableRows.forEach(row => {
        const inputs = row.querySelectorAll('input, textarea');
        const disruptionId = row.dataset.id ? parseInt(row.dataset.id, 10) : null;
        const data = {
            id: disruptionId,
            date: inputs[0].value,
            disruption_type: inputs[1].value,
            report_to: inputs[2].value,
            time: inputs[3].value,
            handling: inputs[4].value,
            officer: inputs[5].value,
        };

        if (disruptionId) {
            const oldData = operationalDisruptionData.find(item => item.id === disruptionId);
            const hasChanges = oldData.date !== data.date ||
                oldData.disruption_type !== data.disruption_type ||
                oldData.report_to !== data.report_to ||
                oldData.time !== data.time ||
                oldData.handling !== data.handling ||
                oldData.officer !== data.officer;

            if (hasChanges) {
                newData.push(data);
            }
        } else {
            if (data.date && data.disruption_type) {
                newData.push(data);
            }
        }
    });

    if (newData.length > 0) {
        saveOperationalDisruption(newData);
    } else {
        toggleOperationalDisruptionEditMode(false);
    }
}

function addOperationalDisruptionRow() {
    const tableBody = document.getElementById('operational-disruption-table-body');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td class="px-2 py-2 border"><input type="date" class="w-full p-1 border rounded text-sm"></td>
        <td class="px-2 py-2 border"><input type="text" class="w-full p-1 border rounded text-sm" placeholder="Jenis Gangguan"></td>
        <td class="px-2 py-2 border"><input type="text" class="w-full p-1 border rounded text-sm" placeholder="Lapor Ke"></td>
        <td class="px-2 py-2 border"><input type="time" class="w-full p-1 border rounded text-sm"></td>
        <td class="px-2 py-2 border"><textarea class="w-full p-1 border rounded text-sm" placeholder="Penanganan"></textarea></td>
        <td class="px-2 py-2 border"><input type="text" class="w-full p-1 border rounded text-sm" placeholder="Petugas"></td>
        <td class="px-2 py-2 border text-center"><button class="text-red-500 hover:text-red-700 font-semibold" onclick="this.closest('tr').remove()">Hapus</button></td>
    `;
    tableBody.appendChild(newRow);
}
// --- End of Operational Disruption functions ---

$(document).ready(function() {
    loadOperationalDisruption();
});

const operationalDisruptionEditBtn = document.getElementById('operational-disruption-edit-btn');
const operationalDisruptionSaveBtn = document.getElementById('operational-disruption-save-btn');
const operationalDisruptionCancelBtn = document.getElementById('operational-disruption-cancel-btn');
const addOperationalDisruptionRowBtn = document.getElementById('add-operational-disruption-row-btn');

if (operationalDisruptionEditBtn) operationalDisruptionEditBtn.addEventListener('click', () => toggleOperationalDisruptionEditMode(true));
if (operationalDisruptionSaveBtn) operationalDisruptionSaveBtn.addEventListener('click', saveOperationalDisruptionChanges);
if (operationalDisruptionCancelBtn) operationalDisruptionCancelBtn.addEventListener('click', () => toggleOperationalDisruptionEditMode(false));
if (addOperationalDisruptionRowBtn) addOperationalDisruptionRowBtn.addEventListener('click', addOperationalDisruptionRow);

