// Data dummy untuk pegawai
let employees = [
    { id: 1, name: "Budi Santoso", nipp: "12345678", gender: "Laki-laki", dob: "01-01-1985", position: "Kepala Stasiun", unit: "Operasional", station: "Stasiun Pusat", cert_image: "https://placehold.co/300x200/4B5563/FFFFFF?text=Sertifikasi+Budi", skill_image: "https://placehold.co/300x200/4B5563/FFFFFF?text=Kecakapan+Budi", cert_type: "Regulator", cert_number: "S-12345", cert_expiry: "2025-12-31", cert_status: "Aktif", skill_type: "Masinis", skill_number: "K-54321", skill_expiry: "2026-06-15", skill_status: "Aktif" },
    { id: 2, name: "Siti Nurhaliza", nipp: "87654321", gender: "Perempuan", dob: "15-05-1990", position: "Staf Administrasi", unit: "Administrasi", station: "Stasiun Pusat", cert_image: "https://placehold.co/300x200/4B5563/FFFFFF?text=Sertifikasi+Siti", skill_image: "https://placehold.co/300x200/4B5563/FFFFFF?text=Kecakapan+Siti", cert_type: "Manajerial", cert_number: "S-67890", cert_expiry: "2024-09-20", cert_status: "Nonaktif", skill_type: "Komputer", skill_number: "K-09876", skill_expiry: "2025-01-01", skill_status: "Aktif" }
];

// Data profil stasiun dummy
let profileData = {
    stationName: 'Stasiun Pusat',
    abbreviation: 'SP',
    grade: 'A',
    code: 'P01',
    operationalHours: '24 Jam',
    kmLocation: 'KM 100+500',
    altitude: '+50 MDPL',
    address: 'Jl. Stasiun No. 1, Kota XYZ',
    facilities: 'Area Parkir\nToilet\nRuang Tunggu\nMusholla\nKios Makanan & Minuman',
    roadDistance: '1.5 KM',
    region: 'Jawa Barat',
    nearbyFacilities: 'Rumah Sakit\nWarung Makan\nApotek'
};

// Data dummy untuk Kereta Api yang Berhenti
let stoppingTrains = [
    { no: 1, number: '123', name: 'Argo Bromo', route: 'Jakarta - Surabaya', arrival: '10:00', departure: '10:15' },
    { no: 2, number: '456', name: 'Sribilah', route: 'Medan - Rantauprapat', arrival: '12:30', departure: '12:45' },
    { no: 3, number: '789', name: 'Taksaka', route: 'Yogyakarta - Gambir', arrival: '15:00', departure: '15:15' }
];

// Data sample untuk timeline kereta (global)
const trainData = [
    { no: 1, number: "125", name: "Gajayana", route: "Gambir - Malang", arrival: "04:30", departure: "04:45", track: "1", status: "departed", stopType: "Berhenti" },
    { no: 2, number: "76", name: "Bima", route: "Gambir - Surabaya", arrival: "05:15", departure: "05:30", track: "2", status: "departed", stopType: "Berhenti" },
    { no: 3, number: "60", name: "Argo Lawu", route: "Gambir - Solo", arrival: "06:45", departure: "07:00", track: "1", status: "departed", stopType: "Berhenti" },
    { no: 4, number: "7", name: "Turangga", route: "Bandung - Surabaya", arrival: "08:20", departure: "08:35", track: "3", status: "arrived", stopType: "Berhenti" },
    { no: 5, number: "109", name: "Taksaka", route: "Gambir - Yogyakarta", arrival: "09:10", departure: "09:25", track: "2", status: "scheduled", stopType: "Berhenti" },
    { no: 6, number: "42", name: "Harina", route: "Bandung - Surabaya", arrival: "10:40", departure: "10:55", track: "4", status: "scheduled", stopType: "Berhenti" },
    { no: 7, number: "135", name: "Bangunkarta", route: "Jakarta - Jombang", arrival: "12:30", departure: "12:45", track: "1", status: "scheduled", stopType: "Berhenti" },
    { no: 8, number: "89", name: "Mutiara Selatan", route: "Bandung - Surabaya", arrival: "14:15", departure: "14:30", track: "3", status: "scheduled", stopType: "Berhenti" },
    { no: 9, number: "55", name: "Argo Wilis", route: "Bandung - Surabaya", arrival: "16:05", departure: "16:20", track: "2", status: "scheduled", stopType: "Berhenti" },
    { no: 10, number: "121", name: "Brantas", route: "Jakarta - Blitar", arrival: "18:40", departure: "18:55", track: "4", status: "scheduled", stopType: "Berhenti" },
    { no: 11, number: "228", name: "Gaya Baru Malam", route: "Pasar Senen - Surabaya", arrival: "20:30", departure: "20:45", track: "3", status: "scheduled", stopType: "Berhenti" },
    { no: 12, number: "87", name: "Malioboro Ekspres", route: "Malang - Yogyakarta", arrival: "22:15", departure: "22:30", track: "1", status: "scheduled", stopType: "Berhenti" }
];

let emplasemenImageUrl = "https://placehold.co/800x400/E0E7FF/1E40AF?text=Gambar+Emplasemen";

// Data dummy untuk tabel informasi jalur
let jalurData = [
    { jalur: 1, panjang: '500m', efektif: '450m', kereta: 'KA 125 Gajayana', gb: '-', gd: '-', gt: '-', gk: '-', keterangan: 'CC201, 203, 204 : 15.214 mm' },
    { jalur: 2, panjang: '550m', efektif: '500m', kereta: 'KA 76 Bima', gb: '-', gd: '-', gt: '-', gk: '-', keterangan: 'CC202, 205 : 18.942 mm' },
    { jalur: 3, panjang: '500m', efektif: '450m', kereta: 'Kosong', gb: '-', gd: '-', gt: '-', gk: '-', keterangan: 'CC206 : 15.849mm' }
];

let jalurMulaiBerlaku = "10 September 2025";

// Data dummy untuk tabel daftar jalur yang harus dilalui
let jalurDilaluiData = [
    { datang: '04:30', berangkat: '04:45', nomorKa: '125', jalur: '1', dari: 'Gambir', ke: 'Malang' },
    { datang: '05:15', berangkat: '05:30', nomorKa: '76', jalur: '2', dari: 'Gambir', ke: 'Surabaya' },
];

// Data dummy untuk Gangguan Operasional
let gangguanData = [
    { no: 1, tanggal: '2025-09-15', jenisGangguan: 'Sinyal Masuk Stasiun Error', laporKe: 'PK/OC', jam: '14:35', penanganan: 'Reset perangkat oleh teknisi Sintel', petugas: 'Andi & Tim Sintel' },
    { no: 2, tanggal: '2025-09-16', jenisGangguan: 'Listrik Aliran Atas (LAA) padam', laporKe: 'PK/OC LAA', jam: '10:10', penanganan: 'Pemeriksaan gardu, perbaikan oleh tim LAA', petugas: 'Tim LAA' }
];

// Data dummy untuk IBPR
let ibprData = [
    {
        id: '001', bahaya: 'Pintu perlintasan tidak berfungsi',
        kontrolPenjelasan: 'Pemeriksaan rutin harian', kontrolReferensi: 'SOP/JLR/01', efektivitas: 'Tinggi', kontrolPenanggungJawab: 'PJL',
        risikoPenjelasan: 'Kecelakaan di perlintasan sebidang', risikoProbabilitas: 2, risikoDampak: 5,
        rencanaPenjelasan: 'Upgrade sistem pintu otomatis', rencanaReferensi: 'PRJ/UPG/05', rencanaPenanggungJawab: 'Manajer Sinyal', rencanaTanggal: '2025-12-31',
        finalProbabilitas: 1, finalDampak: 5
    },
    {
        id: '002', bahaya: 'Rel patah',
        kontrolPenjelasan: 'Inspeksi jalur berkala', kontrolReferensi: 'SOP/JLR/02', efektivitas: 'Sedang', kontrolPenanggungJawab: 'JPJ',
        risikoPenjelasan: 'Anjlokan Kereta Api', risikoProbabilitas: 1, risikoDampak: 5,
        rencanaPenjelasan: 'Penggantian rel di KM 101+200', rencanaReferensi: 'PRJ/REL/02', rencanaPenanggungJawab: 'Manajer JJ', rencanaTanggal: '2025-11-30',
        finalProbabilitas: 1, finalDampak: 5
    }
];

// Data dummy untuk Penjagaan Bentuk-Bentuk
let penjagaanBentukData = [
    { tanggal: '2025-09-13', ptp: 'PTP-01', bh: 'BH-01', bk: 'BK-01', ms: 'MS-01', catatan: 'Pemeriksaan rutin, semua normal.' },
    { tanggal: '2025-09-14', ptp: 'PTP-02', bh: 'BH-02', bk: 'BK-02', ms: 'MS-02', catatan: 'Ada sedikit kendala pada MS-02, perlu perhatian.' }
];

// Data dummy untuk Penggunaan KR dan SM
let penggunaanKrSmData1 = [
    { no: 1, tanggal: '2025-09-13', kr1_awal: 100, kr1_akhir: 110, kr1_keterangan: 'Normal', sm1_awal: 200, sm1_akhir: 205, sm1_keterangan: 'Normal' },
    { no: 2, tanggal: '2025-09-14', kr1_awal: 110, kr1_akhir: 125, kr1_keterangan: 'Ada penambahan', sm1_awal: 205, sm1_akhir: 215, sm1_keterangan: 'Normal' }
];
let pihakStasiunKrSm1 = "Stasiun [Nama Stasiun A]";

let penggunaanKrSmData2 = [
    { no: 1, tanggal: '2025-09-13', kr1_awal: 500, kr1_akhir: 512, kr1_keterangan: 'Normal', sm1_awal: 800, sm1_akhir: 808, sm1_keterangan: 'Normal' },
];
let pihakStasiunKrSm2 = "Stasiun [Nama Stasiun B]";


// Fungsi-fungsi timeline (global)
function getCurrentTimeGMT7() {
    const now = new Date();
    const offset = 7;
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * offset));
}
function formatTimeWithSeconds(date) {
    return date.toTimeString().slice(0, 8);
}
function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
}
function generateTimelineMarkers() {
    const timelineHours = document.querySelector('.timeline-hours');
    const timelineMinutes = document.querySelector('.timeline-minutes');
    if (!timelineHours || !timelineMinutes) return;

    timelineHours.innerHTML = '';
    timelineMinutes.innerHTML = '';

    for (let i = 0; i < 24; i++) {
        const hourEl = document.createElement('div');
        hourEl.className = 'timeline-hour';
        hourEl.textContent = i.toString().padStart(2, '0') + ':00';
        timelineHours.appendChild(hourEl);
    }

    for (let i = 0; i < 1440; i += 5) {
        const minuteEl = document.createElement('div');
        minuteEl.className = 'timeline-minute';
        timelineMinutes.appendChild(minuteEl);
    }
}
function generateTimelineTrains() {
    const timelineTrains = document.getElementById('timeline-trains');
    if (!timelineTrains) return;

    timelineTrains.innerHTML = '';

    trainData.forEach(train => {
        // Gunakan jam berangkat untuk posisi di timeline
        // Lewati jika jam berangkat tidak valid (misalnya untuk KA Langsung yang belum di set)
        if (!train.departure || train.departure === '-' || !train.departure.includes(':')) return;

        const departureTime = train.departure.split(':');
        const departureMinutes = parseInt(departureTime[0]) * 60 + parseInt(departureTime[1]);

        const position = departureMinutes;

        const trainEl = document.createElement('div');
        trainEl.className = `timeline-train ${train.status}`;
        trainEl.style.left = `${(position / 1440) * 100}%`;
        trainEl.title = `${train.name} (${train.number}) - Datang: ${train.arrival}, Berangkat: ${train.departure}`;

        trainEl.innerHTML = `
                    <span class="train-number">${train.number}</span>
                    <span class="train-name">${train.name}</span>
                    <span class="train-time">${train.departure}</span>
                `;

        timelineTrains.appendChild(trainEl);
    });

    updateCurrentTimeLine();
}

function updateCurrentTimeLine() {
    const now = getCurrentTimeGMT7();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const totalMinutes = hours * 60 + minutes;

    const position = totalMinutes + (seconds / 60);

    const timeLine = document.getElementById('timeline-now');
    if (timeLine) {
        timeLine.style.left = `${(position / 1440) * 100}%`;
        timeLine.setAttribute('data-current-time', formatTimeWithSeconds(now));
    }

    const timeDisplay = document.getElementById('current-time-display');
    if (timeDisplay) {
        timeDisplay.textContent = `${formatDate(now)} | Waktu saat ini: ${formatTimeWithSeconds(now)} (WIB)`;
    }

    const timeline = document.querySelector('.timeline');
    if (timeline) {
        timeline.scrollLeft = ((position / 1440) * timeline.scrollWidth) - (timeline.clientWidth / 2);
    }
}

function updateTrainStatus() {
    const now = getCurrentTimeGMT7();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    trainData.forEach(train => {
        let arrivalMinutes = -1;
        if (train.arrival && train.arrival !== '-' && train.arrival.includes(':')) {
            const arrivalTime = train.arrival.split(':');
            arrivalMinutes = parseInt(arrivalTime[0]) * 60 + parseInt(arrivalTime[1]);
        }

        let departureMinutes = -1;
        if (train.departure && train.departure !== '-' && train.departure.includes(':')) {
            const departureTime = train.departure.split(':');
            departureMinutes = parseInt(departureTime[0]) * 60 + parseInt(departureTime[1]);
        }

        // Jika waktu berangkat tidak valid, kita tidak bisa menentukan statusnya.
        if (departureMinutes === -1) {
            train.status = 'scheduled'; // Status default
            return; // Lanjut ke kereta berikutnya
        }

        if (currentTime > departureMinutes) {
            train.status = 'departed';
        } else if (arrivalMinutes !== -1 && currentTime > arrivalMinutes && currentTime <= departureMinutes) {
            train.status = 'arrived';
        } else {
            train.status = 'scheduled';
        }
    });
}

function filterTrains() {
    const searchInput = document.getElementById('search-train');
    if (!searchInput) return;

    const searchTerm = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll('#train-table-body tr');

    rows.forEach(row => {
        let text = '';
        const inputs = row.querySelectorAll('input');
        if (inputs.length > 0) {
            // Edit mode, search within inputs
            inputs.forEach(input => {
                text += input.value.toLowerCase() + ' ';
            });
        } else {
            // View mode
            text = row.textContent.toLowerCase();
        }
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

// --- Fungsi Profil Stasiun ---
function populateProfileData() {
    document.getElementById('view-station-name').textContent = profileData.stationName;
    document.getElementById('view-abbreviation').textContent = profileData.abbreviation;
    document.getElementById('view-grade').textContent = profileData.grade;
    document.getElementById('view-code').textContent = profileData.code;
    document.getElementById('view-operational-hours').textContent = profileData.operationalHours;
    document.getElementById('view-km-location').textContent = profileData.kmLocation;
    document.getElementById('view-altitude').textContent = profileData.altitude;
    document.getElementById('view-address').textContent = profileData.address;
    document.getElementById('view-road-distance').textContent = profileData.roadDistance;
    document.getElementById('view-region').textContent = profileData.region;

    const facilitiesList = document.getElementById('view-facilities-list');
    facilitiesList.innerHTML = profileData.facilities.split('\n').map(item => `<li>${item.trim()}</li>`).join('');

    const nearbyFacilitiesList = document.getElementById('view-nearby-facilities-list');
    nearbyFacilitiesList.innerHTML = profileData.nearbyFacilities.split('\n').map(item => `<li>${item.trim()}</li>`).join('');
}

function populateProfileEditForm() {
    document.getElementById('edit-station-name').value = profileData.stationName;
    document.getElementById('edit-abbreviation').value = profileData.abbreviation;
    document.getElementById('edit-grade').value = profileData.grade;
    document.getElementById('edit-code').value = profileData.code;
    document.getElementById('edit-operational-hours').value = profileData.operationalHours;
    document.getElementById('edit-km-location').value = profileData.kmLocation;
    document.getElementById('edit-altitude').value = profileData.altitude;
    document.getElementById('edit-address').value = profileData.address;
    document.getElementById('edit-road-distance').value = profileData.roadDistance;
    document.getElementById('edit-region').value = profileData.region;
    document.getElementById('edit-facilities').value = profileData.facilities;
    document.getElementById('edit-nearby-facilities').value = profileData.nearbyFacilities;
}

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
        populateProfileEditForm();
    } else {
        viewMode.classList.remove('hidden');
        editMode.classList.add('hidden');
        editBtn.classList.remove('hidden');
        saveBtn.classList.add('hidden');
        cancelBtn.classList.add('hidden');
        populateProfileData();
    }
}
function saveProfileChanges() {
    profileData.stationName = document.getElementById('edit-station-name').value;
    profileData.abbreviation = document.getElementById('edit-abbreviation').value;
    profileData.grade = document.getElementById('edit-grade').value;
    profileData.code = document.getElementById('edit-code').value;
    profileData.operationalHours = document.getElementById('edit-operational-hours').value;
    profileData.kmLocation = document.getElementById('edit-km-location').value;
    profileData.altitude = document.getElementById('edit-altitude').value;
    profileData.address = document.getElementById('edit-address').value;
    profileData.roadDistance = document.getElementById('edit-road-distance').value;
    profileData.region = document.getElementById('edit-region').value;
    profileData.facilities = document.getElementById('edit-facilities').value;
    profileData.nearbyFacilities = document.getElementById('edit-nearby-facilities').value;
    toggleProfileEditMode(false);
}

function cancelProfileChanges() {
    toggleProfileEditMode(false);
}

// --- Fungsi Tabel Kereta Api yang Berhenti ---
function renderStoppingTrainsTable(isEditing = false) {
    const tableBody = document.getElementById('stopping-trains-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    stoppingTrains.forEach(train => {
        const row = document.createElement('tr');
        if (isEditing) {
            row.innerHTML = `
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${train.no}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="text" class="w-full rounded-md border-gray-300 shadow-sm" value="${train.number}"></td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="text" class="w-full rounded-md border-gray-300 shadow-sm" value="${train.name}"></td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="text" class="w-full rounded-md border-gray-300 shadow-sm" value="${train.route}"></td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="time" class="w-full rounded-md border-gray-300 shadow-sm" value="${train.arrival}"></td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="time" class="w-full rounded-md border-gray-300 shadow-sm" value="${train.departure}"></td>
                    `;
        } else {
            row.innerHTML = `
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${train.no}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${train.number}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${train.name}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${train.route}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${train.arrival}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${train.departure}</td>
                    `;
        }
        tableBody.appendChild(row);
    });
}
function toggleTrainTableEditMode(isEditing) {
    const editBtn = document.getElementById('train-edit-btn');
    const saveBtn = document.getElementById('train-save-btn');
    const cancelBtn = document.getElementById('train-cancel-btn');
    const addRowContainer = document.getElementById('add-train-row-container');

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
    renderStoppingTrainsTable(isEditing);
}
function addEditableTrainRow() {
    const tableBody = document.getElementById('stopping-trains-table-body');
    const newNo = stoppingTrains.length + 1;
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${newNo}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="text" class="w-full rounded-md border-gray-300 shadow-sm" placeholder="No. KA"></td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="text" class="w-full rounded-md border-gray-300 shadow-sm" placeholder="Nama KA"></td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="text" class="w-full rounded-md border-gray-300 shadow-sm" placeholder="Rute"></td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="time" class="w-full rounded-md border-gray-300 shadow-sm"></td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="time" class="w-full rounded-md border-gray-300 shadow-sm"></td>
            `;
    tableBody.appendChild(newRow);
}
function saveTrainTableChanges() {
    const tableRows = document.querySelectorAll('#stopping-trains-table-body tr');
    const newTrainsData = [];
    tableRows.forEach((row, index) => {
        const inputs = row.querySelectorAll('input');
        if (inputs.length === 5) { // Check if it's an editable row
            newTrainsData.push({
                no: index + 1,
                number: inputs[0].value,
                name: inputs[1].value,
                route: inputs[2].value,
                arrival: inputs[3].value,
                departure: inputs[4].value
            });
        }
    });
    stoppingTrains = newTrainsData;
    toggleTrainTableEditMode(false);
}
function cancelTrainTableChanges() {
    toggleTrainTableEditMode(false);
}
// --- Akhir Fungsi Profil Stasiun ---

// Objek untuk menyimpan konten halaman
const pages = {
    'dashboard': `
                <!-- Banner Informasi Besar -->
                <div class="relative w-full h-36 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] rounded-2xl p-6 mb-8 overflow-hidden shadow-lg flex items-center justify-between">
                    <div class="text-white">
                        <h2 class="text-2xl sm:text-3xl font-bold mb-2">Selamat Datang di Stasiun [Nama Stasiun]</h2>
                        <p class="text-lg font-light">Kelola operasional stasiun Anda dengan mudah.</p>
                    </div>
                </div>

                <!-- Timeline Section -->
                <section class="timeline-section">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-semibold text-gray-900">Timeline Perjalanan</h2>
                        <span id="current-time-display" class="text-gray-500 text-sm">Waktu saat ini: --:--:--</span>
                    </div>
                    <div class="timeline">
                        <div class="timeline-inner">
                            <div class="timeline-hours"></div>
                            <div class="timeline-minutes"></div>
                            <div class="timeline-now" id="timeline-now" data-current-time=""></div>
                            <div class="timeline-trains" id="timeline-trains"></div>
                        </div>
                    </div>
                </section>

                <!-- Grid Ringkasan Data -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <!-- Kartu 1: Jumlah Pegawai -->
                    <div class="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4 transition-all duration-300 hover:scale-105">
                        <div class="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-500">
                            <i class="fas fa-users text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-gray-500 text-sm">Jumlah Pegawai</h3>
                            <p class="text-gray-900 text-2xl font-bold mt-1">125</p>
                        </div>
                    </div>

                    <!-- Kartu 2: Perjalanan Hari Ini -->
                    <div class="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4 transition-all duration-300 hover:scale-105">
                        <div class="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-500">
                            <i class="fas fa-train text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-gray-500 text-sm">Perjalanan Hari Ini</h3>
                            <p class="text-gray-900 text-2xl font-bold mt-1">45</p>
                        </div>
                    </div>

                    <!-- Kartu 3: Perkiraan Cuaca -->
                    <div class="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4 transition-all duration-300 hover:scale-105">
                        <div class="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-500">
                            <i class="fas fa-cloud-sun text-xl"></i>
                        </div>
                        <div id="weather-data">
                            <h3 class="text-gray-500 text-sm">Perkiraan Cuaca</h3>
                            <p class="text-gray-900 text-2xl font-bold mt-1">Mengambil data...</p>
                        </div>
                    </div>
                </div>

                <!-- Bagian Data Pegawai Dinas Hari Ini -->
                <div class="bg-white rounded-xl shadow-md p-6 mb-8">
                    <h2 class="text-xl font-bold text-gray-900 mb-2">Data Pegawai yang Berdinas Hari Ini</h2>

                    <!-- Dinas Pagi -->
                    <p class="text-gray-700 font-semibold mb-4">Dinas Pagi</p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <!-- Kartu Dinas PPKA -->
                        <div class="flex items-center space-x-4 bg-gray-50 rounded-lg p-4 shadow-sm">
                            <img class="w-16 h-16 rounded-full object-cover" src="https://placehold.co/128x128/D1D5DB/1F2937?text=PPKA" alt="Foto PPKA">
                            <div>
                                <h3 class="font-bold text-lg text-gray-900">PPKA</h3>
                                <p class="text-gray-700">Nama: Budi Santoso</p>
                                <p class="text-gray-700">NIPP: 12345678</p>
                            </div>
                        </div>
                        <!-- Kartu Dinas PJL -->
                        <div class="flex items-center space-x-4 bg-gray-50 rounded-lg p-4 shadow-sm">
                            <img class="w-16 h-16 rounded-full object-cover" src="https://placehold.co/128x128/D1D5DB/1F2937?text=PJL" alt="Foto PJL">
                            <div>
                                <h3 class="font-bold text-lg text-gray-900">PJL</h3>
                                <p class="text-gray-700">Nama: Siti Nurhaliza</p>
                                <p class="text-gray-700">NIPP: 87654321</p>
                            </div>
                        </div>
                        <!-- Kartu Dinas PRS -->
                        <div class="flex items-center space-x-4 bg-gray-50 rounded-lg p-4 shadow-sm">
                            <img class="w-16 h-16 rounded-full object-cover" src="https://placehold.co/128x128/D1D5DB/1F2937?text=PRS" alt="Foto PRS">
                            <div>
                                <h3 class="font-bold text-lg text-gray-900">PRS</h3>
                                <p class="text-700">NIPP: 98765432</p>
                            </div>
                        </div>
                        <!-- Kartu Dinas PLR -->
                        <div class="flex items-center space-x-4 bg-gray-50 rounded-lg p-4 shadow-sm">
                            <img class="w-16 h-16 rounded-full object-cover" src="https://placehold.co/128x128/D1D5DB/1F2937?text=PLR" alt="Foto PLR">
                            <div>
                                <h3 class="font-bold text-lg text-gray-900">PLR</h3>
                                <p class="text-gray-700">Nama: Dewi Lestari</p>
                                <p class="text-gray-700">NIPP: 23456789</p>
                            </div>
                        </div>
                    </div>

                    <!-- Dinas Siang -->
                    <p class="text-gray-700 font-semibold mb-4">Dinas Siang</p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <!-- Kartu Dinas PPKA -->
                        <div class="flex items-center space-x-4 bg-gray-50 rounded-lg p-4 shadow-sm">
                            <img class="w-16 h-16 rounded-full object-cover" src="https://placehold.co/128x128/D1D5DB/1F2937?text=PPKA" alt="Foto PPKA">
                            <div>
                                <h3 class="font-bold text-lg text-gray-900">PPKA</h3>
                                <p class="text-gray-700">Nama: Budi Santoso</p>
                                <p class="text-gray-700">NIPP: 12345678</p>
                            </div>
                        </div>
                        <!-- Kartu Dinas PJL -->
                        <div class="flex items-center space-x-4 bg-gray-50 rounded-lg p-4 shadow-sm">
                            <img class="w-16 h-16 rounded-full object-cover" src="https://placehold.co/128x128/D1D5DB/1F2937?text=PJL" alt="Foto PJL">
                            <div>
                                <h3 class="font-bold text-lg text-gray-900">PJL</h3>
                                <p class="text-gray-700">Nama: Siti Nurhaliza</p>
                                <p class="text-gray-700">NIPP: 87654321</p>
                            </div>
                        </div>
                        <!-- Kartu Dinas PRS -->
                        <div class="flex items-center space-x-4 bg-gray-50 rounded-lg p-4 shadow-sm">
                            <img class="w-16 h-16 rounded-full object-cover" src="https://placehold.co/128x128/D1D5DB/1F2937?text=PRS" alt="Foto PRS">
                            <div>
                                <h3 class="font-bold text-lg text-gray-900">PRS</h3>
                                <p class="text-700">NIPP: 98765432</p>
                            </div>
                        </div>
                        <!-- Kartu Dinas PLR -->
                        <div class="flex items-center space-x-4 bg-gray-50 rounded-lg p-4 shadow-sm">
                            <img class="w-16 h-16 rounded-full object-cover" src="https://placehold.co/128x128/D1D5DB/1F2937?text=PLR" alt="Foto PLR">
                            <div>
                                <h3 class="font-bold text-lg text-gray-900">PLR</h3>
                                <p class="text-gray-700">Nama: Dewi Lestari</p>
                                <p class="text-gray-700">NIPP: 23456789</p>
                            </div>
                        </div>
                    </div>

                    <!-- Dinas Malam -->
                    <p class="text-gray-700 font-semibold mb-4">Dinas Malam</p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <!-- Kartu Dinas PPKA -->
                        <div class="flex items-center space-x-4 bg-gray-50 rounded-lg p-4 shadow-sm">
                            <img class="w-16 h-16 rounded-full object-cover" src="https://placehold.co/128x128/D1D5DB/1F2937?text=PPKA" alt="Foto PPKA">
                            <div>
                                <h3 class="font-bold text-lg text-gray-900">PPKA</h3>
                                <p class="text-gray-700">Nama: Budi Santoso</p>
                                <p class="text-gray-700">NIPP: 12345678</p>
                            </div>
                        </div>
                        <!-- Kartu Dinas PJL -->
                        <div class="flex items-center space-x-4 bg-gray-50 rounded-lg p-4 shadow-sm">
                            <img class="w-16 h-16 rounded-full object-cover" src="https://placehold.co/128x128/D1D5DB/1F2937?text=PJL" alt="Foto PJL">
                            <div>
                                <h3 class="font-bold text-lg text-gray-900">PJL</h3>
                                <p class="text-gray-700">Nama: Siti Nurhaliza</p>
                                <p class="text-gray-700">NIPP: 87654321</p>
                            </div>
                        </div>
                        <!-- Kartu Dinas PRS -->
                        <div class="flex items-center space-x-4 bg-gray-50 rounded-lg p-4 shadow-sm">
                            <img class="w-16 h-16 rounded-full object-cover" src="https://placehold.co/128x128/D1D5DB/1F2937?text=PRS" alt="Foto PRS">
                            <div>
                                <h3 class="font-bold text-lg text-gray-900">PRS</h3>
                                <p class="text-gray-700">Nama: Agus Sudarso</p>
                                <p class="text-gray-700">NIPP: 98765432</p>
                            </div>
                        </div>
                        <!-- Kartu Dinas PLR -->
                        <div class="flex items-center space-x-4 bg-gray-50 rounded-lg p-4 shadow-sm">
                            <img class="w-16 h-16 rounded-full object-cover" src="https://placehold.co/128x128/D1D5DB/1F2937?text=PLR" alt="Foto PLR">
                            <div>
                                <h3 class="font-bold text-lg text-gray-900">PLR</h3>
                                <p class="text-gray-700">Nama: Dewi Lestari</p>
                                <p class="text-gray-700">NIPP: 23456789</p>
                            </div>
                        </div>
                    </div>
                </div>
            `,
    'profil': `
                <div class="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div class="flex justify-between items-center mb-4">
                        <h1 class="text-2xl font-bold text-gray-900">Profil Stasiun</h1>
                        <div id="profil-edit-buttons-container" class="flex space-x-2">
                            <button id="profil-edit-btn" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Edit Data</button>
                            <button id="profil-save-btn" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300 hidden">Simpan</button>
                            <button id="profil-cancel-btn" class="bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300 hidden">Batal</button>
                        </div>
                    </div>

                    <div id="profil-view-mode">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <!-- Kartu 1: Informasi Stasiun -->
                            <div class="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:scale-105">
                                <h2 class="text-xl font-bold text-blue-600 flex items-center">
                                    <i class="fas fa-info-circle mr-2"></i> Informasi Stasiun
                                </h2>
                                <div class="title-divider"></div>
                                <ul id="info-stasiun-list" class="text-gray-700 space-y-2">
                                    <li><strong>Nama Stasiun:</strong> <span id="view-station-name"></span></li>
                                    <li><strong>Singkatan:</strong> <span id="view-abbreviation"></span></li>
                                    <li><strong>Kelas:</strong> <span id="view-grade"></span></li>
                                    <li><strong>Kode:</strong> <span id="view-code"></span></li>
                                    <li><strong>Waktu Operasional:</strong> <span id="view-operational-hours"></span></li>
                                </ul>
                            </div>

                            <!-- Kartu 2: Lokasi -->
                            <div class="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:scale-105">
                                <h2 class="text-xl font-bold text-blue-600 flex items-center">
                                    <i class="fas fa-map-marker-alt mr-2"></i> Lokasi
                                </h2>
                                <div class="title-divider"></div>
                                <ul id="lokasi-list" class="text-gray-700 space-y-2">
                                    <li><strong>Letak KM:</strong> <span id="view-km-location"></span></li>
                                    <li><strong>Ketinggian:</strong> <span id="view-altitude"></span></li>
                                    <li><strong>Alamat:</strong> <span id="view-address"></span></li>
                                    <li><strong>Jarak dari Jalan Raya:</strong> <span id="view-road-distance"></span></li>
                                    <li><strong>Wilayah:</strong> <span id="view-region"></span></li>
                                </ul>
                            </div>

                            <!-- Kartu 3: Fasilitas Stasiun -->
                            <div class="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:scale-105">
                                <h2 class="text-xl font-bold text-blue-600 flex items-center">
                                    <i class="fas fa-building mr-2"></i> Fasilitas Stasiun
                                </h2>
                                <div class="title-divider"></div>
                                <ul id="view-facilities-list" class="text-gray-700 list-disc list-inside space-y-2">
                                </ul>
                            </div>

                            <!-- Kartu 4: Fasilitas & Lokasi Terdekat -->
                            <div class="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:scale-105">
                                <h2 class="text-xl font-bold text-blue-600 flex items-center">
                                    <i class="fas fa-map-marked-alt mr-2"></i> Fasilitas & Lokasi Terdekat
                                </h2>
                                <div class="title-divider"></div>
                                <ul id="view-nearby-facilities-list" class="text-gray-700 list-disc list-inside space-y-2">
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div id="profil-edit-mode" class="hidden">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <!-- Kartu 1: Informasi Stasiun -->
                            <div class="bg-white rounded-xl shadow-md p-6">
                                <h2 class="text-xl font-bold text-blue-600 flex items-center">
                                    <i class="fas fa-info-circle mr-2"></i> Informasi Stasiun
                                </h2>
                                <div class="title-divider"></div>
                                <div class="text-gray-700 space-y-2">
                                    <div>
                                        <label for="edit-station-name" class="block text-sm font-bold text-gray-700">Nama Stasiun:</label>
                                        <input type="text" id="edit-station-name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                    </div>
                                    <div>
                                        <label for="edit-abbreviation" class="block text-sm font-bold text-gray-700">Singkatan:</label>
                                        <input type="text" id="edit-abbreviation" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                    </div>
                                    <div>
                                        <label for="edit-grade" class="block text-sm font-bold text-gray-700">Kelas:</label>
                                        <input type="text" id="edit-grade" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                    </div>
                                    <div>
                                        <label for="edit-code" class="block text-sm font-bold text-gray-700">Kode:</label>
                                        <input type="text" id="edit-code" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                    </div>
                                    <div>
                                        <label for="edit-operational-hours" class="block text-sm font-bold text-gray-700">Waktu Operasional:</label>
                                        <input type="text" id="edit-operational-hours" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                    </div>
                                </div>
                            </div>

                            <!-- Kartu 2: Lokasi -->
                            <div class="bg-white rounded-xl shadow-md p-6">
                                <h2 class="text-xl font-bold text-blue-600 flex items-center">
                                    <i class="fas fa-map-marker-alt mr-2"></i> Lokasi
                                </h2>
                                <div class="title-divider"></div>
                                <div class="text-gray-700 space-y-2">
                                    <div>
                                        <label for="edit-km-location" class="block text-sm font-bold text-gray-700">Letak KM:</label>
                                        <input type="text" id="edit-km-location" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                    </div>
                                    <div>
                                        <label for="edit-altitude" class="block text-sm font-bold text-gray-700">Ketinggian:</label>
                                        <input type="text" id="edit-altitude" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                    </div>
                                    <div>
                                        <label for="edit-address" class="block text-sm font-bold text-gray-700">Alamat:</label>
                                        <textarea id="edit-address" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
                                    </div>
                                    <div>
                                        <label for="edit-road-distance" class="block text-sm font-bold text-gray-700">Jarak dari Jalan Raya:</label>
                                        <input type="text" id="edit-road-distance" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                    </div>
                                    <div>
                                        <label for="edit-region" class="block text-sm font-bold text-gray-700">Wilayah:</label>
                                        <input type="text" id="edit-region" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                    </div>
                                </div>
                            </div>

                            <!-- Kartu 3: Fasilitas Stasiun -->
                            <div class="bg-white rounded-xl shadow-md p-6">
                                <h2 class="text-xl font-bold text-blue-600 flex items-center">
                                    <i class="fas fa-building mr-2"></i> Fasilitas Stasiun
                                </h2>
                                <div class="title-divider"></div>
                                <div>
                                    <label for="edit-facilities" class="block text-sm font-bold text-gray-700">Daftar Fasilitas:</label>
                                    <textarea id="edit-facilities" rows="5" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
                                </div>
                            </div>

                            <!-- Kartu 4: Fasilitas & Lokasi Terdekat -->
                            <div class="bg-white rounded-xl shadow-md p-6">
                                <h2 class="text-xl font-bold text-blue-600 flex items-center">
                                    <i class="fas fa-map-marked-alt mr-2"></i> Fasilitas & Lokasi Terdekat
                                </h2>
                                <div class="title-divider"></div>
                                <div>
                                    <label for="edit-nearby-facilities" class="block text-sm font-bold text-gray-700">Daftar Fasilitas & Lokasi:</label>
                                    <textarea id="edit-nearby-facilities" rows="5" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Section Baru: Kereta Api yang Berhenti -->
                <div class="bg-white rounded-xl shadow-md p-6 mt-8">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-bold text-gray-900">Kereta Api yang Berhenti</h2>
                        <div id="train-edit-buttons-container" class="flex space-x-2">
                            <button id="train-edit-btn" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Edit Data</button>
                            <button id="train-save-btn" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300 hidden">Simpan</button>
                            <button id="train-cancel-btn" class="bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300 hidden">Batal</button>
                        </div>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. KA</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama KA</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rute</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jam Datang</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jam Berangkat</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200" id="stopping-trains-table-body">
                                <!-- Data will be populated by JavaScript -->
                            </tbody>
                        </table>
                    </div>
                    <div id="add-train-row-container" class="mt-4 text-center hidden">
                        <button id="add-train-row-btn" class="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Tambah Baris</button>
                    </div>
                </div>
            `,
    'pegawai': `
                <div id="pegawai-list-view">
                    <div class="bg-white rounded-xl shadow-md p-6 mb-8">
                        <div class="flex justify-between items-center mb-4">
                            <h1 class="text-2xl font-bold text-gray-900">Data Pegawai</h1>
                            <div id="main-employee-edit-buttons" class="flex space-x-2">
                                <button id="main-employee-edit-btn" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Edit Data</button>
                                <button id="main-employee-save-btn" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300 hidden">Simpan</button>
                                <button id="main-employee-cancel-btn" class="bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300 hidden">Batal</button>
                            </div>
                        </div>
                        <p class="text-gray-700">Ini adalah halaman data pegawai. Di sini Anda bisa mengelola daftar pegawai.</p>

                        <!-- Card Grid untuk Ringkasan Pegawai -->
                        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4 mb-8">
                            <!-- Kartu Total Pegawai -->
                            <div class="bg-white rounded-xl shadow-md p-4 text-center">
                                <h3 class="text-blue-600 text-xs sm:text-sm font-bold">Total Pegawai</h3>
                                <p class="text-gray-900 text-xl sm:text-2xl font-bold mt-1">45</p>
                            </div>
                            <!-- Kartu Kepala Stasiun -->
                            <div class="bg-white rounded-xl shadow-md p-4 text-center">
                                <h3 class="text-gray-500 text-xs sm:text-sm font-medium">Kepala Stasiun</h3>
                                <p class="text-gray-900 text-xl sm:text-2xl font-bold mt-1">1</p>
                            </div>
                            <!-- Kartu Wakil Kepala Stasiun -->
                            <div class="bg-white rounded-xl shadow-md p-4 text-center">
                                <h3 class="text-gray-500 text-xs sm:text-sm font-medium">Wakil Kepala Stasiun</h3>
                                <p class="text-gray-900 text-xl sm:text-2xl font-bold mt-1">1</p>
                            </div>
                            <!-- Kartu PPKA -->
                            <div class="bg-white rounded-xl shadow-md p-4 text-center">
                                <h3 class="text-gray-500 text-xs sm:text-sm font-medium">PPKA</h3>
                                <p class="text-gray-900 text-xl sm:text-2xl font-bold mt-1">4</p>
                            </div>
                            <!-- Kartu PRS -->
                            <div class="bg-white rounded-xl shadow-md p-4 text-center">
                                <h3 class="text-gray-500 text-xs sm:text-sm font-medium">PRS</h3>
                                <p class="text-gray-900 text-xl sm:text-2xl font-bold mt-1">8</p>
                            </div>
                            <!-- Kartu PLR -->
                            <div class="bg-white rounded-xl shadow-md p-4 text-center">
                                <h3 class="text-gray-500 text-xs sm:text-sm font-medium">PLR</h3>
                                <p class="text-gray-900 text-xl sm:text-2xl font-bold mt-1">6</p>
                            </div>
                            <!-- Kartu PJL -->
                            <div class="bg-white rounded-xl shadow-md p-4 text-center">
                                <h3 class="text-gray-500 text-xs sm:text-sm font-medium">PJL</h3>
                                <p class="text-gray-900 text-xl sm:text-2xl font-bold mt-1">5</p>
                            </div>
                            <!-- Kartu Loket -->
                            <div class="bg-white rounded-xl shadow-md p-4 text-center">
                                <h3 class="text-gray-500 text-xs sm:text-sm font-medium">Loket</h3>
                                <p class="text-gray-900 text-xl sm:text-2xl font-bold mt-1">3</p>
                            </div>
                            <!-- Kartu Customer Service -->
                            <div class="bg-white rounded-xl shadow-md p-4 text-center">
                                <h3 class="text-gray-500 text-xs sm:text-sm font-medium">Customer Service</h3>
                                <p class="text-gray-900 text-xl sm:text-2xl font-bold mt-1">2</p>
                            </div>
                            <!-- Kartu Announcer -->
                            <div class="bg-white rounded-xl shadow-md p-4 text-center">
                                <h3 class="text-gray-500 text-xs sm:text-sm font-medium">Announcer</h3>
                                <p class="text-gray-900 text-xl sm:text-2xl font-bold mt-1">2</p>
                            </div>
                            <!-- Kartu Security -->
                            <div class="bg-white rounded-xl shadow-md p-4 text-center">
                                <h3 class="text-gray-500 text-xs sm:text-sm font-medium">Security</h3>
                                <p class="text-gray-900 text-xl sm:text-2xl font-bold mt-1">8</p>
                            </div>
                            <!-- Kartu Cleaning Service -->
                            <div class="bg-white rounded-xl shadow-md p-4 text-center">
                                <h3 class="text-gray-500 text-xs sm:text-sm font-medium">Cleaning Service</h3>
                                <p class="text-gray-900 text-xl sm:text-2xl font-bold mt-1">5</p>
                            </div>
                        </div>

                        <div class="mt-4 overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-blue-600 text-white">
                                    <tr>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nama</th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">NIPP</th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Jabatan</th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Unit</th>
                                        <th id="options-header" scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider hidden">Opsi</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200" id="employee-table-body">
                                </tbody>
                            </table>
                        </div>

                        <!-- Tombol Tambah Pegawai (Tersembunyi secara default) -->
                        <div id="add-employee-row-container" class="mt-8 text-center hidden">
                            <button id="add-employee-row-btn" class="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Tambah Pegawai</button>
                        </div>

                        <!-- Tabel Daftar Dinasa -->
                        <div class="bg-white rounded-xl shadow-md p-6 mt-12">
                            <div class="flex justify-between items-center mb-4">
                                <h2 class="text-xl font-bold text-gray-900">Daftar Dinasan</h2>
                                <div id="dinasa-edit-buttons-container" class="flex space-x-2">
                                    <button id="dinasa-edit-btn" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Edit</button>
                                    <button id="dinasa-save-btn" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300 hidden">Simpan</button>
                                    <button id="dinasa-cancel-btn" class="bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300 hidden">Batal</button>
                                </div>
                            </div>
                            <div class="mb-4">
                                <label for="dinasa-bulan" class="font-semibold text-gray-700">Bulan : </label>
                                <input type="text" id="dinasa-bulan" class="p-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" disabled>
                            </div>
                            <div class="overflow-x-auto">
                                <table class="min-w-full divide-y divide-gray-200 border border-gray-200" id="dinasa-table">
                                    <thead class="bg-blue-600 text-white" id="dinasa-table-head">
                                        <!-- Header akan digenerate oleh JavaScript -->
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200" id="dinasa-table-body">
                                        <!-- Body akan digenerate oleh JavaScript -->
                                    </tbody>
                                </table>
                            </div>
                             <div id="add-dinasa-row-container" class="mt-4 text-center hidden">
                                <button id="add-dinasa-row-btn" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Tambah Baris</button>
                            </div>
                            <div class="mt-6">
                                <label for="dinasa-keterangan" class="font-semibold text-gray-700">Keterangan :</label>
                                <textarea id="dinasa-keterangan" rows="4" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" disabled></textarea>
                            </div>
                        </div>

                        <!-- Bagian Sertifikasi dan Tanda Kecakapan -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                            <!-- Kartu Data Sertifikasi -->
                            <div class="bg-white rounded-xl shadow-md p-6">
                                <h2 class="text-xl font-bold text-gray-900 mb-4 text-center">Data Sertifikasi</h2>
                                <div class="flex flex-col items-center justify-center">
                                    <div class="chart-circle" style="background-image: conic-gradient(#3B82F6 0% 70%, #E5E7EB 70% 100%);">
                                        <span class="chart-text">70%</span>
                                    </div>
                                    <div class="flex justify-center space-x-6 mt-4 text-center">
                                        <div>
                                            <p class="text-gray-500 text-sm">Aktif</p>
                                            <p class="text-gray-900 text-lg font-bold">35</p>
                                        </div>
                                        <div>
                                            <p class="text-gray-500 text-sm">Nonaktif</p>
                                            <p class="text-gray-900 text-lg font-bold">10</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Kartu Data Tanda Kecakapan -->
                            <div class="bg-white rounded-xl shadow-md p-6">
                                <h2 class="text-xl font-bold text-gray-900 mb-4 text-center">Data Tanda Kecakapan</h2>
                                <div class="flex flex-col items-center justify-center">
                                    <div class="chart-circle" style="background-image: conic-gradient(#3B82F6 0% 90%, #E5E7EB 90% 100%);">
                                        <span class="chart-text">90%</span>
                                    </div>
                                    <div class="flex justify-center space-x-6 mt-4 text-center">
                                        <div>
                                            <p class="text-gray-500 text-sm">Aktif</p>
                                            <p class="text-gray-900 text-lg font-bold">40</p>
                                        </div>
                                        <div>
                                            <p class="text-gray-500 text-sm">Nonaktif</p>
                                            <p class="text-gray-900 text-lg font-bold">5</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Tabel Kebutuhan dan Jam Kerja -->
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                            <!-- Tabel Kebutuhan Pegawai -->
                            <div class="bg-white rounded-xl shadow-md p-6">
                                <div class="flex justify-between items-center mb-4">
                                    <h2 class="text-xl font-bold text-gray-900">Kebutuhan Pegawai</h2>
                                    <div id="kebutuhan-edit-buttons-container" class="flex space-x-2">
                                        <button id="kebutuhan-edit-btn" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Edit</button>
                                        <button id="kebutuhan-save-btn" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300 hidden">Simpan</button>
                                        <button id="kebutuhan-cancel-btn" class="bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300 hidden">Batal</button>
                                    </div>
                                </div>
                                <div class="overflow-x-auto">
                                    <table class="min-w-full divide-y divide-gray-200" id="kebutuhan-table">
                                        <thead class="bg-blue-600 text-white">
                                            <tr>
                                                <th class="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">Jabatan</th>
                                                <th class="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">Dinas</th>
                                                <th class="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">L/I/S</th>
                                                <th class="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">Kebutuhan</th>
                                                <th class="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">Adanya</th>
                                                <th class="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">Kurang</th>
                                                <th class="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">Lebih</th>
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white divide-y divide-gray-200" id="kebutuhan-table-body">
                                            <tr>
                                                <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-900">PPKA</td>
                                                <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">A</td>
                                                <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">L</td>
                                                <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">1</td>
                                                <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">1</td>
                                                <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">0</td>
                                                <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">0</td>
                                            </tr>
                                            <tr>
                                                <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-900">PRS</td>
                                                <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">B</td>
                                                <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">L</td>
                                                <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">2</td>
                                                <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">2</td>
                                                <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">0</td>
                                                <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">0</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div id="add-kebutuhan-row-container" class="mt-4 text-center hidden">
                                    <button id="add-kebutuhan-row-btn" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Tambah Baris</button>
                                </div>
                            </div>

                            <!-- Tabel Ikhtisar Jam Kerja -->
                            <div class="bg-white rounded-xl shadow-md p-6">
                                <div class="flex justify-between items-center mb-4">
                                    <h2 class="text-xl font-bold text-gray-900">Ikhtisar Jam Kerja (IJK)</h2>
                                    <div id="jamkerja-edit-buttons-container" class="flex space-x-2">
                                        <button id="jamkerja-edit-btn" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Edit</button>
                                        <button id="jamkerja-save-btn" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300 hidden">Simpan</button>
                                        <button id="jamkerja-cancel-btn" class="bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300 hidden">Batal</button>
                                    </div>
                                </div>
                                <div class="overflow-x-auto">
                                    <table class="min-w-full divide-y divide-gray-200" id="jamkerja-table">
                                        <thead class="bg-blue-600 text-white">
                                            <tr>
                                                <th class="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">Dinas</th>
                                                <th class="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">Mulai Dinas</th>
                                                <th class="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">Akhir Dinas</th>
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white divide-y divide-gray-200" id="jamkerja-table-body">
                                            <tr>
                                                <td class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">A</td>
                                                <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">07:00</td>
                                                <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">15:00</td>
                                            </tr>
                                            <tr>
                                                <td class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">B</td>
                                                <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">15:00</td>
                                                <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">23:00</td>
                                            </tr>
                                            <tr>
                                                <td class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">C</td>
                                                <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">23:00</td>
                                                <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">07:00</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div id="add-jamkerja-row-container" class="mt-4 text-center hidden">
                                    <button id="add-jamkerja-row-btn" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Tambah Baris</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
    'perjalanan': `
                <div class="bg-white rounded-xl shadow-md p-6 mb-8">
                    <h1 class="text-2xl font-bold text-gray-900 mb-4">Data Perjalanan Kereta Api</h1>
                    <p class="text-gray-700">Informasi real-time kedatangan dan keberangkatan kereta api.</p>
                </div>
                <!-- Timeline Section -->
                <section class="timeline-section">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-semibold text-gray-900">Timeline Perjalanan</h2>
                        <span id="current-time-display" class="text-gray-500 text-sm">Waktu saat ini: --:--:--</span>
                    </div>
                    <div class="timeline">
                        <div class="timeline-inner">
                            <div class="timeline-hours"></div>
                            <div class="timeline-minutes"></div>
                            <div class="timeline-now" id="timeline-now" data-current-time=""></div>
                            <div class="timeline-trains" id="timeline-trains"></div>
                        </div>
                    </div>
                </section>
                <!-- Table Section -->
                <section class="table-section">
                    <div class="flex justify-between items-center mb-4 flex-wrap">
                        <div>
                            <h2 class="text-xl font-semibold text-gray-900 mb-2">Daftar Perjalanan</h2>
                             <div id="perka-edit-buttons-container" class="flex space-x-2">
                                <button id="perka-edit-btn" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Edit Data</button>
                                <button id="perka-save-btn" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300 hidden">Simpan</button>
                                <button id="perka-cancel-btn" class="bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300 hidden">Batal</button>
                            </div>
                        </div>
                        <div class="search-box mt-4 md:mt-0">
                            <i class="fas fa-search"></i>
                            <input type="text" id="search-train" placeholder="Cari KA, rute...">
                        </div>
                    </div>
                    <div class="train-table-container">
                        <table class="train-table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>No. KA</th>
                                    <th>Nama KA</th>
                                    <th>Rute</th>
                                    <th>Jam Datang</th>
                                    <th>Jam Berangkat</th>
                                    <th>Jalur</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody id="train-table-body">
                                <!-- Data will be populated by JavaScript -->
                            </tbody>
                        </table>
                    </div>
                    <div id="add-perka-row-container" class="mt-4 text-center hidden">
                        <button id="add-perka-row-btn" class="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Tambah Baris</button>
                    </div>
                </section>
                <!-- Emplasemen Section -->
                <div class="grid grid-cols-1 gap-8 mt-12">
                    <div class="bg-white rounded-xl shadow-md p-6">
                        <div class="flex justify-between items-center mb-4">
                            <h2 class="text-xl font-bold text-gray-900">Gambar Emplasemen</h2>
                            <div id="emplasemen-edit-buttons-container" class="flex space-x-2">
                                <button id="emplasemen-edit-btn" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Edit</button>
                                <button id="emplasemen-save-btn" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300 hidden">Simpan</button>
                                <button id="emplasemen-cancel-btn" class="bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300 hidden">Batal</button>
                            </div>
                        </div>
                         <div id="emplasemen-view-mode">
                            <img id="emplasemen-image" src="https://placehold.co/800x400/E0E7FF/1E40AF?text=Gambar+Emplasemen" alt="Gambar Emplasemen" class="w-full h-auto rounded-lg object-contain">
                        </div>
                        <div id="emplasemen-edit-mode" class="hidden">
                             <img id="emplasemen-image-preview" src="https://placehold.co/800x400/E0E7FF/1E40AF?text=Gambar+Emplasemen" alt="Preview Gambar Emplasemen" class="w-full h-auto rounded-lg mb-4 object-contain">
                            <input type="file" id="emplasemen-upload" class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
                        </div>
                    </div>
                </div>
                <!-- Jalur Info Section -->
                <section class="jalur-info-section">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-semibold text-gray-900">Informasi Jalur</h2>
                        <div id="jalur-edit-buttons-container" class="flex space-x-2">
                            <button id="jalur-edit-btn" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Edit</button>
                            <button id="jalur-save-btn" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300 hidden">Simpan</button>
                            <button id="jalur-cancel-btn" class="bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300 hidden">Batal</button>
                        </div>
                    </div>
                    <div class="mb-4">
                        <label for="jalur-mulai-berlaku" class="text-sm font-semibold text-gray-700">Mulai Berlaku : </label>
                        <input type="text" id="jalur-mulai-berlaku" class="p-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm" disabled>
                    </div>
                    <div class="jalur-table-container">
                        <table class="jalur-table">
                            <thead id="jalur-table-head">
                                <!-- Header generated by JS -->
                            </thead>
                            <tbody id="jalur-table-body">
                                <!-- Data will be populated by JavaScript -->
                            </tbody>
                        </table>
                    </div>
                    <div id="add-jalur-row-container" class="mt-4 text-center hidden">
                        <button id="add-jalur-row-btn" class="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Tambah Baris</button>
                    </div>
                    <div class="mt-6">
                        <p class="font-semibold text-gray-700">Keterangan :</p>
                        <div class="mt-1 p-3 border border-gray-200 rounded-md bg-gray-50 text-sm text-gray-800">
                            <div class="flex space-x-8">
                                <div>
                                    <p class="whitespace-nowrap"><strong>CC201, 203, 204 :</strong> 15.214 mm</p>
                                    <p class="whitespace-nowrap"><strong>CC202, 205 :</strong> 18.942 mm</p>
                                    <p class="whitespace-nowrap"><strong>CC206 :</strong> 15.849mm</p>
                                </div>
                                <div>
                                    <p class="whitespace-nowrap"><strong>KERETA :</strong> 21.000 mm</p>
                                    <p class="whitespace-nowrap"><strong>GD :</strong> 14.700 mm</p>
                                    <p class="whitespace-nowrap"><strong>GB, GT :</strong> 13.200 mm</p>
                                    <p class="whitespace-nowrap"><strong>GK :</strong> 12.500 mm</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Daftar Jalur Section -->
                <section class="table-section mt-8">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-semibold text-gray-900">Daftar Jalur yang Harus Dilalui</h2>
                        <div id="jalur-dilalui-edit-buttons-container" class="flex space-x-2">
                            <button id="jalur-dilalui-edit-btn" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Edit</button>
                            <button id="jalur-dilalui-save-btn" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300 hidden">Simpan</button>
                            <button id="jalur-dilalui-cancel-btn" class="bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300 hidden">Batal</button>
                        </div>
                    </div>
                    <div class="train-table-container">
                        <table class="train-table" id="jalur-dilalui-table">
                            <thead id="jalur-dilalui-table-head">
                                <!-- Header generated by JS -->
                            </thead>
                            <tbody id="jalur-dilalui-table-body">
                                <!-- Data will be populated by JavaScript -->
                            </tbody>
                        </table>
                    </div>
                    <div id="add-jalur-dilalui-row-container" class="mt-4 text-center hidden">
                        <button id="add-jalur-dilalui-row-btn" class="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Tambah Baris</button>
                    </div>
                </section>
            `,
    'administrasi': `
                <div class="bg-white rounded-xl shadow-md p-6 mb-8">
                    <h1 class="text-2xl font-bold text-gray-900 mb-4">Data Administrasi</h1>
                    <p class="text-gray-700">Silakan pilih sub-menu di samping untuk melihat data administrasi lebih detail.</p>
                </div>
            `,
    'ibpr': `
                <div class="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
                        <h1 class="text-2xl font-bold text-gray-900">Identifikasi Bahaya dan Penilaian Risiko (IBPR)</h1>
                        <div id="ibpr-edit-buttons-container" class="flex space-x-2">
                            <button id="ibpr-edit-btn" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Edit Data</button>
                            <button id="ibpr-save-btn" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300 hidden">Simpan</button>
                            <button id="ibpr-cancel-btn" class="bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300 hidden">Batal</button>
                        </div>
                    </div>

                    <div class="ibpr-table-container">
                        <table class="ibpr-table">
                            <thead class="bg-blue-600 text-white">
                                <tr>
                                    <th colspan="2">Identifikasi Bahaya</th>
                                    <th colspan="6">Kontrol yang Ada</th>
                                    <th colspan="4">Penilaian Risiko</th>
                                    <th colspan="4">Rencana Tindak Lanjut</th>
                                    <th colspan="3">Penilaian Risiko Setelah Tindak Lanjut</th>
                                    <th rowspan="3" id="ibpr-opsi-header" class="hidden">Opsi</th>
                                </tr>
                                <tr>
                                    <th rowspan="2">ID</th>
                                    <th rowspan="2">Bahaya</th>
                                    <th rowspan="2">Penjelasan Kontrol</th>
                                    <th rowspan="2">Referensi</th>
                                    <th colspan="3">Efektivitas</th>
                                    <th rowspan="2">Posisi Penanggung Jawab</th>
                                    <th rowspan="2">Penjelasan Risiko</th>
                                    <th rowspan="2">Probabilitas</th>
                                    <th rowspan="2">Dampak</th>
                                    <th rowspan="2">Nilai Risiko</th>
                                    <th rowspan="2">Penjelasan Rencana Tindak Lanjut</th>
                                    <th rowspan="2">Referensi</th>
                                    <th rowspan="2">Posisi Penanggung Jawab</th>
                                    <th rowspan="2">Tanggal Selesai</th>
                                    <th rowspan="2">Probabilitas</th>
                                    <th rowspan="2">Dampak</th>
                                    <th rowspan="2">Nilai Risiko</th>
                                </tr>
                                <tr>
                                    <th>Tinggi</th>
                                    <th>Sedang</th>
                                    <th>Rendah</th>
                                </tr>
                            </thead>
                            <tbody id="ibpr-table-body">
                                <!-- Data will be populated by JavaScript -->
                            </tbody>
                        </table>
                    </div>
                     <div id="add-ibpr-row-container" class="mt-4 text-center hidden">
                        <button id="add-ibpr-row-btn" class="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Tambah Baris</button>
                    </div>
                </div>
            `,
    'penjagaan-bentuk': `
                <div class="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
                        <h1 class="text-2xl font-bold text-gray-900">Penjagaan Bentuk - Bentuk</h1>
                        <div id="penjagaan-bentuk-edit-buttons-container" class="flex space-x-2">
                            <button id="penjagaan-bentuk-edit-btn" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Edit Data</button>
                            <button id="penjagaan-bentuk-save-btn" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300 hidden">Simpan</button>
                            <button id="penjagaan-bentuk-cancel-btn" class="bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300 hidden">Batal</button>
                        </div>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200 border">
                            <thead class="bg-blue-600 text-white">
                                <tr>
                                    <th rowspan="2" class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider align-middle">TANGGAL</th>
                                    <th colspan="4" class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">NO BENTUK</th>
                                    <th rowspan="2" class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider align-middle">CATATAN</th>
                                    <th rowspan="2" id="penjagaan-bentuk-opsi-header" class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider align-middle hidden">Opsi</th>
                                </tr>
                                <tr>
                                    <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">PTP</th>
                                    <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">BH</th>
                                    <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">BK</th>
                                    <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">MS</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200" id="penjagaan-bentuk-table-body">
                                <!-- Data will be populated by JavaScript -->
                            </tbody>
                        </table>
                    </div>
                    <div id="add-penjagaan-bentuk-row-container" class="mt-4 text-center hidden">
                        <button id="add-penjagaan-bentuk-row-btn" class="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Tambah Baris</button>
                    </div>
                </div>
            `,
    'penggunaan': `
                <div class="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
                        <h1 class="text-2xl font-bold text-gray-900">Penggunaan KR dan SM</h1>
                        <div id="penggunaan-kr-sm-edit-buttons-container-1" class="flex space-x-2">
                            <button id="penggunaan-kr-sm-edit-btn-1" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Edit Data</button>
                            <button id="penggunaan-kr-sm-save-btn-1" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300 hidden">Simpan</button>
                            <button id="penggunaan-kr-sm-cancel-btn-1" class="bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300 hidden">Batal</button>
                        </div>
                    </div>
                    <div class="mb-4 text-sm">
                        <label for="pihak-stasiun-input-1" class="font-semibold text-gray-700">Pihak Stasiun : </label>
                        <span id="pihak-stasiun-view-1" class="text-gray-900"></span>
                        <input type="text" id="pihak-stasiun-input-1" class="p-1 border border-gray-300 rounded-md shadow-sm hidden">
                    </div>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200 border">
                            <thead class="bg-blue-600 text-white">
                                <tr>
                                    <th rowspan="2" class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider align-middle">NO.</th>
                                    <th rowspan="2" class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider align-middle">TANGGAL</th>
                                    <th colspan="3" class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">COUNTER KR 1</th>
                                    <th colspan="3" class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">COUNTER SM 1</th>
                                    <th rowspan="2" id="penggunaan-kr-sm-opsi-header-1" class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider align-middle hidden">Opsi</th>
                                </tr>
                                <tr>
                                    <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">AWAL</th>
                                    <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">AKHIR</th>
                                    <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">KETERANGAN</th>
                                    <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">AWAL</th>
                                    <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">AKHIR</th>
                                    <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">KETERANGAN</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200" id="penggunaan-kr-sm-table-body-1">
                                <!-- Data will be populated by JavaScript -->
                            </tbody>
                        </table>
                    </div>
                     <div id="add-penggunaan-kr-sm-row-container-1" class="mt-4 text-center hidden">
                        <button id="add-penggunaan-kr-sm-row-btn-1" class="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Tambah Baris</button>
                    </div>

                    <hr class="my-8 border-t-2 border-gray-300">

                    <div class="flex justify-end items-center mb-6 flex-wrap gap-4">
                         <div id="penggunaan-kr-sm-edit-buttons-container-2" class="flex space-x-2">
                            <button id="penggunaan-kr-sm-edit-btn-2" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Edit Data</button>
                            <button id="penggunaan-kr-sm-save-btn-2" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300 hidden">Simpan</button>
                            <button id="penggunaan-kr-sm-cancel-btn-2" class="bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300 hidden">Batal</button>
                        </div>
                    </div>
                    <div class="mb-4 text-sm">
                        <label for="pihak-stasiun-input-2" class="font-semibold text-gray-700">Pihak Stasiun : </label>
                        <span id="pihak-stasiun-view-2" class="text-gray-900"></span>
                        <input type="text" id="pihak-stasiun-input-2" class="p-1 border border-gray-300 rounded-md shadow-sm hidden">
                    </div>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200 border">
                            <thead class="bg-blue-600 text-white">
                                <tr>
                                    <th rowspan="2" class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider align-middle">NO.</th>
                                    <th rowspan="2" class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider align-middle">TANGGAL</th>
                                    <th colspan="3" class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">COUNTER KR 1</th>
                                    <th colspan="3" class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">COUNTER SM 1</th>
                                    <th rowspan="2" id="penggunaan-kr-sm-opsi-header-2" class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider align-middle hidden">Opsi</th>
                                </tr>
                                <tr>
                                    <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">AWAL</th>
                                    <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">AKHIR</th>
                                    <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">KETERANGAN</th>
                                    <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">AWAL</th>
                                    <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">AKHIR</th>
                                    <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">KETERANGAN</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200" id="penggunaan-kr-sm-table-body-2">
                                <!-- Data will be populated by JavaScript -->
                            </tbody>
                        </table>
                    </div>
                     <div id="add-penggunaan-kr-sm-row-container-2" class="mt-4 text-center hidden">
                        <button id="add-penggunaan-kr-sm-row-btn-2" class="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Tambah Baris</button>
                    </div>

                </div>
            `,
    'gangguan': `
                <div class="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
                        <h1 class="text-2xl font-bold text-gray-900">Laporan Gangguan Operasional</h1>
                        <div id="gangguan-edit-buttons-container" class="flex space-x-2">
                            <button id="gangguan-edit-btn" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Edit Data</button>
                            <button id="gangguan-save-btn" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300 hidden">Simpan</button>
                            <button id="gangguan-cancel-btn" class="bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300 hidden">Batal</button>
                        </div>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200 border">
                            <thead class="bg-blue-600 text-white">
                                <tr>
                                    <th rowspan="2" class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider align-middle">No.</th>
                                    <th rowspan="2" class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider align-middle">Tanggal</th>
                                    <th rowspan="2" class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider align-middle">Jenis Gangguan</th>
                                    <th colspan="3" class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">Tindak Lanjut</th>
                                    <th rowspan="2" class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider align-middle">Petugas</th>
                                    <th rowspan="2" id="gangguan-opsi-header" class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider align-middle hidden">Aksi</th>
                                </tr>
                                <tr>
                                    <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">Lapor Ke</th>
                                    <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">Jam</th>
                                    <th class="px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">Penanganan Gangguan</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200" id="gangguan-table-body">
                                </tbody>
                        </table>
                    </div>
                    <div id="add-gangguan-row-container" class="mt-4 text-center hidden">
                        <button id="add-gangguan-row-btn" class="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Tambah Baris</button>
                    </div>
                </div>
            `,
    'railibrary': `
                <div class="bg-white rounded-xl shadow-md p-6 mb-8">
                    <h1 class="text-2xl font-bold text-gray-900 mb-4">RaiLibrary</h1>
                    <p class="text-gray-700">Ini adalah halaman RaiLibrary. Di sini Anda dapat menemukan berbagai dokumen, panduan, dan referensi yang berkaitan dengan operasional kereta api.</p>
                    <div class="mt-4">
                        <p class="text-gray-500">Konten untuk RaiLibrary akan ditambahkan di sini.</p>
                    </div>
                </div>
            `,
    'pegawai-detail': (employee) => `
                <div class="bg-white rounded-xl shadow-md p-6 mb-8">
                    <button id="back-to-list-btn" class="mb-4 bg-gray-200 text-gray-700 py-2 px-4 rounded-full hover:bg-gray-300 transition-colors duration-300">
                        <i class="fas fa-arrow-left mr-2"></i> Kembali
                    </button>
                    <div class="flex justify-between items-center mb-6">
                        <h1 class="text-2xl font-bold text-gray-900">Detail Pegawai</h1>
                        <div id="employee-detail-edit-buttons-container" class="flex space-x-2">
                            <button id="employee-detail-edit-btn" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Edit Data</button>
                            <button id="employee-detail-save-btn" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300 hidden">Simpan</button>
                            <button id="employee-detail-cancel-btn" class="bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300 hidden">Batal</button>
                        </div>
                    </div>

                    <div id="employee-detail-view-mode">
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <!-- Left Section: Basic Info -->
                            <div class="flex flex-col items-center">
                                <img id="employee-photo-preview" class="w-48 h-48 rounded-full object-cover shadow-lg mb-4" src="${employee.photo_url || 'https://placehold.co/192x192/D1D5DB/1F2937?text=Foto'}" alt="Foto Pegawai">
                                <div class="bg-gray-50 rounded-xl p-6 w-full max-w-sm text-center">
                                    <h2 id="employee-name" class="text-2xl font-bold text-gray-900">${employee.name}</h2>
                                    <p id="employee-position" class="text-gray-500 text-sm">${employee.position}</p>
                                    <div class="mt-4 space-y-2 text-left text-gray-700">
                                        <p><strong>NIPP:</strong> ${employee.nipp}</p>
                                        <p><strong>Jenis Kelamin:</strong> ${employee.gender}</p>
                                        <p><strong>Tanggal Lahir:</strong> ${employee.dob}</p>
                                        <p><strong>Unit:</strong> ${employee.unit}</p>
                                        <p><strong>Stasiun:</strong> ${employee.station}</p>
                                    </div>
                                </div>
                            </div>
                            <!-- Right Section: Certifications & Skills -->
                            <div class="flex flex-col items-center space-y-6">
                                <div class="w-full bg-gray-50 rounded-xl p-4 text-center">
                                    <h3 class="text-lg font-bold text-gray-900 mb-2">Kartu Sertifikasi</h3>
                                    <img id="cert-image-preview" class="w-full h-auto rounded-lg shadow-md" src="${employee.cert_image}" alt="Sertifikasi Pegawai">
                                    <div class="mt-4 space-y-2 text-left text-gray-700">
                                        <p><strong>Jenis:</strong> ${employee.cert_type}</p>
                                        <p><strong>Nomor:</strong> ${employee.cert_number}</p>
                                        <p><strong>Masa Berlaku:</strong> ${employee.cert_expiry}</p>
                                        <p><strong>Status:</strong> <span class="font-semibold ${employee.cert_status === 'Aktif' ? 'text-green-600' : 'text-red-600'}">${employee.cert_status}</span></p>
                                    </div>
                                </div>
                                <div class="w-full bg-gray-50 rounded-xl p-4 text-center">
                                    <h3 class="text-lg font-bold text-gray-900 mb-2">Tanda Kecakapan</h3>
                                    <img id="skill-image-preview" class="w-full h-auto rounded-lg shadow-md" src="${employee.skill_image}" alt="Tanda Kecakapan Pegawai">
                                    <div class="mt-4 space-y-2 text-left text-gray-700">
                                        <p><strong>Jenis:</strong> ${employee.skill_type}</p>
                                        <p><strong>Nomor:</strong> ${employee.skill_number}</p>
                                        <p><strong>Masa Berlaku:</strong> ${employee.skill_expiry}</p>
                                        <p><strong>Status:</strong> <span class="font-semibold ${employee.skill_status === 'Aktif' ? 'text-green-600' : 'text-red-600'}">${employee.skill_status}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="employee-detail-edit-mode" class="hidden">
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <!-- Left Section: Basic Info (Edit Mode) -->
                            <div class="flex flex-col items-center">
                                <img id="employee-photo-edit-preview" class="w-48 h-48 rounded-full object-cover shadow-lg mb-4" src="${employee.photo_url || 'https://placehold.co/192x192/D1D5DB/1F2937?text=Foto'}" alt="Foto Pegawai">
                                <input type="file" id="employee-photo-upload" class="mb-4 text-sm text-gray-500">
                                <div class="bg-gray-50 rounded-xl p-6 w-full max-w-sm text-center">
                                    <div class="text-left space-y-2">
                                        <div>
                                            <label for="edit-name" class="block text-sm font-bold text-gray-700">Nama:</label>
                                            <input type="text" id="edit-name" value="${employee.name}" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                        </div>
                                        <div>
                                            <label for="edit-position" class="block text-sm font-bold text-gray-700">Jabatan:</label>
                                            <input type="text" id="edit-position" value="${employee.position}" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                        </div>
                                        <div>
                                            <label for="edit-nipp" class="block text-sm font-bold text-gray-700">NIPP:</label>
                                            <input type="text" id="edit-nipp" value="${employee.nipp}" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                        </div>
                                        <div>
                                            <label for="edit-gender" class="block text-sm font-bold text-gray-700">Jenis Kelamin:</label>
                                            <select id="edit-gender" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                                <option value="Laki-laki" ${employee.gender === 'Laki-laki' ? 'selected' : ''}>Laki-laki</option>
                                                <option value="Perempuan" ${employee.gender === 'Perempuan' ? 'selected' : ''}>Perempuan</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label for="edit-dob" class="block text-sm font-bold text-gray-700">Tanggal Lahir:</label>
                                            <input type="text" id="edit-dob" value="${employee.dob}" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                        </div>
                                        <div>
                                            <label for="edit-unit" class="block text-sm font-bold text-gray-700">Unit:</label>
                                            <input type="text" id="edit-unit" value="${employee.unit}" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                        </div>
                                        <div>
                                            <label for="edit-station" class="block text-sm font-bold text-gray-700">Stasiun:</label>
                                            <input type="text" id="edit-station" value="${employee.station}" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Right Section: Certifications & Skills (Edit Mode) -->
                            <div class="flex flex-col items-center space-y-6">
                                <div class="w-full bg-gray-50 rounded-xl p-4 text-center">
                                    <h3 class="text-lg font-bold text-gray-900 mb-2">Kartu Sertifikasi</h3>
                                    <img id="cert-image-edit-preview" class="w-full h-auto rounded-lg shadow-md mb-2" src="${employee.cert_image}" alt="Sertifikasi Pegawai">
                                    <input type="file" id="cert-image-upload" class="mb-4 text-sm text-gray-500">
                                    <div class="mt-4 space-y-2 text-left text-gray-700">
                                        <div>
                                            <label for="edit-cert-type" class="block text-sm font-bold text-gray-700">Jenis:</label>
                                            <input type="text" id="edit-cert-type" value="${employee.cert_type}" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                        </div>
                                        <div>
                                            <label for="edit-cert-number" class="block text-sm font-bold text-gray-700">Nomor:</label>
                                            <input type="text" id="edit-cert-number" value="${employee.cert_number}" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                        </div>
                                        <div>
                                            <label for="edit-cert-expiry" class="block text-sm font-bold text-gray-700">Masa Berlaku:</label>
                                            <input type="date" id="edit-cert-expiry" value="${employee.cert_expiry}" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                        </div>
                                        <p><strong>Status:</strong> <span id="edit-cert-status" class="font-semibold ${employee.cert_status === 'Aktif' ? 'text-green-600' : 'text-red-600'}">${employee.cert_status}</span></p>
                                    </div>
                                </div>
                                <div class="w-full bg-gray-50 rounded-xl p-4 text-center">
                                    <h3 class="text-lg font-bold text-gray-900 mb-2">Tanda Kecakapan</h3>
                                    <img id="skill-image-edit-preview" class="w-full h-auto rounded-lg shadow-md mb-2" src="${employee.skill_image}" alt="Tanda Kecakapan Pegawai">
                                    <input type="file" id="skill-image-upload" class="mb-4 text-sm text-gray-500">
                                    <div class="mt-4 space-y-2 text-left text-gray-700">
                                        <div>
                                            <label for="edit-skill-type" class="block text-sm font-bold text-gray-700">Jenis:</label>
                                            <input type="text" id="edit-skill-type" value="${employee.skill_type}" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                        </div>
                                        <div>
                                            <label for="edit-skill-number" class="block text-sm font-bold text-gray-700">Nomor:</label>
                                            <input type="text" id="edit-skill-number" value="${employee.skill_number}" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                        </div>
                                        <div>
                                            <label for="edit-skill-expiry" class="block text-sm font-bold text-gray-700">Masa Berlaku:</label>
                                            <input type="date" id="edit-skill-expiry" value="${employee.skill_expiry}" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                        </div>
                                        <p><strong>Status:</strong> <span id="edit-skill-status" class="font-semibold ${employee.skill_status === 'Aktif' ? 'text-green-600' : 'text-red-600'}">${employee.skill_status}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
};

const contentContainer = document.getElementById('content-container');
const sidebar = document.getElementById('sidebar-menu');
const mainContent = document.getElementById('main-content');
const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
const sidebarLinks = document.querySelectorAll('nav a');
let timelineInterval;
let trainUpdateInterval;

// Data dummy untuk tabel kebutuhan pegawai
let kebutuhanData = [
    { jabatan: 'PPKA', dinas: 'A', lis: 'L', kebutuhan: 1, adanya: 1, kurang: 0, lebih: 0 },
    { jabatan: 'PRS', dinas: 'B', lis: 'L', kebutuhan: 2, adanya: 2, kurang: 0, lebih: 0 },
];

// Data dummy untuk tabel ikhtisar jam kerja
let jamKerjaData = [
    { dinas: 'A', mulai: '07:00', akhir: '15:00' },
    { dinas: 'B', mulai: '15:00', akhir: '23:00' },
    { dinas: 'C', mulai: '23:00', akhir: '07:00' },
];

// Data dummy untuk tabel dinasan
let dinasaData = [
    { name: "Budi Santoso", nipp: "12345678", jabatan: "Kepala Stasiun", schedule: Array(31).fill('P') },
    { name: "Siti Nurhaliza", nipp: "87654321", jabatan: "Staf Administrasi", schedule: Array(31).fill('S') },
];

let dinasaBulan = "September 2025"; // Menyimpan nama bulan
let dinasaKeterangan = "P : Dinas Pagi\nS : Dinas Siang\nM : Dinas Malam\nL : Libur"; // Menyimpan keterangan

// Fungsi untuk menangani input jadwal dinas
function handleScheduleInput(element) {
    if (element.value.toUpperCase() === 'L') {
        element.classList.add('text-red-600', 'font-bold');
    } else {
        element.classList.remove('text-red-600', 'font-bold');
    }
}

// Fungsi untuk mengaktifkan/menonaktifkan sidebar
sidebarToggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar-minimized');
    mainContent.classList.toggle('main-content-minimized');
    const icon = sidebarToggleBtn.querySelector('i');
    const hiddenElements = sidebar.querySelectorAll('.sidebar-link-text, .text-xs.text-white.text-opacity-70, .mt-auto.pt-6');

    if (sidebar.classList.contains('sidebar-minimized')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-chevron-right');
        hiddenElements.forEach(el => el.classList.add('hidden'));
    } else {
        icon.classList.remove('fa-chevron-right');
        icon.classList.add('fa-bars');
        hiddenElements.forEach(el => el.classList.remove('hidden'));
    }
});

// --- Start of Perka functions ---
function handlePerkaStatusChange(selectElement) {
    const row = selectElement.closest('tr');
    const arrivalInput = row.querySelectorAll('input[type="time"]')[0]; // Ambil input jam datang

    if (selectElement.value === 'Langsung') {
        // Simpan nilai asli sebelum diubah
        if (arrivalInput.value) {
            arrivalInput.dataset.originalValue = arrivalInput.value;
        }
        arrivalInput.value = '';
        arrivalInput.disabled = true;
    } else { // 'Berhenti'
        arrivalInput.disabled = false;
        // Kembalikan nilai asli jika ada
        if (arrivalInput.dataset.originalValue) {
            arrivalInput.value = arrivalInput.dataset.originalValue;
        }
    }
}

function renderPerkaTable(isEditing = false) {
    const tableBody = document.getElementById('train-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    const trainHeader = document.querySelector('.train-table thead tr');
    let opsiHeader = document.getElementById('perka-opsi-header');
    if (!opsiHeader) {
        opsiHeader = document.createElement('th');
        opsiHeader.id = 'perka-opsi-header';
        opsiHeader.textContent = 'Opsi';
        trainHeader.appendChild(opsiHeader);
    }
    opsiHeader.style.display = isEditing ? 'table-cell' : 'none';

    trainData.forEach(train => {
        const row = document.createElement('tr');
        if (isEditing) {
            const isLangsung = train.stopType === 'Langsung';
            row.innerHTML = `
                        <td><input type="text" value="${train.no}" class="perka-input perka-no w-12 text-center p-1 border rounded"></td>
                        <td><input type="text" value="${train.number}" class="perka-input perka-number w-20 p-1 border rounded"></td>
                        <td><input type="text" value="${train.name}" class="perka-input perka-name w-full p-1 border rounded"></td>
                        <td><input type="text" value="${train.route}" class="perka-input perka-route w-full p-1 border rounded"></td>
                        <td><input type="time" value="${isLangsung ? '' : train.arrival}" class="perka-input perka-arrival w-full p-1 border rounded" ${isLangsung ? 'disabled' : ''}></td>
                        <td><input type="time" value="${train.departure}" class="perka-input perka-departure w-full p-1 border rounded"></td>
                        <td><input type="text" value="${train.track}" class="perka-input perka-track w-16 text-center p-1 border rounded"></td>
                        <td>
                            <select class="perka-input perka-stoptype w-full p-1 border rounded" onchange="handlePerkaStatusChange(this)">
                                <option value="Berhenti" ${!isLangsung ? 'selected' : ''}>Berhenti</option>
                                <option value="Langsung" ${isLangsung ? 'selected' : ''}>Langsung</option>
                            </select>
                        </td>
                        <td class="text-center"><button class="text-red-500 hover:text-red-700 font-semibold" onclick="this.closest('tr').remove()">Hapus</button></td>
                    `;
        } else {
            let statusClass = '';

            // Menampilkan 'Berhenti' atau 'Langsung' sebagai status di tabel
            if (train.stopType === 'Berhenti') {
                statusClass = 'status-scheduled font-semibold'; // Warna biru
            } else if (train.stopType === 'Langsung') {
                statusClass = 'status-arrived font-semibold'; // Warna hijau
            } else {
                statusClass = 'font-semibold';
            }

            row.innerHTML = `
                        <td>${train.no}</td>
                        <td>${train.number}</td>
                        <td>${train.name}</td>
                        <td>${train.route}</td>
                        <td>${train.stopType === 'Langsung' ? '-' : train.arrival}</td>
                        <td>${train.departure}</td>
                        <td>Jalur ${train.track}</td>
                        <td class="${statusClass}">${train.stopType || 'Berhenti'}</td>
                    `;
        }
        tableBody.appendChild(row);
    });
}

function togglePerkaEditMode(isEditing) {
    document.getElementById('perka-edit-btn').classList.toggle('hidden', isEditing);
    document.getElementById('perka-save-btn').classList.toggle('hidden', !isEditing);
    document.getElementById('perka-cancel-btn').classList.toggle('hidden', !isEditing);
    document.getElementById('add-perka-row-container').classList.toggle('hidden', !isEditing);
    renderPerkaTable(isEditing);
}

function savePerkaChanges() {
    showLoading();

    // Gunakan setTimeout untuk memberi waktu pada browser merender loading spinner
    setTimeout(() => {
        const tableBody = document.getElementById('train-table-body');
        const tableRows = tableBody.querySelectorAll('tr');
        const newTrainData = [];
        let parsingSuccess = true;
        let errorMessage = "";

        try {
            if (tableRows.length === 0) {
                // Jika tabel kosong (semua baris dihapus), lanjutkan dengan data kosong
                // Tidak ada yang perlu di-parse
            } else {
                tableRows.forEach((row, index) => {
                    const noInput = row.querySelector('.perka-no');
                    const numberInput = row.querySelector('.perka-number');
                    const nameInput = row.querySelector('.perka-name');
                    const routeInput = row.querySelector('.perka-route');
                    const arrivalInput = row.querySelector('.perka-arrival');
                    const departureInput = row.querySelector('.perka-departure');
                    const trackInput = row.querySelector('.perka-track');
                    const stopTypeSelect = row.querySelector('.perka-stoptype');

                    if (noInput && numberInput && nameInput && routeInput && arrivalInput && departureInput && trackInput && stopTypeSelect) {
                        // Validasi dasar: pastikan kolom penting tidak kosong
                        if (!noInput.value || !numberInput.value || !nameInput.value || !departureInput.value) {
                            errorMessage = `Data tidak lengkap pada baris ${index + 1}. Pastikan No, No. KA, Nama KA, dan Jam Berangkat terisi.`;
                            throw new Error(errorMessage); // Hentikan iterasi dan lempar error
                        }

                        const stopType = stopTypeSelect.value;
                        const arrivalValue = (stopType === 'Langsung' || arrivalInput.disabled) ? '-' : arrivalInput.value;

                        newTrainData.push({
                            no: noInput.value,
                            number: numberInput.value,
                            name: nameInput.value,
                            route: routeInput.value,
                            arrival: arrivalValue,
                            departure: departureInput.value,
                            track: trackInput.value,
                            stopType: stopType,
                            status: '' // Akan dihitung ulang
                        });
                    } else {
                        // Ini bisa terjadi jika barisnya bukan baris data (misal, baris kosong atau header)
                        console.warn(`Baris ${index} dilewati karena tidak memiliki semua elemen input yang diperlukan.`);
                    }
                });
            }
        } catch (error) {
            console.error("Error saat memproses tabel perka:", error);
            errorMessage = error.message || "Terjadi kesalahan saat memvalidasi data.";
            parsingSuccess = false;
        }

        if (!parsingSuccess) {
            hideLoading();
            showMessage(errorMessage);
            return; // Hentikan fungsi dan tetap di mode edit
        }

        // Jika semua validasi berhasil, perbarui data utama
        trainData.length = 0;
        Array.prototype.push.apply(trainData, newTrainData);

        updateTrainStatus();
        generateTimelineTrains();
        togglePerkaEditMode(false);

        hideLoading();

    }, 50); // Delay kecil sudah cukup
}

function addPerkaRow() {
    const tableBody = document.getElementById('train-table-body');
    const newRow = document.createElement('tr');
    const newNo = trainData.length > 0 ? Math.max(...trainData.map(t => parseInt(t.no) || 0)) + 1 : 1;
    newRow.innerHTML = `
                <td><input type="text" value="${newNo}" class="perka-input perka-no w-12 text-center p-1 border rounded"></td>
                <td><input type="text" placeholder="No. KA" class="perka-input perka-number w-20 p-1 border rounded"></td>
                <td><input type="text" placeholder="Nama KA" class="perka-input perka-name w-full p-1 border rounded"></td>
                <td><input type="text" placeholder="Rute" class="perka-input perka-route w-full p-1 border rounded"></td>
                <td><input type="time" class="perka-input perka-arrival w-full p-1 border rounded"></td>
                <td><input type="time" class="perka-input perka-departure w-full p-1 border rounded"></td>
                <td><input type="text" placeholder="Jalur" class="perka-input perka-track w-16 text-center p-1 border rounded"></td>
                <td>
                    <select class="perka-input perka-stoptype w-full p-1 border rounded" onchange="handlePerkaStatusChange(this)">
                        <option value="Berhenti" selected>Berhenti</option>
                        <option value="Langsung">Langsung</option>
                    </select>
                </td>
                <td class="text-center"><button class="text-red-500 hover:text-red-700 font-semibold" onclick="this.closest('tr').remove()">Hapus</button></td>
            `;
    tableBody.appendChild(newRow);
}

function toggleEmplasemenEditMode(isEditing) {
    document.getElementById('emplasemen-edit-btn').classList.toggle('hidden', isEditing);
    document.getElementById('emplasemen-save-btn').classList.toggle('hidden', !isEditing);
    document.getElementById('emplasemen-cancel-btn').classList.toggle('hidden', !isEditing);

    document.getElementById('emplasemen-view-mode').classList.toggle('hidden', isEditing);
    document.getElementById('emplasemen-edit-mode').classList.toggle('hidden', !isEditing);

    if (!isEditing) {
        // Reset preview if cancelled
        document.getElementById('emplasemen-image-preview').src = emplasemenImageUrl;
        document.getElementById('emplasemen-upload').value = ''; // Clear file input
    }
}

function saveEmplasemenChanges() {
    const fileInput = document.getElementById('emplasemen-upload');
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            emplasemenImageUrl = e.target.result;
            document.getElementById('emplasemen-image').src = emplasemenImageUrl;
            document.getElementById('emplasemen-image-preview').src = emplasemenImageUrl;
            toggleEmplasemenEditMode(false);
        }
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        // No new file selected, just exit edit mode
        toggleEmplasemenEditMode(false);
    }
}

function setupEmplasemenPreview() {
    const fileInput = document.getElementById('emplasemen-upload');
    const preview = document.getElementById('emplasemen-image-preview');
    fileInput.addEventListener('change', function () {
        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                preview.src = e.target.result;
            }
            reader.readAsDataURL(fileInput.files[0]);
        }
    });
}
// --- End of Perka functions ---

// --- Start of Jalur functions ---
function generateJalurHeader(isEditing) {
    const tableHead = document.getElementById('jalur-table-head');
    if (!tableHead) return;

    const thClass = "px-3 py-2 text-left text-xs font-medium uppercase tracking-wider";
    const thCenterClass = "px-3 py-2 text-center text-xs font-medium uppercase tracking-wider";

    tableHead.innerHTML = `
                <tr class="bg-blue-600 text-white">
                    <th rowspan="2" class="${thCenterClass} align-middle">Jalur</th>
                    <th rowspan="2" class="${thClass} align-middle">Panjang</th>
                    <th rowspan="2" class="${thClass} align-middle">Efektif</th>
                    <th colspan="5" class="${thCenterClass} align-middle">Kapasitas</th>
                    <th rowspan="2" class="${thClass} align-middle">JENIS</th>
                    ${isEditing ? `<th rowspan="2" class="${thClass} align-middle">Opsi</th>` : ''}
                </tr>
                <tr class="bg-blue-600 text-white">
                    <th class="${thCenterClass}">Kereta</th>
                    <th class="${thCenterClass}">GB</th>
                    <th class="${thCenterClass}">GD</th>
                    <th class="${thCenterClass}">GT</th>
                    <th class="${thCenterClass}">GK</th>
                </tr>
            `;
}

function renderJalurTable(isEditing = false) {
    generateJalurHeader(isEditing);
    const tableBody = document.getElementById('jalur-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    jalurData.forEach(item => {
        const row = document.createElement('tr');
        if (isEditing) {
            row.innerHTML = `
                        <td><input type="text" value="${item.jalur}" class="w-full p-1 border rounded text-center"></td>
                        <td><input type="text" value="${item.panjang}" class="w-full p-1 border rounded"></td>
                        <td><input type="text" value="${item.efektif}" class="w-full p-1 border rounded"></td>
                        <td><input type="text" value="${item.kereta}" class="w-full p-1 border rounded"></td>
                        <td><input type="text" value="${item.gb}" class="w-full p-1 border rounded text-center"></td>
                        <td><input type="text" value="${item.gd}" class="w-full p-1 border rounded text-center"></td>
                        <td><input type="text" value="${item.gt}" class="w-full p-1 border rounded text-center"></td>
                        <td><input type="text" value="${item.gk}" class="w-full p-1 border rounded text-center"></td>
                        <td><input type="text" value="${item.keterangan}" class="w-full p-1 border rounded"></td>
                        <td class="text-center"><button class="text-red-500 hover:text-red-700 font-semibold" onclick="this.closest('tr').remove()">Hapus</button></td>
                    `;
        } else {
            row.innerHTML = `
                        <td class="text-center">${item.jalur}</td>
                        <td>${item.panjang}</td>
                        <td>${item.efektif}</td>
                        <td class="text-center">${item.kereta}</td>
                        <td class="text-center">${item.gb}</td>
                        <td class="text-center">${item.gd}</td>
                        <td class="text-center">${item.gt}</td>
                        <td class="text-center">${item.gk}</td>
                        <td>${item.keterangan}</td>
                    `;
        }
        tableBody.appendChild(row);
    });
}

function toggleJalurEditMode(isEditing) {
    document.getElementById('jalur-edit-btn').classList.toggle('hidden', isEditing);
    document.getElementById('jalur-save-btn').classList.toggle('hidden', !isEditing);
    document.getElementById('jalur-cancel-btn').classList.toggle('hidden', !isEditing);
    document.getElementById('add-jalur-row-container').classList.toggle('hidden', !isEditing);
    document.getElementById('jalur-mulai-berlaku').disabled = !isEditing;
    renderJalurTable(isEditing);
}

function saveJalurChanges() {
    const tableRows = document.querySelectorAll('#jalur-table-body tr');
    const newJalurData = [];
    tableRows.forEach(row => {
        const inputs = row.querySelectorAll('input');
        if (inputs.length === 9) { // Now 9 inputs per row in edit mode
            newJalurData.push({
                jalur: inputs[0].value,
                panjang: inputs[1].value,
                efektif: inputs[2].value,
                kereta: inputs[3].value,
                gb: inputs[4].value,
                gd: inputs[5].value,
                gt: inputs[6].value,
                gk: inputs[7].value,
                keterangan: inputs[8].value // Saving the 'keterangan' (now JENIS) field
            });
        }
    });
    jalurData = newJalurData;
    jalurMulaiBerlaku = document.getElementById('jalur-mulai-berlaku').value;
    toggleJalurEditMode(false);
}

function cancelJalurChanges() {
    document.getElementById('jalur-mulai-berlaku').value = jalurMulaiBerlaku;
    toggleJalurEditMode(false);
}

function addJalurRow() {
    const tableBody = document.getElementById('jalur-table-body');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
                <td><input type="text" placeholder="Jalur" class="w-full p-1 border rounded text-center"></td>
                <td><input type="text" placeholder="Panjang" class="w-full p-1 border rounded"></td>
                <td><input type="text" placeholder="Efektif" class="w-full p-1 border rounded"></td>
                <td><input type="text" placeholder="Kereta" class="w-full p-1 border rounded"></td>
                <td><input type="text" placeholder="GB" class="w-full p-1 border rounded text-center"></td>
                <td><input type="text" placeholder="GD" class="w-full p-1 border rounded text-center"></td>
                <td><input type="text" placeholder="GT" class="w-full p-1 border rounded text-center"></td>
                <td><input type="text" placeholder="GK" class="w-full p-1 border rounded text-center"></td>
                <td><input type="text" placeholder="Keterangan" class="w-full p-1 border rounded"></td>
                <td class="text-center"><button class="text-red-500 hover:text-red-700 font-semibold" onclick="this.closest('tr').remove()">Hapus</button></td>
            `;
    tableBody.appendChild(newRow);
}
// --- End of Jalur functions ---

// --- Start of Jalur Dilalui functions ---
function generateJalurDilaluiHeader(isEditing) {
    const tableHead = document.getElementById('jalur-dilalui-table-head');
    if (!tableHead) return;

    const thClass = "px-3 py-2 text-left text-xs font-medium uppercase tracking-wider";
    const thCenterClass = "px-3 py-2 text-center text-xs font-medium uppercase tracking-wider";

    tableHead.innerHTML = `
                <tr class="bg-blue-600 text-white">
                    <th colspan="2" class="${thCenterClass}">JAM</th>
                    <th rowspan="2" class="${thCenterClass} align-middle">NOMOR KA</th>
                    <th rowspan="2" class="${thCenterClass} align-middle">JALUR</th>
                    <th colspan="2" class="${thCenterClass}">JURUSAN</th>
                    ${isEditing ? `<th rowspan="2" class="${thCenterClass} align-middle">Opsi</th>` : ''}
                </tr>
                <tr class="bg-blue-600 text-white">
                    <th class="${thCenterClass}">DATANG</th>
                    <th class="${thCenterClass}">BERANGKAT</th>
                    <th class="${thCenterClass}">DARI</th>
                    <th class="${thCenterClass}">KE</th>
                </tr>
            `;
}

function renderJalurDilaluiTable(isEditing = false) {
    generateJalurDilaluiHeader(isEditing);
    const tableBody = document.getElementById('jalur-dilalui-table-body');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    jalurDilaluiData.forEach(item => {
        const row = document.createElement('tr');
        if (isEditing) {
            row.innerHTML = `
                        <td><input type="text" value="${item.datang}" class="w-full p-1 border rounded text-center"></td>
                        <td><input type="text" value="${item.berangkat}" class="w-full p-1 border rounded text-center"></td>
                        <td><input type="text" value="${item.nomorKa}" class="w-full p-1 border rounded text-center"></td>
                        <td><input type="text" value="${item.jalur}" class="w-full p-1 border rounded text-center"></td>
                        <td><input type="text" value="${item.dari}" class="w-full p-1 border rounded text-center"></td>
                        <td><input type="text" value="${item.ke}" class="w-full p-1 border rounded text-center"></td>
                        <td class="text-center"><button class="text-red-500 hover:text-red-700 font-semibold" onclick="this.closest('tr').remove()">Hapus</button></td>
                    `;
        } else {
            row.innerHTML = `
                        <td class="text-center">${item.datang}</td>
                        <td class="text-center">${item.berangkat}</td>
                        <td class="text-center">${item.nomorKa}</td>
                        <td class="text-center">${item.jalur}</td>
                        <td class="text-center">${item.dari}</td>
                        <td class="text-center">${item.ke}</td>
                    `;
        }
        tableBody.appendChild(row);
    });
}

function toggleJalurDilaluiEditMode(isEditing) {
    document.getElementById('jalur-dilalui-edit-btn').classList.toggle('hidden', isEditing);
    document.getElementById('jalur-dilalui-save-btn').classList.toggle('hidden', !isEditing);
    document.getElementById('jalur-dilalui-cancel-btn').classList.toggle('hidden', !isEditing);
    document.getElementById('add-jalur-dilalui-row-container').classList.toggle('hidden', !isEditing);
    renderJalurDilaluiTable(isEditing);
}

function saveJalurDilaluiChanges() {
    const tableRows = document.querySelectorAll('#jalur-dilalui-table-body tr');
    const newJalurDilaluiData = [];
    tableRows.forEach(row => {
        const inputs = row.querySelectorAll('input');
        if (inputs.length === 6) {
            newJalurDilaluiData.push({
                datang: inputs[0].value,
                berangkat: inputs[1].value,
                nomorKa: inputs[2].value,
                jalur: inputs[3].value,
                dari: inputs[4].value,
                ke: inputs[5].value,
            });
        }
    });
    jalurDilaluiData = newJalurDilaluiData;
    toggleJalurDilaluiEditMode(false);
}

function addJalurDilaluiRow() {
    const tableBody = document.getElementById('jalur-dilalui-table-body');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
                <td><input type="text" placeholder="Datang" class="w-full p-1 border rounded text-center"></td>
                <td><input type="text" placeholder="Berangkat" class="w-full p-1 border rounded text-center"></td>
                <td><input type="text" placeholder="No. KA" class="w-full p-1 border rounded text-center"></td>
                <td><input type="text" placeholder="Jalur" class="w-full p-1 border rounded text-center"></td>
                <td><input type="text" placeholder="Dari" class="w-full p-1 border rounded text-center"></td>
                <td><input type="text" placeholder="Ke" class="w-full p-1 border rounded text-center"></td>
                <td class="text-center"><button class="text-red-500 hover:text-red-700 font-semibold" onclick="this.closest('tr').remove()">Hapus</button></td>
            `;
    tableBody.appendChild(newRow);
}
// --- End of Jalur Dilalui functions ---

// Fungsi untuk menangani aksi pindah
function handleMove(employeeId) {
    openMoveEmployeeModal(employeeId);
}

// --- Start of Pindahkan Pegawai functions ---
function openMoveEmployeeModal(employeeId) {
    const employee = employees.find(e => e.id === employeeId);
    if (!employee) return;

    // Isi data modal
    document.getElementById('move-employee-id').value = employee.id;
    document.getElementById('move-employee-name').value = employee.name;
    document.getElementById('move-employee-nipp').value = employee.nipp;
    document.getElementById('move-employee-position').value = employee.position;
    document.getElementById('move-employee-old-station').value = employee.station;

    // Isi dropdown stasiun baru
    const stationSelect = document.getElementById('move-employee-new-station');
    const stationDropdownInSidebar = document.querySelector('.sidebar select');
    stationSelect.innerHTML = stationDropdownInSidebar.innerHTML; // Salin semua opsi dari sidebar

    // Hapus stasiun lama dari daftar pilihan
    Array.from(stationSelect.options).forEach(option => {
        if (option.value === employee.station) {
            option.remove();
        }
    });
    // Pilih opsi pertama sebagai default
    if (stationSelect.options.length > 0) {
        stationSelect.selectedIndex = 0;
    }

    // Tampilkan modal
    showModal('move-employee-modal');
}

function closeMoveEmployeeModal() {
    hideModal('move-employee-modal');
}

function saveMoveEmployee() {
    const employeeId = parseInt(document.getElementById('move-employee-id').value);
    const newStation = document.getElementById('move-employee-new-station').value;

    const employeeIndex = employees.findIndex(e => e.id === employeeId);
    if (employeeIndex !== -1) {
        // Update data stasiun di array dummy
        employees[employeeIndex].station = newStation;

        // Tampilkan pesan sukses
        showMessage(`Pegawai "${employees[employeeIndex].name}" berhasil dipindahkan ke stasiun ${newStation}.`);

        // Render ulang tabel pegawai untuk menampilkan perubahan
        renderMainEmployeeTable(true); // Tetap dalam mode edit
    }

    closeMoveEmployeeModal();
}

function setupMoveEmployeeModalListeners() {
    document.getElementById('close-move-modal-btn').addEventListener('click', closeMoveEmployeeModal);
    document.getElementById('cancel-move-btn').addEventListener('click', closeMoveEmployeeModal);
    document.getElementById('save-move-btn').addEventListener('click', saveMoveEmployee);
    // Tutup modal jika klik di luar konten
    document.getElementById('move-employee-modal').addEventListener('click', (e) => {
        if (e.target.id === 'move-employee-modal') {
            closeMoveEmployeeModal();
        }
    });
}
// --- End of Pindahkan Pegawai functions ---

// --- Fungsi untuk Tabel Data Pegawai Utama ---
function renderMainEmployeeTable(isEditing = false) {
    const tableBody = document.getElementById('employee-table-body');
    const optionsHeader = document.getElementById('options-header');
    if (!tableBody || !optionsHeader) return;

    tableBody.innerHTML = '';

    // Toggle header visibility based on mode
    if (isEditing) {
        optionsHeader.classList.remove('hidden');
    } else {
        optionsHeader.classList.add('hidden');
    }

    employees.forEach(employee => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', employee.id); // Atur ID untuk kedua mode

        if (isEditing) {
            row.innerHTML = `
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="text" class="w-full rounded-md border-gray-300 shadow-sm editable-table" value="${employee.name}" data-field="name"></td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="text" class="w-full rounded-md border-gray-300 shadow-sm editable-table" value="${employee.nipp}" data-field="nipp"></td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="text" class="w-full rounded-md border-gray-300 shadow-sm editable-table" value="${employee.position}" data-field="position"></td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="text" class="w-full rounded-md border-gray-300 shadow-sm editable-table" value="${employee.unit}" data-field="unit"></td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button class="text-blue-500 hover:text-blue-700 font-semibold" onclick="handleMove(${employee.id})">Pindahkan</button>
                            <button class="text-red-500 hover:text-red-700 font-semibold ml-2" onclick="deleteEmployee(${employee.id})">Hapus</button>
                        </td>
                    `;
        } else {
            row.classList.add('cursor-pointer', 'hover:bg-gray-100');
            row.innerHTML = `
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${employee.name}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${employee.nipp}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${employee.position}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${employee.unit}</td>
                    `;
            row.addEventListener('click', () => {
                loadEmployeeDetail(employee.id);
            });
        }
        tableBody.appendChild(row);
    });
}

function toggleMainEmployeeEditMode(isEditing) {
    const editBtn = document.getElementById('main-employee-edit-btn');
    const saveBtn = document.getElementById('main-employee-save-btn');
    const cancelBtn = document.getElementById('main-employee-cancel-btn');
    const addEmployeeContainer = document.getElementById('add-employee-row-container');
    const optionsHeader = document.getElementById('options-header');

    if (isEditing) {
        editBtn.classList.add('hidden');
        saveBtn.classList.remove('hidden');
        cancelBtn.classList.remove('hidden');
        addEmployeeContainer.classList.remove('hidden');
        optionsHeader.classList.remove('hidden');
    } else {
        editBtn.classList.remove('hidden');
        saveBtn.classList.add('hidden');
        cancelBtn.classList.add('hidden');
        addEmployeeContainer.classList.add('hidden');
        optionsHeader.classList.add('hidden');
    }
    renderMainEmployeeTable(isEditing);
}

function addEmptyEmployeeRow() {
    const tableBody = document.getElementById('employee-table-body');
    const newRow = document.createElement('tr');
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

// --- Akhir Fungsi untuk Tabel Data Pegawai Utama ---

function saveMainEmployeeChanges() {
    const tableRows = document.querySelectorAll('#employee-table-body tr');
    const maxId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) : 0;
    let newIdCounter = 1;

    tableRows.forEach(row => {
        const inputs = row.querySelectorAll('input[data-field]');

        // Hanya proses baris yang dalam mode edit (memiliki input)
        if (inputs.length === 4) {
            const employeeId = row.dataset.id ? parseInt(row.dataset.id, 10) : null;
            const employeeData = {
                name: inputs[0].value,
                nipp: inputs[1].value,
                position: inputs[2].value,
                unit: inputs[3].value,
            };

            if (employeeId) {
                // Perbarui pegawai yang ada
                const employeeIndex = employees.findIndex(e => e.id === employeeId);
                if (employeeIndex !== -1) {
                    employees[employeeIndex] = { ...employees[employeeIndex], ...employeeData };
                }
            } else {
                // Tambah pegawai baru jika nama dan NIPP diisi
                if (employeeData.name && employeeData.nipp) {
                    const newEmployee = {
                        id: maxId + newIdCounter,
                        name: employeeData.name,
                        nipp: employeeData.nipp,
                        position: employeeData.position,
                        unit: employeeData.unit,
                        gender: "Laki-laki",
                        dob: "01-01-2000",
                        station: "Stasiun Pusat",
                        photo_url: 'https://placehold.co/192x192/D1D5DB/1F2937?text=Foto',
                        cert_image: "https://placehold.co/300x200/4B5563/FFFFFF?text=Sertifikasi",
                        skill_image: "https://placehold.co/300x200/4B5563/FFFFFF?text=Kecakapan",
                        cert_type: "",
                        cert_number: "",
                        cert_expiry: "2025-01-01",
                        cert_status: "Aktif",
                        skill_type: "",
                        skill_number: "",
                        skill_expiry: "2025-01-01",
                        skill_status: "Aktif"
                    };
                    employees.push(newEmployee);
                    newIdCounter++;
                }
            }
        }
    });

    toggleMainEmployeeEditMode(false);
}

function cancelMainEmployeeChanges() {
    toggleMainEmployeeEditMode(false);
}

function deleteEmployee(id) {
    employees = employees.filter(employee => employee.id !== id);
    renderMainEmployeeTable(false);
}

// Fungsi bantuan untuk memeriksa status kedaluwarsa
function checkExpiryStatus(expiryDate) {
    if (!expiryDate) return 'Nonaktif';
    const today = new Date();
    const [year, month, day] = expiryDate.split('-').map(Number);
    const expiry = new Date(year, month - 1, day);
    return expiry > today ? 'Aktif' : 'Nonaktif';
}

// Fungsi untuk memuat halaman detail pegawai
function loadEmployeeDetail(id) {
    const employee = employees.find(e => e.id === id);
    if (employee) {
        employee.cert_status = checkExpiryStatus(employee.cert_expiry);
        employee.skill_status = checkExpiryStatus(employee.skill_expiry);

        contentContainer.innerHTML = pages['pegawai-detail'](employee);
        document.getElementById('back-to-list-btn').addEventListener('click', () => loadPage('pegawai'));
        document.getElementById('employee-detail-edit-btn').addEventListener('click', () => toggleEmployeeDetailEditMode(true, employee));
        document.getElementById('employee-detail-save-btn').addEventListener('click', () => saveEmployeeChanges(employee));
        document.getElementById('employee-detail-cancel-btn').addEventListener('click', () => toggleEmployeeDetailEditMode(false, employee));
    } else {
        contentContainer.innerHTML = `<p class="text-red-500">Pegawai tidak ditemukan.</p>`;
    }
}

// Fungsi untuk mengaktifkan/menonaktifkan mode edit di halaman detail pegawai
function toggleEmployeeDetailEditMode(isEditing, employee) {
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

        // Populate edit form with current data
        document.getElementById('edit-name').value = employee.name;
        document.getElementById('edit-position').value = employee.position;
        document.getElementById('edit-nipp').value = employee.nipp;
        document.getElementById('edit-gender').value = employee.gender;
        document.getElementById('edit-dob').value = employee.dob;
        document.getElementById('edit-unit').value = employee.unit;
        document.getElementById('edit-station').value = employee.station;
        document.getElementById('edit-cert-type').value = employee.cert_type;
        document.getElementById('edit-cert-number').value = employee.cert_number;
        document.getElementById('edit-cert-expiry').value = employee.cert_expiry;
        document.getElementById('edit-skill-type').value = employee.skill_type;
        document.getElementById('edit-skill-number').value = employee.skill_number;
        document.getElementById('edit-skill-expiry').value = employee.skill_expiry;
    } else {
        viewMode.classList.remove('hidden');
        editMode.classList.add('hidden');
        editBtn.classList.remove('hidden');
        saveBtn.classList.add('hidden');
        cancelBtn.classList.add('hidden');

        // Re-render view mode with potentially updated data
        loadEmployeeDetail(employee.id);
    }
}

// Fungsi pembantu untuk membaca file sebagai Data URL menggunakan Promise
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

// Fungsi untuk menyimpan perubahan data pegawai
async function saveEmployeeChanges(employee) {
    const updatedEmployee = { ...employee };
    updatedEmployee.name = document.getElementById('edit-name').value;
    updatedEmployee.position = document.getElementById('edit-position').value;
    updatedEmployee.nipp = document.getElementById('edit-nipp').value;
    updatedEmployee.gender = document.getElementById('edit-gender').value;
    updatedEmployee.dob = document.getElementById('edit-dob').value;
    updatedEmployee.unit = document.getElementById('edit-unit').value;
    updatedEmployee.station = document.getElementById('edit-station').value;
    updatedEmployee.cert_type = document.getElementById('edit-cert-type').value;
    updatedEmployee.cert_number = document.getElementById('edit-cert-number').value;
    updatedEmployee.cert_expiry = document.getElementById('edit-cert-expiry').value;
    updatedEmployee.skill_type = document.getElementById('edit-skill-type').value;
    updatedEmployee.skill_number = document.getElementById('edit-skill-number').value;
    updatedEmployee.skill_expiry = document.getElementById('edit-skill-expiry').value;

    // Update status berdasarkan tanggal kedaluwarsa
    updatedEmployee.cert_status = checkExpiryStatus(updatedEmployee.cert_expiry);
    updatedEmployee.skill_status = checkExpiryStatus(updatedEmployee.skill_expiry);

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

        updateEmployeeDataAndUI(employee, updatedEmployee);

    } catch (error) {
        console.error("Kesalahan saat membaca file:", error);
        // Opsional: tampilkan pesan kesalahan kepada pengguna
    }
}

function updateEmployeeDataAndUI(oldEmployee, newEmployee) {
    // Update the global employees array
    const employeeIndex = employees.findIndex(e => e.id === oldEmployee.id);
    if (employeeIndex !== -1) {
        employees[employeeIndex] = newEmployee;
    }

    // Re-render the detail page in view mode with the new data
    loadEmployeeDetail(newEmployee.id);
}

function cancelEmployeeChanges() {
    // Simply reload the detail page from the original data
    const employee = employees.find(e => e.id === employee.id);
    if (employee) {
        loadEmployeeDetail(employee.id);
    }
}

// Fungsi untuk Kebutuhan Pegawai
function renderKebutuhanTable(isEditing) {
    const tableBody = document.getElementById('kebutuhan-table-body');
    const headerRow = document.querySelector('#kebutuhan-table thead tr');
    if (!tableBody || !headerRow) return;

    // Kelola header Opsi
    let opsiHeader = document.getElementById('kebutuhan-opsi-header');
    if (!opsiHeader) {
        opsiHeader = document.createElement('th');
        opsiHeader.id = 'kebutuhan-opsi-header';
        opsiHeader.className = "px-3 py-2 text-left text-xs font-medium uppercase tracking-wider";
        opsiHeader.textContent = 'Opsi';
        headerRow.appendChild(opsiHeader);
    }
    opsiHeader.style.display = isEditing ? 'table-cell' : 'none';

    tableBody.innerHTML = '';
    kebutuhanData.forEach(item => {
        const row = document.createElement('tr');
        if (isEditing) {
            row.innerHTML = `
                        <td class="px-3 py-2"><input type="text" value="${item.jabatan}" class="w-full rounded-md border-gray-300 shadow-sm editable-table"></td>
                        <td class="px-3 py-2"><input type="text" value="${item.dinas}" class="w-full rounded-md border-gray-300 shadow-sm editable-table"></td>
                        <td class="px-3 py-2"><input type="text" value="${item.lis}" class="w-full rounded-md border-gray-300 shadow-sm editable-table"></td>
                        <td class="px-3 py-2"><input type="number" value="${item.kebutuhan}" class="w-full rounded-md border-gray-300 shadow-sm editable-table"></td>
                        <td class="px-3 py-2"><input type="number" value="${item.adanya}" class="w-full rounded-md border-gray-300 shadow-sm editable-table"></td>
                        <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">${item.kurang}</td>
                        <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">${item.lebih}</td>
                        <td class="px-3 py-2 text-center"><button class="text-red-500 hover:text-red-700 font-semibold" onclick="this.closest('tr').remove()">Hapus</button></td>
                    `;
        } else {
            row.innerHTML = `
                        <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-900">${item.jabatan}</td>
                        <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">${item.dinas}</td>
                        <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">${item.lis}</td>
                        <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">${item.kebutuhan}</td>
                        <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">${item.adanya}</td>
                        <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">${item.kurang}</td>
                        <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">${item.lebih}</td>
                    `;
        }
        tableBody.appendChild(row);
    });
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
    const newKebutuhanData = [];
    tableRows.forEach(row => {
        const inputs = row.querySelectorAll('input');
        if (inputs.length === 5) {
            const kebutuhan = parseInt(inputs[3].value);
            const adanya = parseInt(inputs[4].value);
            const kurang = Math.max(0, kebutuhan - adanya);
            const lebih = Math.max(0, adanya - kebutuhan);
            newKebutuhanData.push({
                jabatan: inputs[0].value,
                dinas: inputs[1].value,
                lis: inputs[2].value,
                kebutuhan: kebutuhan,
                adanya: adanya,
                kurang: kurang,
                lebih: lebih
            });
        }
    });
    kebutuhanData = newKebutuhanData;
    toggleKebutuhanEditMode(false);
}
function cancelKebutuhanChanges() {
    toggleKebutuhanEditMode(false);
}

function addKebutuhanRow() {
    const tableBody = document.getElementById('kebutuhan-table-body');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
                <td class="px-3 py-2"><input type="text" placeholder="Jabatan" class="w-full rounded-md border-gray-300 shadow-sm editable-table"></td>
                <td class="px-3 py-2"><input type="text" placeholder="Dinas" class="w-full rounded-md border-gray-300 shadow-sm editable-table"></td>
                <td class="px-3 py-2"><input type="text" placeholder="L/I/S" class="w-full rounded-md border-gray-300 shadow-sm editable-table"></td>
                <td class="px-3 py-2"><input type="number" placeholder="0" class="w-full rounded-md border-gray-300 shadow-sm editable-table"></td>
                <td class="px-3 py-2"><input type="number" placeholder="0" class="w-full rounded-md border-gray-300 shadow-sm editable-table"></td>
                <td class="px-3 py-2"></td>
                <td class="px-3 py-2"></td>
                <td class="px-3 py-2 text-center"><button class="text-red-500 hover:text-red-700 font-semibold" onclick="this.closest('tr').remove()">Hapus</button></td>
            `;
    tableBody.appendChild(newRow);
}

// Fungsi untuk Jam Kerja
function renderJamKerjaTable(isEditing) {
    const tableBody = document.getElementById('jamkerja-table-body');
    const headerRow = document.querySelector('#jamkerja-table thead tr');
    if (!tableBody || !headerRow) return;

    // Kelola header Opsi
    let opsiHeader = document.getElementById('jamkerja-opsi-header');
    if (!opsiHeader) {
        opsiHeader = document.createElement('th');
        opsiHeader.id = 'jamkerja-opsi-header';
        opsiHeader.className = "px-3 py-2 text-left text-xs font-medium uppercase tracking-wider";
        opsiHeader.textContent = 'Opsi';
        headerRow.appendChild(opsiHeader);
    }
    opsiHeader.style.display = isEditing ? 'table-cell' : 'none';

    tableBody.innerHTML = '';
    jamKerjaData.forEach(item => {
        const row = document.createElement('tr');
        if (isEditing) {
            row.innerHTML = `
                        <td class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900"><input type="text" value="${item.dinas}" class="w-full rounded-md border-gray-300 shadow-sm editable-table"></td>
                        <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500"><input type="time" value="${item.mulai}" class="w-full rounded-md border-gray-300 shadow-sm editable-table"></td>
                        <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500"><input type="time" value="${item.akhir}" class="w-full rounded-md border-gray-300 shadow-sm editable-table"></td>
                        <td class="px-3 py-2 whitespace-nowrap text-sm text-center"><button class="text-red-500 hover:text-red-700 font-semibold" onclick="this.closest('tr').remove()">Hapus</button></td>
                    `;
        } else {
            row.innerHTML = `
                        <td class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">${item.dinas}</td>
                        <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">${item.mulai}</td>
                        <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">${item.akhir}</td>
                    `;
        }
        tableBody.appendChild(row);
    });
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
    const newJamKerjaData = [];
    tableRows.forEach(row => {
        const inputs = row.querySelectorAll('input');
        if (inputs.length === 3) {
            newJamKerjaData.push({
                dinas: inputs[0].value,
                mulai: inputs[1].value,
                akhir: inputs[2].value
            });
        }
    });
    jamKerjaData = newJamKerjaData;
    toggleJamKerjaEditMode(false);
}
function cancelJamKerjaChanges() {
    toggleJamKerjaEditMode(false);
}

function addJamKerjaRow() {
    const tableBody = document.getElementById('jamkerja-table-body');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
                <td class="px-3 py-2"><input type="text" placeholder="Dinas" class="w-full rounded-md border-gray-300 shadow-sm editable-table"></td>
                <td class="px-3 py-2"><input type="time" class="w-full rounded-md border-gray-300 shadow-sm editable-table"></td>
                <td class="px-3 py-2"><input type="time" class="w-full rounded-md border-gray-300 shadow-sm editable-table"></td>
                <td class="px-3 py-2 text-center"><button class="text-red-500 hover:text-red-700 font-semibold" onclick="this.closest('tr').remove()">Hapus</button></td>
            `;
    tableBody.appendChild(newRow);
}

// --- Fungsi untuk Tabel Daftar Dinasa ---
function generateDinasaHeader(isEditing) {
    const tableHead = document.getElementById('dinasa-table-head');
    if (!tableHead) return;

    const daysInMonth = 31;

    let headerHTML = '<tr>';
    headerHTML += '<th class="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider sticky left-0 bg-blue-600 z-10">Nama</th>';
    headerHTML += '<th class="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">NIPP</th>';
    headerHTML += '<th class="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">Jabatan</th>';

    for (let i = 1; i <= daysInMonth; i++) {
        headerHTML += `<th class="px-2 py-2 text-center text-xs font-medium uppercase tracking-wider">${i}</th>`;
    }

    if (isEditing) {
        headerHTML += '<th class="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">Opsi</th>';
    }

    headerHTML += '</tr>';
    tableHead.innerHTML = headerHTML;
}

function renderDinasaTable(isEditing) {
    generateDinasaHeader(isEditing);
    const tableBody = document.getElementById('dinasa-table-body');
    if (!tableBody) return;

    const daysInMonth = 31;

    tableBody.innerHTML = '';
    dinasaData.forEach(item => {
        const row = document.createElement('tr');
        let rowHTML = `
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-900 sticky left-0 bg-white z-10">${isEditing ? `<input type="text" value="${item.name}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1">` : item.name}</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">${isEditing ? `<input type="text" value="${item.nipp}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1">` : item.nipp}</td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">${isEditing ? `<input type="text" value="${item.jabatan}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1">` : item.jabatan}</td>
                `;

        for (let i = 0; i < daysInMonth; i++) {
            const schedule = item.schedule[i] || '';
            if (isEditing) {
                const colorClass = (schedule.toUpperCase() === 'L') ? 'text-red-600 font-bold' : '';
                rowHTML += `<td class="px-1 py-1 text-center"><input type="text" value="${schedule}" class="w-8 text-center rounded-md border-gray-300 shadow-sm text-sm p-1 ${colorClass}" oninput="handleScheduleInput(this)"></td>`;
            } else {
                const colorClass = (schedule.toUpperCase() === 'L') ? 'text-red-600 font-bold' : '';
                rowHTML += `<td class="px-2 py-2 whitespace-nowrap text-sm text-gray-500 text-center ${colorClass}">${schedule}</td>`;
            }
        }

        if (isEditing) {
            rowHTML += `<td class="px-3 py-2 text-center"><button class="text-red-500 hover:text-red-700 font-semibold text-xs" onclick="this.closest('tr').remove()">Hapus</button></td>`;
        }

        row.innerHTML = rowHTML;
        tableBody.appendChild(row);
    });
}

function toggleDinasaEditMode(isEditing) {
    const editBtn = document.getElementById('dinasa-edit-btn');
    const saveBtn = document.getElementById('dinasa-save-btn');
    const cancelBtn = document.getElementById('dinasa-cancel-btn');
    const addRowContainer = document.getElementById('add-dinasa-row-container');
    const bulanInput = document.getElementById('dinasa-bulan');
    const keteranganTextarea = document.getElementById('dinasa-keterangan');

    bulanInput.disabled = !isEditing;
    keteranganTextarea.disabled = !isEditing;

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
    renderDinasaTable(isEditing);
}

function saveDinasaChanges() {
    const tableRows = document.querySelectorAll('#dinasa-table-body tr');
    const newDinasaData = [];
    const daysInMonth = 31;

    dinasaBulan = document.getElementById('dinasa-bulan').value; // Simpan bulan
    dinasaKeterangan = document.getElementById('dinasa-keterangan').value; // Simpan keterangan

    tableRows.forEach(row => {
        const inputs = row.querySelectorAll('input');
        const schedule = [];
        for (let i = 3; i < daysInMonth + 3; i++) {
            schedule.push(inputs[i].value);
        }
        newDinasaData.push({
            name: inputs[0].value,
            nipp: inputs[1].value,
            jabatan: inputs[2].value,
            schedule: schedule
        });
    });
    dinasaData = newDinasaData;
    toggleDinasaEditMode(false);
}

function cancelDinasaChanges() {
    toggleDinasaEditMode(false);
    document.getElementById('dinasa-bulan').value = dinasaBulan; // Kembalikan nilai bulan
    document.getElementById('dinasa-keterangan').value = dinasaKeterangan; // Kembalikan nilai keterangan
}

function addDinasaRow() {
    const tableBody = document.getElementById('dinasa-table-body');
    const newRow = document.createElement('tr');
    const daysInMonth = 31;

    let rowHTML = `
                <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-900 sticky left-0 bg-white z-10"><input type="text" placeholder="Nama" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></td>
                <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500"><input type="text" placeholder="NIPP" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></td>
                <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500"><input type="text" placeholder="Jabatan" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></td>
            `;

    for (let i = 0; i < daysInMonth; i++) {
        rowHTML += `<td class="px-1 py-1 text-center"><input type="text" class="w-8 text-center rounded-md border-gray-300 shadow-sm text-sm p-1"></td>`;
    }
    rowHTML += `<td class="px-3 py-2 text-center"><button class="text-red-500 hover:text-red-700 font-semibold text-xs" onclick="this.closest('tr').remove()">Hapus</button></td>`;

    newRow.innerHTML = rowHTML;
    tableBody.appendChild(newRow);
}

// --- Start of IBPR functions ---
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

function renderIbprTable(isEditing = false) {
    const tableBody = document.getElementById('ibpr-table-body');
    if (!tableBody) return;

    const opsiHeader = document.getElementById('ibpr-opsi-header');
    if (opsiHeader) opsiHeader.style.display = isEditing ? 'table-cell' : 'none';

    tableBody.innerHTML = '';
    ibprData.forEach(item => {
        const row = document.createElement('tr');
        const risikoNilai = item.risikoProbabilitas * item.risikoDampak;
        const finalNilai = item.finalProbabilitas * item.finalDampak;
        const risikoColorClass = getRiskColorClass(risikoNilai);
        const finalColorClass = getRiskColorClass(finalNilai);

        if (isEditing) {
            row.innerHTML = `
                <td><input type="text" value="${item.id}" class="w-20"></td>
                <td class="text-left"><textarea>${item.bahaya}</textarea></td>
                <td class="text-left"><textarea>${item.kontrolPenjelasan}</textarea></td>
                <td><input type="text" value="${item.kontrolReferensi}"></td>
                <td><input type="radio" name="efektivitas-${item.id}" value="Tinggi" ${item.efektivitas === 'Tinggi' ? 'checked' : ''}></td>
                <td><input type="radio" name="efektivitas-${item.id}" value="Sedang" ${item.efektivitas === 'Sedang' ? 'checked' : ''}></td>
                <td><input type="radio" name="efektivitas-${item.id}" value="Rendah" ${item.efektivitas === 'Rendah' ? 'checked' : ''}></td>
                <td><input type="text" value="${item.kontrolPenanggungJawab}"></td>
                <td class="text-left"><textarea>${item.risikoPenjelasan}</textarea></td>
                <td><input type="number" value="${item.risikoProbabilitas}" class="w-20 risiko-probabilitas" oninput="updateNilaiRisiko(this)"></td>
                <td><input type="number" value="${item.risikoDampak}" class="w-20 risiko-dampak" oninput="updateNilaiRisiko(this)"></td>
                <td class="risiko-nilai font-bold ${risikoColorClass}">${risikoNilai}</td>
                <td class="text-left"><textarea>${item.rencanaPenjelasan}</textarea></td>
                <td><input type="text" value="${item.rencanaReferensi}"></td>
                <td><input type="text" value="${item.rencanaPenanggungJawab}"></td>
                <td><input type="text" value="${item.rencanaTanggal}"></td>
                <td><input type="number" value="${item.finalProbabilitas}" class="w-20 final-probabilitas" oninput="updateNilaiRisiko(this)"></td>
                <td><input type="number" value="${item.finalDampak}" class="w-20 final-dampak" oninput="updateNilaiRisiko(this)"></td>
                <td class="final-nilai font-bold ${finalColorClass}">${finalNilai}</td>
                <td><button class="text-red-500 hover:text-red-700 font-semibold" onclick="this.closest('tr').remove()">Hapus</button></td>
            `;
        } else {
            row.innerHTML = `
                        <td>${item.id}</td>
                        <td class="text-left">${item.bahaya}</td>
                        <td class="text-left">${item.kontrolPenjelasan}</td>
                        <td>${item.kontrolReferensi}</td>
                        <td>${item.efektivitas === 'Tinggi' ? '✓' : ''}</td>
                        <td>${item.efektivitas === 'Sedang' ? '✓' : ''}</td>
                        <td>${item.efektivitas === 'Rendah' ? '✓' : ''}</td>
                        <td>${item.kontrolPenanggungJawab}</td>
                        <td class="text-left">${item.risikoPenjelasan}</td>
                        <td>${item.risikoProbabilitas}</td>
                        <td>${item.risikoDampak}</td>
                        <td class="font-bold ${risikoColorClass}">${risikoNilai}</td>
                        <td class="text-left">${item.rencanaPenjelasan}</td>
                        <td>${item.rencanaReferensi}</td>
                        <td>${item.rencanaPenanggungJawab}</td>
                        <td>${item.rencanaTanggal}</td>
                        <td>${item.finalProbabilitas}</td>
                        <td>${item.finalDampak}</td>
                        <td class="font-bold ${finalColorClass}">${finalNilai}</td>
                    `;
        }
        tableBody.appendChild(row);
    });
}

function toggleIbprEditMode(isEditing) {
    document.getElementById('ibpr-edit-btn').classList.toggle('hidden', isEditing);
    document.getElementById('ibpr-save-btn').classList.toggle('hidden', !isEditing);
    document.getElementById('ibpr-cancel-btn').classList.toggle('hidden', !isEditing);
    document.getElementById('add-ibpr-row-container').classList.toggle('hidden', !isEditing);
    renderIbprTable(isEditing);
}

function saveIbprChanges() {
    const tableRows = document.querySelectorAll('#ibpr-table-body tr');
    const newIbprData = [];
    tableRows.forEach(row => {
        const inputs = row.querySelectorAll('input, textarea');
        const radios = row.querySelectorAll('input[type="radio"]:checked');

        newIbprData.push({
            id: inputs[0].value,
            bahaya: inputs[1].value,
            kontrolPenjelasan: inputs[2].value,
            kontrolReferensi: inputs[3].value,
            efektivitas: radios.length > 0 ? radios[0].value : '',
            kontrolPenanggungJawab: inputs[7].value,
            risikoPenjelasan: inputs[8].value,
            risikoProbabilitas: parseInt(inputs[9].value) || 0,
            risikoDampak: parseInt(inputs[10].value) || 0,
            rencanaPenjelasan: inputs[11].value,
            rencanaReferensi: inputs[12].value,
            rencanaPenanggungJawab: inputs[13].value,
            rencanaTanggal: inputs[14].value,
            finalProbabilitas: parseInt(inputs[15].value) || 0,
            finalDampak: parseInt(inputs[16].value) || 0
        });
    });
    ibprData = newIbprData;
    toggleIbprEditMode(false);
}

function addIbprRow() {
    const tableBody = document.getElementById('ibpr-table-body');
    const newRow = document.createElement('tr');
    const newId = (ibprData.length > 0 ? Math.max(...ibprData.map(item => parseInt(item.id))) + 1 : 1).toString().padStart(3, '0');
    newRow.innerHTML = `
                <td><input type="text" value="${newId}" class="w-20"></td>
                <td class="text-left"><textarea></textarea></td>
                <td class="text-left"><textarea></textarea></td>
                <td><input type="text"></td>
                <td><input type="radio" name="efektivitas-${newId}" value="Tinggi"></td>
                <td><input type="radio" name="efektivitas-${newId}" value="Sedang"></td>
                <td><input type="radio" name="efektivitas-${newId}" value="Rendah"></td>
                <td><input type="text"></td>
                <td class="text-left"><textarea></textarea></td>
                <td><input type="number" value="0" class="w-20 risiko-probabilitas" oninput="updateNilaiRisiko(this)"></td>
                <td><input type="number" value="0" class="w-20 risiko-dampak" oninput="updateNilaiRisiko(this)"></td>
                <td class="risiko-nilai font-bold">0</td>
                <td class="text-left"><textarea></textarea></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="text"></td>
                <td><input type="number" value="0" class="w-20 final-probabilitas" oninput="updateNilaiRisiko(this)"></td>
                <td><input type="number" value="0" class="w-20 final-dampak" oninput="updateNilaiRisiko(this)"></td>
                <td class="final-nilai font-bold">0</td>
                <td><button class="text-red-500 hover:text-red-700 font-semibold" onclick="this.closest('tr').remove()">Hapus</button></td>
            `;
    tableBody.appendChild(newRow);
}
// --- End of IBPR functions ---

// --- Start of Penjagaan Bentuk functions ---
function renderPenjagaanBentukTable(isEditing = false) {
    const tableBody = document.getElementById('penjagaan-bentuk-table-body');
    if (!tableBody) return;

    const opsiHeader = document.getElementById('penjagaan-bentuk-opsi-header');
    if (opsiHeader) opsiHeader.style.display = isEditing ? 'table-cell' : 'none';

    tableBody.innerHTML = '';
    penjagaanBentukData.forEach(item => {
        const row = document.createElement('tr');
        if (isEditing) {
            row.innerHTML = `
                        <td class="px-2 py-2 border"><input type="date" value="${item.tanggal}" class="w-full p-1 border rounded"></td>
                        <td class="px-2 py-2 border"><input type="text" value="${item.ptp}" class="w-full p-1 border rounded"></td>
                        <td class="px-2 py-2 border"><input type="text" value="${item.bh}" class="w-full p-1 border rounded"></td>
                        <td class="px-2 py-2 border"><input type="text" value="${item.bk}" class="w-full p-1 border rounded"></td>
                        <td class="px-2 py-2 border"><input type="text" value="${item.ms}" class="w-full p-1 border rounded"></td>
                        <td class="px-2 py-2 border"><textarea class="w-full p-1 border rounded">${item.catatan}</textarea></td>
                        <td class="px-2 py-2 border text-center"><button class="text-red-500 hover:text-red-700 font-semibold" onclick="this.closest('tr').remove()">Hapus</button></td>
                    `;
        } else {
            row.innerHTML = `
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 text-center border">${item.tanggal}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 text-center border">${item.ptp}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 text-center border">${item.bh}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 text-center border">${item.bk}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 text-center border">${item.ms}</td>
                        <td class="px-4 py-2 text-sm text-gray-800 text-left border">${item.catatan}</td>
                    `;
        }
        tableBody.appendChild(row);
    });
}

function togglePenjagaanBentukEditMode(isEditing) {
    document.getElementById('penjagaan-bentuk-edit-btn').classList.toggle('hidden', isEditing);
    document.getElementById('penjagaan-bentuk-save-btn').classList.toggle('hidden', !isEditing);
    document.getElementById('penjagaan-bentuk-cancel-btn').classList.toggle('hidden', !isEditing);
    document.getElementById('add-penjagaan-bentuk-row-container').classList.toggle('hidden', !isEditing);
    renderPenjagaanBentukTable(isEditing);
}

function savePenjagaanBentukChanges() {
    const tableRows = document.querySelectorAll('#penjagaan-bentuk-table-body tr');
    const newData = [];
    tableRows.forEach(row => {
        const inputs = row.querySelectorAll('input, textarea');
        newData.push({
            tanggal: inputs[0].value,
            ptp: inputs[1].value,
            bh: inputs[2].value,
            bk: inputs[3].value,
            ms: inputs[4].value,
            catatan: inputs[5].value
        });
    });
    penjagaanBentukData = newData;
    togglePenjagaanBentukEditMode(false);
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

// --- Start of Penggunaan KR SM functions ---
function renderPenggunaanKrSmTable1(isEditing = false) {
    const tableBody = document.getElementById('penggunaan-kr-sm-table-body-1');
    if (!tableBody) return;

    const pihakStasiunView = document.getElementById('pihak-stasiun-view-1');
    const pihakStasiunInput = document.getElementById('pihak-stasiun-input-1');
    if (pihakStasiunView) pihakStasiunView.textContent = pihakStasiunKrSm1;
    if (pihakStasiunInput) pihakStasiunInput.value = pihakStasiunKrSm1;

    const opsiHeader = document.getElementById('penggunaan-kr-sm-opsi-header-1');
    if (opsiHeader) opsiHeader.style.display = isEditing ? 'table-cell' : 'none';

    tableBody.innerHTML = '';
    penggunaanKrSmData1.forEach(item => {
        const row = document.createElement('tr');
        if (isEditing) {
            row.innerHTML = `
                        <td class="px-2 py-2 border"><input type="number" value="${item.no}" class="w-16 p-1 border rounded text-center"></td>
                        <td class="px-2 py-2 border"><input type="date" value="${item.tanggal}" class="w-full p-1 border rounded"></td>
                        <td class="px-2 py-2 border"><input type="number" value="${item.kr1_awal}" class="w-full p-1 border rounded text-center"></td>
                        <td class="px-2 py-2 border"><input type="number" value="${item.kr1_akhir}" class="w-full p-1 border rounded text-center"></td>
                        <td class="px-2 py-2 border"><input type="text" value="${item.kr1_keterangan}" class="w-full p-1 border rounded"></td>
                        <td class="px-2 py-2 border"><input type="number" value="${item.sm1_awal}" class="w-full p-1 border rounded text-center"></td>
                        <td class="px-2 py-2 border"><input type="number" value="${item.sm1_akhir}" class="w-full p-1 border rounded text-center"></td>
                        <td class="px-2 py-2 border"><input type="text" value="${item.sm1_keterangan}" class="w-full p-1 border rounded"></td>
                        <td class="px-2 py-2 border text-center"><button class="text-red-500 hover:text-red-700 font-semibold" onclick="this.closest('tr').remove()">Hapus</button></td>
                    `;
        } else {
            row.innerHTML = `
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 text-center border">${item.no}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 text-center border">${item.tanggal}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 text-center border">${item.kr1_awal}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 text-center border">${item.kr1_akhir}</td>
                        <td class="px-4 py-2 text-sm text-gray-800 text-left border">${item.kr1_keterangan}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 text-center border">${item.sm1_awal}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 text-center border">${item.sm1_akhir}</td>
                        <td class="px-4 py-2 text-sm text-gray-800 text-left border">${item.sm1_keterangan}</td>
                    `;
        }
        tableBody.appendChild(row);
    });
}

function togglePenggunaanKrSmEditMode1(isEditing) {
    document.getElementById('penggunaan-kr-sm-edit-btn-1').classList.toggle('hidden', isEditing);
    document.getElementById('penggunaan-kr-sm-save-btn-1').classList.toggle('hidden', !isEditing);
    document.getElementById('penggunaan-kr-sm-cancel-btn-1').classList.toggle('hidden', !isEditing);
    document.getElementById('add-penggunaan-kr-sm-row-container-1').classList.toggle('hidden', !isEditing);

    const pihakStasiunView = document.getElementById('pihak-stasiun-view-1');
    const pihakStasiunInput = document.getElementById('pihak-stasiun-input-1');
    if (pihakStasiunView && pihakStasiunInput) {
        pihakStasiunView.classList.toggle('hidden', isEditing);
        pihakStasiunInput.classList.toggle('hidden', !isEditing);
    }

    renderPenggunaanKrSmTable1(isEditing);
}

function savePenggunaanKrSmChanges1() {
    pihakStasiunKrSm1 = document.getElementById('pihak-stasiun-input-1').value;
    const tableRows = document.querySelectorAll('#penggunaan-kr-sm-table-body-1 tr');
    const newData = [];
    tableRows.forEach(row => {
        const inputs = row.querySelectorAll('input');
        newData.push({
            no: parseInt(inputs[0].value) || 0,
            tanggal: inputs[1].value,
            kr1_awal: parseInt(inputs[2].value) || 0,
            kr1_akhir: parseInt(inputs[3].value) || 0,
            kr1_keterangan: inputs[4].value,
            sm1_awal: parseInt(inputs[5].value) || 0,
            sm1_akhir: parseInt(inputs[6].value) || 0,
            sm1_keterangan: inputs[7].value
        });
    });
    penggunaanKrSmData1 = newData;
    togglePenggunaanKrSmEditMode1(false);
}

function addPenggunaanKrSmRow1() {
    const tableBody = document.getElementById('penggunaan-kr-sm-table-body-1');
    const newRow = document.createElement('tr');
    const newNo = penggunaanKrSmData1.length > 0 ? Math.max(...penggunaanKrSmData1.map(item => item.no)) + 1 : 1;
    newRow.innerHTML = `
                <td class="px-2 py-2 border"><input type="number" value="${newNo}" class="w-16 p-1 border rounded text-center"></td>
                <td class="px-2 py-2 border"><input type="date" class="w-full p-1 border rounded"></td>
                <td class="px-2 py-2 border"><input type="number" class="w-full p-1 border rounded text-center"></td>
                <td class="px-2 py-2 border"><input type="number" class="w-full p-1 border rounded text-center"></td>
                <td class="px-2 py-2 border"><input type="text" class="w-full p-1 border rounded"></td>
                <td class="px-2 py-2 border"><input type="number" class="w-full p-1 border rounded text-center"></td>
                <td class="px-2 py-2 border"><input type="number" class="w-full p-1 border rounded text-center"></td>
                <td class="px-2 py-2 border"><input type="text" class="w-full p-1 border rounded"></td>
                <td class="px-2 py-2 border text-center"><button class="text-red-500 hover:text-red-700 font-semibold" onclick="this.closest('tr').remove()">Hapus</button></td>
            `;
    tableBody.appendChild(newRow);
}

function renderPenggunaanKrSmTable2(isEditing = false) {
    const tableBody = document.getElementById('penggunaan-kr-sm-table-body-2');
    if (!tableBody) return;

    const pihakStasiunView = document.getElementById('pihak-stasiun-view-2');
    const pihakStasiunInput = document.getElementById('pihak-stasiun-input-2');
    if (pihakStasiunView) pihakStasiunView.textContent = pihakStasiunKrSm2;
    if (pihakStasiunInput) pihakStasiunInput.value = pihakStasiunKrSm2;

    const opsiHeader = document.getElementById('penggunaan-kr-sm-opsi-header-2');
    if (opsiHeader) opsiHeader.style.display = isEditing ? 'table-cell' : 'none';

    tableBody.innerHTML = '';
    penggunaanKrSmData2.forEach(item => {
        const row = document.createElement('tr');
        if (isEditing) {
            row.innerHTML = `
                        <td class="px-2 py-2 border"><input type="number" value="${item.no}" class="w-16 p-1 border rounded text-center"></td>
                        <td class="px-2 py-2 border"><input type="date" value="${item.tanggal}" class="w-full p-1 border rounded"></td>
                        <td class="px-2 py-2 border"><input type="number" value="${item.kr1_awal}" class="w-full p-1 border rounded text-center"></td>
                        <td class="px-2 py-2 border"><input type="number" value="${item.kr1_akhir}" class="w-full p-1 border rounded text-center"></td>
                        <td class="px-2 py-2 border"><input type="text" value="${item.kr1_keterangan}" class="w-full p-1 border rounded"></td>
                        <td class="px-2 py-2 border"><input type="number" value="${item.sm1_awal}" class="w-full p-1 border rounded text-center"></td>
                        <td class="px-2 py-2 border"><input type="number" value="${item.sm1_akhir}" class="w-full p-1 border rounded text-center"></td>
                        <td class="px-2 py-2 border"><input type="text" value="${item.sm1_keterangan}" class="w-full p-1 border rounded"></td>
                        <td class="px-2 py-2 border text-center"><button class="text-red-500 hover:text-red-700 font-semibold" onclick="this.closest('tr').remove()">Hapus</button></td>
                    `;
        } else {
            row.innerHTML = `
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 text-center border">${item.no}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 text-center border">${item.tanggal}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 text-center border">${item.kr1_awal}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 text-center border">${item.kr1_akhir}</td>
                        <td class="px-4 py-2 text-sm text-gray-800 text-left border">${item.kr1_keterangan}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 text-center border">${item.sm1_awal}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 text-center border">${item.sm1_akhir}</td>
                        <td class="px-4 py-2 text-sm text-gray-800 text-left border">${item.sm1_keterangan}</td>
                    `;
        }
        tableBody.appendChild(row);
    });
}

function togglePenggunaanKrSmEditMode2(isEditing) {
    document.getElementById('penggunaan-kr-sm-edit-btn-2').classList.toggle('hidden', isEditing);
    document.getElementById('penggunaan-kr-sm-save-btn-2').classList.toggle('hidden', !isEditing);
    document.getElementById('penggunaan-kr-sm-cancel-btn-2').classList.toggle('hidden', !isEditing);
    document.getElementById('add-penggunaan-kr-sm-row-container-2').classList.toggle('hidden', !isEditing);

    const pihakStasiunView = document.getElementById('pihak-stasiun-view-2');
    const pihakStasiunInput = document.getElementById('pihak-stasiun-input-2');
    if (pihakStasiunView && pihakStasiunInput) {
        pihakStasiunView.classList.toggle('hidden', isEditing);
        pihakStasiunInput.classList.toggle('hidden', !isEditing);
    }

    renderPenggunaanKrSmTable2(isEditing);
}

function savePenggunaanKrSmChanges2() {
    pihakStasiunKrSm2 = document.getElementById('pihak-stasiun-input-2').value;
    const tableRows = document.querySelectorAll('#penggunaan-kr-sm-table-body-2 tr');
    const newData = [];
    tableRows.forEach(row => {
        const inputs = row.querySelectorAll('input');
        newData.push({
            no: parseInt(inputs[0].value) || 0,
            tanggal: inputs[1].value,
            kr1_awal: parseInt(inputs[2].value) || 0,
            kr1_akhir: parseInt(inputs[3].value) || 0,
            kr1_keterangan: inputs[4].value,
            sm1_awal: parseInt(inputs[5].value) || 0,
            sm1_akhir: parseInt(inputs[6].value) || 0,
            sm1_keterangan: inputs[7].value
        });
    });
    penggunaanKrSmData2 = newData;
    togglePenggunaanKrSmEditMode2(false);
}

function addPenggunaanKrSmRow2() {
    const tableBody = document.getElementById('penggunaan-kr-sm-table-body-2');
    const newRow = document.createElement('tr');
    const newNo = penggunaanKrSmData2.length > 0 ? Math.max(...penggunaanKrSmData2.map(item => item.no)) + 1 : 1;
    newRow.innerHTML = `
                <td class="px-2 py-2 border"><input type="number" value="${newNo}" class="w-16 p-1 border rounded text-center"></td>
                <td class="px-2 py-2 border"><input type="date" class="w-full p-1 border rounded"></td>
                <td class="px-2 py-2 border"><input type="number" class="w-full p-1 border rounded text-center"></td>
                <td class="px-2 py-2 border"><input type="number" class="w-full p-1 border rounded text-center"></td>
                <td class="px-2 py-2 border"><input type="text" class="w-full p-1 border rounded"></td>
                <td class="px-2 py-2 border"><input type="number" class="w-full p-1 border rounded text-center"></td>
                <td class="px-2 py-2 border"><input type="number" class="w-full p-1 border rounded text-center"></td>
                <td class="px-2 py-2 border"><input type="text" class="w-full p-1 border rounded"></td>
                <td class="px-2 py-2 border text-center"><button class="text-red-500 hover:text-red-700 font-semibold" onclick="this.closest('tr').remove()">Hapus</button></td>
            `;
    tableBody.appendChild(newRow);
}
// --- End of Penggunaan KR SM functions ---

// --- Start of Gangguan Operasional functions ---
function renderGangguanTable(isEditing = false) {
    const tableBody = document.getElementById('gangguan-table-body');
    if (!tableBody) return;

    const opsiHeader = document.getElementById('gangguan-opsi-header');
    if (opsiHeader) opsiHeader.style.display = isEditing ? 'table-cell' : 'none';

    tableBody.innerHTML = '';
    gangguanData.forEach(item => {
        const row = document.createElement('tr');
        if (isEditing) {
            row.innerHTML = `
                        <td class="px-2 py-2 border"><input type="number" value="${item.no}" class="w-16 p-1 border rounded text-center"></td>
                        <td class="px-2 py-2 border"><input type="date" value="${item.tanggal}" class="w-full p-1 border rounded"></td>
                        <td class="px-2 py-2 border"><textarea class="w-full p-1 border rounded">${item.jenisGangguan}</textarea></td>
                        <td class="px-2 py-2 border"><input type="text" value="${item.laporKe}" class="w-full p-1 border rounded"></td>
                        <td class="px-2 py-2 border"><input type="time" value="${item.jam}" class="w-full p-1 border rounded"></td>
                        <td class="px-2 py-2 border"><textarea class="w-full p-1 border rounded">${item.penanganan}</textarea></td>
                        <td class="px-2 py-2 border"><input type="text" value="${item.petugas}" class="w-full p-1 border rounded"></td>
                        <td class="px-2 py-2 border text-center"><button class="text-red-500 hover:text-red-700 font-semibold" onclick="this.closest('tr').remove()">Hapus</button></td>
                    `;
        } else {
            row.innerHTML = `
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 text-center border">${item.no}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 text-center border">${item.tanggal}</td>
                        <td class="px-4 py-2 text-sm text-gray-800 text-left border">${item.jenisGangguan}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 text-center border">${item.laporKe}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 text-center border">${item.jam}</td>
                        <td class="px-4 py-2 text-sm text-gray-800 text-left border">${item.penanganan}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 text-center border">${item.petugas}</td>
                    `;
        }
        tableBody.appendChild(row);
    });
}

function toggleGangguanEditMode(isEditing) {
    document.getElementById('gangguan-edit-btn').classList.toggle('hidden', isEditing);
    document.getElementById('gangguan-save-btn').classList.toggle('hidden', !isEditing);
    document.getElementById('gangguan-cancel-btn').classList.toggle('hidden', !isEditing);
    document.getElementById('add-gangguan-row-container').classList.toggle('hidden', !isEditing);
    renderGangguanTable(isEditing);
}

function saveGangguanChanges() {
    const tableRows = document.querySelectorAll('#gangguan-table-body tr');
    const newData = [];
    tableRows.forEach(row => {
        const inputs = row.querySelectorAll('input, textarea');
        if (inputs.length === 7) { // Memastikan semua kolom ada
            newData.push({
                no: parseInt(inputs[0].value) || 0,
                tanggal: inputs[1].value,
                jenisGangguan: inputs[2].value,
                laporKe: inputs[3].value,
                jam: inputs[4].value,
                penanganan: inputs[5].value,
                petugas: inputs[6].value
            });
        }
    });
    gangguanData = newData;
    toggleGangguanEditMode(false);
}

function addGangguanRow() {
    const tableBody = document.getElementById('gangguan-table-body');
    const newRow = document.createElement('tr');
    const newNo = gangguanData.length > 0 ? Math.max(...gangguanData.map(item => item.no)) + 1 : 1;
    newRow.innerHTML = `
                <td class="px-2 py-2 border"><input type="number" value="${newNo}" class="w-16 p-1 border rounded text-center"></td>
                <td class="px-2 py-2 border"><input type="date" class="w-full p-1 border rounded"></td>
                <td class="px-2 py-2 border"><textarea class="w-full p-1 border rounded" placeholder="Jelaskan gangguan..."></textarea></td>
                <td class="px-2 py-2 border"><input type="text" placeholder="cth: PK/OC" class="w-full p-1 border rounded"></td>
                <td class="px-2 py-2 border"><input type="time" class="w-full p-1 border rounded"></td>
                <td class="px-2 py-2 border"><textarea class="w-full p-1 border rounded" placeholder="Jelaskan penanganan..."></textarea></td>
                <td class="px-2 py-2 border"><input type="text" placeholder="Nama petugas/tim" class="w-full p-1 border rounded"></td>
                <td class="px-2 py-2 border text-center"><button class="text-red-500 hover:text-red-700 font-semibold" onclick="this.closest('tr').remove()">Hapus</button></td>
            `;
    tableBody.appendChild(newRow);
}
// --- End of Gangguan Operasional functions ---

function loadPage(pageName) {
    // Hapus kelas 'active' dari semua tautan
    sidebarLinks.forEach(link => {
        link.classList.remove('bg-blue-500', 'text-white', 'font-semibold', 'shadow-lg', 'scale-105');
        link.classList.add('hover:bg-blue-400');
    });

    // Tambahkan kelas 'active' ke tautan yang sedang diklik
    const activeLink = document.getElementById(`menu-${pageName}`);
    const submenuLinks = document.querySelectorAll('#administrasi-submenu a');
    submenuLinks.forEach(link => {
        link.classList.remove('bg-blue-500');
        link.classList.add('hover:bg-blue-400');
    });
    const activeSubmenuLink = document.getElementById(`submenu-${pageName}`);
    if (activeSubmenuLink) {
        activeSubmenuLink.classList.remove('hover:bg-blue-400');
        activeSubmenuLink.classList.add('bg-blue-500');
        document.getElementById('menu-administrasi-toggle').classList.remove('hover:bg-blue-400');
        document.getElementById('menu-administrasi-toggle').classList.add('bg-blue-500', 'text-white', 'font-semibold', 'shadow-lg');
    } else if (activeLink) {
        activeLink.classList.remove('hover:bg-blue-400');
        activeLink.classList.add('bg-blue-500', 'text-white', 'font-semibold', 'shadow-lg', 'scale-105');
        document.getElementById('menu-administrasi-toggle').classList.remove('bg-blue-500', 'text-white', 'font-semibold', 'shadow-lg');
    }


    // Muat konten yang sesuai
    contentContainer.innerHTML = pages[pageName];

    // Hapus semua interval yang sedang berjalan
    clearInterval(timelineInterval);
    clearInterval(trainUpdateInterval);

    // Jalankan setup spesifik untuk setiap halaman SETELAH innerHTML diatur
    if (pageName === 'pegawai') {
        renderMainEmployeeTable(false);
        renderDinasaTable(false);
        document.getElementById('dinasa-bulan').value = dinasaBulan;
        document.getElementById('dinasa-keterangan').value = dinasaKeterangan;
        renderKebutuhanTable(false);
        renderJamKerjaTable(false);

        document.getElementById('main-employee-edit-btn').addEventListener('click', () => toggleMainEmployeeEditMode(true));
        document.getElementById('main-employee-save-btn').addEventListener('click', saveMainEmployeeChanges);
        document.getElementById('main-employee-cancel-btn').addEventListener('click', cancelMainEmployeeChanges);
        document.getElementById('add-employee-row-btn').addEventListener('click', addEmptyEmployeeRow);

        document.getElementById('dinasa-edit-btn').addEventListener('click', () => toggleDinasaEditMode(true));
        document.getElementById('dinasa-save-btn').addEventListener('click', saveDinasaChanges);
        document.getElementById('dinasa-cancel-btn').addEventListener('click', cancelDinasaChanges);
        document.getElementById('add-dinasa-row-btn').addEventListener('click', addDinasaRow);

        document.getElementById('kebutuhan-edit-btn').addEventListener('click', () => toggleKebutuhanEditMode(true));
        document.getElementById('kebutuhan-save-btn').addEventListener('click', saveKebutuhanChanges);
        document.getElementById('kebutuhan-cancel-btn').addEventListener('click', cancelKebutuhanChanges);
        document.getElementById('add-kebutuhan-row-btn').addEventListener('click', addKebutuhanRow);

        document.getElementById('jamkerja-edit-btn').addEventListener('click', () => toggleJamKerjaEditMode(true));
        document.getElementById('jamkerja-save-btn').addEventListener('click', saveJamKerjaChanges);
        document.getElementById('jamkerja-cancel-btn').addEventListener('click', cancelJamKerjaChanges);
        document.getElementById('add-jamkerja-row-btn').addEventListener('click', addJamKerjaRow);
        setupMoveEmployeeModalListeners(); // <-- TAMBAHKAN BARIS INI

    } else if (pageName === 'profil') {
        populateProfileData();
        renderStoppingTrainsTable();

        document.getElementById('profil-edit-btn').addEventListener('click', () => toggleProfileEditMode(true));
        document.getElementById('profil-save-btn').addEventListener('click', saveProfileChanges);
        document.getElementById('profil-cancel-btn').addEventListener('click', cancelProfileChanges);

        document.getElementById('train-edit-btn').addEventListener('click', () => toggleTrainTableEditMode(true));
        document.getElementById('train-save-btn').addEventListener('click', saveTrainTableChanges);
        document.getElementById('train-cancel-btn').addEventListener('click', cancelTrainTableChanges);
        document.getElementById('add-train-row-btn').addEventListener('click', addEditableTrainRow);

    } else if (pageName === 'perjalanan') {
        generateTimelineMarkers();
        updateTrainStatus();
        generateTimelineTrains();

        renderPerkaTable(false);
        renderJalurTable(false);
        document.getElementById('jalur-mulai-berlaku').value = jalurMulaiBerlaku;
        renderJalurDilaluiTable(false);
        document.getElementById('emplasemen-image').src = emplasemenImageUrl;
        document.getElementById('emplasemen-image-preview').src = emplasemenImageUrl;

        const searchInput = document.getElementById('search-train');
        if (searchInput) {
            searchInput.addEventListener('input', filterTrains);
        }

        document.getElementById('perka-edit-btn').addEventListener('click', () => togglePerkaEditMode(true));
        document.getElementById('perka-save-btn').addEventListener('click', savePerkaChanges);
        document.getElementById('perka-cancel-btn').addEventListener('click', () => togglePerkaEditMode(false));
        document.getElementById('add-perka-row-btn').addEventListener('click', addPerkaRow);

        document.getElementById('emplasemen-edit-btn').addEventListener('click', () => toggleEmplasemenEditMode(true));
        document.getElementById('emplasemen-save-btn').addEventListener('click', saveEmplasemenChanges);
        document.getElementById('emplasemen-cancel-btn').addEventListener('click', () => toggleEmplasemenEditMode(false));
        setupEmplasemenPreview();

        document.getElementById('jalur-edit-btn').addEventListener('click', () => toggleJalurEditMode(true));
        document.getElementById('jalur-save-btn').addEventListener('click', saveJalurChanges);
        document.getElementById('jalur-cancel-btn').addEventListener('click', cancelJalurChanges);
        document.getElementById('add-jalur-row-btn').addEventListener('click', addJalurRow);

        document.getElementById('jalur-dilalui-edit-btn').addEventListener('click', () => toggleJalurDilaluiEditMode(true));
        document.getElementById('jalur-dilalui-save-btn').addEventListener('click', saveJalurDilaluiChanges);
        document.getElementById('jalur-dilalui-cancel-btn').addEventListener('click', () => toggleJalurDilaluiEditMode(false));
        document.getElementById('add-jalur-dilalui-row-btn').addEventListener('click', addJalurDilaluiRow);

        timelineInterval = setInterval(updateCurrentTimeLine, 1000);
        trainUpdateInterval = setInterval(() => {
            updateTrainStatus();
            const saveBtn = document.getElementById('perka-save-btn');
            if (pageName === 'perjalanan' && saveBtn && saveBtn.classList.contains('hidden')) {
                renderPerkaTable(false);
            }
        }, 60000);

    } else if (pageName === 'dashboard') {
        generateTimelineMarkers();
        updateTrainStatus();
        generateTimelineTrains();

        const fetchWeatherData = async () => {
            const weatherDataEl = document.getElementById('weather-data');
            try {
                weatherDataEl.innerHTML = `
                            <h3 class="text-gray-500 text-sm">Perkiraan Cuaca</h3>
                            <p class="text-gray-900 text-xl font-bold mt-1">Mengambil data...</p>
                        `;

                const response = await fetch('https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-JawaTimur.xml');
                if (!response.ok) throw new Error('Gagal mengambil data BMKG');

                const xmlText = await response.text();
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, "text/xml");

                const areaEl = Array.from(xmlDoc.querySelectorAll('area')).find(area => area.getAttribute('description') === 'Banyuwangi');

                if (areaEl) {
                    const weatherCodeEl = areaEl.querySelector('parameter[id="weather"] value');
                    const tempEl = areaEl.querySelector('parameter[id="t"] value');

                    const weatherCode = weatherCodeEl ? weatherCodeEl.textContent : 'N/A';
                    const tempC = tempEl ? tempEl.textContent : 'N/A';

                    const weatherDescriptions = {
                        '0': 'Cerah', '1': 'Cerah Berawan', '2': 'Cerah Berawan', '3': 'Berawan', '4': 'Berawan Tebal',
                        '5': 'Kabut', '10': 'Asap', '45': 'Hujan Ringan', '60': 'Hujan Sedang', '61': 'Hujan Lebat',
                        '63': 'Hujan Petir', '80': 'Hujan Lokal', '95': 'Hujan Petir', '97': 'Hujan Petir'
                    };

                    const weatherDesc = weatherDescriptions[weatherCode] || 'Tidak diketahui';

                    weatherDataEl.innerHTML = `
                                <h3 class="text-gray-500 text-sm">Perkiraan Cuaca</h3>
                                <p class="text-gray-900 text-2xl font-bold mt-1">${tempC}°C</p>
                                <p class="text-gray-500 text-sm mt-1">${weatherDesc}</p>
                            `;
                } else {
                    weatherDataEl.innerHTML = `
                                <h3 class="text-gray-500 text-sm">Perkiraan Cuaca</h3>
                                <p class="text-gray-900 text-base font-bold mt-1">Data tidak tersedia</p>
                            `;
                }
            } catch (error) {
                console.error("Error fetching weather data:", error);
                weatherDataEl.innerHTML = `
                            <h3 class="text-gray-500 text-sm">Perkiraan Cuaca</h3>
                            <p class="text-red-500 text-base font-bold mt-1">Gagal memuat data</p>
                        `;
            }
        };

        fetchWeatherData();

        timelineInterval = setInterval(updateCurrentTimeLine, 1000);
        trainUpdateInterval = setInterval(updateTrainStatus, 60000);
    } else if (pageName === 'ibpr') {
        renderIbprTable(false);
        document.getElementById('ibpr-edit-btn').addEventListener('click', () => toggleIbprEditMode(true));
        document.getElementById('ibpr-save-btn').addEventListener('click', saveIbprChanges);
        document.getElementById('ibpr-cancel-btn').addEventListener('click', () => toggleIbprEditMode(false));
        document.getElementById('add-ibpr-row-btn').addEventListener('click', addIbprRow);
    } else if (pageName === 'penjagaan-bentuk') {
        renderPenjagaanBentukTable(false);
        document.getElementById('penjagaan-bentuk-edit-btn').addEventListener('click', () => togglePenjagaanBentukEditMode(true));
        document.getElementById('penjagaan-bentuk-save-btn').addEventListener('click', savePenjagaanBentukChanges);
        document.getElementById('penjagaan-bentuk-cancel-btn').addEventListener('click', () => togglePenjagaanBentukEditMode(false));
        document.getElementById('add-penjagaan-bentuk-row-btn').addEventListener('click', addPenjagaanBentukRow);
    } else if (pageName === 'penggunaan') {
        renderPenggunaanKrSmTable1(false);
        document.getElementById('penggunaan-kr-sm-edit-btn-1').addEventListener('click', () => togglePenggunaanKrSmEditMode1(true));
        document.getElementById('penggunaan-kr-sm-save-btn-1').addEventListener('click', savePenggunaanKrSmChanges1);
        document.getElementById('penggunaan-kr-sm-cancel-btn-1').addEventListener('click', () => togglePenggunaanKrSmEditMode1(false));
        document.getElementById('add-penggunaan-kr-sm-row-btn-1').addEventListener('click', addPenggunaanKrSmRow1);

        renderPenggunaanKrSmTable2(false);
        document.getElementById('penggunaan-kr-sm-edit-btn-2').addEventListener('click', () => togglePenggunaanKrSmEditMode2(true));
        document.getElementById('penggunaan-kr-sm-save-btn-2').addEventListener('click', savePenggunaanKrSmChanges2);
        document.getElementById('penggunaan-kr-sm-cancel-btn-2').addEventListener('click', () => togglePenggunaanKrSmEditMode2(false));
        document.getElementById('add-penggunaan-kr-sm-row-btn-2').addEventListener('click', addPenggunaanKrSmRow2);
    } else if (pageName === 'gangguan') {
        renderGangguanTable(false);
        document.getElementById('gangguan-edit-btn').addEventListener('click', () => toggleGangguanEditMode(true));
        document.getElementById('gangguan-save-btn').addEventListener('click', saveGangguanChanges);
        document.getElementById('gangguan-cancel-btn').addEventListener('click', () => toggleGangguanEditMode(false));
        document.getElementById('add-gangguan-row-btn').addEventListener('click', addGangguanRow);
    }
}

function showModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
}

function hideModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

document.getElementById('login-button').addEventListener('click', () => showModal('login-modal'));
document.getElementById('close-login-modal').addEventListener('click', () => hideModal('login-modal'));
document.getElementById('login-modal').addEventListener('click', (e) => {
    if (e.target.id === 'login-modal') {
        hideModal('login-modal');
    }
});

document.getElementById('menu-dashboard').addEventListener('click', () => loadPage('dashboard'));
document.getElementById('menu-profil').addEventListener('click', () => loadPage('profil'));
document.getElementById('menu-pegawai').addEventListener('click', () => loadPage('pegawai'));
document.getElementById('menu-perjalanan').addEventListener('click', () => loadPage('perjalanan'));
document.getElementById('menu-administrasi-toggle').addEventListener('click', (e) => {
    e.preventDefault();
    const submenu = document.getElementById('administrasi-submenu');
    const toggleIcon = e.currentTarget.querySelector('.fa-chevron-down');

    // Hapus kelas aktif dari tautan menu utama lainnya
    sidebarLinks.forEach(link => {
        link.classList.remove('bg-blue-500', 'text-white', 'font-semibold', 'shadow-lg', 'scale-105');
        link.classList.add('hover:bg-blue-400');
    });
    // Tambahkan kelas aktif ke menu "Data Administrasi"
    e.currentTarget.classList.remove('hover:bg-blue-400');
    e.currentTarget.classList.add('bg-blue-500', 'text-white', 'font-semibold', 'shadow-lg');

    if (submenu.classList.contains('submenu-open')) {
        submenu.classList.remove('submenu-open');
        toggleIcon.classList.remove('rotate-180');
    } else {
        submenu.classList.add('submenu-open');
        toggleIcon.classList.add('rotate-180');
        loadPage('administrasi');
    }
});
document.getElementById('submenu-ibpr').addEventListener('click', () => loadPage('ibpr'));
document.getElementById('submenu-penjagaan-bentuk').addEventListener('click', () => loadPage('penjagaan-bentuk'));
document.getElementById('submenu-penggunaan').addEventListener('click', () => loadPage('penggunaan'));
document.getElementById('submenu-gangguan').addEventListener('click', () => loadPage('gangguan'));
document.getElementById('menu-railibrary').addEventListener('click', () => loadPage('railibrary'));
loadPage('dashboard');

// Helper functions and event listener for modals
const loadingOverlay = document.getElementById('loading-overlay');
const messageModal = document.getElementById('message-modal');
const messageText = document.getElementById('message-text');
const messageCloseBtn = document.getElementById('message-close-btn');

function showLoading() {
    if (loadingOverlay) {
        loadingOverlay.classList.remove('hidden');
        loadingOverlay.classList.add('flex');
    }
}

function hideLoading() {
    if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
        loadingOverlay.classList.remove('flex');
    }
}

function showMessage(message) {
    if (messageModal && messageText) {
        messageText.textContent = message;
        messageModal.classList.remove('hidden');
        messageModal.classList.add('flex');
    }
}

function hideMessage() {
    if (messageModal) {
        messageModal.classList.add('hidden');
        messageModal.classList.remove('flex');
    }
}

if (messageCloseBtn) {
    messageCloseBtn.addEventListener('click', hideMessage);
}
