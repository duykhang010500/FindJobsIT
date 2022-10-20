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
        try {
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
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required|string|min:6',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }

            $member = Member::where('email', $request->email)->first();

            if(!$member)
                return response()->json([
                    'status' => false,
                    'message' => 'Email does not match with our record.',
                ], 401);
            if (!Hash::check($request->password, $member->password, []))
                return response()->json([
                    'status' => false,
                    'message' => 'Password does not match with our record.',
                ], 401);

            return response()->json([
                'status' => true,
                'message' => 'Member Logged In Successfully',
                'token' => $member->createToken($request['email'], ['member'])->plainTextToken,
                'role' => 'member'
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }

    }

    public function info(Request $request) {
        $temp1 = auth()->user()->toArray();
        $temp2= array(
            "info_company" => auth()->user()->location->name,
            "info_level" => auth()->user()->level->name,
            "info_level" => auth()->user()->degree->name,
            "role" => "member");
        $result = array_merge($temp1, $temp2);
        return [
            'info' => $result
        ];
    }

    public function logout(Request $request) {
        auth()->user()->tokens()->delete();
        return [
            'message' => 'Logged out'
        ];
    }

    public function quickupload(Request $request)
    {
        try{
            $fields_member = Validator::make($request->all(), [
                'fullname' => 'required|string|between:2,100',
                'email' => 'string',
                'phone' => 'required',
                'birthday' => 'required',
                'gender' => 'required',
                'marital' => 'required',
                'nationality' => 'required',
                'ctid' => 'required',
                'address' => 'required',
                ]);

            $fields_resume = Validator::make($request->all(), [
                'resume_file'  => 'required',
                'resume_title' => 'required',
                'industries'  => 'required',
                'locations'  => 'required',
                'level_id'  => 'required',
                'current_level_id'  => 'required',
                'yearofexperience' => 'required',
                'salary_unit'  => 'required',
                'working_type'  => 'required',
            ]);

            if ($fields_member->fails()) {
                return response()->json($fields_member->errors(), 422);
            }

            if ($fields_resume->fails()) {
                return response()->json($fields_resume->errors(), 422);
            }
            dd($request->email);
            $member = Member::findOrFail(auth()->user()->id);
            $member->update($fields_member->validated());
            $resume = auth()->user()->resume;

            if($resume != NULL){
                $resume->update($fields_resume->validated());
            }else{
                $resume = Resume::create(array_merge($fields_resume->validated()));
                $member->resume_id = $resume->id;
                $member->save();
            }

            if($member && $resume){
                return response()->json([
                    'member' => $member,
                    'resume' => $resume,
                ]);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

}