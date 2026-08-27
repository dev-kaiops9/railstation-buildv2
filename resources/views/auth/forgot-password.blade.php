<x-guest-layout>

<h2 class="text-2xl font-bold mb-4">Lupa Password</h2>

@if(session('error'))
<div class="text-red-500 mb-3">
{{ session('error') }}
</div>
@endif

<form method="POST" action="{{ route('forgot.check') }}">
@csrf

<input type="email" name="email"
class="border rounded w-full p-2 mb-3"
placeholder="Masukkan Email">

<button class="bg-blue-500 text-white px-4 py-2 rounded">
Cek Email
</button>

</form>

</x-guest-layout>