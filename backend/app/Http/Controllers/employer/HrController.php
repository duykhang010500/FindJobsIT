<?php

namespace App\Http\Controllers\employer;
use App\Http\Controllers\Controller;
use App\Models\Employer;
use App\Models\Company;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator;
class HrController extends Controller
{
    //
    public function dashboard()
    {
        //
        $employers = Employer::orderBy('id','desc')->get();
        return response()->json([
            'data' => $employers,
        ]);
    }

    public function job(Request $request)
    {

        // dd(auth()->user()->company->id);
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'job_type' => 'required',
            'level_id' => 'required',
            'industries' => 'required',
            'degree_id' => 'required',
            'locations' => 'required',
            'job_description' => 'required',
            'job_requirement' => 'required',
            'company_name' => 'required',
            'contact_name' => 'required',
            'contact_emails' => 'required',
            'status' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $job = Job::create(array_merge(
            $validator->validated(),
            ['comp_id' => auth()->user()->company->id

            ]
        ));
        return response()->json([
            'job' => $job,
        ]);
    }

    public function login(Request $request)
    {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required|string|min:6',
            ]);


            $credentials = request(['email', 'password']);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }

            $Employer = Employer::where('email', $request->email)->first();


            $tokenResult = $Employer->createToken('authToken')->plainTextToken;

            return response()->json([
                'status_code' => 200,
                'access_token' => $tokenResult,
                'token_type' => 'Bearer',
                'role' => 'emp',
            ]);
    }

    public function logout(Request $request) {
        auth()->user()->tokens()->delete();
        return [
            'message' => 'Logged out'
        ];
    }

}