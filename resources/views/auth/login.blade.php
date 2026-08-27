<x-guest-layout>
    <!-- Session Status -->
    <x-auth-session-status class="mb-4" :status="session('status')" />

    <div class="mb-6">
        <h2 class="text-2xl font-bold mb-4 text-gray-900">{{ __('Masuk') }}</h2>
    </div>

    <form method="POST" action="{{ route('login') }}">
        @csrf
 
        <!-- Email/Username Address -->
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                {{ __('Email') }}
            </label>
            <input
                class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 @error('email') border-red-500 @enderror"
                id="email"
                type="email"
                name="email"
                placeholder="{{ __('Email') }}"
                :value="old('email')"
                required
                autofocus
                autocomplete="username" />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <!-- Password -->
        <!-- Password -->
<div class="mb-6">
    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        {{ __('Kata Sandi') }}
    </label>

    <div class="relative">
        <input
            class="shadow appearance-none border rounded-lg w-full py-2 pl-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 @error('password') border-red-500 @enderror"
            id="password"
            type="password"
            name="password"
            placeholder="{{ __('Kata Sandi') }}"
            required
            autocomplete="current-password" />

        <button type="button" 
            id="togglePassword"
            style="position: absolute; top: 50%; right: 12px; transform: translateY(-50%); background: none; border: none; cursor: pointer; padding: 0;"
            class="text-gray-500 hover:text-gray-700 focus:outline-none">
            
            <!-- Icon Mata Terbuka (default - password hidden) -->
            <svg id="eyeOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
            
            <!-- Icon Mata Tertutup (password shown) -->
            <svg id="eyeClosed" class="w-5 h-5 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
            </svg>
        </button>
    </div>

    <x-input-error :messages="$errors->get('password')" class="mt-2" />
</div>

        <!-- Remember Me -->
        <div class="mb-6">
            <label for="remember_me" class="inline-flex items-center">
                <input id="remember_me" type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500" name="remember">
                <span class="ms-2 text-sm text-gray-600">{{ __('Ingat saya') }}</span>
            </label>
        </div>

        <div class="flex items-center justify-between mb-4">
    <button
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
        type="submit">
        {{ __('Masuk') }}
    </button>
</div>

<div class="text-center">
    <a href="{{ route('forgot.password') }}"
       class="text-sm text-blue-500 hover:text-blue-700 hover:underline">
        Lupa Kata Sandi?
    </a>
</div>

<div class="text-center mt-2">

{{-- <a href="{{ route('user.create') }}"
class="text-sm text-green-600 hover:text-green-700 hover:underline">
Tambah User
</a> --}}

</div>
    </form>

    <script>
    document.addEventListener('DOMContentLoaded', function () {
        const togglePassword = document.getElementById('togglePassword');
        const passwordInput = document.getElementById('password');
        const eyeOpen = document.getElementById('eyeOpen');
        const eyeClosed = document.getElementById('eyeClosed');

        togglePassword.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Toggle password visibility
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            // Toggle icon
            eyeOpen.classList.toggle('hidden');
            eyeClosed.classList.toggle('hidden');
        });
    });
</script>

</x-guest-layout>
