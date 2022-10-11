<?php

namespace App\Http\Controllers\jobseeker;
use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator;
class MemberController extends Controller
{
    //

    public function register(Request $request)
    {
        //
        $fields_member = Validator::make($request->all(), [
            'fullname' => 'required|string|between:2,100',
            'email' => 'required|string|unique:members,email',
            'password' => 'required|string|confirmed|min:6',
        ]);


        if ($fields_member->fails()) {
            return response()->json($fields_member->errors(), 422);
        }
        $member = Member::create(array_merge(
            $fields_member->validated(),
            ['password' => bcrypt($request->password),
             'status' => 1,
            ]
        ));


        if($member){
            $member->save();
            return response()->json([
                'message' => ' Register member successfully',
                'role' => 'member',
                'member' => $member
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

            $member = Member::where('email', $request->email)->first();

            if (!Hash::check($request->password, $member->password, []))
                return response()->json([
                    'message' => 'error login',
                ]);

            $tokenResult = $member->createToken($request['email'], ['member'])->plainTextToken;

            return response()->json([
                'message' => ' Login member successfully',
                'status_code' => 200,
                'access_token' => $tokenResult,
                'token_type' => 'Bearer',
                'role' => 'member',
            ]);
    }

    public function info(Request $request) {
        return [
            'info' => auth()->user()
        ];
    }

    public function logout(Request $request) {
        auth()->user()->tokens()->delete();
        return [
            'message' => 'Logged out'
        ];
    }

}