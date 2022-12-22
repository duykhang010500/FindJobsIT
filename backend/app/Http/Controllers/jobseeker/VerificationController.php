<?php

namespace App\Http\Controllers\jobseeker;
use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\Candidate;
use App\Models\Company;
use App\Models\Resume;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator;
class VerificationController extends Controller
{
    //
    public function __invoke(Request $request): RedirectResponse
    {
        $user = Member::find($request->route('id'));

        if ($user->hasVerifiedEmail()) {
            return redirect('localhost:3000/login');
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        return redirect('localhost:3000/login');
    }

    public function verify_user($id, Request $request) {
        if (!$request->hasValidSignature()) {
            return response()->json(["msg" => "Invalid/Expired url provided."], 401);
        }

        $user = Member::findOrFail($id);

        if (!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
        }
        // return response()->json(["url" => "localhost:3000/login"]);
        return redirect(url(env('FRONT_END_URL').'/login'));
    }

    public function resend() {
        if (auth()->user()->hasVerifiedEmail()) {
            return response()->json(["msg" => "Email already verified."], 400);
        }

        auth()->user()->sendEmailVerificationNotification();

        return response()->json(["msg" => "Email verification link sent on your email id"]);
    }

}