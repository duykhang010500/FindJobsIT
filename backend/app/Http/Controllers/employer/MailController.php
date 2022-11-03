<?php

namespace App\Http\Controllers\employer;
use App\Http\Controllers\Controller;
use App\Models\SendMail;
use App\Models\Company;
use App\Models\Candidate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator;
use Mail;
use App\Mail\ContactMail;
class MailController extends Controller
{
    //
    public function sendMailJSK(Request $request) {

        $fields = Validator::make($request->all(), [
            'title' => 'required',
            'content' => 'required',
            'apply_id' => 'required',
            // 'send_from' => 'required',
        ]);

        if ($fields->fails()) {
            return response()->json($fields->errors(), 422);
        }
        $data = [
            'title' => $request->title,
            'content' => $request->content,
            'send_from' => auth()->user()->company->name,
            'apply_id' =>  $request->apply_id,
        ];

        Mail::to(auth()->user()->email)->send(new ContactMail($data));

        $candidate = Candidate::with('resume','job','company','member')->where('id',$request->apply_id)->first();
        $sendmail = SendMail::create(array_merge(
            $fields->validated(),
            ['comp_id' => auth()->user()->company->id,'emp_id' => auth()->user()->id,
             'job_id' => $candidate->job->id, 'resume_id'=> $candidate->resume->id, 'mid' => $candidate->member->id,

            ]
        ));

        return [
            'mes'=> 'send mail candidate',
            'info_sendmail' => $sendmail
        ];
    }

}