<?php

namespace App\Http\Controllers\jobseeker;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use App\Models\Member;
use Illuminate\Http\Request;
use App\Models\PasswordReset;
use App\Notifications\ResetPasswordRequest;
use Str,Validator;

class ResetPasswordController extends Controller
{
    /**
     * Create token password reset.
     *
     * @param  ResetPasswordRequest $request
     * @return JsonResponse
     */
    public function sendMail(Request $request)
    {
        $fields = Validator::make($request->all(), [
          'email' =>'required',
          ]);

        if ($fields->fails()) {
            return response()->json($fields->errors(), 422);
        }

        $user = Member::where('email', $request->email)->firstOrFail();
        // dd($user->email);
        if($user){
            $passwordReset = PasswordReset::updateOrCreate([
                'email' => $user->email,
            ], [
                'token' => Str::random(60),
            ]);
            if ($passwordReset) {
                $temp = array(
                    'token' => $passwordReset->token,
                    'role' => 'member'
                );
                $user->notify(new ResetPasswordRequest($temp));
            }

            return response()->json([
            'message' => 'We have e-mailed your password reset link!'
            ]);
        }else{
            return response()->json([
                'message' => 'Email does not match with our record.'
                ]);
        }
    }

    public function reset(Request $request)
    {
        $token = $request->query('token');
        // dd($token);
        $passwordReset = PasswordReset::where('token', $token)->first();

        if (Carbon::parse($passwordReset->updated_at)->addMinutes(720)->isPast()) {
            $passwordReset->delete();
            return response()->json([
                'message' => 'This password reset token is invalid.',
            ], 422);
        }
        $member = Member::where('email', $passwordReset->email)->first();
        $fields = Validator::make($request->all(), [
            'password' => 'required|confirmed'
            ]);
        if ($fields->fails()) {
            return response()->json($fields->errors(), 422);
        }

        if($request->password){
            $member->update(array_merge($fields->validated(),['password' => \Hash::make($request->password)]));
        }
        // $member->password = bcrypt($request->password);
        // $member->save();
        // $passwordReset->delete();

        return response()->json([
            'message' => 'Reset password successfully',
        ]);
    }
}
