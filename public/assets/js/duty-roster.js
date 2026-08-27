class DutyRosterManager {
    constructor() {
        this.currentYear = new Date().getFullYear();
        this.currentMonth = new Date().getMonth() + 1;
        this.dutyRoster = null;
        this.employees = [];
        this.dutyShifts = [];
        this.isEditMode = false;
        this.daysInMonth = 31;
        this.currentPage = 1;
        this.perPage = 10;
        this.totalPages = 1;

        this.init();
    }

    init() {
        this.loadDutyShifts();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Month/Year navigation
        $(document).on('click', '#duty-roster-prev-month', () => this.navigateMonth(-1));
        $(document).on('click', '#duty-roster-next-month', () => this.navigateMonth(1));
        $(document).on('change', '#duty-roster-month-select', (e) => this.changeMonth(e.target.value));
        $(document).on('change', '#duty-roster-year-select', (e) => this.changeYear(e.target.value));

        // Edit mode toggle
        $(document).on('click', '#duty-roster-edit-btn', () => this.toggleEditMode(true));
        $(document).on('click', '#duty-roster-save-btn', () => this.saveDutyRoster());
        $(document).on('click', '#duty-roster-cancel-btn', () => this.toggleEditMode(false));

        // Bulk operations
        $(document).on('click', '#duty-roster-copy-prev-btn', () => this.copyFromPreviousMonth());
        $(document).on('click', '#duty-roster-clear-all-btn', () => this.clearAllAssignments());

        // Delete employee assignment
        $(document).on('click', '.delete-employee-assignment-btn', (e) => this.deleteEmployeeAssignment(e));

        // Cell editing
        $(document).on('click', '.duty-cell', (e) => this.handleCellClick(e));
        $(document).on('change', '.duty-cell-input', (e) => this.handleCellChange(e));
        $(document).on('keydown', '.duty-cell-input', (e) => this.handleCellKeydown(e));
    }

    async loadDutyShifts() {
        try {
            const response = await $.get('/duty-shifts');
            this.dutyShifts = response.duty_shifts;
        } catch (error) {
            console.error('Error loading duty shifts:', error);
            showMessage('Gagal memuat data shift dinas', 'error');
        }
    }

    async loadDutyRoster(year = this.currentYear, month = this.currentMonth, page = 1) {
        try {
            this.showLoading(true);

            const response = await $.get('/duty-roster/monthly', {
                year: year,
                month: month,
                page: page,
                per_page: this.perPage
            });

            if (response.success) {
                this.dutyRoster = response.duty_roster;
                this.employees = response.employees;
                this.dutyShifts = response.duty_shifts;
                this.daysInMonth = response.days_in_month;
                this.currentYear = year;
                this.currentMonth = month;

                this.renderDutyRoster();
                this.renderPagination(response.pagination);
            } else {
                // Create new roster if doesn't exist
                await this.createDutyRoster(year, month);
            }
        } catch (error) {
            console.error('Error loading duty roster:', error);
            showMessage('Gagal memuat daftar dinasan', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    async createDutyRoster(year, month) {
        try {
            const response = await $.post('/duty-roster', {
                year: year,
                month: month,
                _token: $('meta[name="csrf-token"]').attr('content')
            });

            if (response.success) {
                await this.loadDutyRoster(year, month);
            }
        } catch (error) {
            console.error('Error creating duty roster:', error);
            showMessage('Gagal membuat daftar dinasan baru', 'error');
        }
    }

    renderDutyRoster() {
        const container = $('#duty-roster-container');
        const filter = $('#duty-roster-filter');
        const actionButtons = $('#duty-roster-action-buttons');

        if (!container.length) return;

        const monthNames = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];

        const filterHtml = `
            <div class="flex items-center space-x-2">
                <button id="duty-roster-prev-month" class="p-2 text-gray-600 hover:text-blue-600">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <select id="duty-roster-month-select" class="px-3 py-1 border rounded">
                    ${monthNames.map((name, index) =>
                        `<option value="${index + 1}" ${this.currentMonth === index + 1 ? 'selected' : ''}>${name}</option>`
                    ).join('')}
                </select>
                <select id="duty-roster-year-select" class="px-3 py-1 border rounded">
                    ${Array.from({length: 11}, (_, i) => this.currentYear - 5 + i).map(year =>
                        `<option value="${year}" ${this.currentYear === year ? 'selected' : ''}>${year}</option>`
                    ).join('')}
                </select>
                <button id="duty-roster-next-month" class="p-2 text-gray-600 hover:text-blue-600">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        `;

        const html = `
            <div class="overflow-x-auto border border-gray-300 rounded-lg">
                <table class="min-w-full border-collapse border border-gray-300">
                    <thead class="sticky top-0 z-20 bg-blue-600">
                        <tr class="bg-blue-600 text-white">
                            <th class="border border-gray-300 px-3 py-2 text-left bg-blue-600 sticky left-0 z-30 text-sm min-w-[150px]">Nama</th>
                            <th class="border border-gray-300 px-3 py-2 text-left z-30 text-sm ">NIPP</th>
                            <th class="border border-gray-300 px-3 py-2 text-left z-30 text-sm">Jabatan</th>
                            ${Array.from({length: this.daysInMonth}, (_, i) =>
                                `<th class="border border-gray-300 px-2 py-2 text-center min-w-[40px] text-sm">${i + 1}</th>`
                            ).join('')}
                            ${this.isEditMode ? '<th class="border border-gray-300 px-3 py-2 text-left z-30 text-sm">Opsi</th>' : ''}
                        </tr>
                    </thead>
                    <tbody id="duty-roster-tbody">
                        ${this.renderEmployeeRows()}
                    </tbody>
                </table>
            </div>

            <!-- Pagination Info -->
            <div id="duty-roster-pagination" class="mt-4"></div>

            <div class="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 class="font-semibold mb-2">Keterangan Shift:</h4>
                <div class="flex flex-col gap-2">
                    ${this.dutyShifts.map(shift => `
                        <div class="flex items-center space-x-2">
                            <span class="w-6 h-6 rounded text-white text-xs flex items-center justify-center font-bold"
                                    style="background-color: ${shift.color}">${shift.code}</span>
                            <span class="text-sm">${shift.name} (${shift.start_time} - ${shift.end_time})</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        filter.html(filterHtml);
        actionButtons.html(this.renderActionButtons());
        container.html(html);
    }

    renderActionButtons() {
        if (this.isEditMode) {
            return `
                <button id="duty-roster-save-btn" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-300 hover:bg-green-600">
                    Simpan
                </button>
                <button id="duty-roster-cancel-btn" class="bg-gray-500 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-300 hover:bg-gray-600">
                    Batal
                </button>
                <button id="duty-roster-copy-prev-btn" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-300 hover:bg-blue-600">
                    Salin Bulan Lalu
                </button>
                <button id="duty-roster-clear-all-btn" class="bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-300 hover:bg-red-600">
                    Clear All
                </button>
            `;
        } else {
            return `
                <button id="duty-roster-edit-btn" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">
                    Edit Data
                </button>
            `;
        }
    }

    renderEmployeeRows() {
        if (this.employees.length === 0) {
            return `
                <tr>
                    <td colspan="${3 + this.daysInMonth + (this.isEditMode ? 1 : 0)}" class="border border-gray-300 px-3 py-4 text-center text-gray-500">
                        Data tidak ditemukan
                    </td>
                </tr>
            `;
        }

        return this.employees.map(employeeData => {
            const employee = employeeData.employee;
            const schedule = employeeData.schedule;

            return `
                <tr data-employee-id="${employee.id}">
                    <td class="border border-gray-300 px-3 py-2 sticky left-0 bg-white z-10 text-sm">
                        ${employee.name}
                    </td>
                    <td class="border border-gray-300 px-3 py-2 text-gray-600 text-sm">${employee.nipp}</td>
                    <td class="border border-gray-300 px-3 py-2 text-gray-600 text-sm">${employee.position}</td>
                    ${Array.from({length: this.daysInMonth}, (_, i) => {
                        const day = i + 1;
                        const daySchedule = schedule[day] || {};
                        const shiftCode = daySchedule.shift_code || '';
                        const shiftColor = daySchedule.shift_color || '#6B7280';

                        return `
                            <td class="border border-gray-300 p-1 text-center text-sm">
                                ${this.renderDutyCell(employee.id, day, shiftCode, shiftColor)}
                            </td>
                        `;
                    }).join('')}
                    ${this.isEditMode ? `<td class="border border-gray-300 px-3 py-2 text-center text-sm"><button class="delete-employee-assignment-btn text-red-500 hover:text-red-700 font-semibold" data-employee-id="${employee.id}">Clear</button></td>` : ''}
                </tr>
            `;
        }).join('');
    }

    renderDutyCell(employeeId, day, shiftCode, shiftColor) {
        if (this.isEditMode) {
            return `
                <input type="text"
                       class="duty-cell-input w-full h-8 text-center border-0 focus:ring-1 focus:ring-blue-500 rounded text-white font-bold text-xs"
                       style="background-color: ${shiftCode ? shiftColor : '#f3f4f6'}; color: ${shiftCode ? 'white' : '#6b7280'}"
                       data-employee-id="${employeeId}"
                       data-day="${day}"
                       value="${shiftCode}"
                       maxlength="2">
            `;
        } else {
            return `
                <div class="duty-cell w-8 h-8 flex items-center justify-center rounded text-white font-bold text-xs cursor-pointer"
                     style="background-color: ${shiftCode ? shiftColor : '#f3f4f6'}; color: ${shiftCode ? 'white' : '#6b7280'}"
                     data-employee-id="${employeeId}"
                     data-day="${day}">
                    ${shiftCode}
                </div>
            `;
        }
    }

    renderPagination(paginationData) {
        const container = $('#duty-roster-pagination');
        if (!container.length) return;

        if (paginationData.total > 0 && paginationData.last_page > 1) {
            let html = `
                <div class="flex items-center justify-between">
                    <div class="flex-1 flex justify-between sm:hidden">
                        <!-- Mobile pagination -->
                        <button id="duty-prev-mobile" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                            Previous
                        </button>
                        <button id="duty-next-mobile" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                            Next
                        </button>
                    </div>
                    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p class="text-sm text-gray-700">
                                Showing <span id="duty-pagination-from" class="font-medium">${paginationData.from || 0}</span> to <span id="duty-pagination-to" class="font-medium">${paginationData.to || 0}</span> of <span id="duty-pagination-total" class="font-medium">${paginationData.total}</span> results
                            </p>
                        </div>
                        <div>
                            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <button id="duty-prev-desktop" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                    <span class="sr-only">Previous</span>
                                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                                <div id="duty-pagination-numbers" class="flex">
                                    <!-- Page numbers will be inserted here -->
                                </div>
                                <button id="duty-next-desktop" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                    <span class="sr-only">Next</span>
                                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            `;

            container.html(html);
            this.updateDutyNavigationButtons(paginationData);
        } else {
            container.html('');
        }
    }

    updateDutyNavigationButtons(paginationData) {
        const prevMobile = document.getElementById('duty-prev-mobile');
        const nextMobile = document.getElementById('duty-next-mobile');
        const prevDesktop = document.getElementById('duty-prev-desktop');
        const nextDesktop = document.getElementById('duty-next-desktop');
        const paginationNumbers = document.getElementById('duty-pagination-numbers');

        // Update mobile buttons
        if (prevMobile) prevMobile.disabled = !paginationData.prev_page_url;
        if (nextMobile) nextMobile.disabled = !paginationData.next_page_url;

        // Update desktop buttons
        if (prevDesktop) prevDesktop.disabled = !paginationData.prev_page_url;
        if (nextDesktop) nextDesktop.disabled = !paginationData.next_page_url;

        // Generate page number buttons
        if (paginationNumbers) {
            paginationNumbers.innerHTML = '';
            paginationData.links.forEach(link => {
                if (link.label !== '&laquo; Previous' && link.label !== 'Next &raquo;') {
                    const pageButton = document.createElement('button');
                    pageButton.className = `relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        link.active
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`;
                    pageButton.innerHTML = link.label;
                    pageButton.disabled = !link.url;

                    if (link.url) {
                        pageButton.onclick = () => {
                            this.loadDutyRoster(this.currentYear, this.currentMonth, link.page);
                        };
                    }

                    paginationNumbers.appendChild(pageButton);
                }
            });
        }

        // Add event listeners for navigation buttons
        if (prevMobile) {
            prevMobile.onclick = () => {
                if (paginationData.prev_page_url) {
                    this.loadDutyRoster(this.currentYear, this.currentMonth, paginationData.current_page - 1);
                }
            };
        }

        if (nextMobile) {
            nextMobile.onclick = () => {
                if (paginationData.next_page_url) {
                    this.loadDutyRoster(this.currentYear, this.currentMonth, paginationData.current_page + 1);
                }
            };
        }

        if (prevDesktop) {
            prevDesktop.onclick = () => {
                if (paginationData.prev_page_url) {
                    this.loadDutyRoster(this.currentYear, this.currentMonth, paginationData.current_page - 1);
                }
            };
        }

        if (nextDesktop) {
            nextDesktop.onclick = () => {
                if (paginationData.next_page_url) {
                    this.loadDutyRoster(this.currentYear, this.currentMonth, paginationData.current_page + 1);
                }
            };
        }
    }

    navigateMonth(direction) {
        let newMonth = this.currentMonth + direction;
        let newYear = this.currentYear;

        if (newMonth > 12) {
            newMonth = 1;
            newYear++;
        } else if (newMonth < 1) {
            newMonth = 12;
            newYear--;
        }

        this.loadDutyRoster(newYear, newMonth);
    }

    changeMonth(month) {
        this.loadDutyRoster(this.currentYear, parseInt(month));
    }

    changeYear(year) {
        this.loadDutyRoster(parseInt(year), this.currentMonth);
    }

    toggleEditMode(enable) {
        this.isEditMode = enable;

        // reset pagination
        this.currentPage = 1;

        // reload data supaya tidak hilang
        this.loadDutyRoster(this.currentYear, this.currentMonth);
    }

    handleCellClick(e) {
        if (!this.isEditMode) return;

        const input = $(e.target);
        if (input.hasClass('duty-cell-input')) {
            input.select();
        }
    }

    handleCellChange(e) {
        const input = $(e.target);
        const value = input.val().toUpperCase();

        // Validate shift code
        const validShift = this.dutyShifts.find(shift => shift.code === value);

        if (value && !validShift) {
            showMessage(`Kode shift "${value}" tidak valid`, 'warning');
            input.focus();
            return;
        }

        // Update cell appearance
        if (validShift) {
            input.css({
                'background-color': validShift.color,
                'color': 'white'
            });
        } else {
            input.css({
                'background-color': '#f3f4f6',
                'color': '#6b7280'
            });
        }

        input.val(value);
    }

    handleCellKeydown(e) {
        const input = $(e.target);

        // Navigate with arrow keys
        if (e.key === 'ArrowRight' || e.key === 'Tab') {
            e.preventDefault();
            this.navigateToNextCell(input, 1);
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            this.navigateToNextCell(input, -1);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.navigateToNextRow(input, 1);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.navigateToNextRow(input, -1);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            this.navigateToNextRow(input, 1);
        }
    }

    navigateToNextCell(currentInput, direction) {
        const currentDay = parseInt(currentInput.data('day'));
        const employeeId = currentInput.data('employee-id');
        const newDay = currentDay + direction;

        if (newDay >= 1 && newDay <= this.daysInMonth) {
            const nextInput = $(`.duty-cell-input[data-employee-id="${employeeId}"][data-day="${newDay}"]`);
            if (nextInput.length) {
                nextInput.focus().select();
            }
        }
    }

    navigateToNextRow(currentInput, direction) {
        const currentDay = parseInt(currentInput.data('day'));
        const currentEmployeeId = currentInput.data('employee-id');
        const currentRow = currentInput.closest('tr');
        const targetRow = direction > 0 ? currentRow.next('tr') : currentRow.prev('tr');

        if (targetRow.length) {
            const targetEmployeeId = targetRow.data('employee-id');
            const nextInput = $(`.duty-cell-input[data-employee-id="${targetEmployeeId}"][data-day="${currentDay}"]`);
            if (nextInput.length) {
                nextInput.focus().select();
            }
        }
    }

    async saveDutyRoster() {
        try {
            this.showLoading(true);

            const assignments = [];
            $('.duty-cell-input').each((index, element) => {
                const input = $(element);
                const employeeId = input.data('employee-id');
                const day = input.data('day');
                const shiftCode = input.val().trim().toUpperCase();

                if (shiftCode) {
                    assignments.push({
                        employee_id: employeeId,
                        day: day,
                        shift_code: shiftCode
                    });
                }
            });

            const response = await $.post('/duty-roster/bulk-assign', {
                duty_roster_id: this.dutyRoster.id,
                assignments: assignments,
                _token: $('meta[name="csrf-token"]').attr('content')
            });

            if (response.success) {
                showMessage('Daftar dinasan berhasil disimpan', 'success');
                this.toggleEditMode(false);
                await this.loadDutyRoster(this.currentYear, this.currentMonth);
            } else {
                showMessage('Gagal menyimpan daftar dinasan', 'error');
            }
        } catch (error) {
            showMessage('Gagal menyimpan daftar dinasan', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    async copyFromPreviousMonth() {
        if (!confirm('Salin jadwal dari bulan sebelumnya? Data yang ada akan ditimpa.')) {
            return;
        }

        try {
            this.showLoading(true);

            let sourceMonth = this.currentMonth - 1;
            let sourceYear = this.currentYear;

            if (sourceMonth < 1) {
                sourceMonth = 12;
                sourceYear--;
            }

            const response = await $.post('/duty-roster/copy-previous', {
                duty_roster_id: this.dutyRoster.id,
                source_year: sourceYear,
                source_month: sourceMonth,
                _token: $('meta[name="csrf-token"]').attr('content')
            });

            if (response.success) {
                showMessage('Jadwal berhasil disalin dari bulan sebelumnya', 'success');
                await this.loadDutyRoster(this.currentYear, this.currentMonth);
            }
        } catch (error) {
            console.error('Error copying from previous month:', error);
            showMessage('Gagal menyalin jadwal dari bulan sebelumnya', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    clearAllAssignments() {
        if (!confirm('Hapus semua jadwal dinas? Tindakan ini tidak dapat dibatalkan.')) {
            return;
        }

        $('.duty-cell-input').each((index, element) => {
            const input = $(element);
            input.val('').css({
                'background-color': '#f3f4f6',
                'color': '#6b7280'
            });
        });

        showMessage('Jadwal dinas bulan ini telah dibersihkan. Silakan isi kembali.', 'success');
    }

    deleteEmployeeAssignment(event) {
        const button = $(event.currentTarget);
        const employeeId = button.data('employee-id');
        const row = button.closest('tr');
        const employeeName = row.find('td:nth-child(1)').text().trim();

        if (!confirm(`Hapus semua jadwal dinas untuk ${employeeName}? Semua shift yang sudah diatur untuk pegawai ini akan dihapus.`)) {
            return;
        }

        row.find('.duty-cell-input').each((_index, element) => {
            const input = $(element);
            input.val('').css({
                'background-color': '#f3f4f6',
                'color': '#6b7280'
            });
        });

        showMessage(`Jadwal dinas untuk ${employeeName} telah dihapus.`, 'success');
    }

    showLoading(show) {
        if (show) {
            $('#duty-roster-container').append(`
                <div id="duty-roster-loading" class="inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50 my-4">
                    <div class="text-center">
                        <i class="fas fa-spinner fa-spin text-3xl text-blue-500 mb-2"></i>
                        <p class="text-gray-600">Memuat data...</p>
                    </div>
                </div>
            `);
        } else {
            $('#duty-roster-loading').remove();
        }
    }
}

// Initialize when document is ready
$(document).ready(() => {
    window.dutyRosterManager = new DutyRosterManager();

    dutyRosterManager.loadDutyRoster();
});
