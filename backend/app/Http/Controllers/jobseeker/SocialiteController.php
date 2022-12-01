<?php

namespace App\Http\Controllers\jobseeker;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Socialite;
use Exception;
use App\Models\Member;
use Auth;
use Illuminate\Http\Response;
class SocialiteController extends Controller
{
    //
    public function redirectToGoogle()
    {
        try {
            $url = Socialite::driver('google')->stateless()
                ->redirect()->getTargetUrl();
            return response()->json([
                'url' => $url,
            ])->setStatusCode(Response::HTTP_OK);
        } catch (\Exception $exception) {
            return $exception;
        }
    }

    public function handleGoogleCallback()
    {
        try {
            $user = Socialite::driver('google')->stateless()->user();

            $finduser = Member::where('google_id', $user->id)->first();
            // dd($finduser);
            if($finduser){
                $token =  $finduser->createToken($user->email, ['member'])->plainTextToken;
                return response()->json([
                    'status' => __('google sign in successful'),
                    'token' => $token
                ], Response::HTTP_CREATED);
            }else{
                $newUser = Member::updateOrCreate(['email' => $user->email],[
                        'fullname' => $user->name,
                        'google_id'=> $user->id,
                        'status' => 1,
                        // 'password' => encrypt('123456')
                    ]);
                $token =  $newUser->createToken($user->email, ['member'])->plainTextToken;
                return response()->json([
                    'status' => __('google sign in successful'),
                    'token' => $token
                ], Response::HTTP_CREATED);
                return redirect(url(env('GOOGLE_REDIRECT_URI')));
            }
        } catch (Exception $e) {
            dd($e->getMessage());
        }
    }
}
