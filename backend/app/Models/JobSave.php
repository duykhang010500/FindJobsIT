<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class JobSave extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'member_saved';

    protected $fillable = [
        'member_id','job_id'
    ];

    public function member(){
        return $this->belongsTo(Member::class);
    }

    public function job(){
        return $this->belongsTo(Job::class);
    }

}
