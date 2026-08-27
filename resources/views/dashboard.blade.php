@extends('layouts.app')

@section('page-title', 'Dashboard')

@section('content')
<section class="welcome-banner">
    <div><p class="eyebrow">Pusat kendali operasional</p><h2>Selamat datang di Stasiun {{ $station->name }}</h2><p>Kelola perjalanan, sumber daya, dan administrasi stasiun dalam satu tempat.</p></div>
    <i class="fas fa-train-subway"></i>
</section>
<div class="stat-grid">
    <div class="stat-card"><div class="icon-badge green"><i class="fas fa-users"></i></div><div><div class="label">Pegawai Aktif</div><div class="value">{{ $totalEmployees }}</div></div></div>
    <div class="stat-card"><div class="icon-badge blue"><i class="fas fa-train"></i></div><div><div class="label">Jumlah KA Terjadwal</div><div class="value">{{ $totalTrains }}</div></div></div>
    <div class="stat-card"><div class="icon-badge orange"><i class="fas fa-cloud-sun"></i></div><div><div class="label">Estimasi Cuaca</div><div class="value weather-value">{{ $weather['temperature'] }}°C</div><small>{{ $weather['weather'] }}</small></div></div>
</div>
<section class="timeline-section"><div class="section-head"><div><h2>Timeline Perjalanan</h2><p>Perjalanan kereta hari ini</p></div><span id="current-time-display" class="time-chip"><i class="fas fa-clock"></i> --:--:--</span></div><div class="timeline"><div class="timeline-inner"><div class="timeline-hours"></div><div class="timeline-minutes"></div><div class="timeline-now" id="timeline-now" data-current-time=""></div><div class="timeline-trains" id="timeline-trains"></div></div></div></section>
<div class="panel-grid">
    <section class="panel"><h3>Ringkasan Operasional</h3><p class="muted-copy">Dashboard ini menampilkan ringkasan operasional stasiun secara real-time. Gunakan menu di samping untuk mengelola data pegawai, perjalanan KA, administrasi, dan dokumen pendukung.</p></section>
    <section class="panel"><h3>Status Dinas Berjalan</h3>@if($activeShift)<p class="shift-name">{{ $activeShift->name }} <span>{{ $activeShift->start_time }}–{{ $activeShift->end_time }}</span></p><div class="duty-list">@forelse($employees as $employee)<div class="duty-item"><span class="dot"></span><span class="name">{{ $employee->name }}</span><span class="role">{{ $employee->position }}</span></div>@empty<p class="empty-copy">Belum ada pegawai yang ditugaskan.</p>@endforelse</div>@else<p class="empty-copy">Tidak ada shift aktif saat ini.</p>@endif</section>
</div>
@endsection
@push('scripts')<script src="{{ asset('assets/js/dashboard.js') }}"></script>@endpush
