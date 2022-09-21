<?php

namespace App\Http\Controllers;

use App\Models\Employer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator;
class EmployerController extends Controller
{
    //
    public function index()
    {
        //
        $Employers = Employer::orderBy('id','desc')->get();
        return response()->json([
            'data' => $Employers,
        ]);
    }

    public function store(Request $request)
    {
        //
        $fields = Validator::make($request->all(), [
            'fullname' => 'required|string|between:2,100',
            'email' => 'required|string|unique:employers,email',
            'password' => 'required|string|confirmed|min:6',
        ]);

        if ($fields->fails()) {
            return response()->json($fields->errors(), 422);
        }

        $Employer = Employer::create(array_merge(
            $fields->validated(),
            ['password' => bcrypt($request->password)]
        ));

        return response()->json([
            'employer' => $Employer,
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
