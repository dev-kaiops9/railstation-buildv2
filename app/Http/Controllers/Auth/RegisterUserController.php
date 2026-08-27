<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Station;
use Illuminate\Support\Facades\Hash;

class RegisterUserController extends Controller
{
    public function create()
    {
        $stations = Station::all();
        return view('auth.tambah-user', compact('stations'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'station_id' => 'required'
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'station_master', // otomatis
            'station_id' => $request->station_id
        ]);

        return redirect('/')->with('status','User berhasil dibuat, silakan login');
    }
}