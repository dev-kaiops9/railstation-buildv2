<!DOCTYPE html>
<html lang="id">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard Stasiun Kereta Api</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="assets/css/style.css">
</head>

<body class="flex">

  <!-- Sidebar Kiri -->
  <div class="sidebar flex flex-col p-4" id="sidebar-menu">
    <!-- Header Sidebar dengan Tombol Toggle -->
    <div class="flex justify-between items-center py-4 border-b border-white border-opacity-20 mb-6">
      <h1 class="text-2xl font-extrabold sidebar-link-text font-archivoblack italic">RailStatiON</h1>
      <button id="sidebar-toggle-btn"
        class="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-300">
        <i class="fas fa-bars text-xl"></i>
      </button>
    </div>

    <!-- Dropdown Nama Stasiun -->
    <div class="mb-6">
      <p class="text-xs text-white text-opacity-70 mb-1 px-1 sidebar-link-text">Pilih Nama Stasiun Disini</p>
      <select
        class="w-full p-2 bg-white text-blue-900 rounded-lg font-medium border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
        @foreach ($stationData as $id => $name)
        <option value="{{ $id }}" {{ $station->name == $name ? 'selected' : '' }}>{{ $name }}</option>
        @endforeach
      </select>
    </div>

    <!-- Menu Navigasi -->
    <nav class="flex-grow">
      <ul>
        <li class="mb-4">
          <a href="#" id="menu-dashboard"
            class="flex items-center p-3 rounded-lg bg-blue-500 text-white font-semibold shadow-lg transition-all duration-200 transform scale-105">
            <span class="sidebar-link-icon-container">
              <i class="fas fa-chart-line"></i>
            </span>
            <span class="sidebar-link-text">Dashboard</span>
          </a>
        </li>
        <li class="mb-4">
          <a href="#" id="menu-profil"
            class="flex items-center p-3 rounded-lg hover:bg-blue-400 transition-colors duration-200">
            <span class="sidebar-link-icon-container">
              <i class="fas fa-file-alt"></i>
            </span>
            <span class="sidebar-link-text">Profil Stasiun</span>
          </a>
        </li>
        <li class="mb-4">
          <a href="#" id="menu-pegawai"
            class="flex items-center p-3 rounded-lg hover:bg-blue-400 transition-colors duration-200">
            <span class="sidebar-link-icon-container">
              <i class="fas fa-users"></i>
            </span>
            <span class="sidebar-link-text">Data Pegawai</span>
          </a>
        </li>
        <li class="mb-4">
          <a href="#" id="menu-perjalanan"
            class="flex items-center p-3 rounded-lg hover:bg-blue-400 transition-colors duration-200">
            <span class="sidebar-link-icon-container">
              <i class="fas fa-train"></i>
            </span>
            <span class="sidebar-link-text">Data Perka</span>
          </a>
        </li>
        <li class="mb-4">
          <div id="menu-administrasi-toggle"
            class="flex items-center p-3 rounded-lg hover:bg-blue-400 transition-colors duration-200 cursor-pointer">
            <span class="sidebar-link-icon-container">
              <i class="fas fa-file-invoice-dollar"></i>
            </span>
            <span class="sidebar-link-text flex-grow">Data Administrasi</span>
            <i class="fas fa-chevron-down text-white text-sm transition-transform duration-200"></i>
          </div>
          <ul id="administrasi-submenu" class="mt-2 space-y-2 submenu-transition">
            <li>
              <a href="#" id="submenu-ibpr"
                class="flex items-center p-3 rounded-lg text-white hover:bg-blue-400 transition-colors duration-200">
                <i class="fas fa-file-invoice mr-3 w-8 text-center"></i>
                <span class="sidebar-link-text">IBPR</span>
              </a>
            </li>
            <li>
              <a href="#" id="submenu-penjagaan-bentuk"
                class="flex items-center p-3 rounded-lg text-white hover:bg-blue-400 transition-colors duration-200">
                <i class="fas fa-list-alt mr-3 w-8 text-center"></i>
                <span class="sidebar-link-text">Penjagaan Bentuk - Bentuk</span>
              </a>
            </li>
            <li>
              <a href="#" id="submenu-penggunaan"
                class="flex items-center p-3 rounded-lg text-white hover:bg-blue-400 transition-colors duration-200">
                <i class="fas fa-id-card mr-3 w-8 text-center"></i>
                <span class="sidebar-link-text">Penggunaan KR dan SM</span>
              </a>
            </li>
            <li>
              <a href="#" id="submenu-gangguan"
                class="flex items-center p-3 rounded-lg text-white hover:bg-blue-400 transition-colors duration-200">
                <i class="fas fa-exclamation-triangle mr-3 w-8 text-center"></i>
                <span class="sidebar-link-text">Gangguan Operasional</span>
              </a>
            </li>
          </ul>
        </li>
        <li class="mb-4">
          <a href="#" id="menu-railibrary"
            class="flex items-center p-3 rounded-lg hover:bg-blue-400 transition-colors duration-200">
            <span class="sidebar-link-icon-container">
              <i class="fas fa-book"></i>
            </span>
            <span class="sidebar-link-text">RaiLibrary</span>
          </a>
        </li>
      </ul>
    </nav>

    <!-- Footer Copyright -->
    <div class="mt-auto pt-6 text-center text-xs text-white text-opacity-50 sidebar-link-text">
      <p>© 2025 All Rights Reserved</p>
      <p>Last Update : (10 September 2025)</p>
      <p>Built By : 69451</p>
    </div>
  </div>

  <!-- Bagian Tengah (Dashboard Utama) -->
  <div class="main-content flex-grow p-6 sm:p-8" id="main-content">

    <!-- Header Utama dengan Tombol Login -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Dashboard Stasiun <span class="text-blue-600">{{ $station->name }}</span>
      </h1>
      <div class="flex space-x-4">
        <button id="login-button"
          class="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">Masuk</button>
      </div>
    </div>

    <!-- Konten akan dimuat di sini -->

    <div id="content-container">
      <!-- Dashboard content will be loaded here -->
    </div>
  </div>

  <!-- Modal Pindah Pegawai -->
  <div id="move-employee-modal" class="login-modal hidden">
    <div class="modal-content">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold text-gray-900">Pindahkan Pegawai</h2>
        <button id="close-move-modal-btn" class="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
      </div>
      <form id="move-employee-form">
        <input type="hidden" id="move-employee-id">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Nama Pegawai
          </label>
          <input
            class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 bg-gray-100 leading-tight focus:outline-none"
            id="move-employee-name" type="text" readonly>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            NIPP
          </label>
          <input
            class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 bg-gray-100 leading-tight focus:outline-none"
            id="move-employee-nipp" type="text" readonly>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Jabatan
          </label>
          <input
            class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 bg-gray-100 leading-tight focus:outline-none"
            id="move-employee-position" type="text" readonly>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Stasiun Lama
          </label>
          <input
            class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 bg-gray-100 leading-tight focus:outline-none"
            id="move-employee-old-station" type="text" readonly>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="move-employee-new-station">
            Pindahkan Ke Stasiun Baru
          </label>
          <select id="move-employee-new-station"
            class="shadow border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500">
          </select>
        </div>
        <div class="flex items-center justify-end space-x-2">
          <button id="cancel-move-btn"
            class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            type="button">
            Batal
          </button>
          <button id="save-move-btn"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            type="button">
            Simpan
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal Login (default hidden) -->
  <div id="login-modal" class="login-modal hidden">
    <div class="modal-content">
      <h2 class="text-2xl font-bold mb-4 text-gray-900">Masuk</h2>
      <form>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Nama Pengguna
          </label>
          <input
            class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="username" type="text" placeholder="Nama Pengguna">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Kata Sandi
          </label>
          <input
            class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password" type="password" placeholder="Kata Sandi">
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            type="button">
            Masuk
          </button>
          <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Lupa Kata Sandi?
          </a>
        </div>
      </form>
      <button id="close-login-modal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-800">&times;</button>
    </div>
  </div>

  <!-- Loading Overlay -->
  <div id="loading-overlay" class="fixed inset-0 bg-black bg-opacity-50 z-[1001] hidden items-center justify-center">
    <div class="w-16 h-16 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
  </div>

  <!-- Message Modal -->
  <div id="message-modal" class="fixed inset-0 bg-black bg-opacity-50 z-[1001] hidden items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full text-center">
      <p id="message-text" class="text-gray-800 mb-4"></p>
      <button id="message-close-btn"
        class="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">OK</button>
    </div>
  </div>

  <script src="assets/js/script.js"></script>

</body>

</html>
