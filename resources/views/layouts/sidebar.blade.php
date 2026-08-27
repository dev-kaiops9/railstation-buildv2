<aside class="sidebar" id="sidebar-menu">
    <div class="sidebar-header"><a class="brand" href="{{ route('dashboard') }}"><span class="mark">R</span><span class="sidebar-link-text">RailStatiON</span></a><button id="sidebar-toggle-btn" class="sidebar-toggle" type="button" aria-label="Sembunyikan menu"><i class="fas fa-bars"></i></button></div>
    <div class="station-picker"><label class="sidebar-link-text" for="station-dropdown">Stasiun aktif</label><select id="station-dropdown">@foreach ($stationData as $name)<option value="{{ $name }}" {{ session('station') == $name ? 'selected' : '' }}>{{ $name }}</option>@endforeach</select></div>
    <nav>
        <p class="menu-label sidebar-link-text">Menu utama</p>
        <ul>
            <x-nav-li :href="route('dashboard')" id="menu-dashboard" icon="fas fa-chart-pie" :active="request()->routeIs('dashboard')">Dashboard</x-nav-li>
            <x-nav-li :href="route('profile')" id="menu-profil" icon="fas fa-building" :active="request()->routeIs('profile')">Profil Stasiun</x-nav-li>
            <x-nav-li :href="route('employee')" id="menu-pegawai" icon="fas fa-users" :active="request()->is('employee*')">Data Pegawai</x-nav-li>
            <x-nav-li :href="route('train')" id="menu-perjalanan" icon="fas fa-train" :active="request()->routeIs('train')">Data Perka</x-nav-li>
            <li class="has-submenu"><button id="menu-administrasi-toggle" class="nav-toggle {{ request()->routeIs('guard-form', 'operational-disruption', 'ibpr', 'krsm') ? 'active' : '' }}" type="button"><span class="sidebar-link-icon-container"><i class="fas fa-folder-open"></i></span><span class="sidebar-link-text">Administrasi</span><i class="fas fa-chevron-down submenu-arrow"></i></button>
                <ul id="administrasi-submenu" class="submenu {{ request()->routeIs('guard-form', 'operational-disruption', 'ibpr', 'krsm') ? 'submenu-open' : '' }}">
                    <li><a href="{{ route('ibpr') }}" class="{{ request()->routeIs('ibpr') ? 'active' : '' }}"><i class="fas fa-file-lines"></i><span class="sidebar-link-text">IBPR</span></a></li><li><a href="{{ route('guard-form') }}" class="{{ request()->routeIs('guard-form') ? 'active' : '' }}"><i class="fas fa-clipboard-list"></i><span class="sidebar-link-text">Penjagaan Bentuk</span></a></li><li><a href="{{ route('krsm') }}" class="{{ request()->routeIs('krsm') ? 'active' : '' }}"><i class="fas fa-id-card"></i><span class="sidebar-link-text">Penggunaan KR & SM</span></a></li><li><a href="{{ route('operational-disruption') }}" class="{{ request()->routeIs('operational-disruption') ? 'active' : '' }}"><i class="fas fa-triangle-exclamation"></i><span class="sidebar-link-text">Gangguan Operasional</span></a></li>
                </ul></li>
            <x-nav-li :href="route('railibrary')" id="menu-railibrary" icon="fas fa-book-open" :active="request()->routeIs('railibrary')">RaiLibrary</x-nav-li>
            @if(auth()->user()->role == 'admin')<x-nav-li :href="route('users.index')" id="menu-users" icon="fas fa-user-gear" :active="request()->routeIs('users.*')">Manajemen User</x-nav-li>@endif
        </ul>
    </nav>
    <div class="sidebar-footer sidebar-link-text">© {{ date('Y') }} RailStatiON<br>Operasional stasiun terintegrasi</div>
</aside>
