@extends('layouts.app')

@section('page-title', 'Dashboard')

@section('content')
<div class="stat-grid">
    <div class="stat-card"><div class="icon-badge green"><i class="fas fa-users"></i></div><div><div class="label">Pegawai Aktif</div><div class="value">{{ $totalEmployees }}</div></div></div>
    <div class="stat-card"><div class="icon-badge blue"><i class="fas fa-train"></i></div><div><div class="label">Jumlah KA Terjadwal</div><div class="value">{{ $totalTrains }}</div></div></div>
    <div class="stat-card"><div class="icon-badge orange"><i class="fas fa-triangle-exclamation"></i></div><div><div class="label">Gangguan Aktif</div><div class="value">{{ $activeDisruptions }}</div></div></div>
    <div class="stat-card"><div class="icon-badge purple"><i class="fas fa-cloud-sun"></i></div><div><div class="label">Estimasi Cuaca</div><div class="value">{{ $weather['weather'] }}</div></div></div>
</div>
<div class="panel-grid">
    <section class="panel"><h3>Ringkasan Operasional</h3><p class="muted-copy">Dashboard ini menampilkan ringkasan real-time operasional stasiun: jumlah pegawai aktif, jumlah KA yang terjadwal melalui stasiun, dan gangguan operasional yang masih berjalan. Gunakan menu di samping untuk masuk ke tiap modul.</p></section>
    <section class="panel"><h3>Status Dinas Berjalan</h3>@if($activeShift)<div class="duty-list">@forelse($employees as $employee)<div class="duty-item"><span class="dot"></span><span class="name">{{ $employee->name }}</span><span class="role">— {{ $employee->position }}</span></div>@empty<p class="empty-copy">Belum ada data pegawai aktif.</p>@endforelse</div>@else<p class="empty-copy">Tidak ada shift aktif saat ini.</p>@endif</section>
</div>
@endsection
