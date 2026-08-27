let ibprData = [];
let currentPage = 1;
let perPage = 15;
const paginationHelper = new PaginationHelper('ibpr');

// --- Start of IBPR functions ---
function loadIBPR(page = 1) {
    const tableBody = document.getElementById('ibpr-table-body');

    if (tableBody) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="19" class="px-6 py-4">
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
        url: "/ibpr/get",
        type: "GET",
        data: {
        page: page,
        per_page: perPage,
        search: $("#search").val(),
        probability: $("#filter_probability").val(),
        impact: $("#filter_impact").val()
        },
        success: function (response) {
            ibprData = response.data;
            currentPage = response.current_page;

            renderIBPRTable(false);
            paginationHelper.render(response, (page) => loadIBPR(page));
        },
        error: function (error) {
            if (tableBody) {
                tableBody.innerHTML = `
                    <tr>
                        <td colspan="19" class="px-6 py-4 text-center text-sm text-red-500">
                            Gagal memuat data
                        </td>
                    </tr>
                `;
            }
        },
    });
}

$("#search").on("keyup", function(){
loadIBPR(1);
});

$("#filter_probability,#filter_impact").on("change", function(){
loadIBPR(1);
});

document.addEventListener("DOMContentLoaded", function(){

const selectAll = document.getElementById("select-all");

if(selectAll){

selectAll.addEventListener("change", function(){

document.querySelectorAll(".row-check").forEach(cb=>{
cb.checked = this.checked;
});

});

}

});

document.getElementById("export-btn").addEventListener("click", function(){

let ids = [];

document.querySelectorAll(".row-check:checked").forEach(cb=>{
ids.push(cb.value);
});

const search = document.getElementById("search").value;
const probability = document.getElementById("filter_probability").value;
const impact = document.getElementById("filter_impact").value;

fetch("/ibpr/export-pdf",{

method:"POST",

headers:{
"Content-Type":"application/json",
"X-CSRF-TOKEN":document.querySelector('meta[name="csrf-token"]').content
},

body:JSON.stringify({
ids:ids,
search:search,
probability:probability,
impact:impact
})

})
.then(res=>res.blob())
.then(blob=>{

const url = window.URL.createObjectURL(blob);
const a = document.createElement("a");

a.href = url;
a.download = "ibpr.pdf";
a.click();

});

});

function saveIBPR(ibprs) {
    $.ajax({
        url: "/ibpr/save",
        type: "POST",
        data: { _token: token, ibprs: ibprs },
        success: function (response) {
            loadIBPR();
            toggleIBPREditMode(false);
        },
        error: function (error) {
            showMessage('Gagal menyimpan data', 'error');
        },
    });
}

function deleteIBPR(id) {
    if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) return;

    $.ajax({
        url: "/ibpr/delete",
        type: "POST",
        data: { _token: token, id },
        success: function (response) {
            ibprData = ibprData.filter((item) => item.id !== id);
            renderIBPRTable(true);
        },
        error: function (error) {
            showMessage('Gagal menghapus data', 'error');
        },
    });
}

function getRiskColorClass(value) {
    if (value >= 17) {
        return 'bg-red-500 text-white';
    } else if (value >= 10) {
        return 'bg-orange-500 text-white';
    } else if (value >= 5) {
        return 'bg-yellow-400 text-black';
    } else if (value >= 1) {
        return 'bg-green-500 text-white';
    }
    return '';
}

function updateNilaiRisiko(element) {
    const row = element.closest('tr');
    if (!row) return;

    // Update initial risk
    const probInitial = row.querySelector('.risiko-probabilitas')?.value || 0;
    const dampakInitial = row.querySelector('.risiko-dampak')?.value || 0;
    const nilaiInitialCell = row.querySelector('.risiko-nilai');
    const nilaiInitial = probInitial * dampakInitial;
    if (nilaiInitialCell) {
        nilaiInitialCell.textContent = nilaiInitial;
        nilaiInitialCell.className = `risiko-nilai font-bold ${getRiskColorClass(nilaiInitial)}`;
    }

    // Update final risk
    const probFinal = row.querySelector('.final-probabilitas')?.value || 0;
    const dampakFinal = row.querySelector('.final-dampak')?.value || 0;
    const nilaiFinalCell = row.querySelector('.final-nilai');
    const nilaiFinal = probFinal * dampakFinal;
    if (nilaiFinalCell) {
        nilaiFinalCell.textContent = nilaiFinal;
        nilaiFinalCell.className = `final-nilai font-bold ${getRiskColorClass(nilaiFinal)}`;
    }
}

function renderIBPRTable(isEditing = false) {
    const tableBody = document.getElementById('ibpr-table-body');
    const opsiHeader = document.getElementById('ibpr-opsi-header');

    if (!tableBody || !opsiHeader) return;

    tableBody.innerHTML = '';

    if (isEditing) {
        opsiHeader.classList.remove('hidden');
    } else {
        opsiHeader.classList.add('hidden');
    }

    if (ibprData.length === 0 && !isEditing) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td colspan="19" class="px-6 py-4 text-center text-sm text-gray-500">
                Data tidak ditemukan
            </td>
        `;
        tableBody.appendChild(row);
    } else {
        ibprData.forEach(item => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', item.id);
            const riskValue = (item.probability ?? 0)* (item.impact ?? 0);
            const finalValue = (item.after_probability ?? 0)* (item.after_impact ?? 0);
            const riskColorClass = getRiskColorClass(riskValue);
            const finalColorClass = getRiskColorClass(finalValue);
            const hazardId = item.id.toString().padStart(3, '0');

            if (isEditing) {
                row.innerHTML = `
                    <td><input type="text" class="w-20" value="${hazardId}" placeholder="ID" readonly></td>
                    <td><textarea placeholder="Bahaya">${item.hazard_description ?? ''}</textarea></td>
                    <textarea placeholder="Penjelasan">${item.control_explanation ?? ''}</textarea>
                    <input type="text" value="${item.control_reference ?? ''}">
                    <td class="text-center"><input type="radio" name="effectiveness-${item.id}" value="Tinggi" ${item.effectiveness === 'Tinggi' ? 'checked' : ''}></td>
                    <td class="text-center"><input type="radio" name="effectiveness-${item.id}" value="Sedang" ${item.effectiveness === 'Sedang' ? 'checked' : ''}></td>
                    <td class="text-center"><input type="radio" name="effectiveness-${item.id}" value="Rendah" ${item.effectiveness === 'Rendah' ? 'checked' : ''}></td>
                    <input type="text" value="${item.responsible_position ?? ''}">
                    <textarea placeholder="Risiko">${item.risk_explanation ?? ''}</textarea>
                    <td><input type="number" value="${item.probability}" class="w-20 risiko-probabilitas" oninput="updateNilaiRisiko(this)"></td>
                    <td><input type="number" value="${item.impact}" class="w-20 risiko-dampak" oninput="updateNilaiRisiko(this)"></td>
                    <td class="risiko-nilai font-bold ${riskColorClass}">${riskValue}</td>
                    <td><textarea placeholder="Rencana">${item.action_plan_explanation}</textarea></td>
                    <td><input type="text" value="${item.action_plan_reference}" placeholder="Ref"></td>
                    <td><input type="text" value="${item.action_plan_responsible}" placeholder="Posisi"></td>
                    <td><input type="date" value="${item.completion_date}"></td>
                    <td><input type="number" value="${item.after_probability}" class="w-20 final-probabilitas" oninput="updateNilaiRisiko(this)"></td>
                        <td><input type="number" value="${item.after_impact}" class="w-20 final-dampak" oninput="updateNilaiRisiko(this)"></td>
                        <td class="final-nilai font-bold ${finalColorClass}">${finalValue}</td>
                    <td class="px-2 py-2 border text-center"><button class="text-red-500 hover:text-red-700 font-semibold text-xs" onclick="deleteIBPR(${item.id})">Hapus</button></td>
                `;
            } else {
                row.innerHTML = `
                <td class="text-center">
                    <input type="checkbox" class="row-check" value="${item.id}">
                </td>
                    <td class="text-center">${hazardId}</td>
                    <td class="text-left">${item.hazard_description ?? '-'}</td>
                    <td class="text-left">${item.control_explanation ?? '-'}</td>
                    <td class="text-left">${item.control_reference ?? '-'}</td>
                    <td class="text-center">${item.effectiveness === 'Tinggi' ? '✓' : ''}</td>
                    <td class="text-center">${item.effectiveness === 'Sedang' ? '✓' : ''}</td>
                    <td class="text-center">${item.effectiveness === 'Rendah' ? '✓' : ''}</td>
                    <td class="text-center">${item.responsible_position ?? '-'}</td>
                    <td>${item.risk_explanation ?? '-'}</td>
                    <td class="text-center">${item.probability ?? '-'}</td>
                    <td class="text-center">${item.impact ?? '-'}</td>
                    <td class="text-center ${riskColorClass}">${riskValue ?? '-'}</td>
                    <td>${item.action_plan_explanation ?? '-'}</td>
                    <td class="text-center">${item.action_plan_reference ?? '-'}</td>
                    <td class="text-center">${item.action_plan_responsible ?? '-'}</td>
                    <td class="text-center">${item.completion_date ?? '-'}</td>
                    <td class="text-center">${item.after_probability ?? '-'}</td>
                    <td class="text-center">${item.after_impact ?? '-'}</td>
                    <td class="text-center ${finalColorClass}">${finalValue ?? '-'}</td>
                `;
            }
            tableBody.appendChild(row);
        });
    }
}

function toggleIBPREditMode(isEditing) {
    const editBtn = document.getElementById('ibpr-edit-btn');
    const saveBtn = document.getElementById('ibpr-save-btn');
    const cancelBtn = document.getElementById('ibpr-cancel-btn');
    const addRowContainer = document.getElementById('add-ibpr-row-container');

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

    renderIBPRTable(isEditing);
}

function saveIBPRChanges() {
    const tableRows = document.querySelectorAll('#ibpr-table-body tr');
    const newData = [];

    tableRows.forEach(row => {
        const inputs = row.querySelectorAll('input, textarea');
        const radios = row.querySelectorAll('input[type="radio"]:checked');
        const ibprId = row.dataset.id ? parseInt(row.dataset.id, 10) : null;

        const data = {
            id: ibprId,
            hazard_description: inputs[1].value,
            control_explanation: inputs[2].value,
            control_reference: inputs[3].value,
            effectiveness: radios.length > 0 ? radios[0].value : '',
            responsible_position: inputs[7].value,
            risk_explanation: inputs[8].value,
            probability: parseInt(inputs[9].value) || 0,
            impact: parseInt(inputs[10].value) || 0,
            action_plan_explanation: inputs[11].value,
            action_plan_reference: inputs[12].value,
            action_plan_responsible: inputs[13].value,
            completion_date: inputs[14].value,
            after_probability: inputs[15].value,
            after_impact: inputs[16].value,
        };

        const oldData = ibprData.find(item => item.id === ibprId);

        if (oldData) {
            const hasChanges = oldData.hazard_description !== data.hazard_description ||
                oldData.control_explanation !== data.control_explanation ||
                oldData.control_reference !== data.control_reference ||
                oldData.effectiveness !== data.effectiveness ||
                oldData.responsible_position !== data.responsible_position ||
                oldData.risk_explanation !== data.risk_explanation ||
                oldData.probability !== data.probability ||
                oldData.impact !== data.impact ||
                oldData.action_plan_explanation !== data.action_plan_explanation ||
                oldData.action_plan_reference !== data.action_plan_reference ||
                oldData.action_plan_responsible !== data.action_plan_responsible ||
                oldData.completion_date !== data.completion_date ||
                oldData.after_probability !== data.after_probability ||
                oldData.after_impact !== data.after_impact;

            if (hasChanges) {
                newData.push(data);
            }
        } else {
            if (data.hazard_description && data.control_explanation && data.control_reference && data.effectiveness && data.responsible_position && data.risk_explanation && data.probability && data.impact && data.action_plan_explanation && data.action_plan_reference && data.action_plan_responsible && data.completion_date && data.after_probability && data.after_impact) {
                newData.push(data);
            }
        }
    });

    if (newData.length > 0) {
        saveIBPR(newData);
    } else {
        toggleIBPREditMode(false);
    }
}

function addIBPRRow() {
    const tableBody = document.getElementById('ibpr-table-body');
    const lastId = tableBody.querySelector('tr:last-child') ? parseInt(tableBody.querySelector('tr:last-child').dataset.id, 10) : 0;
    const newRow = document.createElement('tr');
    newRow.setAttribute('data-id', lastId + 1);
    newRow.innerHTML = `
        <td><input type="text" class="w-20" value="${(lastId + 1).toString().padStart(3, '0')}" placeholder="ID" readonly></td>
        <td><textarea placeholder="Bahaya"></textarea></td>
        <td><textarea placeholder="Penjelasan"></textarea></td>
        <td><input type="text" placeholder="Ref"></td>
        <td class="text-center"><input type="radio" name="effectiveness-${lastId + 1}" value="Tinggi"></td>
        <td class="text-center"><input type="radio" name="effectiveness-${lastId + 1}" value="Sedang"></td>
        <td class="text-center"><input type="radio" name="effectiveness-${lastId + 1}" value="Rendah"></td>
        <td><input type="text" placeholder="Posisi"></td>
        <td><textarea placeholder="Risiko"></textarea></td>
        <td><input type="number" value="0" class="w-20 risiko-probabilitas" oninput="updateNilaiRisiko(this)"></td>
        <td><input type="number" value="0" class="w-20 risiko-dampak" oninput="updateNilaiRisiko(this)"></td>
        <td class="risiko-nilai font-bold">0</td>
        <td><textarea placeholder="Rencana"></textarea></td>
        <td><input type="text" placeholder="Ref"></td>
        <td><input type="text" placeholder="Posisi"></td>
        <td><input type="date"></td>
        <td><input type="number" value="0" class="w-20 final-probabilitas" oninput="updateNilaiRisiko(this)"></td>
            <td><input type="number" value="0" class="w-20 final-dampak" oninput="updateNilaiRisiko(this)"></td>
            <td class="final-nilai font-bold">0</td>
        <td class="px-2 py-2 border text-center"><button class="text-red-500 hover:text-red-700 font-semibold text-xs" onclick="this.closest('tr').remove()">Hapus</button></td>
    `;
    tableBody.appendChild(newRow);
}
// --- End of IBPR functions ---

$(document).ready(function () {
    loadIBPR();
});

const ibprEditBtn = document.getElementById('ibpr-edit-btn');
const ibprSaveBtn = document.getElementById('ibpr-save-btn');
const ibprCancelBtn = document.getElementById('ibpr-cancel-btn');
const addIBPRRowBtn = document.getElementById('add-ibpr-row-btn');

if (ibprEditBtn) ibprEditBtn.addEventListener('click', () => toggleIBPREditMode(true));
if (ibprSaveBtn) ibprSaveBtn.addEventListener('click', saveIBPRChanges);
if (ibprCancelBtn) ibprCancelBtn.addEventListener('click', () => toggleIBPREditMode(false));
if (addIBPRRowBtn) addIBPRRowBtn.addEventListener('click', addIBPRRow);

