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

    public function employer(){
        return $this->belongsTo(Employer::class,'emp_id');
    }

    public function company(){
        return $this->belongsTo(Company::class,'comp_id');
    }

    public function job(){
        return $this->belongsTo(Job::class,'job_id');
    }

    public function resume(){
        return $this->belongsTo(Resume::class,'resume_id');
    }

    public function member(){
        return $this->belongsTo(Member::class,'mid');
    }

    public function candidate(){
        return $this->belongsTo(Candidate::class,'apply_id');
    }

}
