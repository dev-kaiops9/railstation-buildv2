let trainData = [];

function loadTrains() {
    $.ajax({
        url: "/train/get",
        type: "GET",
        success: function (response) {
            trainData = response;
            updateTrainStatus();
            generateTimelineTrains();
        },
        error: function (error) {
            showMessage('Gagal memuat data Kereta Api', 'error');
        },
    });
}

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

setInterval(function () {
    location.reload();
}, 60000);

// -- End of Timeline functions ---

$(document).ready(function() {
    loadTrains();

    generateTimelineMarkers();
});

timelineInterval = setInterval(updateCurrentTimeLine, 1000);
trainUpdateInterval = setInterval(() => {
    updateTrainStatus();
    generateTimelineTrains();
}, 60000);

