<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\jobseeker\JobController;
use App\Http\Controllers\jobseeker\MemberController;
use App\Http\Controllers\jobseeker\MyController;
use App\Http\Controllers\jobseeker\VerificationController;

use App\Http\Controllers\employer\EmployerController;
use App\Http\Controllers\employer\HrController;
use App\Http\Controllers\employer\ResumeController;
use App\Http\Controllers\employer\OrderController;

use App\Http\Controllers\admin\CompanyController;
use App\Http\Controllers\admin\ServiceController;
use App\Http\Controllers\admin\UsersiteController;
use App\Http\Controllers\admin\JobaController;
use App\Http\Controllers\admin\MemberaController;
use App\Http\Controllers\admin\NewsaController;
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

// public

Route::get('/employer/search-resume', [ResumeController::class, 'search']);


Route::get('/jobs', [JobController::class, 'index']);
Route::get('/job/{id}', [JobController::class, 'detail']);
Route::get('/job-relevant/{id}', [JobController::class, 'job_relevant_comp']);

Route::get('/companies', [JobController::class, 'companies']);
Route::post('/quickupload', [MemberController::class, 'quickupload']);

Route::get('industries', [JobController::class, 'industries']);
Route::get('industry/{id}', [JobController::class, 'byindustry']);
Route::get('locations', [JobController::class, 'locations']);
Route::get('location/{id}', [JobController::class, 'bylocation']);

Route::post('/register', [MemberController::class, 'register']);
Route::post('/login', [MemberController::class, 'login']);
Route::get('email/verify/{id}', [VerificationController::class, 'verify_user'])->name('verification.verify'); // Make sure to keep this as your route name
Route::get('email/resend', [VerificationController::class, 'resend'])->name('verification.resend');

Route::post('/employer/register', [EmployerController::class, 'register']);
Route::post('/employer/login', [EmployerController::class, 'login']);
Route::get('/employer/services', [OrderController::class, 'services']);

Route::post('/admin/register', [UsersiteController::class, 'register']);
Route::post('/admin/login', [UsersiteController::class, 'login']);

// admin
Route::middleware(['auth:sanctum','ability:admin'])->group(function () {

    Route::group(['prefix' => 'admin'],function ()
    {
        Route::post('/logout', [UsersiteController::class, 'logout']);
        Route::get('/info', [UsersiteController::class, 'info']);

        Route::get('/members', [MemberaController::class, 'index']);

        Route::get('/companies', [CompanyController::class, 'index']);
        Route::post('/company', [CompanyController::class, 'store']);

        Route::get('/services', [ServiceController::class, 'index']);
        Route::post('/service/{id}', [ServiceController::class, 'store']);
        Route::patch('/service/{id}', [ServiceController::class, 'store']);
        Route::delete('/service/{id}', [ServiceController::class, 'delete']);

        //news_cat member
        Route::get('/news/categories', [NewsaController::class, 'indexCat']);
        Route::post('/news/category/{id}', [NewsaController::class, 'storeCat']);
        Route::patch('/news/category/{id}', [NewsaController::class, 'storeCat']);
        Route::delete('/news/category/{id}', [NewsaController::class, 'deleteCat']);

        //news member
        Route::get('/news', [NewsaController::class, 'index']);
        Route::post('/news/{id}', [NewsaController::class, 'store']);
        Route::patch('/news/{id}', [NewsaController::class, 'store']);
        Route::delete('/news/{id}', [NewsaController::class, 'delete']);

        Route::get('/job/locations', [JobaController::class, 'locations']);
        Route::post('job/location/{id}', [JobaController::class, 'location']);
        Route::delete('job/location/{id}', [JobaController::class, 'delete_location']);

        Route::get('/job/industries', [JobaController::class, 'industries']);
        Route::post('job/industry/{id}', [JobaController::class, 'industry']);
        Route::delete('job/industry/{id}', [JobaController::class, 'delete_industry']);
    });

});

// employer
Route::middleware(['auth:sanctum','ability:emp'])->group(function () {

    Route::group(['prefix' => 'employer'],function ()
    {
        Route::get('/resume/{id}', [ResumeController::class, 'detail']);

        Route::post('/logout', [EmployerController::class, 'logout']);
        Route::get('/info', [EmployerController::class, 'info']);

        Route::post('/hr/dashboard', [HrController::class, 'dashboard']);

        //folders
        Route::get('/hr/folders', [HrController::class, 'actionFolders']);
        Route::get('/hr/folder/{id}', [HrController::class, 'actionFolder']);
        Route::post('/hr/folder/{id}', [HrController::class, 'actionFolder']);
        Route::patch('/hr/folder/{id}', [HrController::class, 'actionFolder']);
        Route::delete('/hr/folder/{id}', [HrController::class, 'actionFolder']);

        //saved resume
        Route::get('/hr/resume/saved', [ResumeController::class, 'getResumeSaved']);
        Route::post('/hr/resume/saved', [ResumeController::class, 'saveResume']);
        Route::delete('/hr/resume/saved/{id}', [ResumeController::class, 'remove_on_wishlist']);

        Route::get('/hr/job', [HrController::class, 'getJob']);
        Route::post('/hr/job/{id}', [HrController::class, 'job']);
        Route::patch('/hr/job/{id}', [HrController::class, 'updateJob']);
        Route::delete('/hr/job/{id}', [HrController::class, 'deleteJob']);
        // orders
        Route::get('/hr/orders/active', [OrderController::class, 'order_active']);

        // candidates
        Route::get('/hr/candidates', [HrController::class, 'candidates']);
        Route::get('/hr/candidate/{id}', [HrController::class, 'candidate']);
        Route::post('/hr/candidate/status/{id}', [HrController::class, 'candidateStatus']);

        // setting account
        Route::post('/hr/company', [HrController::class, 'company']);
        Route::get('/hr/company', [HrController::class, 'getCompany']);

        Route::get('/hr/profile', [HrController::class, 'getProfile']);
        Route::post('/hr/profile', [HrController::class, 'profile']);

        Route::post('/confirm-order', [OrderController::class, 'confirm_order']);
    });

});

// user
Route::middleware(['auth:sanctum','ability:member'])->group(function () {
    Route::post('/logout', [MemberController::class, 'logout']);
    Route::get('/info', [MemberController::class, 'info']);


    //resume
    Route::post('my/resume', [MyController::class, 'resume']);
    Route::get('my/resume', [MyController::class, 'getResume']);

    // history
    Route::get('my/saved', [MyController::class, 'historyApply']);
    Route::get('my/saved/{id}', [MyController::class, 'applyDetail']);
    //wishlist
    Route::get('my/jobsaves', [MyController::class, 'jobSaves']);
    Route::post('my/jobsaved', [MyController::class, 'saved']);
    Route::delete('my/jobsaved/{id}', [MyController::class, 'remove_on_wishlist']);
    //apply
    Route::post('/apply/{id}', [JobController::class, 'apply']);
});
