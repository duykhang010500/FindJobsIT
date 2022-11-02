<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Mail;
use App\Mail\ContactMail;

class SendMail extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'title', 'content', 'reply_name', 'reply_email',
        'comp_id', 'emp_id', 'job_id', 'resume_id', 'mid', 'apply_id'
    ];

    public static function boot() {

        parent::boot();

        static::created(function ($item) {

            $adminEmail = "hieuvokt123@gmail.com";
            Mail::to($adminEmail)->send(new ContactMail($item));
        });
    }

}
