@extends('layouts.app')

@section('content')

<div class="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">

<h2 class="text-xl font-bold mb-4">
Edit User
</h2>

<form method="POST" action="{{ route('users.update',$user->id) }}">

@csrf

<div class="mb-4">
<label>Nama</label>
<input type="text"
name="name"
value="{{ $user->name }}"
class="w-full border p-2 rounded">
</div>

<div class="mb-4">
<label>Email</label>
<input type="email"
name="email"
value="{{ $user->email }}"
class="w-full border p-2 rounded">
</div>

<div class="mb-4">
<label>Station</label>

<select name="station_id"
class="w-full border p-2 rounded">

@foreach($stations as $station)

<option value="{{ $station->id }}"
{{ $user->station_id == $station->id ? 'selected' : '' }}>

{{ $station->name }}

</option>

@endforeach

</select>

</div>

<div class="flex justify-between">

<a href="{{ route('users.index') }}"
class="text-gray-500">
Kembali
</a>

<button
class="bg-blue-600 text-white px-4 py-2 rounded">

Update

</button>

</div>

</form>

</div>

@endsection