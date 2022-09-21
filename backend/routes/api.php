<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployerController;
use App\Http\Controllers\CompanyController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/employers', [EmployerController::class, 'index']);
Route::post('/employer/register', [EmployerController::class, 'store']);
Route::post('/employer/login', [EmployerController::class, 'login']);

Route::post('/companies', [CompanyController::class, 'index']);
Route::post('/company', [CompanyController::class, 'store']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/employer/logout', [EmployerController::class, 'logout']);
});
