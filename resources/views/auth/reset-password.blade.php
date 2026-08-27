<x-guest-layout>

<h2 class="text-2xl font-bold mb-4">Ganti Password</h2>

<form method="POST" action="{{ route('reset.password') }}">
@csrf

<input type="hidden" name="email" value="{{ $email }}">

<div class="mb-3">
<input type="password"
name="password"
placeholder="Password Baru"
class="border rounded w-full p-2">
</div>

<div class="mb-3">
<input type="password"
name="password_confirmation"
placeholder="Konfirmasi Password"
class="border rounded w-full p-2">
</div>

<button 
type="submit"
class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition duration-200">
Simpan
</button>

</form>

</x-guest-layout>