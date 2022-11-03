<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Mail;
use App\Mail\ContactMail;

class SendMail extends Model
{

    protected $fillable = [
        'title', 'content',
        'comp_id', 'emp_id', 'job_id', 'resume_id', 'mid', 'apply_id'
    ];

    protected $table = 'send_mail';

}
