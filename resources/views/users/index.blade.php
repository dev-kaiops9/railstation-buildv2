@extends('layouts.app')

@section('content')

<div class="bg-white p-6 rounded-2xl shadow-lg">

    <!-- Header -->
    <div class="flex justify-between items-center mb-6">

        <div>
            <h2 class="text-2xl font-bold text-gray-800">
                Manajemen User Station Master
            </h2>
            <p class="text-sm text-gray-500">
                Kelola data pengguna sistem stasiun
            </p>
        </div>

        <a href="{{ route('users.create') }}"
        class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition">

            <i class="fas fa-plus"></i>
            Tambah User

        </a>

    </div>


    <!-- Alert -->
    @if(session('success'))
    <div class="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg mb-4">
        {{ session('success') }}
    </div>
    @endif


    <!-- Table -->
    <div class="overflow-x-auto">

    <table class="w-full border border-gray-200 rounded-lg overflow-hidden">

        <thead class="bg-gray-100 text-gray-700 text-sm">

            <tr>
                <th class="p-3 border text-center">No</th>
                <th class="p-3 border text-left">Nama</th>
                <th class="p-3 border text-left">Email</th>
                <th class="p-3 border text-left">Stasiun</th>
                <th class="p-3 border text-center">Role</th>
                <th class="p-3 border text-center">Aksi</th>
            </tr>

        </thead>

        <tbody class="text-sm text-gray-700">

        @foreach($users as $user)

        <tr class="hover:bg-gray-50 transition">

            <td class="p-3 border text-center font-semibold">
                {{ $loop->iteration }}
            </td>

            <td class="p-3 border font-medium">
                {{ $user->name }}
            </td>

            <td class="p-3 border">
                {{ $user->email }}
            </td>

            <td class="p-3 border">
                {{ $user->station->name ?? '-' }}
            </td>

            <td class="p-3 border text-center">

                @if($user->role == 'admin')

                <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                    Admin
                </span>

                @else

                <span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                    User
                </span>

                @endif

            </td>

            <td class="p-3 border text-center">

                <div class="flex justify-center gap-2">

                    <a href="{{ route('users.edit',$user->id) }}"
                    class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 text-sm">

                        <i class="fas fa-edit"></i>
                        Edit

                    </a>

                    <form action="{{ route('users.destroy',$user->id) }}"
                    method="POST"
                    onsubmit="return confirm('Yakin ingin menghapus user ini?')">

                        @csrf
                        @method('DELETE')

                        <button
                        class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 text-sm">

                            <i class="fas fa-trash"></i>
                            Delete

                        </button>

                    </form>

                </div>

            </td>

        </tr>

        @endforeach

        </tbody>

    </table>

    </div>

</div>

@endsection