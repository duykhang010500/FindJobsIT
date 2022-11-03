<?php

namespace App\Http\Controllers\employer;
use App\Http\Controllers\Controller;
use App\Models\Employer;
use App\Models\Company;
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
        $data = [
            'title' => 'Mail from ItSolutionStuff.com',
            'body' => 'This is for testing email using smtp.'
        ];
        Mail::to('hieuvokt123@gmail.com')->send(new ContactMail($data));
        return [
            'mes'=> 'ok'
        ];
    }
    
}