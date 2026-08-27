<x-guest-layout>

<div class="mb-6">
<h2 class="text-2xl font-bold text-gray-900">
Tambah User Station Master
</h2>
</div>

<form method="POST" action="{{ route('user.store') }}">
@csrf

<div class="mb-4">
<label class="block text-sm font-bold text-gray-700 mb-2">
Nama
</label>

<input type="text"
name="name"
class="shadow border rounded-lg w-full py-2 px-3"
required>
</div>

<div class="mb-4">
<label class="block text-sm font-bold text-gray-700 mb-2">
Email
</label>

<input type="email"
name="email"
class="shadow border rounded-lg w-full py-2 px-3"
required>
</div>

<div class="mb-4">
<label class="block text-sm font-bold text-gray-700 mb-2">
Password
</label>

<input type="password"
name="password"
class="shadow border rounded-lg w-full py-2 px-3"
required>
</div>

<div class="mb-6">
<label class="block text-sm font-bold text-gray-700 mb-2">
Station
</label>

<select name="station_id"
class="shadow border rounded-lg w-full py-2 px-3">

<option value="">Pilih Station</option>

@foreach($stations as $station)

<option value="{{ $station->id }}">
{{ $station->name }}
</option>

@endforeach

</select>

</div>

<div class="flex justify-between">

<a href="/"
class="text-gray-500 hover:underline">
Kembali
</a>

<div class="flex justify-between items-center">


<button
type="submit"
class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition">
Submit
</button>

</div>

</div>

</form>

</x-guest-layout>