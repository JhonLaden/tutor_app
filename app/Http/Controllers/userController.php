<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class userController extends Controller
{
    //
    public function signup(Request $request)
    {
        $user = new User();
        $user->name = $request->username;
        $user->email = $request->password;
        $user->password = bcrypt($request->password);
        $user->save();
        return response()->json(['message' => 'User created successfully']);
    }

    public function login(Request $request)
    {
        $user = User::where('name', $request->username)->first();

        $credentials = [
            'name' => $request->username,
            'password' => $request->password,
        ];

        if ($user && Hash::check($request->password, $user->password) && Auth::attempt($credentials)) {
            $loggedUser = Auth::user();
            return response()->json(['user' => $loggedUser]);
        } else {

            return response()->json(['err' => 'cant find'], 404);
        }
    }
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'logout'], 200);
    }
}
