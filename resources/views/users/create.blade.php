@extends('layouts.app')

@section('content')

<div class="max-w-2xl mx-auto mt-10">

```
<div class="bg-white shadow-xl rounded-2xl p-8">

    <!-- Header -->
    <div class="mb-6">
        <h2 class="text-2xl font-bold text-gray-800">
            Tambah User Station Master
        </h2>
        <p class="text-sm text-gray-500">
            Tambahkan pengguna baru untuk mengakses sistem stasiun
        </p>
    </div>


    <!-- Alert -->
    @if(session('success'))
    <div class="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg mb-5">
        {{ session('success') }}
    </div>
    @endif


    <form method="POST" action="{{ route('users.store') }}">
    @csrf


    <!-- Nama -->
    <div class="mb-5">
        <label class="block text-sm font-semibold text-gray-700 mb-2">
            Nama
        </label>

        <input type="text"
        name="name"
        placeholder="Masukkan nama lengkap"
        class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required>
    </div>


    <!-- Email -->
    <div class="mb-5">
        <label class="block text-sm font-semibold text-gray-700 mb-2">
            Email
        </label>

        <input type="email"
        name="email"
        placeholder="Masukkan email pengguna"
        class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required>
    </div>


    <!-- Password -->
    <div class="mb-5">
        <label class="block text-sm font-semibold text-gray-700 mb-2">
            Password
        </label>

        <input type="password"
        name="password"
        placeholder="Masukkan password"
        class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required>
    </div>


    <!-- Station -->
    <div class="mb-6">
        <label class="block text-sm font-semibold text-gray-700 mb-2">
            Pilih Stasiun
        </label>

        <select name="station_id"
        class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none">

            @foreach($stations as $station)
            <option value="{{ $station->id }}">
                {{ $station->name }}
            </option>
            @endforeach

        </select>
    </div>


    <!-- Buttons -->
    <div class="flex justify-between items-center">

        <a href="{{ route('users.index') }}"
        class="text-gray-500 hover:text-gray-700 text-sm">
            ← Kembali
        </a>

        <button
        class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition">
            Simpan User
        </button>

    </div>

    </form>

</div>
```

</div>

@endsection
