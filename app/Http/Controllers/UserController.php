<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Station;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function index()
{
    $users = User::with('station')->get();
    return view('users.index', compact('users'));
}
    public function create()
{
    $stations = Station::all();
    return view('users.create', compact('stations'));
}

public function store(Request $request)
{
    $request->validate([
        'name'=>'required',
        'email'=>'required|email|unique:users',
        'password'=>'required|min:6',
        'station_id'=>'required'
    ]);

    User::create([
        'name'=>$request->name,
        'email'=>$request->email,
        'password'=>Hash::make($request->password),
        'role'=>'station_master',
        'station_id'=>$request->station_id
    ]);

    return redirect()
        ->route('users.index')
        ->with('success','User Station Master berhasil ditambahkan');
}

public function edit($id)
{
    $user = User::findOrFail($id);
    $stations = Station::all();

    return view('users.edit', compact('user','stations'));
}

public function update(Request $request, $id)
{
    $user = User::findOrFail($id);

    $user->update([
        'name' => $request->name,
        'email' => $request->email,
        'station_id' => $request->station_id
    ]);

    return redirect()->route('users.index')
    ->with('success','User berhasil diupdate');
}

public function destroy($id)
{
    $user = User::findOrFail($id);
    $user->delete();

    return redirect()->route('users.index')
    ->with('success','User berhasil dihapus');
}

}