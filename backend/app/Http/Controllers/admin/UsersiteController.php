<?php

namespace App\Http\Controllers\admin;
use App\Http\Controllers\Controller;
use App\Models\Usersite;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator;
class UsersiteController extends Controller
{
    //

    public function register(Request $request)
    {
        //
        $fields_employer = Validator::make($request->all(), [
            'fullname' => 'required|string|between:2,100',
            'email' => 'required|string|unique:users_site,email',
            'password' => 'required|string|confirmed|min:6',
        ]);


        if ($fields_employer->fails()) {
            return response()->json($fields_employer->errors(), 422);
        }
        $employer = Usersite::create(array_merge(
            $fields_employer->validated(),
            ['password' => bcrypt($request->password),
             'status' => 1,
            ]
        ));


        if($employer){
            $employer->save();
            return response()->json([
                'admin' => $employer,
                'role' => 'admin'
            ]);
        }
        return response()->json([
            'message' => 'ĐI'
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

            $Employer = Usersite::where('email', $request->email)->first();


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