<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\employer\EmployerController;
use App\Http\Controllers\employer\HrController;

use App\Http\Controllers\admin\CompanyController;
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


Route::post('/employer/register', [EmployerController::class, 'register']);
Route::post('/employer/login', [EmployerController::class, 'login']);

Route::get('/companies', [CompanyController::class, 'index']);
Route::post('/company', [CompanyController::class, 'store']);

Route::middleware(['auth:sanctum'])->group(function () {


    Route::group(['prefix' => 'employer'],function ()
    {
        Route::post('/logout', [EmployerController::class, 'logout']);

        Route::post('/hr/dashboard', [HrController::class, 'dashboard']);
        Route::post('/hr/job', [HrController::class, 'job']);
    });

});
