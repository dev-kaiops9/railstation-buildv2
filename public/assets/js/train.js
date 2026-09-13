let trainData = [];
let trackData = [];
let jalurDilaluiData = [];
let scheduleStations = [];
let scheduleRows = [];
let currentStationId = null;
let scheduleEditMode = false;
let selectedStationIds = [];
let originalValidity = '';

const escapeHtml = (value) => String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const apiError = (xhr, fallback = 'Terjadi kesalahan.') => {
    return xhr?.responseJSON?.message || xhr?.responseJSON?.error || fallback;
};

function ajaxError(xhr, fallback = 'Gagal memproses data.') {
    console.error(xhr);
    showMessage(apiError(xhr, fallback), 'error');
}

// =========================================================
// TAB DATA PERKA
// =========================================================
function setPerkaTab(tab) {
    const daftar = document.getElementById('daftar-waktu-view');
    const jalur = document.getElementById('jalur-emplasemen-view');
    const daftarBtn = document.getElementById('tab-daftar-waktu');
    const jalurBtn = document.getElementById('tab-jalur-emplasemen');

    const isDaftar = tab === 'daftar-waktu';
    daftar?.classList.toggle('hidden', !isDaftar);
    jalur?.classList.toggle('hidden', isDaftar);
    daftarBtn?.classList.toggle('active', isDaftar);
    jalurBtn?.classList.toggle('active', !isDaftar);
}

// =========================================================
// DAFTAR WAKTU / SCHEDULE MATRIX
// =========================================================
function loadSchedules() {
    const head = document.getElementById('schedule-table-head');
    const body = document.getElementById('schedule-table-body');
    if (!head || !body) return;

    body.innerHTML = `<tr><td class="px-6 py-8 text-center" colspan="20"><i class="fas fa-spinner fa-spin text-2xl"></i><p class="mt-2 text-gray-500">Memuat daftar waktu...</p></td></tr>`;

    $.ajax({
        url: '/train/schedules',
        type: 'GET',
        success(response) {
            trainData = response.trains || [];
            scheduleRows = response.schedules || [];
            scheduleStations = response.stations || [];
            currentStationId = response.current_station_id || null;
            prepareSelectedStations();
            renderScheduleMatrix();
            renderStationSelector();
        },
        error(xhr) {
            ajaxError(xhr, 'Gagal memuat daftar waktu.');
            body.innerHTML = `<tr><td colspan="20" class="px-6 py-8 text-center text-red-500">Gagal memuat daftar waktu.</td></tr>`;
        }
    });
}

function prepareSelectedStations() {
    const key = `railstation.schedule.stations.${currentStationId}`;
    let stored = [];
    try {
        stored = JSON.parse(localStorage.getItem(key) || '[]');
    } catch (_) { }

    const scheduleIds = [...new Set(scheduleRows.map(s => Number(s.station_id)))];
    const defaults = [...new Set([...(scheduleIds.length ? scheduleIds : []), Number(currentStationId)].filter(Boolean))];
    const validIds = new Set(scheduleStations.map(s => Number(s.id)));

    selectedStationIds = Array.isArray(stored) && stored.length
        ? stored.map(Number).filter(id => validIds.has(id))
        : defaults.filter(id => validIds.has(id));

    if (!selectedStationIds.length && scheduleStations.length) {
        selectedStationIds = [Number(scheduleStations[0].id)];
    }
}

function saveSelectedStations() {
    if (!currentStationId) return;
    localStorage.setItem(
        `railstation.schedule.stations.${currentStationId}`,
        JSON.stringify(selectedStationIds.map(Number))
    );
}

function getSelectedStations() {
    const selected = new Set(selectedStationIds.map(Number));
    return scheduleStations.filter(s => selected.has(Number(s.id)));
}

function scheduleMapForTrain(trainId) {
    const map = {};
    scheduleRows
        .filter(s => Number(s.train_id) === Number(trainId))
        .forEach(s => { map[Number(s.station_id)] = s; });
    return map;
}

function formatCellTime(value) {
    if (!value) return '';
    return String(value).slice(0, 5);
}

function renderScheduleMatrix() {
    const head = document.getElementById('schedule-table-head');
    const body = document.getElementById('schedule-table-body');
    if (!head || !body) return;

    const stations = getSelectedStations();
    const colCount = 3 + (stations.length * 2) + (scheduleEditMode ? 1 : 0);

    head.innerHTML = `
        <tr>
            <th rowspan="2" class="schedule-fixed-col">Nomor KA</th>
            <th rowspan="2" class="schedule-fixed-col">Nama KA</th>
            <th rowspan="2" class="schedule-fixed-col">Relasi</th>
            ${stations.map(station => `
                <th colspan="2" class="schedule-station-head ${Number(station.id) === Number(currentStationId) ? 'current-station' : ''}">
                    ${escapeHtml(String(station.name).toUpperCase())}
                </th>
            `).join('')}
            ${scheduleEditMode ? '<th rowspan="2" class="schedule-fixed-col">Opsi</th>' : ''}
        </tr>
        <tr>
            ${stations.map(() => '<th class="schedule-sub-head">Datang</th><th class="schedule-sub-head">Berangkat</th>').join('')}
        </tr>
    `;

    if (!trainData.length) {
        body.innerHTML = `<tr><td colspan="${colCount}" class="px-6 py-8 text-center text-gray-500">Belum ada data KA pada stasiun ini.</td></tr>`;
        document.getElementById('schedule-empty-help')?.classList.remove('hidden');
        return;
    }

    document.getElementById('schedule-empty-help')?.classList.add('hidden');

    body.innerHTML = trainData.map(train => {
        const schedules = scheduleMapForTrain(train.id);
        return `
            <tr data-train-id="${train.id}">
                <td class="font-medium">${escapeHtml(train.number)}</td>
                <td>${escapeHtml(train.name)}</td>
                <td>${escapeHtml(train.route)}</td>
                ${stations.map(station => renderScheduleCell(train, station, schedules[Number(station.id)] || null)).join('')}
                ${scheduleEditMode ? `<td class="text-center"><button type="button" class="text-red-500 hover:text-red-700 font-semibold" onclick="clearTrainSchedules(${train.id})">Kosongkan</button></td>` : ''}
            </tr>
        `;
    }).join('');
}

function renderScheduleCell(train, station, schedule) {
    const arrival = formatCellTime(schedule?.arrival_time);
    const departure = formatCellTime(schedule?.departure_time);
    const trackId = schedule?.track_id || '';
    const isDirect = !arrival && !!departure;

    if (!scheduleEditMode) {
        let arrivalText = '-';
        if (isDirect) arrivalText = 'Ls';
        else if (arrival) arrivalText = escapeHtml(arrival);

        return `
            <td class="schedule-cell ${Number(station.id) === Number(currentStationId) ? 'current-station-cell' : ''}">${arrivalText}</td>
            <td class="schedule-cell ${Number(station.id) === Number(currentStationId) ? 'current-station-cell' : ''}">${departure ? escapeHtml(departure) : '-'}</td>
        `;
    }

    return `
        <td class="schedule-cell-edit ${Number(station.id) === Number(currentStationId) ? 'current-station-cell' : ''}">
            <input type="time" class="schedule-arrival" value="${escapeHtml(arrival)}" data-station-id="${station.id}" data-track-id="${escapeHtml(trackId)}" aria-label="Datang ${escapeHtml(station.name)} ${escapeHtml(train.number)}">
        </td>
        <td class="schedule-cell-edit ${Number(station.id) === Number(currentStationId) ? 'current-station-cell' : ''}">
            <input type="time" class="schedule-departure" value="${escapeHtml(departure)}" data-station-id="${station.id}" aria-label="Berangkat ${escapeHtml(station.name)} ${escapeHtml(train.number)}">
        </td>
    `;
}

function toggleScheduleEditMode(isEditing) {
    scheduleEditMode = isEditing;
    document.getElementById('perka-edit-btn')?.classList.toggle('hidden', isEditing);
    document.getElementById('perka-save-btn')?.classList.toggle('hidden', !isEditing);
    document.getElementById('perka-cancel-btn')?.classList.toggle('hidden', !isEditing);
    document.getElementById('edit-station-btn')?.classList.toggle('hidden', isEditing);
    document.getElementById('add-train-btn')?.classList.toggle('hidden', !isEditing);
    renderScheduleMatrix();
}

function collectSchedulePayload() {
    const stations = getSelectedStations();
    const payload = [];

    document.querySelectorAll('#schedule-table-body tr[data-train-id]').forEach(row => {
        const trainId = Number(row.dataset.trainId);
        const existing = scheduleMapForTrain(trainId);

        stations.forEach(station => {
            const arrival = row.querySelector(`.schedule-arrival[data-station-id="${station.id}"]`)?.value || null;
            const departure = row.querySelector(`.schedule-departure[data-station-id="${station.id}"]`)?.value || null;
            const old = existing[Number(station.id)];

            payload.push({
                train_id: trainId,
                station_id: Number(station.id),
                arrival_time: arrival,
                departure_time: departure,
                track_id: old?.track_id || null,
            });
        });
    });

    return payload;
}

function saveScheduleData() {
    const payload = collectSchedulePayload();
    const grouped = {};
    payload.forEach(item => {
        grouped[item.train_id] ||= [];
        grouped[item.train_id].push(item);
    });

    const requests = Object.entries(grouped).map(([trainId, schedules]) => $.ajax({
        url: '/train/schedules/save',
        type: 'POST',
        data: { _token: token, train_id: trainId, schedules }
    }));

    if (!requests.length) {
        toggleScheduleEditMode(false);
        return;
    }

    $.when.apply($, requests)
        .done(() => {
            showMessage('Daftar waktu berhasil disimpan', 'success');
            toggleScheduleEditMode(false);
            loadSchedules();
        })
        .fail(xhr => ajaxError(xhr, 'Gagal menyimpan daftar waktu.'));
}

function clearTrainSchedules(trainId) {
    if (!scheduleEditMode) return;
    const row = document.querySelector(`#schedule-table-body tr[data-train-id="${trainId}"]`);
    if (!row) return;
    row.querySelectorAll('input[type="time"]').forEach(input => input.value = '');
}

function openAddTrainModal() {
    const modal = document.getElementById('add-train-modal');
    if (!modal) return;

    const trackSelect = document.getElementById('new-train-track');
    if (trackSelect) {
        trackSelect.innerHTML = '<option value="">Pilih jalur</option>' + trackData.map(track =>
            `<option value="${escapeHtml(track.track)}">${escapeHtml(track.track)}</option>`
        ).join('');
    }

    document.getElementById('add-train-form')?.reset();
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeAddTrainModal() {
    const modal = document.getElementById('add-train-modal');
    modal?.classList.add('hidden');
    modal?.classList.remove('flex');
}

function addTrainFromSchedule() {
    const data = {
        id: null,
        number: document.getElementById('new-train-number')?.value.trim(),
        name: document.getElementById('new-train-name')?.value.trim(),
        route: document.getElementById('new-train-route')?.value.trim(),
        arrival_time: document.getElementById('new-train-arrival')?.value || null,
        departure_time: document.getElementById('new-train-departure')?.value || null,
        track: document.getElementById('new-train-track')?.value || null,
        status: document.getElementById('new-train-status')?.value || 'Berhenti'
    };

    if (!data.number || !data.name || !data.route) {
        showMessage('Nomor KA, nama KA, dan relasi wajib diisi.', 'error');
        return;
    }

    $.ajax({
        url: '/train/save',
        type: 'POST',
        data: { _token: token, trains: [data] }
    }).done(() => {
        closeAddTrainModal();
        showMessage('Data KA berhasil ditambahkan. Silakan isi waktu pada tabel.', 'success');
        loadSchedules();
    }).fail(xhr => ajaxError(xhr, 'Gagal menambahkan data KA.'));
}

// =========================================================
// PILIH STASIUN
// =========================================================
function openStationSelector() {
    renderStationSelector();
    const modal = document.getElementById('station-selector-modal');
    modal?.classList.remove('hidden');
    modal?.classList.add('flex');
}

function closeStationSelector() {
    const modal = document.getElementById('station-selector-modal');
    modal?.classList.add('hidden');
    modal?.classList.remove('flex');
}

function renderStationSelector() {
    const list = document.getElementById('station-selector-list');
    if (!list) return;
    const selected = new Set(selectedStationIds.map(Number));

    list.innerHTML = scheduleStations.map(station => `
        <label class="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
            <input type="checkbox" class="station-checkbox h-4 w-4" value="${station.id}" ${selected.has(Number(station.id)) ? 'checked' : ''}>
            <span><strong>${escapeHtml(station.name)}</strong><small class="block text-gray-500">${escapeHtml(station.abbreviation || '')}</small></span>
        </label>
    `).join('');
}

function applyStationSelection() {
    const ids = [...document.querySelectorAll('.station-checkbox:checked')].map(el => Number(el.value));
    if (!ids.length) {
        showMessage('Pilih minimal satu stasiun.', 'error');
        return;
    }
    selectedStationIds = ids;
    saveSelectedStations();
    closeStationSelector();
    renderScheduleMatrix();
}

// =========================================================
// LEGACY DAFTAR KA (tetap tersedia untuk data dasar KA)
// =========================================================
function loadTrains() {
    $.ajax({
        url: '/train/get',
        type: 'GET',
        success(response) {
            trainData = response || [];
            if (!scheduleEditMode) renderScheduleMatrix();
            renderJalurDilaluiTable(scheduleDilaluiEditMode);
        },
        error(xhr) { ajaxError(xhr, 'Gagal memuat data KA.'); }
    });
}

function saveTrains(trains) {
    $.ajax({
        url: '/train/save',
        type: 'POST',
        data: { _token: token, trains }
    }).done(() => {
        showMessage('Data KA berhasil disimpan', 'success');
        loadSchedules();
    }).fail(xhr => ajaxError(xhr, 'Gagal menyimpan data KA.'));
}

function deleteTrain(id) {
    if (!confirm('Apakah Anda yakin ingin menghapus data KA ini?')) return;
    $.ajax({ url: '/train/delete', type: 'POST', data: { _token: token, id } })
        .done(() => loadSchedules())
        .fail(xhr => ajaxError(xhr, 'Gagal menghapus data KA.'));
}

// =========================================================
// EMPLASEMEN
// =========================================================
function toggleEmplasemenEditMode(isEditing) {
    document.getElementById('emplasemen-edit-btn')?.classList.toggle('hidden', isEditing);
    document.getElementById('emplasemen-save-btn')?.classList.toggle('hidden', !isEditing);
    document.getElementById('emplasemen-cancel-btn')?.classList.toggle('hidden', !isEditing);
    document.getElementById('emplasemen-view-mode')?.classList.toggle('hidden', isEditing);
    document.getElementById('emplasemen-edit-mode')?.classList.toggle('hidden', !isEditing);

    if (isEditing) {
        const input = document.getElementById('emplasemen-upload');
        if (input) input.value = '';
    }
}

function saveEmplasemenChanges() {
    const input = document.getElementById('emplasemen-upload');
    if (!input?.files?.length) {
        toggleEmplasemenEditMode(false);
        return;
    }

    const formData = new FormData();
    formData.append('_token', token);
    formData.append('file', input.files[0]);

    $.ajax({
        url: '/station/emplasemen-update',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false
    }).done(() => {
        showMessage('Emplasemen berhasil diperbarui', 'success');
        setTimeout(() => location.reload(), 500);
    }).fail(xhr => ajaxError(xhr, 'Gagal menyimpan emplasemen.'));
}

function previewEmplasemen(file) {
    const container = document.getElementById('emplasemen-preview-container');
    if (!container || !file) return;

    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = e => {
            container.innerHTML = `<img src="${e.target.result}" class="w-full h-auto max-h-[550px] rounded-lg object-contain" alt="Preview emplasemen">`;
        };
        reader.readAsDataURL(file);
    } else if (file.type === 'application/pdf') {
        const url = URL.createObjectURL(file);
        container.innerHTML = `<iframe src="${url}" width="100%" height="450" class="rounded-lg border-0" title="Preview PDF emplasemen"></iframe>`;
    }
}

// =========================================================
// INFORMASI JALUR
// =========================================================
function loadTracks() {
    const body = document.getElementById('jalur-table-body');
    if (!body) return;
    body.innerHTML = `<tr><td colspan="10" class="px-6 py-8 text-center"><i class="fas fa-spinner fa-spin text-2xl"></i><p class="mt-2 text-gray-500">Memuat jalur...</p></td></tr>`;

    $.ajax({ url: '/track/get', type: 'GET' })
        .done(response => {
            trackData = response || [];
            renderJalurTable(jalurEditMode);
        })
        .fail(xhr => {
            ajaxError(xhr, 'Gagal memuat data jalur.');
            body.innerHTML = `<tr><td colspan="10" class="px-6 py-8 text-center text-red-500">Gagal memuat data jalur.</td></tr>`;
        });
}

let jalurEditMode = false;

function renderJalurTable(isEditing = false) {
    const body = document.getElementById('jalur-table-body');
    const opsi = document.getElementById('jalur-opsi-header');
    if (!body) return;
    opsi?.classList.toggle('hidden', !isEditing);

    if (!trackData.length) {
        body.innerHTML = `<tr><td colspan="10" class="px-6 py-8 text-center text-gray-500">Belum ada data jalur.</td></tr>`;
        return;
    }

    body.innerHTML = trackData.map(item => {
        if (!isEditing) {
            return `<tr data-id="${item.id}">
                <td class="text-center">${escapeHtml(item.track)}</td>
                <td>${escapeHtml(item.max_length)}</td>
                <td>${escapeHtml(item.effective_length)}</td>
                <td class="text-center">${escapeHtml(item.train || '-')}</td>
                <td class="text-center">${escapeHtml(item.GB || '-')}</td>
                <td class="text-center">${escapeHtml(item.GD || '-')}</td>
                <td class="text-center">${escapeHtml(item.GT || '-')}</td>
                <td class="text-center">${escapeHtml(item.GK || '-')}</td>
                <td>${escapeHtml(item.remarks || '-')}</td>
            </tr>`;
        }

        return `<tr data-id="${item.id}">
            <td><input class="track-input" data-field="track" value="${escapeHtml(item.track)}"></td>
            <td><input class="track-input" data-field="max_length" value="${escapeHtml(item.max_length)}"></td>
            <td><input class="track-input" data-field="effective_length" value="${escapeHtml(item.effective_length)}"></td>
            <td><input class="track-input" data-field="train" value="${escapeHtml(item.train || '')}"></td>
            <td><input class="track-input text-center" data-field="GB" value="${escapeHtml(item.GB || '')}"></td>
            <td><input class="track-input text-center" data-field="GD" value="${escapeHtml(item.GD || '')}"></td>
            <td><input class="track-input text-center" data-field="GT" value="${escapeHtml(item.GT || '')}"></td>
            <td><input class="track-input text-center" data-field="GK" value="${escapeHtml(item.GK || '')}"></td>
            <td><input class="track-input" data-field="remarks" value="${escapeHtml(item.remarks || '')}"></td>
            <td class="text-center"><button type="button" class="text-red-500 hover:text-red-700 font-semibold" onclick="deleteTrack(${item.id})">Hapus</button></td>
        </tr>`;
    }).join('');
}

function toggleJalurEditMode(isEditing) {
    jalurEditMode = isEditing;
    document.getElementById('jalur-edit-btn')?.classList.toggle('hidden', isEditing);
    document.getElementById('jalur-save-btn')?.classList.toggle('hidden', !isEditing);
    document.getElementById('jalur-cancel-btn')?.classList.toggle('hidden', !isEditing);
    document.getElementById('add-jalur-row-container')?.classList.toggle('hidden', !isEditing);
    document.getElementById('mulai-berlaku-text')?.classList.toggle('hidden', isEditing);
    document.getElementById('mulai-berlaku-date')?.classList.toggle('hidden', !isEditing);
    if (isEditing) originalValidity = document.getElementById('mulai-berlaku-date')?.value || '';
    renderJalurTable(isEditing);
}

function collectTrackData() {
    const result = [];
    document.querySelectorAll('#jalur-table-body tr[data-id]').forEach(row => {
        const item = { id: Number(row.dataset.id) };
        row.querySelectorAll('.track-input').forEach(input => item[input.dataset.field] = input.value.trim());
        if (item.track && item.max_length && item.effective_length) result.push(item);
    });

    document.querySelectorAll('#jalur-table-body tr:not([data-id])').forEach(row => {
        const item = {};
        row.querySelectorAll('.track-input').forEach(input => item[input.dataset.field] = input.value.trim());
        if (item.track && item.max_length && item.effective_length) result.push(item);
    });
    return result;
}

function saveJalurChanges() {
    const tracks = collectTrackData();
    const validity = document.getElementById('mulai-berlaku-date')?.value || '';
    const requests = [];

    if (validity !== originalValidity) {
        requests.push($.ajax({ url: '/track/validity', type: 'POST', data: { _token: token, validity } }));
    }
    if (tracks.length) {
        requests.push($.ajax({ url: '/track/save', type: 'POST', data: { _token: token, tracks } }));
    }

    if (!requests.length) {
        toggleJalurEditMode(false);
        return;
    }

    $.when.apply($, requests)
        .done(() => {
            showMessage('Informasi jalur berhasil disimpan', 'success');
            toggleJalurEditMode(false);
            loadTracks();
        })
        .fail(xhr => ajaxError(xhr, 'Gagal menyimpan informasi jalur.'));
}

function deleteTrack(id) {
    if (!confirm('Hapus jalur ini?')) return;
    $.ajax({ url: '/track/delete', type: 'POST', data: { _token: token, id } })
        .done(() => {
            trackData = trackData.filter(item => Number(item.id) !== Number(id));
            renderJalurTable(true);
        })
        .fail(xhr => ajaxError(xhr, 'Gagal menghapus jalur.'));
}

function addJalurRow() {
    const body = document.getElementById('jalur-table-body');
    if (!body) return;
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input class="track-input" data-field="track" placeholder="Jalur"></td>
        <td><input class="track-input" data-field="max_length" placeholder="Panjang"></td>
        <td><input class="track-input" data-field="effective_length" placeholder="Efektif"></td>
        <td><input class="track-input" data-field="train" placeholder="Kereta"></td>
        <td><input class="track-input text-center" data-field="GB" placeholder="GB"></td>
        <td><input class="track-input text-center" data-field="GD" placeholder="GD"></td>
        <td><input class="track-input text-center" data-field="GT" placeholder="GT"></td>
        <td><input class="track-input text-center" data-field="GK" placeholder="GK"></td>
        <td><input class="track-input" data-field="remarks" placeholder="Jenis"></td>
        <td class="text-center"><button type="button" class="text-red-500 hover:text-red-700 font-semibold" onclick="this.closest('tr').remove()">Hapus</button></td>
    `;
    body.appendChild(row);
}

// =========================================================
// JALUR YANG HARUS DILALUI
// =========================================================
let scheduleDilaluiEditMode = false;

function loadJalurDilalui() {
    const body = document.getElementById('jalur-dilalui-table-body');
    if (!body) return;
    body.innerHTML = `<tr><td colspan="7" class="px-6 py-8 text-center"><i class="fas fa-spinner fa-spin text-2xl"></i><p class="mt-2 text-gray-500">Memuat data...</p></td></tr>`;

    $.ajax({ url: '/passed-tracks/get', type: 'GET' })
        .done(response => {
            jalurDilaluiData = response || [];
            renderJalurDilaluiTable(scheduleDilaluiEditMode);
        })
        .fail(xhr => {
            ajaxError(xhr, 'Gagal memuat daftar jalur yang harus dilalui.');
            body.innerHTML = `<tr><td colspan="7" class="px-6 py-8 text-center text-red-500">Gagal memuat data.</td></tr>`;
        });
}

function routeParts(route) {
    const parts = String(route || '').split(/\s*[-–—]\s*/);
    return [parts[0] || '-', parts.slice(1).join(' - ') || '-'];
}

function renderJalurDilaluiTable(isEditing = false) {
    const body = document.getElementById('jalur-dilalui-table-body');
    const opsi = document.getElementById('jalur-dilalui-opsi-header');
    if (!body) return;
    opsi?.classList.toggle('hidden', !isEditing);

    if (!jalurDilaluiData.length) {
        body.innerHTML = `<tr><td colspan="7" class="px-6 py-8 text-center text-gray-500">Belum ada data jalur yang harus dilalui.</td></tr>`;
        return;
    }

    body.innerHTML = jalurDilaluiData.map(item => {
        const train = item.train || {};
        const track = item.track || {};
        const [dari, ke] = routeParts(train.route);

        if (!isEditing) {
            return `<tr data-id="${item.id}">
                <td class="text-center">${escapeHtml(track.track || train.track || '-')}</td>
                <td class="text-center">${escapeHtml(train.number || '-')}</td>
                <td class="text-center">${escapeHtml(train.arrival_time || (train.status === 'Langsung' ? 'Ls' : '-'))}</td>
                <td class="text-center">${escapeHtml(train.departure_time || '-')}</td>
                <td class="text-center">${escapeHtml(dari)}</td>
                <td class="text-center">${escapeHtml(ke)}</td>
            </tr>`;
        }

        return `<tr data-id="${item.id}">
            <td>
                <select class="jalur-dilalui-input jalur-track-select">
                    <option value="">Pilih Jalur</option>
                    ${trackData.map(t => `<option value="${t.id}" ${Number(item.track_id) === Number(t.id) ? 'selected' : ''}>${escapeHtml(t.track)}</option>`).join('')}
                </select>
            </td>
            <td>
                <select class="jalur-dilalui-input jalur-train-select">
                    <option value="">Pilih No. KA</option>
                    ${trainData.map(t => `<option value="${t.id}" ${Number(item.train_id) === Number(t.id) ? 'selected' : ''}>${escapeHtml(t.number)}</option>`).join('')}
                </select>
            </td>
            <td class="text-center jalur-datang">${escapeHtml(train.arrival_time || (train.status === 'Langsung' ? 'Ls' : '-'))}</td>
            <td class="text-center jalur-berangkat">${escapeHtml(train.departure_time || '-')}</td>
            <td class="text-center jalur-dari">${escapeHtml(dari)}</td>
            <td class="text-center jalur-ke">${escapeHtml(ke)}</td>
            <td class="text-center"><button type="button" class="text-red-500 hover:text-red-700 font-semibold" onclick="deleteJalurDilalui(${item.id})">Hapus</button></td>
        </tr>`;
    }).join('');

    bindJalurTrainSelects();
}

function bindJalurTrainSelects() {
    document.querySelectorAll('.jalur-train-select').forEach(select => {
        select.addEventListener('change', function () {
            const train = trainData.find(t => Number(t.id) === Number(this.value));
            const row = this.closest('tr');
            if (!row) return;
            const [dari, ke] = routeParts(train?.route);
            row.querySelector('.jalur-datang').textContent = train?.arrival_time || (train?.status === 'Langsung' ? 'Ls' : '-');
            row.querySelector('.jalur-berangkat').textContent = train?.departure_time || '-';
            row.querySelector('.jalur-dari').textContent = dari;
            row.querySelector('.jalur-ke').textContent = ke;
        });
    });
}

function toggleJalurDilaluiEditMode(isEditing) {
    scheduleDilaluiEditMode = isEditing;
    document.getElementById('jalur-dilalui-edit-btn')?.classList.toggle('hidden', isEditing);
    document.getElementById('jalur-dilalui-save-btn')?.classList.toggle('hidden', !isEditing);
    document.getElementById('jalur-dilalui-cancel-btn')?.classList.toggle('hidden', !isEditing);
    document.getElementById('add-jalur-dilalui-row-container')?.classList.toggle('hidden', !isEditing);
    renderJalurDilaluiTable(isEditing);
}

function collectJalurDilaluiChanges() {
    const changes = [];

    document
        .querySelectorAll('#jalur-dilalui-table-body tr')
        .forEach((row, index) => {

            const trackSelect =
                row.querySelector('.jalur-track-select');

            const trainSelect =
                row.querySelector('.jalur-train-select');

            // Abaikan baris yang bukan baris input
            if (!trackSelect || !trainSelect) {
                return;
            }

            const trackId =
                Number(trackSelect.value);

            const trainId =
                Number(trainSelect.value);

            // Validasi
            if (!trackId || !trainId) {
                throw new Error(
                    `Baris ${index + 1}: pilih jalur dan nomor KA.`
                );
            }

            const rowId =
                row.dataset.id
                    ? Number(row.dataset.id)
                    : null;

            const old =
                rowId
                    ? jalurDilaluiData.find(
                        item => Number(item.id) === rowId
                    )
                    : null;


            /*
             * DATA BARU
             *
             * Jangan kirim id.
             */
            if (!rowId) {

                changes.push({
                    track_id: trackId,
                    train_id: trainId
                });

                return;
            }


            /*
             * DATA LAMA
             *
             * Kirim id hanya jika memang ada perubahan.
             */
            if (
                !old ||
                Number(old.track_id) !== trackId ||
                Number(old.train_id) !== trainId
            ) {

                changes.push({
                    id: rowId,
                    track_id: trackId,
                    train_id: trainId
                });
            }

        });

    return changes;
}

function saveJalurDilaluiChanges() {
    let changes;
    try {
        changes = collectJalurDilaluiChanges();
    } catch (error) {
        showMessage(error.message, 'error');
        return;
    }

    if (!changes.length) {
        toggleJalurDilaluiEditMode(false);
        return;
    }

    $.ajax({
        url: '/passed-tracks/save',
        type: 'POST',
        data: { _token: token, trainTracks: changes }
    }).done(() => {
        showMessage('Daftar jalur berhasil disimpan', 'success');
        toggleJalurDilaluiEditMode(false);
        loadJalurDilalui();
        loadTrains();
    }).fail(xhr => ajaxError(xhr, 'Gagal menyimpan daftar jalur.'));
}

function deleteJalurDilalui(id) {
    if (!confirm('Hapus data jalur yang harus dilalui ini?')) return;
    $.ajax({ url: '/passed-tracks/delete', type: 'POST', data: { _token: token, id } })
        .done(() => loadJalurDilalui())
        .fail(xhr => ajaxError(xhr, 'Gagal menghapus data.'));
}

function addJalurDilaluiRow() {
    const body = document.getElementById('jalur-dilalui-table-body');
    if (!body) return;
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><select class="jalur-dilalui-input jalur-track-select"><option value="">Pilih Jalur</option>${trackData.map(t => `<option value="${t.id}">${escapeHtml(t.track)}</option>`).join('')}</select></td>
        <td><select class="jalur-dilalui-input jalur-train-select"><option value="">Pilih No. KA</option>${trainData.map(t => `<option value="${t.id}">${escapeHtml(t.number)}</option>`).join('')}</select></td>
        <td class="text-center jalur-datang">-</td>
        <td class="text-center jalur-berangkat">-</td>
        <td class="text-center jalur-dari">-</td>
        <td class="text-center jalur-ke">-</td>
        <td class="text-center"><button type="button" class="text-red-500 hover:text-red-700 font-semibold" onclick="this.closest('tr').remove()">Hapus</button></td>
    `;
    body.appendChild(row);
    bindJalurTrainSelects();
}

// =========================================================
// INITIALIZATION
// =========================================================
$(document).ready(function () {
    setPerkaTab('daftar-waktu');
    loadSchedules();
    loadTracks();
    loadJalurDilalui();
    renderStationSelector();

    $('#tab-daftar-waktu').on('click', () => setPerkaTab('daftar-waktu'));
    $('#tab-jalur-emplasemen').on('click', () => setPerkaTab('jalur-emplasemen'));

    $('#edit-station-btn').on('click', openStationSelector);
    $('#close-station-modal, #cancel-station-selection').on('click', closeStationSelector);
    $('#apply-station-selection').on('click', applyStationSelection);

    $('#perka-edit-btn').on('click', () => toggleScheduleEditMode(true));
    $('#add-train-btn').on('click', openAddTrainModal);
    $('#close-add-train-modal, #cancel-add-train').on('click', closeAddTrainModal);
    $('#add-train-form').on('submit', function (event) {
        event.preventDefault();
        addTrainFromSchedule();
    });
    $('#perka-save-btn').on('click', saveScheduleData);
    $('#perka-cancel-btn').on('click', () => { toggleScheduleEditMode(false); loadSchedules(); });

    $('#emplasemen-edit-btn').on('click', () => toggleEmplasemenEditMode(true));
    $('#emplasemen-save-btn').on('click', saveEmplasemenChanges);
    $('#emplasemen-cancel-btn').on('click', () => toggleEmplasemenEditMode(false));
    $('#emplasemen-upload').on('change', function () { previewEmplasemen(this.files[0]); });

    $('#jalur-edit-btn').on('click', () => toggleJalurEditMode(true));
    $('#jalur-save-btn').on('click', saveJalurChanges);
    $('#jalur-cancel-btn').on('click', () => toggleJalurEditMode(false));
    $('#add-jalur-row-btn').on('click', addJalurRow);

    $('#jalur-dilalui-edit-btn').on('click', () => toggleJalurDilaluiEditMode(true));
    $('#jalur-dilalui-save-btn').on('click', saveJalurDilaluiChanges);
    $('#jalur-dilalui-cancel-btn').on('click', () => toggleJalurDilaluiEditMode(false));
    $('#add-jalur-dilalui-row-btn').on('click', addJalurDilaluiRow);
});
