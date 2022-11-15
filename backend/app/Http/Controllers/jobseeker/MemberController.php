<?php

namespace App\Http\Controllers\jobseeker;
use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\Resume;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator;
use Illuminate\Auth\Events\Registered;
class MemberController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware(['verified']);
    }

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
            ))->sendEmailVerificationNotification();
            event(new Registered($member));
            // $member->notify(new MemberRegisterRequest($member));
            // event(new Registered($member)); ->sendEmailVerificationNotification()
            return response()->json([
                'message' => ' send mail member successfully',
            ]);
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

            if (!Auth::guard('web')->attempt($validator->validated())) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
            if (!auth()->user()->hasVerifiedEmail()) {
                return response()->json(['error' => 'Please verify your email address before logging in.'], 401);
            }

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
        $id = auth()->user()->id;
        $info = Member::with('resume')->where('id',$id)->get();
        return [
            'info' => $info
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
            if(!empty(auth()->user()->id)){
                $member = Member::findOrFail(auth()->user()->id);
                $fields_member = Validator::make($request->all(), [
                    'fullname' => 'required|string|between:2,100',
                    'email' => 'string',
                    'phone' => 'required',
                    'birthday' => 'required',
                    'gender' => 'required',
                    'marital' => 'required',
                    'nationality' => 'required',
                    'city' => 'required',
                    'address' => 'required',
                    ]);

                $fields_resume = Validator::make($request->all(), [
                    'resume_file'  => 'required',
                    'resume_title' => 'required',
                    'industries'  => 'required',
                    'locations'  => 'required',
                    'level'  => 'required',
                    'current_degree'  => 'required',
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
                $member->update($fields_member->validated());
                $resume = auth()->user()->resume;

                if($resume != NULL){
                    if(!empty($request->industries)){
                        $resume->industries()->detach();
                        $data = explode(',', $request->industries);
                        foreach ($data as $key => $value) {
                            $value = (int)$value;
                            $resume->industries()->attach($value);
                            $resume->save();
                        }
                    }
                    if(!empty($request->locations)){
                        $resume->locations()->detach();
                        $data = explode(',', $request->locations);
                        foreach ($data as $key => $value) {
                            $value = (int)$value;
                            $resume->locations()->attach($value);
                            $resume->save();
                        }
                    }
                    $resume->update($fields_resume->validated());
                }else{
                    $resume = Resume::create(array_merge($fields_resume->validated()));
                    $member->resume_id = $resume->id;
                    $member->save();

                    if(!empty($request->industries)){
                        $data = explode(',', $request->industries);
                        foreach ($data as $key => $value) {
                            $value = (int)$value;
                            $resume->industries()->attach($value);
                            $resume->save();
                        }
                    }
                    if(!empty($request->locations)){
                        $data = explode(',', $request->locations);
                        foreach ($data as $key => $value) {
                            $value = (int)$value;
                            $resume->locations()->attach($value);
                            $resume->save();
                        }
                    }
                }
            }else{
                $fields_member = Validator::make($request->all(), [
                    'fullname' => 'required|string|between:2,100',
                    'email' => 'string',
                    'phone' => 'required',
                    'birthday' => 'required',
                    'gender' => 'required',
                    'marital' => 'required',
                    'nationality' => 'required',
                    'city' => 'required',
                    'address' => 'required',
                    ]);

                $fields_resume = Validator::make($request->all(), [
                    'resume_file'  => 'required',
                    'resume_title' => 'required',
                    'industries'  => 'required',
                    'locations'  => 'required',
                    'level'  => 'required',
                    'current_degree'  => 'required',
                    'yearofexperience' => 'required',
                    'salary_unit'  => 'required',
                    'working_type'  => 'required',
                ]);

                $new_password = \Str::random(10);
                $member = new Member;
                if($member->where('email',$request->email)->first())
                    return response()->json([
                        'message' => 'email exist',
                    ],500);
                $member->email = $request->email;
                $member->fullname = $request->fullname;
                $member->password = \Hash::make($new_password);
                $member->save();
                // dd($member);
                if ($fields_member->fails()) {
                    return response()->json($fields_member->errors(), 422);
                }

                if ($fields_resume->fails()) {
                    return response()->json($fields_resume->errors(), 422);
                }
                $member->update($fields_member->validated());
                

                if(!empty(auth()->user()->resume)){
                    $resume = auth()->user()->resume;
                    if(!empty($request->industries)){
                        $resume->industries()->detach();
                        $data = explode(',', $request->industries);
                        foreach ($data as $key => $value) {
                            $value = (int)$value;
                            $resume->industries()->attach($value);
                            $resume->save();
                        }
                    }
                    if(!empty($request->locations)){
                        $resume->locations()->detach();
                        $data = explode(',', $request->locations);
                        foreach ($data as $key => $value) {
                            $value = (int)$value;
                            $resume->locations()->attach($value);
                            $resume->save();
                        }
                    }
                    $resume->update($fields_resume->validated());
                }else{
                    $resume = Resume::create(array_merge($fields_resume->validated()));
                    $member->resume_id = $resume->id;
                    $member->save();

                    if(!empty($request->industries)){
                        $data = explode(',', $request->industries);
                        foreach ($data as $key => $value) {
                            $value = (int)$value;
                            $resume->industries()->attach($value);
                            $resume->save();
                        }
                    }
                    if(!empty($request->locations)){
                        $data = explode(',', $request->locations);
                        foreach ($data as $key => $value) {
                            $value = (int)$value;
                            $resume->locations()->attach($value);
                            $resume->save();
                        }
                    }
                }
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