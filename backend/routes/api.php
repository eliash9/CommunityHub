<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CommunityController;
use App\Http\Controllers\API\MemberController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Authentication Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Protected routes go here
    
    // Community routes
    Route::apiResource('communities', CommunityController::class);
    
    // Member routes - with tenant middleware
    Route::middleware(['tenant', 'tenancy.init'])->group(function () {
        Route::get('communities/{community}/members', [MemberController::class, 'index']);
        Route::post('communities/{community}/members', [MemberController::class, 'store']);
        Route::get('communities/{community}/members/{member}', [MemberController::class, 'show']);
        Route::put('communities/{community}/members/{member}', [MemberController::class, 'update']);
        Route::delete('communities/{community}/members/{member}', [MemberController::class, 'destroy']);
    });
});

// Public routes for communities (only index and show)
Route::get('communities', [CommunityController::class, 'index']);
Route::get('communities/{community}', [CommunityController::class, 'show']);