let trainData = [];
let trackData = [];
let jalurDilaluiData = [];

// --- Start of Train functions ---

function loadTrains() {
    const tableBody = document.getElementById("train-table-body");
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
        url: "/train/get",
        type: "GET",
        success: function (response) {
            trainData = response;
            renderPerkaTable();
            updateTrainStatus();
            generateTimelineTrains();
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

function saveTrains(trains) {
    $.ajax({
        url: "/train/save",
        type: "POST",
        data: {
            _token: token,
            trains,
        },
        success: function (response) {
            loadTrains();
            togglePerkaEditMode(false);
        },
        error: function (error) {
            showMessage('Gagal menyimpan data', 'error');
        },
    });
}

function deleteTrain(id) {
    if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) return;

    $.ajax({
        url: "/train/delete",
        type: "POST",
        data: { _token: token, id },
        success: function (response) {
            trainData = trainData.filter((item) => item.id !== id);
            renderPerkaTable(true);
        },
        error: function (error) {
            showMessage('Gagal menghapus data', 'error');
        },
    });

}

function handlePerkaStatusChange(selectElement) {
    const row = selectElement.closest('tr');
    const arrivalInput = row.querySelectorAll('input[type="time"]')[0];

    if (selectElement.value === 'Langsung') {
        if (arrivalInput.value) {
            arrivalInput.dataset.originalValue = arrivalInput.value;
        }

        arrivalInput.value = '';
        arrivalInput.disabled = true;
    } else {
        arrivalInput.disabled = false;

        if (arrivalInput.dataset.originalValue) {
            arrivalInput.value = arrivalInput.dataset.originalValue;
        }
    }
}

function renderPerkaTable(isEditing = false) {
    const tableBody = document.getElementById('train-table-body');
    let opsiHeader = document.getElementById('perka-opsi-header');

    if (!tableBody || !opsiHeader) return;

    tableBody.innerHTML = '';

    if (isEditing) {
        opsiHeader.classList.remove('hidden');
    } else {
        opsiHeader.classList.add('hidden');
    }

    if (trainData.length === 0 && !isEditing) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td colspan="7" class="px-6 py-4 text-center text-sm text-gray-500">
                Data tidak ditemukan
            </td>
        `;
        tableBody.appendChild(row);
    } else {
        trainData.forEach(train => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', train.id);

            if (isEditing) {
                const isLangsung = train.status === 'Langsung';

                row.innerHTML = `
                    <td><input type="text" value="${train.number}" class="perka-input perka-number w-20 p-1 border rounded"></td>
                    <td><input type="text" value="${train.name}" class="perka-input perka-name w-full p-1 border rounded"></td>
                    <td><input type="text" value="${train.route}" class="perka-input perka-route w-full p-1 border rounded"></td>
                    <td><input type="time" value="${isLangsung ? '' : train.arrival_time}" class="perka-input perka-arrival w-full p-1 border rounded" ${isLangsung ? 'disabled' : ''}></td>
                    <td><input type="time" value="${train.departure_time}" class="perka-input perka-departure w-full p-1 border rounded"></td>
                    <td><input type="text" value="${train.track}" class="perka-input perka-track w-16 text-center p-1 border rounded"></td>
                    <td>
                        <select class="perka-input perka-status w-full p-1 border rounded" onchange="handlePerkaStatusChange(this)">
                            <option value="Berhenti" ${!isLangsung ? 'selected' : ''}>Berhenti</option>
                            <option value="Langsung" ${isLangsung ? 'selected' : ''}>Langsung</option>
                        </select>
                    </td>
                    <td class="text-center"><button class="text-red-500 hover:text-red-700 font-semibold" onclick="deleteTrain(${train.id})">Hapus</button></td>
                `;
            } else {
                let statusClass = '';

                if (train.status === 'Berhenti') {
                    statusClass = 'status-scheduled font-semibold';
                } else if (train.status === 'Langsung') {
                    statusClass = 'status-arrived font-semibold';
                } else {
                    statusClass = 'font-semibold';
                }

                row.innerHTML = `
                    <td>${train.number}</td>
                    <td>${train.name}</td>
                    <td>${train.route}</td>
                    <td>${train.status === 'Langsung' ? '-' : train.arrival_time}</td>
                    <td>${train.departure_time}</td>
                    <td>Jalur ${train.track}</td>
                    <td class="${statusClass}">${train.status || 'Berhenti'}</td>
                `;
            }
            tableBody.appendChild(row);
        });
    }
}

function togglePerkaEditMode(isEditing) {
    const editBtn = document.getElementById('perka-edit-btn');
    const saveBtn = document.getElementById('perka-save-btn');
    const cancelBtn = document.getElementById('perka-cancel-btn');
    const addRowContainer = document.getElementById('add-perka-row-container');
    const opsiHeader = document.getElementById('perka-opsi-header');

    if (isEditing) {
        editBtn.classList.add('hidden');
        saveBtn.classList.remove('hidden');
        cancelBtn.classList.remove('hidden');
        addRowContainer.classList.remove('hidden');
        opsiHeader.classList.remove('hidden');
    } else {
        editBtn.classList.remove('hidden');
        saveBtn.classList.add('hidden');
        cancelBtn.classList.add('hidden');
        addRowContainer.classList.add('hidden');
        opsiHeader.classList.add('hidden');
    }

    renderPerkaTable(isEditing);
}

function savePerkaChanges() {
    const tableRows = document.querySelectorAll("#train-table-body tr");
    const newTrainData = [];
    let parsingSuccess = true;
    let errorMessage = "";

    try {
        tableRows.forEach((row) => {
            const numberInput = row.querySelector('.perka-number');
            const nameInput = row.querySelector('.perka-name');
            const routeInput = row.querySelector('.perka-route');
            const arrivalInput = row.querySelector('.perka-arrival');
            const departureInput = row.querySelector('.perka-departure');
            const trackInput = row.querySelector('.perka-track');
            const statusSelect = row.querySelector('.perka-status');

            const trainId = row.dataset.id ? parseInt(row.dataset.id) : null;
            const newTrain = {
                id: trainId,
                number: numberInput.value,
                name: nameInput.value,
                route: routeInput.value,
                arrival_time: arrivalInput.value,
                departure_time: departureInput.value,
                track: trackInput.value,
                status: statusSelect.value
            }

            if (trainId) {
                const trainIndex = trainData.findIndex(t => t.id === trainId);
                if (trainIndex !== -1) {
                    const oldTrain = trainData[trainIndex];
                    const hasChanges = oldTrain.number !== newTrain.number ||
                        oldTrain.name !== newTrain.name ||
                        oldTrain.route !== newTrain.route ||
                        oldTrain.arrival_time !== newTrain.arrival_time ||
                        oldTrain.departure_time !== newTrain.departure_time ||
                        oldTrain.track !== newTrain.track ||
                        oldTrain.status !== newTrain.status;

                    if (hasChanges) {
                        newTrainData.push(newTrain);
                    }
                }
            } else {
                if (numberInput.value && nameInput.value && arrivalInput.value && departureInput.value) {
                    newTrainData.push(newTrain);
                }
            }
        });
    } catch (error) {
        console.error("Error saat memproses tabel perka:", error);
        errorMessage = error.message || "Terjadi kesalahan saat memvalidasi data.";
        parsingSuccess = false;
    }

    if (!parsingSuccess) {
        showMessage(errorMessage);
        return;
    }

    if (newTrainData.length > 0) {
        saveTrains(newTrainData);
    } else {
        togglePerkaEditMode(false);
        hideLoading();
    }
}

function addPerkaRow() {
    const tableBody = document.getElementById('train-table-body');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><input type="text" placeholder="No. KA" class="perka-input perka-number w-20 p-1 border rounded"></td>
        <td><input type="text" placeholder="Nama KA" class="perka-input perka-name w-full p-1 border rounded"></td>
        <td><input type="text" placeholder="Rute" class="perka-input perka-route w-full p-1 border rounded"></td>
        <td><input type="time" class="perka-input perka-arrival w-full p-1 border rounded"></td>
        <td><input type="time" class="perka-input perka-departure w-full p-1 border rounded"></td>
        <td><input type="text" placeholder="Jalur" class="perka-input perka-track w-16 text-center p-1 border rounded"></td>
        <td>
            <select class="perka-input perka-status w-full p-1 border rounded" onchange="handlePerkaStatusChange(this)">
                <option value="Berhenti" selected>Berhenti</option>
                <option value="Langsung">Langsung</option>
            </select>
        </td>
        <td class="text-center"><button class="text-red-500 hover:text-red-700 font-semibold" onclick="this.closest('tr').remove()">Hapus</button></td>
    `;
    tableBody.appendChild(newRow);
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

// --- End of Train functions ---

// --- Start of Emplasemen functions ---

function saveEmplasemenChanges() {
    const fileInput = document.getElementById('emplasemen-upload');

    if (fileInput.files && fileInput.files[0]) {
        const formData = new FormData();
        formData.append('_token', token);
        formData.append('file', fileInput.files[0]); // ⬅️ kirim file asli

        $.ajax({
            url: "/station/emplasemen-update",
            type: "POST",
            data: formData,
            processData: false, // wajib
            contentType: false, // wajib
            success: function (response) {
                location.reload(); // biar update tampil
            },
            error: function (error) {
                console.log(error);
                showMessage('Gagal menyimpan data', 'error');
            }
        });
    } else {
        toggleEmplasemenEditMode(false);
    }
}

function toggleEmplasemenEditMode(isEditing) {
    const editBtn = document.getElementById('emplasemen-edit-btn');
    const saveBtn = document.getElementById('emplasemen-save-btn');
    const cancelBtn = document.getElementById('emplasemen-cancel-btn');
    const uploadInput = document.getElementById('emplasemen-upload');
    const image = document.getElementById('emplasemen-image');
    const preview = document.getElementById('emplasemen-image-preview');
    const viewMode = document.getElementById('emplasemen-view-mode');
    const editMode = document.getElementById('emplasemen-edit-mode');

    if (isEditing) {
        editBtn.classList.add('hidden');
        saveBtn.classList.remove('hidden');
        cancelBtn.classList.remove('hidden');
        viewMode.classList.add('hidden');
        editMode.classList.remove('hidden');
    } else {
        editBtn.classList.remove('hidden');
        saveBtn.classList.add('hidden');
        cancelBtn.classList.add('hidden');
        viewMode.classList.remove('hidden');
        editMode.classList.add('hidden');
        preview.src = image.src;
        uploadInput.value = '';
    }
}

// --- End of Emplasemen functions ---

// --- Start of Jalur functions ---

function loadTracks() {
    const tableBody = document.getElementById("jalur-table-body");
    if (tableBody) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="9" class="px-6 py-4">
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
        url: "/track/get",
        type: "GET",
        success: function (response) {
            trackData = response;
            renderJalurTable();
        },
        error: function (error) {
            showMessage('Gagal memuat data', 'error');

            if (tableBody) {
                tableBody.innerHTML = `
                    <tr>
                        <td colspan="9" class="px-6 py-4 text-center text-sm text-red-500">
                            Gagal memuat data
                        </td>
                    </tr>
                `;
            }
        },
    });
}

function saveTracks(tracks) {
    $.ajax({
        url: "/track/save",
        type: "POST",
        data: { _token: token, tracks },
        success: function (response) {
            loadTracks();
            toggleJalurEditMode(false);
        },
        error: function (error) {
            showMessage('Gagal menyimpan data', 'error');
        },
    });
}

function deleteTrack(id) {
    if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) return;

    $.ajax({
        url: "/track/delete",
        type: "POST",
        data: { _token: token, id },
        success: function (response) {
            trackData = trackData.filter((item) => item.id !== id);
            renderJalurTable(true);
        },
        error: function (error) {
            showMessage('Gagal menghapus data', 'error');
        },
    });
}

function renderJalurTable(isEditing = false) {
    const tableBody = document.getElementById('jalur-table-body');
    const opsiHeader = document.getElementById('jalur-opsi-header');

    if (!tableBody || !opsiHeader) return;

    tableBody.innerHTML = '';

    if (isEditing) {
        opsiHeader.classList.remove('hidden');
    } else {
        opsiHeader.classList.add('hidden');
    }

    if (trackData.length === 0 && !isEditing) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td colspan="9" class="px-6 py-4 text-center text-sm text-gray-500">
                Data tidak ditemukan
            </td>
        `;
        tableBody.appendChild(row);
    } else {
        trackData.forEach(item => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', item.id);

            if (isEditing) {
                row.innerHTML = `
                    <td><input type="text" value="${item.track}" class="w-full p-1 border rounded text-center"></td>
                    <td><input type="text" value="${item.max_length}" class="w-full p-1 border rounded"></td>
                    <td><input type="text" value="${item.effective_length}" class="w-full p-1 border rounded"></td>
                    <td><input type="text" value="${item.train ?? '-'}" class="w-full p-1 border rounded"></td>
                    <td><input type="text" value="${item.GB ?? '-'}" class="w-full p-1 border rounded text-center"></td>
                    <td><input type="text" value="${item.GD ?? '-'}" class="w-full p-1 border rounded text-center"></td>
                    <td><input type="text" value="${item.GT ?? '-'}" class="w-full p-1 border rounded text-center"></td>
                    <td><input type="text" value="${item.GK ?? '-'}" class="w-full p-1 border rounded text-center"></td>
                    <td><input type="text" value="${item.remarks ?? '-'}" class="w-full p-1 border rounded"></td>
                    <td class="text-center"><button class="text-red-500 hover:text-red-700 font-semibold" onclick="deleteTrack(${item.id})">Hapus</button></td>
                `;
            } else {
                row.innerHTML = `
                    <td class="text-center">${item.track}</td>
                    <td>${item.max_length}</td>
                    <td>${item.effective_length}</td>
                    <td class="text-center">${item.train ?? '-'}</td>
                    <td class="text-center">${item.GB ?? '-'}</td>
                    <td class="text-center">${item.GD ?? '-'}</td>
                    <td class="text-center">${item.GT ?? '-'}</td>
                    <td class="text-center">${item.GK ?? '-'}</td>
                    <td>${item.remarks ?? '-'}</td>
                `;
            }
            tableBody.appendChild(row);
        });
    }
}

function toggleJalurEditMode(isEditing) {
    document.getElementById('jalur-edit-btn').classList.toggle('hidden', isEditing);
    document.getElementById('jalur-save-btn').classList.toggle('hidden', !isEditing);
    document.getElementById('jalur-cancel-btn').classList.toggle('hidden', !isEditing);
    document.getElementById('add-jalur-row-container').classList.toggle('hidden', !isEditing);
    document.getElementById('mulai-berlaku-text').classList.toggle('hidden', isEditing);
    document.getElementById('mulai-berlaku-date').classList.toggle('hidden', !isEditing);

    renderJalurTable(isEditing);
}

function saveJalurChanges() {
    const tableRows = document.querySelectorAll('#jalur-table-body tr');
    const newTrackData = [];

    tableRows.forEach(row => {
        const inputs = row.querySelectorAll('input');
        const trackId = row.dataset.id ? parseInt(row.dataset.id, 10) : null;
        const data = {
            id: trackId,
            track: inputs[0].value,
            max_length: inputs[1].value,
            effective_length: inputs[2].value,
            train: inputs[3].value,
            GB: inputs[4].value,
            GD: inputs[5].value,
            GT: inputs[6].value,
            GK: inputs[7].value,
            remarks: inputs[8].value
        };

        if (trackId) {
            const trackIndex = trackData.findIndex(t => t.id === trackId);
            if (trackIndex !== -1) {
                const oldTrack = trackData[trackIndex];
                const hasChanges = oldTrack.track !== data.track ||
                    oldTrack.max_length !== data.max_length ||
                    oldTrack.effective_length !== data.effective_length ||
                    oldTrack.train !== data.train ||
                    oldTrack.GB !== data.GB ||
                    oldTrack.GD !== data.GD ||
                    oldTrack.GT !== data.GT ||
                    oldTrack.GK !== data.GK ||
                    oldTrack.remarks !== data.remarks;

                if (hasChanges) {
                    newTrackData.push(data);
                }
            }
        } else {
            if (data.track && data.max_length && data.effective_length) {
                newTrackData.push(data);
            }
        }
    });

    saveTrackValidity();

    if (newTrackData.length > 0) {
        saveTracks(newTrackData);
    } else {
        toggleJalurEditMode(false);
    }
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

function renderTrackValidity(trackValidity = false) {
    const dateText = document.getElementById('mulai-berlaku-text');
    const dateInput = document.getElementById('mulai-berlaku-date');

    if (trackValidity) {
        dateInput.value = trackValidity;
    }

    if (dateInput.value) {
        const date = new Date(dateInput.value);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        dateText.value = date.toLocaleDateString('id-ID', options);
    }
}

function saveTrackValidity() {
    const dateText = document.getElementById('mulai-berlaku-text');
    const dateInput = document.getElementById('mulai-berlaku-date');
    let oldTrackValidity = dateText.value;

    if (dateText.value) {
        const [day, monthText, year] = dateText.value.split(' ');

        const bulan = {
            Januari: '01',
            Februari: '02',
            Maret: '03',
            April: '04',
            Mei: '05',
            Juni: '06',
            Juli: '07',
            Agustus: '08',
            September: '09',
            Oktober: '10',
            November: '11',
            Desember: '12'
        };

        const month = bulan[monthText];
        const formattedDate = `${year}-${month}-${day.padStart(2, '0')}`;

        if (formattedDate) {
            oldTrackValidity = formattedDate;
        }
    }

    if (oldTrackValidity !== dateInput.value) {
        $.ajax({
            url: "/track/validity",
            type: "POST",
            data: { _token: token, validity: dateInput.value },
            success: function (response) {
                renderTrackValidity(dateInput.value);
            },
            error: function (error) {
                showMessage('Gagal menyimpan data', 'error');
            },
        });
    }
}

// --- End of Jalur functions ---

// --- Start of Jalur Dilalui functions ---

function loadJalurDilalui() {
    const tableBody = document.getElementById("jalur-dilalui-table-body");

    if (tableBody) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="px-6 py-4">
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
        url: "/passed-tracks/get",
        type: "GET",
        success: function (response) {
            jalurDilaluiData = response;
            renderJalurDilaluiTable();
        },
        error: function (error) {
            showMessage('Gagal memuat data', 'error');

            if (tableBody) {
                tableBody.innerHTML = `
                    <tr>
                        <td colspan="6" class="px-6 py-4 text-center text-sm text-red-500">
                            Gagal memuat data
                        </td>
                    </tr>
                `;
            }
        },
    });
}

function saveJalurDilalui(trainTracks) {
    $.ajax({
        url: "/passed-tracks/save",
        type: "POST",
        data: { _token: token, trainTracks },
        success: function (response) {
            loadJalurDilalui();
            loadTrains();
            toggleJalurDilaluiEditMode(false);
        },
        error: function (error) {
            showMessage('Gagal menyimpan data', 'error');
        },
    });
}

function deleteJalurDilalui(id) {
    if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) return;

    $.ajax({
        url: "/passed-tracks/delete",
        type: "POST",
        data: { _token: token, id },
        success: function (response) {
            jalurDilaluiData = jalurDilaluiData.filter((item) => item.id !== id);
            renderJalurDilaluiTable(true);
        },
        error: function (error) {
            showMessage('Gagal menghapus data', 'error');
        },
    });
}

function renderJalurDilaluiTable(isEditing = false) {
    const tableBody = document.getElementById('jalur-dilalui-table-body');
    const opsiHeader = document.getElementById('jalur-dilalui-opsi-header');
    if (!tableBody || !opsiHeader) return;

    tableBody.innerHTML = '';

    if (isEditing) {
        opsiHeader.classList.remove('hidden');
    } else {
        opsiHeader.classList.add('hidden');
    }

    if (jalurDilaluiData.length === 0 && !isEditing) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500">
                Data tidak ditemukan
            </td>
        `;
        tableBody.appendChild(row);
    } else {
        jalurDilaluiData.forEach(item => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', item.id);
            row.className = 'border-b border-gray-200 hover:bg-gray-50';

            if (isEditing) {
                row.innerHTML = `
                    <td class="px-6 py-4 text-center text-sm text-gray-900">
                        <select class="jalur-dilalui-input jalur-jalur w-full p-2 border border-gray-300 rounded text-sm">
                            <option value="">Pilih Jalur</option>
                            ${trackData.map(track => `<option value="${track.id}" ${item.train.track == track.track ? 'selected' : ''}>${track.track}</option>`).join('')}
                        </select>
                    </td>
                    <td class="px-6 py-4 text-center text-sm text-gray-900">
                        <select class="jalur-dilalui-input jalur-nomor-ka jalur-train-select w-full p-2 border border-gray-300 rounded text-sm">
                            <option value="">Pilih No. KA</option>
                            ${trainData.map(train => `<option value="${train.id}" data-number="${train.number}" data-arrival="${train.arrival_time}" data-departure="${train.departure_time}" data-route="${train.route}" ${item.train.number == train.number ? 'selected' : ''}>
                                ${train.number}
                            </option>`).join('')}
                        </select>
                    </td>
                    <td class="px-6 py-4 text-center text-sm text-gray-900">
                        <input type="time" value="${item.train.arrival_time }" class="jalur-dilalui-input jalur-datang w-full p-2 border border-gray-300 rounded text-sm" readonly>
                    </td>
                    <td class="px-6 py-4 text-center text-sm text-gray-900">
                        <input type="time" value="${item.train.departure_time }" class="jalur-dilalui-input jalur-berangkat w-full p-2 border border-gray-300 rounded text-sm" readonly>
                    </td>
                    <td class="px-6 py-4 text-center text-sm text-gray-900" colspan="2">
                        <input type="text" value="${item.train.route }" class="jalur-dilalui-input jalur-dari w-full p-2 border border-gray-300 rounded text-sm" placeholder="Dari - Ke" readonly>
                    </td>
                    <td class="px-6 py-4 text-center text-sm text-gray-900">
                        <button class="text-red-500 hover:text-red-700 font-semibold ml-2" onclick="deleteJalurDilalui(${item.id})">Hapus</button>
                    </td>
                `;

                // Attach event listener untuk select change
                const selectElement = row.querySelector('.jalur-train-select');
                selectElement.addEventListener('change', function() {
                    onJalurTrainSelectChange(this);
                });
            } else {
                row.innerHTML = `
                    <td class="px-6 py-4 text-center text-sm text-gray-900">${item.train.track || '-'}</td>
                    <td class="px-6 py-4 text-center text-sm text-gray-900">${item.train.number || '-'}</td>
                    <td class="px-6 py-4 text-center text-sm text-gray-900">${item.train.arrival_time || '-'}</td>
                    <td class="px-6 py-4 text-center text-sm text-gray-900">${item.train.departure_time || '-'}</td>
                    <td class="px-6 py-4 text-center text-sm text-gray-900" colspan="2">${item.train.route || '-'}</td>
                `;
            }
            tableBody.appendChild(row);
        });
    }

}

function toggleJalurDilaluiEditMode(isEditing) {
    const editBtn = document.getElementById('jalur-dilalui-edit-btn');
    const saveBtn = document.getElementById('jalur-dilalui-save-btn');
    const cancelBtn = document.getElementById('jalur-dilalui-cancel-btn');
    const addRowContainer = document.getElementById('add-jalur-dilalui-row-container');

    if (editBtn) editBtn.classList.toggle('hidden', isEditing);
    if (saveBtn) saveBtn.classList.toggle('hidden', !isEditing);
    if (cancelBtn) cancelBtn.classList.toggle('hidden', !isEditing);
    if (addRowContainer) addRowContainer.classList.toggle('hidden', !isEditing);

    renderJalurDilaluiTable(isEditing);
}

function saveJalurDilaluiChanges() {
    const tableRows = document.querySelectorAll('#jalur-dilalui-table-body tr');
    const newJalurDilaluiData = [];

    tableRows.forEach((row, index) => {
        const inputs = row.querySelectorAll('.jalur-dilalui-input');
        const trainId = row.dataset.id ? parseInt(row.dataset.id, 10) : null;
        const data = {
            id: trainId,
            track_id: inputs[0].value,
            train_id: inputs[1].value,
        };

        if (!data.track_id || !data.train_id) {
            showMessage(`Baris ${index + 1}: Data tidak lengkap`, 'error');
            return;
        }

        if (trainId) {
            const oldData = jalurDilaluiData.find(item => item.id === trainId);
            const hasChanges = oldData.track_id !== data.track_id || oldData.train_id !== data.train_id;

            if (hasChanges) {
                newJalurDilaluiData.push(data);
            }
        } else {
            newJalurDilaluiData.push(data);
        }
    });

    if (newJalurDilaluiData.length > 0) {
        saveJalurDilalui(newJalurDilaluiData);
    } else {
        toggleJalurDilaluiEditMode(false);
    }
}

function addJalurDilaluiRow() {
    const tableBody = document.getElementById('jalur-dilalui-table-body');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <select class="jalur-dilalui-input jalur-jalur w-full p-2 border border-gray-300 rounded text-sm">
                <option value="">Pilih Jalur</option>
                ${trackData.map(track => `<option value="${track.id}">${track.track}</option>`).join('')}
            </select>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <select class="jalur-dilalui-input jalur-nomor-ka jalur-train-select w-full p-2 border border-gray-300 rounded text-sm">
                <option value="">Pilih No. KA</option>
                ${trainData.map(train => `<option value="${train.id}" data-number="${train.number}" data-arrival="${train.arrival_time}" data-departure="${train.departure_time}" data-route="${train.route}">
                    ${train.number}
                </option>`).join('')}
            </select>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <input type="time" class="jalur-dilalui-input jalur-datang w-full p-2 border border-gray-300 rounded text-sm" readonly>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <input type="time" class="jalur-dilalui-input jalur-berangkat w-full p-2 border border-gray-300 rounded text-sm" readonly>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" colspan="2">
            <input type="text" class="jalur-dilalui-input jalur-dari w-full p-2 border border-gray-300 rounded text-sm" placeholder="Dari - Ke" readonly>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <button class="text-red-500 hover:text-red-700 font-semibold ml-2" onclick="this.closest('tr').remove()">Hapus</button>
        </td>
    `;

    tableBody.appendChild(newRow);

    // Attach event listener untuk select change
    const selectElement = newRow.querySelector('.jalur-train-select');
    selectElement.addEventListener('change', function() {
        onJalurTrainSelectChange(this);
    });
}

function onJalurTrainSelectChange(selectElement) {
    const row = selectElement.closest('tr');
    const selectedOption = selectElement.options[selectElement.selectedIndex];

    if (!selectedOption.value) {
        // Clear fields jika tidak ada pilihan
        row.querySelector('.jalur-datang').value = '';
        row.querySelector('.jalur-berangkat').value = '';
        row.querySelector('.jalur-dari').value = '';
        return;
    }

    // Get data dari selected option
    const arrivalTime = selectedOption.getAttribute('data-arrival');
    const departureTime = selectedOption.getAttribute('data-departure');
    const route = selectedOption.getAttribute('data-route');

    // Auto-fill fields
    row.querySelector('.jalur-datang').value = arrivalTime || '';
    row.querySelector('.jalur-berangkat').value = departureTime || '';
    row.querySelector('.jalur-dari').value = route || '';
}

// --- End of Jalur Dilalui functions ---

// -- Start of Timeline functions ---
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
        if (!train.departure_time || train.departure_time === '-' || !train.departure_time.includes(':')) return;

        const departureTime = train.departure_time.split(':');
        const departureMinutes = parseInt(departureTime[0]) * 60 + parseInt(departureTime[1]);

        const position = departureMinutes;

        const trainEl = document.createElement('div');
        trainEl.className = `timeline-train ${train.status}`;
        trainEl.style.left = `${(position / 1440) * 100}%`;
        trainEl.title = `${train.name} (${train.number}) - Datang: ${train.arrival_time}, Berangkat: ${train.departure_time}`;

        trainEl.innerHTML = `
                    <span class="train-number">${train.number}</span>
                    <span class="train-time">${train.departure_time}</span>
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
        if (train.arrival_time && train.arrival_time !== '-' && train.arrival_time.includes(':')) {
            const arrivalTime = train.arrival_time.split(':');
            arrivalMinutes = parseInt(arrivalTime[0]) * 60 + parseInt(arrivalTime[1]);
        }

        let departureMinutes = -1;
        if (train.departure_time && train.departure_time !== '-' && train.departure_time.includes(':')) {
            const departureTime = train.departure_time.split(':');
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



// -- End of Timeline functions ---

$(document).ready(function() {
    loadTrains();
    loadTracks();
    loadJalurDilalui();
    renderTrackValidity();

    generateTimelineMarkers();
});

const searchInput = document.getElementById('search-train');
if (searchInput) searchInput.addEventListener('input', filterTrains);

const perkaEditBtn = document.getElementById('perka-edit-btn');
const perkaSaveBtn = document.getElementById('perka-save-btn');
const perkaCancelBtn = document.getElementById('perka-cancel-btn');
const addPerkaRowBtn = document.getElementById('add-perka-row-btn');

if (perkaEditBtn) perkaEditBtn.addEventListener('click', () => togglePerkaEditMode(true));
if (perkaSaveBtn) perkaSaveBtn.addEventListener('click', savePerkaChanges);
if (perkaCancelBtn) perkaCancelBtn.addEventListener('click', () => togglePerkaEditMode(false));
if (addPerkaRowBtn) addPerkaRowBtn.addEventListener('click', addPerkaRow);

const emplasemenEditBtn = document.getElementById('emplasemen-edit-btn');
const emplasemenSaveBtn = document.getElementById('emplasemen-save-btn');
const emplasemenCancelBtn = document.getElementById('emplasemen-cancel-btn');

if (emplasemenEditBtn) emplasemenEditBtn.addEventListener('click', () => toggleEmplasemenEditMode(true));
if (emplasemenSaveBtn) emplasemenSaveBtn.addEventListener('click', saveEmplasemenChanges);
if (emplasemenCancelBtn) emplasemenCancelBtn.addEventListener('click', () => toggleEmplasemenEditMode(false));

const fileInput = document.getElementById('emplasemen-upload');
const preview = document.getElementById('emplasemen-image-preview');

document.getElementById('emplasemen-upload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const container = document.getElementById('emplasemen-preview-container');

    if (!file) return;

    const fileType = file.type;

    if (fileType.includes('image')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            container.innerHTML = `<img src="${e.target.result}" class="w-full h-auto rounded-lg mb-4 object-contain">`;
        };
        reader.readAsDataURL(file);
    } else if (fileType === 'application/pdf') {
        const fileURL = URL.createObjectURL(file);
        container.innerHTML = `<iframe src="${fileURL}" width="100%" height="400px" class="rounded-lg mb-4"></iframe>`;
    }
});

const jalurEditBtn = document.getElementById('jalur-edit-btn');
const jalurSaveBtn = document.getElementById('jalur-save-btn');
const jalurCancelBtn = document.getElementById('jalur-cancel-btn');
const addJalurRowBtn = document.getElementById('add-jalur-row-btn');

if (jalurEditBtn) jalurEditBtn.addEventListener('click', () => toggleJalurEditMode(true));
if (jalurSaveBtn) jalurSaveBtn.addEventListener('click', saveJalurChanges);
if (jalurCancelBtn) jalurCancelBtn.addEventListener('click', () => toggleJalurEditMode(false));
if (addJalurRowBtn) addJalurRowBtn.addEventListener('click', addJalurRow);

const jalurDilaluiEditBtn = document.getElementById('jalur-dilalui-edit-btn');
const jalurDilaluiSaveBtn = document.getElementById('jalur-dilalui-save-btn');
const jalurDilaluiCancelBtn = document.getElementById('jalur-dilalui-cancel-btn');
const addJalurDilaluiRowBtn = document.getElementById('add-jalur-dilalui-row-btn');

if (jalurDilaluiEditBtn) jalurDilaluiEditBtn.addEventListener('click', () => toggleJalurDilaluiEditMode(true));
if (jalurDilaluiSaveBtn) jalurDilaluiSaveBtn.addEventListener('click', saveJalurDilaluiChanges);
if (jalurDilaluiCancelBtn) jalurDilaluiCancelBtn.addEventListener('click', () => toggleJalurDilaluiEditMode(false));
if (addJalurDilaluiRowBtn) addJalurDilaluiRowBtn.addEventListener('click', addJalurDilaluiRow);

timelineInterval = setInterval(updateCurrentTimeLine, 1000);
trainUpdateInterval = setInterval(() => {
    updateTrainStatus();
}, 60000);
