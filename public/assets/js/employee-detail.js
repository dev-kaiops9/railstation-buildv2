function updateEmployee(params) {
    params._token = token;

    $.ajax({
        url: "/employee/update",
        type: "POST",
        data: params,
        success: function (response) {
            window.location.reload();
        },
        error: function (error) {
            showMessage('Gagal memperbarui data', 'error');
        },
    });
}

function checkExpiryStatus(expiryDate) {
    if (!expiryDate) return 'Nonaktif';
    const today = new Date();
    const [year, month, day] = expiryDate.split('-').map(Number);
    const expiry = new Date(year, month - 1, day);
    return expiry > today ? 'Aktif' : 'Nonaktif';
}

function readFileAsDataURL(fileInput) {
    return new Promise((resolve, reject) => {
        const file = fileInput.files[0];
        if (!file) {
            resolve(null); // Resolve dengan null jika tidak ada file yang dipilih
            return;
        }
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}

function toggleEmployeeDetailEditMode(isEditing) {
    const viewMode = document.getElementById('employee-detail-view-mode');
    const editMode = document.getElementById('employee-detail-edit-mode');
    const editBtn = document.getElementById('employee-detail-edit-btn');
    const saveBtn = document.getElementById('employee-detail-save-btn');
    const cancelBtn = document.getElementById('employee-detail-cancel-btn');

    if (isEditing) {
        viewMode.classList.add('hidden');
        editMode.classList.remove('hidden');
        editBtn.classList.add('hidden');
        saveBtn.classList.remove('hidden');
        cancelBtn.classList.remove('hidden');
    } else {
        viewMode.classList.remove('hidden');
        editMode.classList.add('hidden');
        editBtn.classList.remove('hidden');
        saveBtn.classList.add('hidden');
        cancelBtn.classList.add('hidden');
    }
}

async function saveEmployeeChanges() {
    const updatedEmployee = {
        id: document.getElementById('employee-id').value,
        name: document.getElementById('edit-name').value,
        position: document.getElementById('edit-position').value,
        nipp: document.getElementById('edit-nipp').value,
        gender: document.getElementById('edit-gender').value,
        dob: document.getElementById('edit-dob').value,
        unit: document.getElementById('edit-unit').value,
        station_id: document.getElementById('edit-station').value,
        cert_type: document.getElementById('edit-cert-type').value,
        cert_number: document.getElementById('edit-cert-number').value,
        cert_expiry: document.getElementById('edit-cert-expiry').value,
        skill_type: document.getElementById('edit-skill-type').value,
        skill_number: document.getElementById('edit-skill-number').value,
        skill_expiry: document.getElementById('edit-skill-expiry').value,
    }

    if (updatedEmployee.cert_expiry) {
        updatedEmployee.cert_status = checkExpiryStatus(updatedEmployee.cert_expiry);
    }

    if (updatedEmployee.skill_expiry) {
        updatedEmployee.skill_status = checkExpiryStatus(updatedEmployee.skill_expiry);
    }

    try {
        // Menangani unggahan file secara independen
        const photoResult = await readFileAsDataURL(document.getElementById('employee-photo-upload'));
        const certResult = await readFileAsDataURL(document.getElementById('cert-image-upload'));
        const skillResult = await readFileAsDataURL(document.getElementById('skill-image-upload'));

        if (photoResult) {
            updatedEmployee.photo_url = photoResult;
        }
        if (certResult) {
            updatedEmployee.cert_image = certResult;
        }
        if (skillResult) {
            updatedEmployee.skill_image = skillResult;
        }

    } catch (error) {
        console.error("Kesalahan saat membaca file:", error);
    }

    updateEmployee(updatedEmployee);
}

const employeeDetailEditBtn = document.getElementById('employee-detail-edit-btn');
const employeeDetailCancelBtn = document.getElementById('employee-detail-cancel-btn');
const employeeDetailSaveBtn = document.getElementById('employee-detail-save-btn');

if (employeeDetailEditBtn) employeeDetailEditBtn.addEventListener('click', () => toggleEmployeeDetailEditMode(true));
if (employeeDetailCancelBtn) employeeDetailCancelBtn.addEventListener('click', () => toggleEmployeeDetailEditMode(false));
if (employeeDetailSaveBtn) employeeDetailSaveBtn.addEventListener('click', saveEmployeeChanges);
