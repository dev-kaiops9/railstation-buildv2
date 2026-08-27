<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}"><title>Masuk — RailStatiON</title>
    <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdn.tailwindcss.com"></script><link rel="stylesheet" href="{{ asset('assets/css/style.css') }}">
</head>
<body class="guest-body">
    <div class="login-shell">
        <aside class="login-aside"><a class="brand" href="#"><span class="mark">R</span>RailStatiON</a><div><p class="eyebrow">Sistem informasi stasiun</p><h1>Operasional stasiun, dalam satu kendali.</h1><p class="desc">Kelola perjalanan kereta, data pegawai, dan administrasi secara lebih teratur dan efisien.</p></div><p class="footnote">© {{ date('Y') }} RailStatiON</p></aside>
        <main class="login-main"><div class="login-card">{{ $slot }}</div></main>
    </div>
</body>
</html>
