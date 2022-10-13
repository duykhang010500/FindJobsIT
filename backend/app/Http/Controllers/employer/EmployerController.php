<?php

namespace App\Http\Controllers\employer;
use App\Http\Controllers\Controller;
use App\Models\Employer;
use App\Models\Company;
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
                'industry_id' => 'required',
                'location'  => 'required',
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


            $credentials = request(['email', 'password']);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }

            $Employer = Employer::where('email', $request->email)->first();

            if (!$Employer || !Hash::check($request->password, $Employer->password, []))
                return response()->json([
                    'status' => false,
                    'message' => 'Email & Password does not match with our record.',
                ], 401);

            $tokenResult = $Employer->createToken($request['email'], ['emp'])->plainTextToken;

            return response()->json([
                'status_code' => 200,
                'access_token' => $tokenResult,
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
}