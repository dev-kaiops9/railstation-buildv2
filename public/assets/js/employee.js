let positionData = [];

function getEmployeePhotoUrl(employee) {
    if (!employee.photo_url) return 'https://placehold.co/80x80/E8ECF5/65708A?text=Foto';
    return employee.photo_url.startsWith('http') ? employee.photo_url : `/storage/${employee.photo_url}`;
}
let jamKerjaData = [];
let kebutuhanData = [];
let employees = [];
let currentPage = 1;
let perPage = 10;
const dutyRosterManager = new DutyRosterManager();
const paginationHelper = new PaginationHelper('employee');

// --- Start of Position functions ---

function loadPositions() {
    $.ajax({
        url: "/employee/positions",
        type: "GET",
        success: function (response) {
            positionData = response;
            renderPositions();
        },
        error: function (error) {
            showMessage('Gagal memuat data', 'error');
        },
    });
}

function renderPositions() {
    const tableBody = document.getElementById("position-cards");
    tableBody.innerHTML = "";
    let totalEmployees = 0;
    positionData.forEach((position) => {
        totalEmployees += position.total;
    });

    const card = document.createElement("div");
    card.classList.add("bg-white", "rounded-xl", "shadow-md", "p-4", "text-center");
    card.innerHTML = `
        <h3 class="text-blue-600 text-xs sm:text-sm font-bold">Total Pegawai</h3>
        <p class="text-gray-900 text-xl sm:text-2xl font-bold mt-1">${totalEmployees}</p>
    `;
    tableBody.appendChild(card);

    positionData.forEach((position) => {
        const card = document.createElement("div");
        card.classList.add("bg-white", "rounded-xl", "shadow-md", "p-4", "text-center");
        card.innerHTML = `
            <h3 class="text-gray-500 text-xs sm:text-sm font-medium">${position.position}</h3>
            <p class="text-gray-900 text-xl sm:text-2xl font-bold mt-1">${position.total}</p>
        `;
        tableBody.appendChild(card);
    });
}

// --- End of Position functions ---

// --- Start of Employee functions ---
function loadEmployees(page = 1) {
    const tableBody = document.getElementById("employee-table-body");
    if (tableBody) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="px-6 py-4"><div class="inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50 my-4">
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
        url: "/employee/get",
        type: "GET",
        data: { page: page, per_page: perPage },
        success: function (response) {
            employees = response.data;
            currentPage = response.current_page;

            renderMainEmployeeTable(false);

            renderCertificationTable();
            renderSkillTable();

            dutyRosterManager.loadDutyRoster();
            paginationHelper.render(response, (page) => loadEmployees(page));
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

function saveNewEmployees(employees) {
    $.ajax({
        url: "/employee/save",
        type: "POST",
        data: {
            _token: token,
            employees: employees
        },
        success: function (response) {
            console.log("Data pegawai berhasil disimpan:", response);

            loadEmployees(currentPage);
            dutyRosterManager.loadDutyRoster();

            toggleMainEmployeeEditMode(false);

            showMessage("Data pegawai berhasil disimpan", "success");
        },
        error: function (xhr) {
            console.error("Gagal menyimpan data pegawai:", xhr);

            let message = "Gagal menyimpan data pegawai";

            if (xhr.responseJSON) {
                if (xhr.responseJSON.message) {
                    message = xhr.responseJSON.message;
                }

                if (xhr.responseJSON.errors) {
                    console.error("Validation errors:", xhr.responseJSON.errors);
                }
            }

            showMessage(message, "error");
        }
    });
}

function deleteEmployee(id) {
    if (!confirm("Apakah Anda yakin ingin menghapus pegawai ini?")) return;

    $.ajax({
        url: "/employee/delete",
        type: "POST",
        data: { _token: token, id: id },
        success: function (response) {
            employees = employees.filter((employee) => employee.id !== id);
            renderMainEmployeeTable(true);
        },
        error: function (error) {
            showMessage('Gagal menghapus data', 'error');
        },
    });
}

function moveEmployee(employeeId, newStation) {
    $.ajax({
        url: "/employee/move",
        type: "POST",
        data: {
            _token: token,
            id: employeeId,
            station: newStation,
        },
        success: function (response) {
            employees = employees.filter((employee) => employee.id !== employeeId);
            loadEmployees(currentPage);
            dutyRosterManager.loadDutyRoster();
        },
        error: function (error) {
            showMessage('Gagal mempindahkan data', 'error');
        },
    });
}

function renderMainEmployeeTable(isEditing = false) {
    const tableBody = document.getElementById("employee-table-body");
    const optionsHeader = document.getElementById("options-header");
    if (!tableBody || !optionsHeader) return;

    tableBody.innerHTML = "";
    optionsHeader.classList.remove("hidden");

    if (employees.length === 0 && !isEditing) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td colspan="7" class="px-6 py-4 text-center text-sm text-gray-500">
                Data tidak ditemukan
            </td>
        `;
        tableBody.appendChild(row);
    } else {
        employees.forEach((employee) => {
            const row = document.createElement("tr");
            row.setAttribute("data-id", employee.id);

            if (isEditing) {
                row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><img src="${getEmployeePhotoUrl(employee)}" alt="Foto ${employee.name}" class="w-9 h-9 rounded-full object-cover"></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="text" class="w-full rounded-md border-gray-300 shadow-sm editable-table" value="${employee.name}" data-field="name"></td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="text" class="w-full rounded-md border-gray-300 shadow-sm editable-table" value="${employee.nipp}" data-field="nipp"></td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="text" class="w-full rounded-md border-gray-300 shadow-sm editable-table" value="${employee.position}" data-field="position"></td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="text" class="w-full rounded-md border-gray-300 shadow-sm editable-table" value="${employee.unit}" data-field="unit"></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="text" class="w-full rounded-md border-gray-300 shadow-sm editable-table" value="${employee.grade || ''}" data-field="grade" placeholder="Grade"></td>
                    <td class="px-3 py-2 text-center">
                        <button
                            type="button"
                            class="employee-detail-btn bg-blue-500 text-white text-xs font-medium px-3 py-1.5 rounded-full hover:bg-blue-600 transition" data-employee-id="${employee.id}"> Detail
                        </button>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button class="text-blue-500 hover:text-blue-700 font-semibold" onclick="openMoveEmployeeModal(${employee.id})">Pindahkan</button>
                        <button class="text-red-500 hover:text-red-700 font-semibold ml-2" onclick="deleteEmployee(${employee.id})">Hapus</button>
                    </td>
                `;
            } else {
                row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><img src="${getEmployeePhotoUrl(employee)}" alt="Foto ${employee.name}" class="w-9 h-9 rounded-full object-cover"></td><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${employee.name}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${employee.nipp}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${employee.position}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${employee.unit}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${employee.grade || '-'}</td>
                    <td class="px-3 py-2 text-center">
                        <button
                            type="button"
                            class="employee-detail-btn bg-blue-500 text-white text-xs font-medium px-3 py-1.5 rounded-full hover:bg-blue-600 transition"
                            data-employee-id="${employee.id}">
                            Detail
                        </button>
                    </td>
                `;
            }
            tableBody.appendChild(row);
            const detailButton = row.querySelector('.employee-detail-btn');

            if (detailButton) {
                detailButton.addEventListener('click', function (event) {
                    event.stopPropagation();

                    const employeeId = this.dataset.employeeId;

                    if (employeeId) {
                        window.location.href = `/employee/${employeeId}`;
                    }
                });
            }
        });
    }
}

function renderCertificationTable() {
    const tbody = document.getElementById('certification-table-body');

    if (!tbody) return;

    const certificationEmployees = employees.filter(employee =>
        employee.cert_type ||
        employee.cert_number ||
        employee.cert_expiry
    );

    if (certificationEmployees.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="px-4 py-8 text-center text-gray-500">
                    Belum ada data sertifikasi.
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = certificationEmployees.map(employee => {

        const photoUrl = getEmployeePhotoUrl(employee);

        const status = employee.cert_status || '-';

        let statusClass = 'bg-gray-100 text-gray-600';

        if (status === 'Aktif') {
            statusClass = 'bg-green-100 text-green-700';
        } else if (status === 'Tidak Aktif' || status === 'Kadaluarsa') {
            statusClass = 'bg-red-100 text-red-700';
        }

        return `
            <tr
                class="certification-row cursor-pointer hover:bg-blue-50 transition-colors"
                data-employee-id="${employee.id}">

                <td class="px-3 py-2">
                    <img
                        src="${photoUrl}"
                        alt="Foto ${employee.name}"
                        class="w-10 h-10 rounded-full object-cover border border-gray-200">
                </td>

                <td class="px-3 py-2">
                    <div class="text-xs font-medium text-gray-800">
                        ${employee.name || '-'}
                    </div>
                    <div class="text-xs text-gray-500">
                        ${employee.nipp || '-'}
                    </div>
                </td>

                <td class="px-3 py-2 text-xs text-gray-600">
                    ${employee.cert_type || '-'}
                </td>

                <td class="px-3 py-2 text-xs text-gray-600">
                    ${employee.cert_number || '-'}
                </td>

                <td class="px-3 py-2 text-xs text-gray-600 whitespace-nowrap">
                    ${employee.cert_expiry || '-'}
                </td>

                <td class="px-3 py-2">
                    <span class="inline-flex px-3 py-1 rounded-full text-xs font-semibold ${statusClass}">
                        ${status}
                    </span>
                </td>

            </tr>
        `;
    }).join('');

    tbody.querySelectorAll('.certification-row').forEach(row => {
        row.addEventListener('click', function () {
            const employeeId = this.dataset.employeeId;

            if (employeeId) {
                window.location.href = `/employee/${employeeId}`;
            }
        });
    });
}

function renderSkillTable() {
    const tbody = document.getElementById('skill-table-body');

    if (!tbody) return;

    const skillEmployees = employees.filter(employee =>
        employee.skill_type ||
        employee.skill_number ||
        employee.skill_expiry
    );

    if (skillEmployees.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="px-4 py-8 text-center text-gray-500">
                    Belum ada data kecakapan.
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = skillEmployees.map(employee => {

        const photoUrl = getEmployeePhotoUrl(employee);

        const status = employee.skill_status || '-';

        let statusClass = 'bg-gray-100 text-gray-600';

        if (status === 'Aktif') {
            statusClass = 'bg-green-100 text-green-700';
        } else if (status === 'Tidak Aktif' || status === 'Kadaluarsa') {
            statusClass = 'bg-red-100 text-red-700';
        }

        return `
            <tr
                class="skill-row cursor-pointer hover:bg-blue-50 transition-colors"
                data-employee-id="${employee.id}">

                <td class="px-3 py-2">
                    <img
                        src="${photoUrl}"
                        alt="Foto ${employee.name}"
                        class="w-8 h-8 rounded-full object-cover border border-gray-200">
                </td>

                <td class="px-3 py-2">
                    <div class="text-xs font-medium text-gray-800">
                        ${employee.name || '-'}
                    </div>
                    <div class="text-xs text-gray-500">
                        ${employee.nipp || '-'}
                    </div>
                </td>

                <td class="px-3 py-2 text-xs text-gray-600">
                    ${employee.skill_type || '-'}
                </td>

                <td class="px-3 py-2 text-xs text-gray-600">
                    ${employee.skill_number || '-'}
                </td>

                <td class="px-3 py-2 text-xs text-gray-600 whitespace-nowrap">
                    ${employee.skill_expiry || '-'}
                </td>

                <td class="px-3 py-2">
                    <span class="inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${statusClass}">
                        ${status}
                    </span>
                </td>

            </tr>
        `;
    }).join('');

    tbody.querySelectorAll('.skill-row').forEach(row => {
        row.addEventListener('click', function () {
            const employeeId = this.dataset.employeeId;

            if (employeeId) {
                window.location.href = `/employee/${employeeId}`;
            }
        });
    });
}

function toggleMainEmployeeEditMode(isEditing) {
    const editBtn = document.getElementById("main-employee-edit-btn");
    const saveBtn = document.getElementById("main-employee-save-btn");
    const cancelBtn = document.getElementById("main-employee-cancel-btn");
    const addEmployeeContainer = document.getElementById("add-employee-row-container");
    const optionsHeader = document.getElementById("options-header");

    if (isEditing) {
        editBtn.classList.add("hidden");
        saveBtn.classList.remove("hidden");
        cancelBtn.classList.remove("hidden");
        addEmployeeContainer.classList.remove("hidden");
        optionsHeader.classList.remove("hidden");
    } else {
        editBtn.classList.remove("hidden");
        saveBtn.classList.add("hidden");
        cancelBtn.classList.add("hidden");
        addEmployeeContainer.classList.add("hidden");
        optionsHeader.classList.remove("hidden");
    }

    renderMainEmployeeTable(isEditing);

}

function saveMainEmployeeChanges() {
    const tableRows = document.querySelectorAll("#employee-table-body tr");
    let newEmployees = [];

    tableRows.forEach((row) => {
        const inputs = row.querySelectorAll("input[data-field]");

        if (inputs.length !== 5) return;

        const employeeId = row.dataset.id ? parseInt(row.dataset.id, 10) : null;
        const employeeData = {
            id: employeeId,
            name: inputs[0].value,
            nipp: inputs[1].value,
            position: inputs[2].value,
            unit: inputs[3].value,
            grade: inputs[4].value,
        };

        if (employeeId) {
            const employeeIndex = employees.findIndex((e) => e.id === employeeId);

            if (employeeIndex !== -1) {
                const oldEmployee = employees[employeeIndex];
                const hasChanges =
                    oldEmployee.name !== employeeData.name ||
                    oldEmployee.nipp !== employeeData.nipp ||
                    oldEmployee.position !== employeeData.position ||
                    oldEmployee.unit !== employeeData.unit ||
                    (oldEmployee.grade || '') !== employeeData.grade;

                if (hasChanges) {
                    newEmployees.push(employeeData);
                }
            }
        } else {
            if (employeeData.name && employeeData.nipp && employeeData.position && employeeData.unit) {
                newEmployees.push(employeeData);
            }
        }
    });

    if (newEmployees.length > 0) {
        saveNewEmployees(newEmployees);
    } else {
        toggleMainEmployeeEditMode(false);
    }
}

function addEmptyEmployeeRow() {
    const tableBody = document.getElementById("employee-table-body");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><span class="text-gray-400">-</span></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="text" class="w-full rounded-md border-gray-300 shadow-sm" placeholder="Nama" data-field="name"></td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="text" class="w-full rounded-md border-gray-300 shadow-sm" placeholder="NIPP" data-field="nipp"></td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="text" class="w-full rounded-md border-gray-300 shadow-sm" placeholder="Jabatan" data-field="position"></td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="text" class="w-full rounded-md border-gray-300 shadow-sm" placeholder="Unit" data-field="unit"></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="text" class="w-full rounded-md border-gray-300 shadow-sm" placeholder="Grade" data-field="grade"></td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <button class="text-red-500 hover:text-red-700 font-semibold ml-2" onclick="this.closest('tr').remove()">Hapus</button>
        </td>
    `;
    tableBody.appendChild(newRow);
}

// --- End of Employee functions ---

// --- Start of Pindahkan Pegawai functions ---
function openMoveEmployeeModal(employeeId) {
    const employee = employees.find(e => e.id === employeeId);
    if (!employee) return;

    document.getElementById('move-employee-id').value = employee.id;
    document.getElementById('move-employee-name').value = employee.name;
    document.getElementById('move-employee-nipp').value = employee.nipp;
    document.getElementById('move-employee-position').value = employee.position;

    const stationSelect = document.getElementById('move-employee-new-station');
    const stationDropdownInSidebar = document.querySelector('.sidebar select');
    stationSelect.innerHTML = stationDropdownInSidebar.innerHTML;

    Array.from(stationSelect.options).forEach(option => {
        if (option.value === employee.station.name) {
            option.remove();
        }
    });

    if (stationSelect.options.length > 0) {
        stationSelect.selectedIndex = 0;
    }

    showModal('move-employee-modal');
}

function saveMoveEmployee() {
    const employeeId = parseInt(document.getElementById('move-employee-id').value);
    const newStation = document.getElementById('move-employee-new-station').value;
    const employeeIndex = employees.findIndex(e => e.id === employeeId);

    if (employeeIndex !== -1) {
        moveEmployee(employeeId, newStation);
        employees.splice(employeeIndex, 1);

        let name = employees[employeeIndex].name;
        showMessage(`Pegawai "${name}" berhasil dipindahkan ke stasiun ${newStation}.`);
        renderMainEmployeeTable(true);
    }

    hideModal('move-employee-modal');
}

// --- End of Pindahkan Pegawai functions ---

// --- Start of Kebutuhan Pegawai functions ---

function loadEmployeeRequirements() {
    const tableBody = document.getElementById('kebutuhan-table-body');

    if (tableBody) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="px-6 py-4">
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
        url: "/requirements/get",
        type: "GET",
        success: function (response) {
            kebutuhanData = response;
            renderKebutuhanTable(false);
        },
        error: function (error) {
            if (tableBody) {
                tableBody.innerHTML = `
                    <tr>
                        <td colspan="5" class="px-6 py-4 text-center text-sm text-red-500">
                            Gagal memuat data
                        </td>
                    </tr>
                `;
            }
        },
    });
}

function saveNewRequirements(requirements) {
    $.ajax({
        url: "/requirements/save",
        type: "POST",
        data: {
            _token: token,
            requirements,
        },
        success: function (response) {
            loadEmployeeRequirements();
            toggleKebutuhanEditMode(false);
        },
        error: function (error) {
            showMessage('Gagal menyimpan data', 'error');
        },
    });
}

function deleteRequirement(id) {
    if (!confirm("Apakah Anda yakin ingin menghapus kebutuhan ini?")) return;
    $.ajax({
        url: "/requirements/delete",
        type: "POST",
        data: { _token: token, id },
        success: function (response) {
            kebutuhanData = kebutuhanData.filter((item) => item.id !== id);
            renderKebutuhanTable(true);
        },
        error: function (error) {
            showMessage('Gagal menghapus data', 'error');
        },
    });

}

function renderKebutuhanTable(isEditing) {
    const tableBody = document.getElementById('kebutuhan-table-body');
    const opsiHeader = document.getElementById('kebutuhan-opsi-header');
    if (!tableBody || !opsiHeader) return;

    tableBody.innerHTML = '';

    if (isEditing) {
        opsiHeader.classList.remove('hidden');
    } else {
        opsiHeader.classList.add('hidden');
    }

    if (kebutuhanData.length === 0 && !isEditing) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">
                Data tidak ditemukan
            </td>
        `;
        tableBody.appendChild(row);
    } else {
        kebutuhanData.forEach(item => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', item.id);

            if (isEditing) {
                row.innerHTML = `
                    <td class="px-3 py-2"><input type="text" value="${item.position}" class="w-full rounded-md border-gray-300 shadow-sm editable-table"></td>
                    <td class="px-3 py-2"><input type="number" value="${item.required}" class="w-full rounded-md border-gray-300 shadow-sm editable-table"></td>
                    <td class="px-3 py-2"><input type="number" value="${item.available}" class="w-full rounded-md border-gray-300 shadow-sm editable-table"></td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">${item.shortage}</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">${item.excess}</td>
                    <td class="px-3 py-2 text-center"><button class="text-red-500 hover:text-red-700 font-semibold" onclick="deleteRequirement(${item.id})">Hapus</button></td>
                `;
            } else {
                row.innerHTML = `
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-900">${item.position}</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">${item.required}</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">${item.available}</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">${item.shortage}</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">${item.excess}</td>
                `;
            }

            tableBody.appendChild(row);
        });
    }
}

function toggleKebutuhanEditMode(isEditing) {
    const editBtn = document.getElementById('kebutuhan-edit-btn');
    const saveBtn = document.getElementById('kebutuhan-save-btn');
    const cancelBtn = document.getElementById('kebutuhan-cancel-btn');
    const addRowContainer = document.getElementById('add-kebutuhan-row-container');

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

    renderKebutuhanTable(isEditing);
}

function saveKebutuhanChanges() {
    const tableRows = document.querySelectorAll('#kebutuhan-table-body tr');
    let newRequirements = [];

    tableRows.forEach(row => {
        const inputs = row.querySelectorAll('input');
        const reqId = row.dataset.id ? parseInt(row.dataset.id, 10) : null;
        const requirementData = {
            id: reqId,
            position: inputs[0].value,
            required: parseInt(inputs[1].value),
            available: parseInt(inputs[2].value),
            shortage: 0,
            excess: 0
        };

        if (reqId) {
            const requirementIndex = kebutuhanData.findIndex(r => r.id === reqId);

            if (requirementIndex !== -1) {
                const oldRequirement = kebutuhanData[requirementIndex];
                const hasChanged = oldRequirement.position !== requirementData.position ||
                    oldRequirement.required !== requirementData.required ||
                    oldRequirement.available !== requirementData.available;

                if (hasChanged) {
                    requirementData.shortage = Math.max(0, requirementData.required - requirementData.available);
                    requirementData.excess = Math.max(0, requirementData.available - requirementData.required);

                    newRequirements.push(requirementData);
                }
            }
        } else {
            if (requirementData.position && (requirementData.required || requirementData.required === 0) && (requirementData.available || requirementData.available === 0)) {
                requirementData.shortage = Math.max(0, requirementData.required - requirementData.available);
                requirementData.excess = Math.max(0, requirementData.available - requirementData.required);
                newRequirements.push(requirementData);
            }
        }
    });

    if (newRequirements.length > 0) {
        saveNewRequirements(newRequirements);
    } else {
        toggleKebutuhanEditMode(false);
    }
}

function addKebutuhanRow() {
    const tableBody = document.getElementById('kebutuhan-table-body');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td class="px-3 py-2"><input type="text" placeholder="Jabatan" class="w-full rounded-md border-gray-300 shadow-sm editable-table"></td>
        <td class="px-3 py-2"><input type="number" placeholder="0" class="w-full rounded-md border-gray-300 shadow-sm editable-table"></td>
        <td class="px-3 py-2"><input type="number" placeholder="0" class="w-full rounded-md border-gray-300 shadow-sm editable-table"></td>
        <td class="px-3 py-2"></td>
        <td class="px-3 py-2"></td>
        <td class="px-3 py-2 text-center"><button class="text-red-500 hover:text-red-700 font-semibold" onclick="this.closest('tr').remove()">Hapus</button></td>
    `;
    tableBody.appendChild(newRow);
}

// --- End of Kebutuhan Pegawai functions ---

// --- Start of Shift functions ---
function loadDutyShifts() {
    const tableBody = document.getElementById("jamkerja-table-body");

    if (tableBody) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="px-6 py-4">
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
        url: "/shifts/get",
        type: "GET",
        success: function (response) {
            jamKerjaData = response;
            renderJamKerjaTable(false);
        },
        error: function (error) {
            if (tableBody) {
                tableBody.innerHTML = `
                    <tr>
                        <td colspan="5" class="px-6 py-4 text-center text-sm text-red-500">
                            Gagal memuat data
                        </td>
                    </tr>
                `;
            }
        },
    });
}

function saveNewShifts(shifts) {
    $.ajax({
        url: "/shifts/save",
        type: "POST",
        data: {
            _token: token,
            shifts,
        },
        success: function (response) {
            loadDutyShifts();
            toggleJamKerjaEditMode(false);
        },
        error: function (error) {
            showMessage('Gagal menyimpan data', 'error');
        },
    });
}

function deleteShift(id) {
    if (!confirm("Apakah Anda yakin ingin menghapus data jam kerja ini?")) return;

    $.ajax({
        url: "/shifts/delete",
        type: "POST",
        data: { _token: token, id },
        success: function (response) {
            jamKerjaData = jamKerjaData.filter((item) => item.id !== id);
            renderJamKerjaTable(true);
        },
        error: function (error) {
            showMessage('Gagal menghapus data', 'error');
        },
    });

}

function renderJamKerjaTable(isEditing) {
    const tableBody = document.getElementById('jamkerja-table-body');
    const opsiHeader = document.getElementById('jamkerja-opsi-header');
    if (!tableBody || !opsiHeader) return;

    tableBody.innerHTML = '';

    if (isEditing) {
        opsiHeader.classList.remove('hidden');
    } else {
        opsiHeader.classList.add('hidden');
    }

    if (jamKerjaData.length === 0 && !isEditing) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">
                Data tidak ditemukan
            </td>
        `;
        tableBody.appendChild(row);
    } else {
        jamKerjaData.forEach(item => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', item.id);

            if (isEditing) {
                row.innerHTML = `
                    <td class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900"><input type="text" value="${item.code}" class="w-full rounded-md border-gray-300 shadow-sm editable-table"></td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900"><input type="text" value="${item.name}" class="w-full rounded-md border-gray-300 shadow-sm editable-table"></td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500"><input type="time" value="${item.start_time}" class="w-full rounded-md border-gray-300 shadow-sm editable-table"></td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500"><input type="time" value="${item.end_time}" class="w-full rounded-md border-gray-300 shadow-sm editable-table"></td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" ${item.is_active == 1 ? 'checked' : ''} class="sr-only peer" data-field="is_active">
                            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-center">
                        <button class="text-red-500 hover:text-red-700 font-semibold" onclick="deleteShift(${item.id})">Hapus</button>
                    </td>
                `;
            } else {
                row.innerHTML = `
                    <td class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">${item.code}</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">${item.name}</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">${item.start_time}</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">${item.end_time}</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">${item.is_active == 1 ? 'Aktif' : 'Tidak Aktif'}</td>
                `;
            }

            tableBody.appendChild(row);
        });
    }
}

function toggleJamKerjaEditMode(isEditing) {
    const editBtn = document.getElementById('jamkerja-edit-btn');
    const saveBtn = document.getElementById('jamkerja-save-btn');
    const cancelBtn = document.getElementById('jamkerja-cancel-btn');
    const addRowContainer = document.getElementById('add-jamkerja-row-container');

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

    renderJamKerjaTable(isEditing);
}

function saveJamKerjaChanges() {
    const tableRows = document.querySelectorAll('#jamkerja-table-body tr');
    let newShifts = [];

    tableRows.forEach(row => {
        const inputs = row.querySelectorAll('input');
        const shiftId = row.dataset.id ? parseInt(row.dataset.id, 10) : null;
        const shiftData = {
            id: shiftId,
            code: inputs[0].value,
            name: inputs[1].value,
            start_time: inputs[2].value,
            end_time: inputs[3].value,
            is_active: inputs[4].checked ? true : false
        };

        if (shiftId) {
            const shiftIndex = jamKerjaData.findIndex(s => s.id === shiftId);

            if (shiftIndex !== -1) {
                const oldShift = jamKerjaData[shiftIndex];

                const hasChanged = oldShift.code !== shiftData.code ||
                    oldShift.name !== shiftData.name ||
                    oldShift.start_time !== shiftData.start_time ||
                    oldShift.end_time !== shiftData.end_time ||
                    oldShift.is_active !== shiftData.is_active;

                if (hasChanged) {
                    newShifts.push(shiftData);
                }
            }
        } else {
            if (shiftData.code && shiftData.name && shiftData.start_time && shiftData.end_time) {
                newShifts.push(shiftData);
            }
        }
    });

    if (newShifts.length > 0) {
        saveNewShifts(newShifts);
    } else {
        toggleJamKerjaEditMode(false);
    }
}

function addJamKerjaRow() {
    const tableBody = document.getElementById('jamkerja-table-body');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td class="px-3 py-2"><input type="text" placeholder="Kode" class="w-full rounded-md border-gray-300 shadow-sm editable-table"></td>
        <td class="px-3 py-2"><input type="text" placeholder="Dinas" class="w-full rounded-md border-gray-300 shadow-sm editable-table"></td>
        <td class="px-3 py-2"><input type="time" class="w-full rounded-md border-gray-300 shadow-sm editable-table"></td>
        <td class="px-3 py-2"><input type="time" class="w-full rounded-md border-gray-300 shadow-sm editable-table"></td>
        <td class="px-3 py-2">
            <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" class="sr-only peer" data-field="is_active">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
        </td>
        <td class="px-3 py-2 text-center"><button class="text-red-500 hover:text-red-700 font-semibold" onclick="this.closest('tr').remove()">Hapus</button></td>
    `;
    tableBody.appendChild(newRow);
}

// --- End of Shift functions ---

const mainEmployeeEditBtn = document.getElementById('main-employee-edit-btn');
const mainEmployeeSaveBtn = document.getElementById('main-employee-save-btn');
const mainEmployeeCancelBtn = document.getElementById('main-employee-cancel-btn');
const addEmployeeRowBtn = document.getElementById('add-employee-row-btn');

if (mainEmployeeEditBtn) mainEmployeeEditBtn.addEventListener('click', () => toggleMainEmployeeEditMode(true));
if (mainEmployeeSaveBtn) mainEmployeeSaveBtn.addEventListener('click', saveMainEmployeeChanges);
if (mainEmployeeCancelBtn) mainEmployeeCancelBtn.addEventListener('click', () => toggleMainEmployeeEditMode(false));
if (addEmployeeRowBtn) addEmployeeRowBtn.addEventListener('click', addEmptyEmployeeRow);

const closeMoveModalBtn = document.getElementById('close-move-modal-btn');
const cancelMoveBtn = document.getElementById('cancel-move-btn');
const saveMoveBtn = document.getElementById('save-move-btn');
const moveEmployeeModal = document.getElementById('move-employee-modal');

if (closeMoveModalBtn) closeMoveModalBtn.addEventListener('click', () => hideModal('move-employee-modal'));
if (cancelMoveBtn) cancelMoveBtn.addEventListener('click', () => hideModal('move-employee-modal'));
if (saveMoveBtn) saveMoveBtn.addEventListener('click', saveMoveEmployee);
if (moveEmployeeModal) {
    moveEmployeeModal.addEventListener('click', (e) => {
        if (e.target.id === 'move-employee-modal') {
            hideModal('move-employee-modal');
        }
    });
}

const kebutuhanEditBtn = document.getElementById('kebutuhan-edit-btn');
const kebutuhanSaveBtn = document.getElementById('kebutuhan-save-btn');
const kebutuhanCancelBtn = document.getElementById('kebutuhan-cancel-btn');
const addKebutuhanRowBtn = document.getElementById('add-kebutuhan-row-btn');

if (kebutuhanEditBtn) kebutuhanEditBtn.addEventListener('click', () => toggleKebutuhanEditMode(true));
if (kebutuhanSaveBtn) kebutuhanSaveBtn.addEventListener('click', saveKebutuhanChanges);
if (kebutuhanCancelBtn) kebutuhanCancelBtn.addEventListener('click', () => toggleKebutuhanEditMode(false));
if (addKebutuhanRowBtn) addKebutuhanRowBtn.addEventListener('click', addKebutuhanRow);

const jamkerjaEditBtn = document.getElementById('jamkerja-edit-btn');
const jamkerjaSaveBtn = document.getElementById('jamkerja-save-btn');
const jamkerjaCancelBtn = document.getElementById('jamkerja-cancel-btn');
const addJamkerjaRowBtn = document.getElementById('add-jamkerja-row-btn');

if (jamkerjaEditBtn) jamkerjaEditBtn.addEventListener('click', () => toggleJamKerjaEditMode(true));
if (jamkerjaSaveBtn) jamkerjaSaveBtn.addEventListener('click', saveJamKerjaChanges);
if (jamkerjaCancelBtn) jamkerjaCancelBtn.addEventListener('click', () => toggleJamKerjaEditMode(false));
if (addJamkerjaRowBtn) addJamkerjaRowBtn.addEventListener('click', addJamKerjaRow);

function addCertificationRow() {

    const tbody = document.getElementById('certification-table-body');

    if (!tbody) return;

    // Cegah lebih dari satu baris tambah sekaligus
    if (document.getElementById('new-certification-row')) {
        return;
    }

    const row = document.createElement('tr');

    row.id = 'new-certification-row';

    row.className = 'bg-blue-50';

    row.innerHTML = `
        <td class="px-3 py-2">
            <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                -
            </div>
        </td>

        <td class="px-3 py-2">
            <select
                id="new-certification-employee"
                class="w-full min-w-[130px] border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:ring-2 focus:ring-blue-400 focus:outline-none">

                <option value="">
                    Pilih Pegawai
                </option>

                ${employees.map(employee => `
                    <option value="${employee.id}">
                        ${employee.name} - ${employee.nipp}
                    </option>
                `).join('')}

            </select>
        </td>

        <td class="px-3 py-2">
            <input
                type="text"
                id="new-certification-type"
                placeholder="Jenis"
                class="w-full min-w-[100px] border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:ring-2 focus:ring-blue-400 focus:outline-none">
        </td>

        <td class="px-3 py-2">
            <input
                type="text"
                id="new-certification-number"
                placeholder="Nomor"
                class="w-full min-w-[110px] border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:ring-2 focus:ring-blue-400 focus:outline-none">
        </td>

        <td class="px-3 py-2">
            <input
                type="date"
                id="new-certification-expiry"
                class="w-full min-w-[120px] border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:ring-2 focus:ring-blue-400 focus:outline-none">
        </td>

        

        <td class="px-3 py-2">
            <div class="flex items-center gap-1">

                <button
                    type="button"
                    id="save-new-certification"
                    class="px-2.5 py-1.5 rounded-full bg-green-500 text-white text-[10px] font-medium hover:bg-green-600">
                    Simpan
                </button>

                <button
                    type="button"
                    id="cancel-new-certification"
                    class="px-2.5 py-1.5 rounded-full bg-gray-400 text-white text-[10px] font-medium hover:bg-gray-500">
                    Batal
                </button>

            </div>
        </td>
    `;

    tbody.prepend(row);

    setupCertificationImagePreview();

    document
        .getElementById('save-new-certification')
        ?.addEventListener('click', saveNewCertification);

    document
        .getElementById('cancel-new-certification')
        ?.addEventListener('click', () => {
            row.remove();
        });
}

function addSkillRow() {
    const tbody = document.getElementById('skill-table-body');

    if (!tbody) return;

    // Cegah lebih dari satu baris tambah
    if (document.getElementById('new-skill-row')) {
        return;
    }

    const row = document.createElement('tr');

    row.id = 'new-skill-row';
    row.className = 'bg-blue-50';

    row.innerHTML = `
        <td class="px-3 py-2">
            <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                -
            </div>
        </td>

        <td class="px-3 py-2">
            <select
                id="new-skill-employee"
                class="w-full min-w-[130px] border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:ring-2 focus:ring-blue-400 focus:outline-none">

                <option value="">
                    Pilih Pegawai
                </option>

                ${employees.map(employee => `
                    <option value="${employee.id}">
                        ${employee.name} - ${employee.nipp}
                    </option>
                `).join('')}

            </select>
        </td>

        <td class="px-3 py-2">
            <input
                type="text"
                id="new-skill-type"
                placeholder="Jenis"
                class="w-full min-w-[100px] border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:ring-2 focus:ring-blue-400 focus:outline-none">
        </td>

        <td class="px-3 py-2">
            <input
                type="text"
                id="new-skill-number"
                placeholder="Nomor"
                class="w-full min-w-[110px] border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:ring-2 focus:ring-blue-400 focus:outline-none">
        </td>

        <td class="px-3 py-2">
            <input
                type="date"
                id="new-skill-expiry"
                class="w-full min-w-[120px] border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:ring-2 focus:ring-blue-400 focus:outline-none">
        </td>

        <td class="px-3 py-2">
            <div class="flex items-center gap-1">

                <button
                    type="button"
                    id="save-new-skill"
                    class="px-2.5 py-1.5 rounded-full bg-green-500 text-white text-[10px] font-medium hover:bg-green-600">
                    Simpan
                </button>

                <button
                    type="button"
                    id="cancel-new-skill"
                    class="px-2.5 py-1.5 rounded-full bg-gray-400 text-white text-[10px] font-medium hover:bg-gray-500">
                    Batal
                </button>

            </div>
        </td>
    `;

    tbody.prepend(row);

    document
        .getElementById('save-new-skill')
        ?.addEventListener('click', saveNewSkill);

    document
        .getElementById('cancel-new-skill')
        ?.addEventListener('click', () => {
            row.remove();
        });
}

async function saveNewSkill() {
    const employeeId =
        document.getElementById('new-skill-employee')?.value;

    const skillType =
        document.getElementById('new-skill-type')?.value.trim();

    const skillNumber =
        document.getElementById('new-skill-number')?.value.trim();

    const skillExpiry =
        document.getElementById('new-skill-expiry')?.value;


    // ==============================
    // CARI DATA PEGAWAI
    // ==============================

    const employee = employees.find(
        item => String(item.id) === String(employeeId)
    );

    if (!employee) {
        alert('Data pegawai tidak ditemukan.');
        return;
    }


    // ==============================
    // VALIDASI
    // ==============================

    if (!employeeId) {
        alert('Silakan pilih pegawai terlebih dahulu.');
        return;
    }

    if (!skillType) {
        alert('Jenis kecakapan wajib diisi.');
        return;
    }

    if (!skillNumber) {
        alert('Nomor kecakapan wajib diisi.');
        return;
    }

    if (!skillExpiry) {
        alert('Masa berlaku wajib diisi.');
        return;
    }


    // ==============================
    // FORM DATA
    // ==============================

    const formData = new FormData();

    formData.append(
        '_token',
        document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute('content')
    );

    // ID PEGAWAI
    formData.append('id', employee.id);

    // DATA UTAMA PEGAWAI
    formData.append('name', employee.name || '');

    formData.append('nipp', employee.nipp || '');

    formData.append('position', employee.position || '');

    formData.append('unit', employee.unit || '');

    formData.append('station_id', employee.station_id || '');

    formData.append('grade', employee.grade || '');


    // DATA KECAKAPAN
    formData.append('skill_type', skillType);

    formData.append('skill_number', skillNumber);

    formData.append('skill_expiry', skillExpiry);

    formData.append('skill_status', 'Aktif');


    // ==============================
    // SIMPAN KE SERVER
    // ==============================

    try {

        const response = await fetch('/employee/update', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });


        const result = await response.json();


        // ==============================
        // ERROR
        // ==============================

        if (!response.ok) {

            console.error(
                'Validation error:',
                result.errors
            );

            throw new Error(
                result.message ||
                'Gagal menyimpan data kecakapan.'
            );
        }


        // ==============================
        // UPDATE DATA LOKAL
        // ==============================

        employee.skill_type = skillType;

        employee.skill_number = skillNumber;

        employee.skill_expiry = skillExpiry;

        employee.skill_status = 'Aktif';


        // ==============================
        // REFRESH TABEL
        // ==============================

        renderSkillTable();


        alert(
            'Data kecakapan berhasil disimpan.'
        );


    } catch (error) {

        console.error(
            'Gagal menyimpan kecakapan:',
            error
        );

        alert(
            error.message ||
            'Terjadi kesalahan saat menyimpan data kecakapan.'
        );
    }
}

function setupCertificationImagePreview() {
    const input = document.getElementById('new-certification-image');
    const previewContainer = document.getElementById('new-certification-image-preview');
    const previewImage = document.getElementById('new-certification-preview-img');
    const fileName = document.getElementById('new-certification-image-name');

    if (!input) return;

    input.addEventListener('change', function () {

        const file = this.files[0];

        if (!file) {
            previewContainer?.classList.add('hidden');

            if (fileName) {
                fileName.textContent = '';
            }

            return;
        }

        // Validasi tipe file
        if (!file.type.startsWith('image/')) {
            alert('File harus berupa gambar.');

            this.value = '';

            previewContainer?.classList.add('hidden');

            return;
        }

        // Maksimal 2 MB
        if (file.size > 2 * 1024 * 1024) {
            alert('Ukuran gambar maksimal 2 MB.');

            this.value = '';

            previewContainer?.classList.add('hidden');

            return;
        }

        if (fileName) {
            fileName.textContent = file.name;
        }

        const reader = new FileReader();

        reader.onload = function (event) {

            if (previewImage) {
                previewImage.src = event.target.result;
            }

            previewContainer?.classList.remove('hidden');
        };

        reader.readAsDataURL(file);
    });
}

async function saveNewCertification() {
    const employeeId =
        document.getElementById('new-certification-employee')?.value;

    const certType =
        document.getElementById('new-certification-type')?.value.trim();

    const certNumber =
        document.getElementById('new-certification-number')?.value.trim();

    const certExpiry =
        document.getElementById('new-certification-expiry')?.value;

    const imageInput =
        document.getElementById('new-certification-image');

    const imageFile =
        imageInput?.files?.[0];


    // ==============================
    // CARI DATA PEGAWAI
    // ==============================

    const employee = employees.find(
        item => String(item.id) === String(employeeId)
    );

    if (!employee) {
        alert('Data pegawai tidak ditemukan.');
        return;
    }


    // ==============================
    // VALIDASI
    // ==============================

    if (!employeeId) {
        alert('Silakan pilih pegawai terlebih dahulu.');
        return;
    }

    if (!certType) {
        alert('Jenis sertifikasi wajib diisi.');
        return;
    }

    if (!certNumber) {
        alert('Nomor sertifikasi wajib diisi.');
        return;
    }

    if (!certExpiry) {
        alert('Masa berlaku wajib diisi.');
        return;
    }

    if (!imageFile) {
        alert('Silakan upload gambar sertifikasi.');
        return;
    }


    // ==============================
    // VALIDASI GAMBAR
    // ==============================

    if (!imageFile.type.startsWith('image/')) {
        alert('File yang dipilih harus berupa gambar.');
        return;
    }

    if (imageFile.size > 2 * 1024 * 1024) {
        alert('Ukuran gambar maksimal 2 MB.');
        return;
    }


    // ==============================
    // FORM DATA
    // ==============================

    const formData = new FormData();

    formData.append(
        '_token',
        document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute('content')
    );

    // ID PEGAWAI
    formData.append('id', employee.id);

    // DATA UTAMA PEGAWAI
    formData.append('name', employee.name || '');

    formData.append('nipp', employee.nipp || '');

    formData.append('position', employee.position || '');

    formData.append('unit', employee.unit || '');

    formData.append('station_id', employee.station_id || '');

    formData.append('grade', employee.grade || '');


    // DATA SERTIFIKASI
    formData.append('cert_type', certType);

    formData.append('cert_number', certNumber);

    formData.append('cert_expiry', certExpiry);

    formData.append('cert_status', 'Aktif');

    formData.append('cert_image', imageFile);


    // ==============================
    // KIRIM KE SERVER
    // ==============================

    try {

        const response = await fetch('/employee/update', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });


        const result = await response.json();


        // ==============================
        // ERROR DARI SERVER
        // ==============================

        if (!response.ok) {

            console.error(
                'Validation error:',
                result.errors
            );

            throw new Error(
                result.message ||
                'Gagal menyimpan data sertifikasi.'
            );
        }


        // ==============================
        // UPDATE DATA LOKAL
        // ==============================

        employee.cert_type = certType;

        employee.cert_number = certNumber;

        employee.cert_expiry = certExpiry;

        employee.cert_status = 'Aktif';

        if (result.employee?.cert_image) {
            employee.cert_image =
                result.employee.cert_image;
        }


        // ==============================
        // REFRESH TABEL
        // ==============================

        renderCertificationTable();


        alert(
            'Data sertifikasi berhasil disimpan.'
        );


    } catch (error) {

        console.error(
            'Gagal menyimpan sertifikasi:',
            error
        );

        alert(
            error.message ||
            'Terjadi kesalahan saat menyimpan data sertifikasi.'
        );
    }
}


$(document).ready(function () {
    loadEmployees(1);
    loadEmployeeRequirements();
    loadDutyShifts();

    document
        .getElementById('add-certification-btn')
        ?.addEventListener('click', addCertificationRow);

    document
        .getElementById('add-skill-btn')
        ?.addEventListener('click', addSkillRow);
});





