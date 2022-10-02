<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\jobseeker\JobController;

use App\Http\Controllers\employer\EmployerController;
use App\Http\Controllers\employer\HrController;
use App\Http\Controllers\employer\OrderController;

use App\Http\Controllers\admin\CompanyController;
use App\Http\Controllers\admin\ServiceController;
use App\Http\Controllers\admin\UsersiteController;
use App\Http\Controllers\admin\JobaController;
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

Route::get('/jobs', [JobController::class, 'index']);


Route::post('/employer/register', [EmployerController::class, 'register']);
Route::post('/employer/login', [EmployerController::class, 'login']);

Route::post('/admin/register', [UsersiteController::class, 'register']);
Route::post('/admin/login', [UsersiteController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {


    Route::group(['prefix' => 'employer'],function ()
    {
        Route::post('/logout', [EmployerController::class, 'logout']);

        Route::post('/hr/dashboard', [HrController::class, 'dashboard']);
        Route::post('/hr/job', [HrController::class, 'job']);

        Route::post('/confirm-order', [OrderController::class, 'confirm_order']);
    });

    Route::group(['prefix' => 'admin'],function ()
    {
        Route::post('/logout', [UsersiteController::class, 'logout']);

        Route::get('/companies', [CompanyController::class, 'index']);
        Route::post('/company', [CompanyController::class, 'store']);

        Route::get('/services', [ServiceController::class, 'index']);
        Route::post('/service/{id}', [ServiceController::class, 'store']);
        Route::delete('/service/{id}', [ServiceController::class, 'delete']);

        Route::get('/job/locations', [JobaController::class, 'locations']);
        Route::post('job/location/{id}', [JobaController::class, 'location']);
        Route::delete('job/location/{id}', [JobaController::class, 'delete_location']);

        Route::get('/job/industries', [JobaController::class, 'industries']);
        Route::post('job/industry/{id}', [JobaController::class, 'industry']);
        Route::delete('job/industry/{id}', [JobaController::class, 'delete_industry']);
    });

});
