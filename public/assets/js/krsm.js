let pihakAData = [];
let currentPageA = 1;
let pihakBData = [];
let currentPageB = 1;
let perPage = 10;
const paginationA = new PaginationHelper('krsm-a');
const paginationB = new PaginationHelper('krsm-b');

function loadKRSM(pihak) {
    const tableBody = document.getElementById(`krsm-table-body-${pihak}`);

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
        url: "/krsm/get",
        type: "GET",
        data: { pihak: pihak, per_page: perPage },
        success: function (response) {
            if (pihak === 'A') {
                pihakAData = response.data;
                currentPageA = response.current_page;
                paginationA.render(response, (page) => loadKRSM(pihak, page));
            } else {
                pihakBData = response.data;
                currentPageB = response.current_page;
                paginationB.render(response, (page) => loadKRSM(pihak, page));
            }

            renderTable(pihak);
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

function saveKRSM(newData, pihak) {
    $.ajax({
        url: '/krsm/save',
        type: 'POST',
        data: { _token: token, pihak: pihak, krsm: newData },
        success: function (response) {
            toggleEditMode(pihak);
            loadKRSM(pihak);
        },
        error: function (error) {
            showMessage('Gagal menyimpan data', 'error');
        }
    });
}

function deleteKRSMData(id, pihak) {
    if (!confirm('Apakah Anda yakin ingin menghapus data ini?')) return;

    $.ajax({
        url: '/krsm/delete',
        type: 'POST',
        data: { _token: token, id: id },
        success: function (response) {
            if (pihak === 'A') {
                pihakAData = pihakAData.filter(item => item.id !== id);
            } else {
                pihakBData = pihakBData.filter(item => item.id !== id);
            }

            renderTable(pihak, true);
        },
        error: function (error) {
            showMessage('Gagal menghapus data', 'error');
        }
    });
}

function toggleEditMode(pihak, isEditing = false) {
    const editBtn = document.getElementById(`krsm-edit-btn-${pihak}`);
    const saveBtn = document.getElementById(`krsm-save-btn-${pihak}`);
    const cancelBtn = document.getElementById(`krsm-cancel-btn-${pihak}`);
    const opsiHeader = document.getElementById(`krsm-opsi-header-${pihak}`);
    const addRowContainer = document.getElementById(`add-krsm-row-container-${pihak}`);

    if (isEditing) {
        editBtn.classList.add('hidden');
        saveBtn.classList.remove('hidden');
        cancelBtn.classList.remove('hidden');
        opsiHeader.classList.remove('hidden');
        addRowContainer.classList.remove('hidden');
    } else {
        editBtn.classList.remove('hidden');
        saveBtn.classList.add('hidden');
        cancelBtn.classList.add('hidden');
        opsiHeader.classList.add('hidden');
        addRowContainer.classList.add('hidden');
    }

    renderTable(pihak, isEditing);
}

function renderTable(pihak, isEditing = false) {
    const data = pihak === 'A' ? pihakAData : pihakBData;
    const tableBody = document.getElementById(`krsm-table-body-${pihak}`);

    if (!tableBody) return;

    tableBody.innerHTML = '';

    if (data.length === 0 && !isEditing) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="px-4 py-4 text-center text-gray-500">
                    Tidak ada data
                </td>
            </tr>
        `;
        return;
    }

    data.forEach((item) => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', item.id);

        if (isEditing) {
            row.innerHTML = `
                <td class="px-2 py-2"><input type="date" class="w-full p-1 border rounded text-center" value="${item.date}" required></td>
                <td class="px-2 py-2"><input type="number" class="w-full p-1 border rounded text-center" value="${item.kr_awal}"></td>
                <td class="px-2 py-2"><input type="number" class="w-full p-1 border rounded text-center" value="${item.kr_akhir}"></td>
                <td class="px-2 py-2"><input type="text" class="w-full p-1 border rounded text-center" value="${item.kr_keterangan}"></td>
                <td class="px-2 py-2"><input type="number" class="w-full p-1 border rounded text-center" value="${item.sm_awal}"></td>
                <td class="px-2 py-2"><input type="number" class="w-full p-1 border rounded text-center" value="${item.sm_akhir}"></td>
                <td class="px-2 py-2"><input type="text" class="w-full p-1 border rounded text-center" value="${item.sm_keterangan}"></td>
                <td class="px-2 py-2"><button class="text-red-500 hover:text-red-700 font-semibold text-sm" onclick="deleteKRSMData(${item.id}, '${pihak}')">Hapus</button></td>
            `;
        } else {
            row.innerHTML = `
                <td class="px-2 py-2 text-center">${item.date}</td>
                <td class="px-2 py-2 text-center">${item.kr_awal}</td>
                <td class="px-2 py-2 text-center">${item.kr_akhir}</td>
                <td class="px-2 py-2 text-center">${item.kr_keterangan}</td>
                <td class="px-2 py-2 text-center">${item.sm_awal}</td>
                <td class="px-2 py-2 text-center">${item.sm_akhir}</td>
                <td class="px-2 py-2 text-center">${item.sm_keterangan}</td>
            `;
        }

        tableBody.appendChild(row);
    });
}

function saveChanges(pihak) {
    const tableRows = document.querySelectorAll(`#krsm-table-body-${pihak} tr`);
    const newData = [];

    tableRows.forEach((row) => {
        const inputs = row.querySelectorAll('input');
        const id = row.dataset.id ? parseInt(row.dataset.id, 10) : null;
        if (inputs.length === 0) return;
        
        const data = {
            id: id,
            date: inputs[0].value,
            kr_awal: inputs[1].value,
            kr_akhir: inputs[2].value,
            kr_keterangan: inputs[3].value,
            sm_awal: inputs[4].value,
            sm_akhir: inputs[5].value,
            sm_keterangan: inputs[6].value,
        };

        let pihakData = [];

        if (pihak === 'A') {
            pihakData = pihakAData.find(item => item.id === id);
        } else {
            pihakData = pihakBData.find(item => item.id === id);
        }

        if (id) {
            const hasChanges = pihakData.date !== data.date ||
                pihakData.kr_awal !== data.kr_awal ||
                pihakData.kr_akhir !== data.kr_akhir ||
                pihakData.kr_keterangan !== data.kr_keterangan ||
                pihakData.sm_awal !== data.sm_awal ||
                pihakData.sm_akhir !== data.sm_akhir ||
                pihakData.sm_keterangan !== data.sm_keterangan;
            
            if (hasChanges) {
                newData.push(data);
            }
        } else {
            if (data.date) {
                newData.push(data);
            }
        }
    });

    if (newData.length > 0) {
        saveKRSM(newData, pihak);
    } else {
        toggleEditMode(pihak);
    }
}

function addNewRow(pihak) {
    const tableBody = document.getElementById(`krsm-table-body-${pihak}`);
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td class="px-2 py-2"><input type="date" class="w-full p-1 border rounded text-center" required></td>
        <td class="px-2 py-2"><input type="number" class="w-full p-1 border rounded text-center"></td>
        <td class="px-2 py-2"><input type="number" class="w-full p-1 border rounded text-center"></td>
        <td class="px-2 py-2"><input type="text" class="w-full p-1 border rounded text-center"></td>
        <td class="px-2 py-2"><input type="number" class="w-full p-1 border rounded text-center"></td>
        <td class="px-2 py-2"><input type="number" class="w-full p-1 border rounded text-center"></td>
        <td class="px-2 py-2"><input type="text" class="w-full p-1 border rounded text-center"></td>
        <td class="px-2 py-2"><button class="text-red-500 hover:text-red-700 font-semibold text-sm" onclick="this.closest('tr').remove()">Hapus</button></td>
    `;
    tableBody.appendChild(newRow);
}

function setupEventListeners(pihak) {
    const editBtn = document.getElementById(`krsm-edit-btn-${pihak}`);
    const saveBtn = document.getElementById(`krsm-save-btn-${pihak}`);
    const cancelBtn = document.getElementById(`krsm-cancel-btn-${pihak}`);
    const addBtn = document.getElementById(`add-krsm-row-btn-${pihak}`);

    if (editBtn) editBtn.addEventListener('click', () => toggleEditMode(pihak, true));
    if (saveBtn) saveBtn.addEventListener('click', () => saveChanges(pihak));
    if (cancelBtn) cancelBtn.addEventListener('click', () => toggleEditMode(pihak));
    if (addBtn) addBtn.addEventListener('click', () => addNewRow(pihak));
}

$(document).ready(function () {
    const pihakA = document.getElementById('pihakA');
    const pihakB = document.getElementById('pihakB');

    if (pihakA) {
        setupEventListeners('A');
        loadKRSM('A');
    }

    if (pihakB) {
        setupEventListeners('B');
        loadKRSM('B');
    }
});
