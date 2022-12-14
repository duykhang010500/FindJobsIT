<?php

namespace App\Http\Controllers\employer;
use App\Http\Controllers\Controller;
use App\Models\Employer;
use App\Models\EmployerVerify;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator,Mail;
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

    public function register(Request $request)
    {
        //
        try{
            $fields_employer = Validator::make($request->all(), [
                'fullname' => 'required|string|between:2,100',
                'email' => 'required|string|unique:employers,email',
                'password' => 'required|string|confirmed|min:6',
            ]);

            $fields_company = Validator::make($request->all(), [
                'name' => 'required|max:255|unique:companies',
                'industry_name' => 'required',
                'location_name'  => 'required',
                'company_size' => 'required',
            ]);

            if ($fields_employer->fails()) {
                return response()->json($fields_employer->errors(), 422);
            }
            if ($fields_company->fails()) {
                return response()->json($fields_company->errors(), 422);
            }

            $employer = Employer::create(array_merge(
                $fields_employer->validated(),
                ['password' => bcrypt($request->password),
                ]
            ));

            $company = Company::create($data_comp = array_merge(
                $fields_company->validated()
            ));

            if($employer && $company){
                $employer->comp_id = $company->id;
                $employer->save();

                $token = \Str::random(64);

                EmployerVerify::create([
                    'emp_id' => $employer->id,
                    'token' => $token
                    ]);
                Mail::send('verify', ['token' => $token], function($message) use($request){
                    $message->to($request->email);
                    $message->subject('Email Verification Mail');
                });
                return response()->json([
                    'employer' => $employer,
                    'company' => $company,
                ]);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function login(Request $request)
    {
        try{
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required|string|min:6',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }

            $Employer = Employer::where('email', $request->email)->first();

            if(!$Employer)
                return response()->json([
                    'status' => false,
                    'message' => 'Email does not match with our record.',
                ], 401);

            if (!Hash::check($request->password, $Employer->password, []))
                return response()->json([
                    'status' => false,
                    'message' => 'Password does not match with our record.',
                ], 401);

            // if (!Auth::guard('web')->attempt($validator->validated())) {
            //     return response()->json(['error' => 'Unauthorized'], 401);
            // }

            if(!$Employer->email_verified_at) {
                return response()->json(['error' => 'Please verify your email address before logging in.'], 401);
            }

            if($Employer->status == 0){
                return response()->json([
                    'status' => false,
                    'message' => 'Your company information is being verified by admin.',
                ], 401);
            }

            if($Employer->status == 3){
                return response()->json([
                    'status' => false,
                    'message' => 'Your company has been block by admin.',
                ], 401);
            }

            return response()->json([
                'status_code' => 200,
                'access_token' => $Employer->createToken($request['email'], ['emp'])->plainTextToken,
                'token_type' => 'Bearer',
                'role' => 'emp',
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function logout(Request $request) {
        auth()->user()->tokens()->delete();
        return [
            'message' => 'Logged out'
        ];
    }

    public function info(Request $request) {
        $temp1 = auth()->user()->toArray();
        $temp2= array("info_company" => auth()->user()->company,"role" => "emp");
        $result = array_merge($temp1, $temp2);
        return [
            'info' => $result
        ];
    }

    public function verifyAccount($token)
    {
        $verifyUser = EmployerVerify::where('token', $token)->first();

        $message = 'Sorry your email cannot be identified.';

        if(!is_null($verifyUser) ){
            $user = $verifyUser->employer;
            if(!$user->email_verified_at) {
                $verifyUser->employer->email_verified_at = now();
                $verifyUser->employer->save();
                $message = "Your e-mail is verified. You can now login.";
            } else {
                $message = "Your e-mail is already verified. You can now login.";
            }
        }

        return redirect(url(env('FRONT_END_URL').'/employer/login'));
    }
}