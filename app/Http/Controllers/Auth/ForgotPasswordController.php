<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class ForgotPasswordController extends Controller
{

    public function index()
    {
        return view('auth.forgot-password');
    }

    public function checkEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $user = User::where('email', $request->email)->first();

        if(!$user){
            return back()->with('error','Email tidak ditemukan');
        }

        return redirect()->route('reset.form',$user->email);
    }

    public function resetForm($email)
    {
        return view('auth.reset-password', compact('email'));
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email'=>'required',
            'password'=>'required|min:6|confirmed'
        ]);

        $user = User::where('email',$request->email)->first();

        $user->update([
            'password'=>Hash::make($request->password)
        ]);

        return redirect('/')->with('status','Password berhasil diubah');
    }
}