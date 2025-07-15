<?php

use App\Http\Controllers\NLPController;
use App\Http\Controllers\userController;
use App\Models\User;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
// NLP crud
Route::post('/api/analyze', [NLPController::class, 'analyze']);

// Login/signup
Route::post('/api/user/signup', [userController::class, 'signup']);
Route::post('/api/user/login', [userController::class, 'login']);
Route::post('/api/user/logout', [userController::class, 'logout']);

Route::get('/{any}', function () {
    return view('welcome'); // or your main Vue entry blade
})->where('any', '.*');
