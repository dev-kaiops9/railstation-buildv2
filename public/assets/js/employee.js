let positionData = [];
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
        url: "/employee/get",
        type: "GET",
        data: { page: page, per_page: perPage },
        success: function (response) {
            employees = response.data;
            currentPage = response.current_page;

            renderMainEmployeeTable(false);
            dutyRosterManager.loadDutyRoster();
            paginationHelper.render(response, (page) => loadEmployees(page));
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

function saveNewEmployees(employees) {
    $.ajax({
        url: "/employee/save",
        type: "POST",
        data: {
            _token: token,
            employees,
        },
        success: function (response) {
            loadEmployees(currentPage);
            loadPositions(); // update card total
            dutyRosterManager.loadDutyRoster(); // update daftar dinasan
        },
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
            loadPositions()
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
            loadPositions();
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

    if (isEditing) {
        optionsHeader.classList.remove("hidden");
    } else {
        optionsHeader.classList.add("hidden");
    }

    if (employees.length === 0 && !isEditing) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">
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
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="text" class="w-full rounded-md border-gray-300 shadow-sm editable-table" value="${employee.name}" data-field="name"></td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="text" class="w-full rounded-md border-gray-300 shadow-sm editable-table" value="${employee.nipp}" data-field="nipp"></td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="text" class="w-full rounded-md border-gray-300 shadow-sm editable-table" value="${employee.position}" data-field="position"></td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="text" class="w-full rounded-md border-gray-300 shadow-sm editable-table" value="${employee.unit}" data-field="unit"></td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button class="text-blue-500 hover:text-blue-700 font-semibold" onclick="openMoveEmployeeModal(${employee.id})">Pindahkan</button>
                        <button class="text-red-500 hover:text-red-700 font-semibold ml-2" onclick="deleteEmployee(${employee.id})">Hapus</button>
                    </td>
                `;
            } else {
                row.classList.add("cursor-pointer", "hover:bg-gray-100");
                row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${employee.name}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${employee.nipp}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${employee.position}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${employee.unit}</td>
                `;
                row.addEventListener("click", () => {
                    window.location.href = `/employee/${employee.id}`;
                });
            }
            tableBody.appendChild(row);
        });
    }
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
        optionsHeader.classList.add("hidden");
    }

    renderMainEmployeeTable(isEditing);
   
}

function saveMainEmployeeChanges() {
    const tableRows = document.querySelectorAll("#employee-table-body tr");
    let newEmployees = [];

    tableRows.forEach((row) => {
        const inputs = row.querySelectorAll("input[data-field]");

        if (inputs.length !== 4) return;

        const employeeId = row.dataset.id ? parseInt(row.dataset.id, 10) : null;
        const employeeData = {
            id: employeeId,
            name: inputs[0].value,
            nipp: inputs[1].value,
            position: inputs[2].value,
            unit: inputs[3].value,
        };

        if (employeeId) {
            const employeeIndex = employees.findIndex((e) => e.id === employeeId);

            if (employeeIndex !== -1) {
                const oldEmployee = employees[employeeIndex];
                const hasChanges =
                    oldEmployee.name !== employeeData.name ||
                    oldEmployee.nipp !== employeeData.nipp ||
                    oldEmployee.position !== employeeData.position ||
                    oldEmployee.unit !== employeeData.unit;

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
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="text" class="w-full rounded-md border-gray-300 shadow-sm" placeholder="Nama" data-field="name"></td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="text" class="w-full rounded-md border-gray-300 shadow-sm" placeholder="NIPP" data-field="nipp"></td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="text" class="w-full rounded-md border-gray-300 shadow-sm" placeholder="Jabatan" data-field="position"></td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="text" class="w-full rounded-md border-gray-300 shadow-sm" placeholder="Unit" data-field="unit"></td>
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

$(document).ready(function() {
    loadPositions();
    loadEmployees(1);
    loadEmployeeRequirements();
    loadDutyShifts();
});
