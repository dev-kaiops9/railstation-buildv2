function toggleProfileEditMode(isEditing) {
    const viewMode = document.getElementById('profil-view-mode');
    const editMode = document.getElementById('profil-edit-mode');
    const editBtn = document.getElementById('profil-edit-btn');
    const saveBtn = document.getElementById('profil-save-btn');
    const cancelBtn = document.getElementById('profil-cancel-btn');

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

function saveProfileChanges() {
    document.getElementById('view-station-name').textContent = document.getElementById('edit-station-name').value;
    document.getElementById('view-abbreviation').textContent = document.getElementById('edit-abbreviation').value;
    document.getElementById('view-grade').textContent = document.getElementById('edit-grade').value;
    document.getElementById('view-code').textContent = document.getElementById('edit-code').value;
    document.getElementById('view-operational-hours').textContent = document.getElementById('edit-operational-hours').value;
    document.getElementById('view-km-location').textContent = document.getElementById('edit-km-location').value;
    document.getElementById('view-altitude').textContent = document.getElementById('edit-altitude').value;
    document.getElementById('view-address').textContent = document.getElementById('edit-address').value;
    document.getElementById('view-road-distance').textContent = document.getElementById('edit-road-distance').value;
    document.getElementById('view-region').textContent = document.getElementById('edit-region').value;
    document.getElementById('view-facilities-list').innerHTML = document.getElementById('edit-facilities').value.split('\n').map(item => `<li>${item.trim()}</li>`).join('');
    document.getElementById('view-nearby-facilities-list').innerHTML = document.getElementById('edit-nearby-facilities').value.split('\n').map(item => `<li>${item.trim()}</li>`).join('');

    $.ajax({
        url: '/profile/update',
        type: 'POST',
        data: {
            _token: token,
            name: document.getElementById('edit-station-name').value,
            abbreviation: document.getElementById('edit-abbreviation').value,
            grade: document.getElementById('edit-grade').value,
            code: document.getElementById('edit-code').value,
            operational_hours: document.getElementById('edit-operational-hours').value,
            km_location: document.getElementById('edit-km-location').value,
            altitude: document.getElementById('edit-altitude').value,
            address: document.getElementById('edit-address').value,
            road_distance: document.getElementById('edit-road-distance').value,
            region: document.getElementById('edit-region').value,
            facilities: document.getElementById('edit-facilities').value,
            nearby_facilities: document.getElementById('edit-nearby-facilities').value
        },
        success: function(response) {
            toggleProfileEditMode(false);
        },
        error: function(error) {
            showMessage('Gagal menyimpan data', 'error');
        }
    });

    toggleProfileEditMode(false);
}

const profleEditBtn = document.getElementById('profil-edit-btn');
const profleSaveBtn = document.getElementById('profil-save-btn');
const profleCancelBtn = document.getElementById('profil-cancel-btn');

if (profleEditBtn) profleEditBtn.addEventListener('click', () => toggleProfileEditMode(true));
if (profleSaveBtn) profleSaveBtn.addEventListener('click', saveProfileChanges);
if (profleCancelBtn) profleCancelBtn.addEventListener('click', () => toggleProfileEditMode(false));
