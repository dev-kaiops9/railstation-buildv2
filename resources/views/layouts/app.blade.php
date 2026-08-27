<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ trim($__env->yieldContent('title', 'RailStatiON')) }}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="{{ asset('assets/css/style.css') }}">
</head>
<body>
    <div class="app-shell">
        @include('layouts.sidebar')
        @php
            $pageTitles = ['dashboard' => 'Dashboard', 'profile' => 'Profil Stasiun', 'employee' => 'Data Pegawai', 'train' => 'Data Perka', 'ibpr' => 'IBPR', 'guard-form' => 'Penjagaan Bentuk', 'krsm' => 'Penggunaan KR & SM', 'operational-disruption' => 'Gangguan Operasional', 'railibrary' => 'RaiLibrary'];
            $currentTitle = $pageTitles[request()->route()?->getName()] ?? 'RailStatiON';
        @endphp
        <main class="main-content" id="main-content">
            <header class="topbar">
                <div>
                    <h1>@yield('page-title', $currentTitle)</h1>
                    <p class="sub">{{ session('station') ? 'Stasiun '.session('station') : 'Sistem informasi operasional stasiun' }}</p>
                </div>
                <div class="user-chip">
                    <div class="avatar-circle">{{ strtoupper(substr(auth()->user()->name ?? 'U', 0, 1)) }}</div>
                    <div class="who"><strong>{{ auth()->user()->name ?? 'Pengguna' }}</strong><small>{{ ucfirst(str_replace('_', ' ', auth()->user()->role ?? 'Pengguna')) }}</small></div>
                    <form action="{{ route('logout') }}" method="post">@csrf<button type="submit" class="logout-button" title="Keluar"><i class="fas fa-right-from-bracket"></i><span>Keluar</span></button></form>
                </div>
            </header>
            <div id="content-container">@yield('content')</div>
        </main>
    </div>
    @yield('modals')
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="{{ asset('assets/js/script.js') }}"></script>
    <script src="{{ asset('assets/js/pagination-helper.js') }}"></script>
    @stack('scripts')
</body>
</html>
