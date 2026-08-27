let token = $('meta[name="csrf-token"]').attr('content');

const sidebar = document.getElementById('sidebar-menu');
const mainContent = document.getElementById('main-content');
const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');

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

const menuAdministrasiToggle = document.getElementById('menu-administrasi-toggle');
if (menuAdministrasiToggle) {
    menuAdministrasiToggle.addEventListener('click', (e) => {
        e.preventDefault();
        const submenu = document.getElementById('administrasi-submenu');
        const toggleIcon = e.currentTarget.querySelector('.fa-chevron-down');

        e.currentTarget.classList.remove('hover:bg-blue-400');

        if (submenu.classList.contains('submenu-open')) {
            submenu.classList.remove('submenu-open');
            toggleIcon.classList.remove('rotate-180');
        } else {
            submenu.classList.add('submenu-open');
            toggleIcon.classList.add('rotate-180');
        }
    });
}

document.getElementById('station-dropdown').addEventListener('change', function() {
    $.ajax({
        url: '/station/change',
        type: 'POST',
        data: { _token: token, station: this.value },
        success: function() {
            location.reload();
        },
        error: function() {
            location.reload();
        }
    });
});

function showMessage(message, type = 'info') {
    const colors = {
        success: 'bg-green-100 border-green-500 text-green-700',
        error: 'bg-red-100 border-red-500 text-red-700',
        warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
        info: 'bg-blue-100 border-blue-500 text-blue-700'
    };

    const messageHtml = `
        <div class="fixed top-4 right-4 z-50 p-4 border-l-4 rounded ${colors[type]} shadow-lg duty-roster-message">
            <div class="flex items-center">
                <span>${message}</span>
                <button class="ml-4 text-lg font-bold" onclick="$(this).closest('.duty-roster-message').remove()">&times;</button>
            </div>
        </div>
    `;

    $('body').append(messageHtml);

    setTimeout(() => {
        $('.duty-roster-message').fadeOut(() => {
            $('.duty-roster-message').remove();
        });
    }, 5000);
}

function showModal(modalId) {
    document.getElementById(modalId).classList.remove("hidden");
}

function hideModal(modalId) {
    document.getElementById(modalId).classList.add("hidden");
}

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

// function showMessage(message) {
//     if (messageModal && messageText) {
//         messageText.textContent = message;
//         messageModal.classList.remove('hidden');
//         messageModal.classList.add('flex');
//     }
// }

function hideMessage() {
    if (messageModal) {
        messageModal.classList.add('hidden');
        messageModal.classList.remove('flex');
    }
}

if (messageCloseBtn) {
    messageCloseBtn.addEventListener('click', hideMessage);
}
