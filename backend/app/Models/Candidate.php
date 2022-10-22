<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Candidate extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'jobs_apply';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'job_id', 'member_id', 'resume_id', 'resume_file', 'attach_file', 'letter_content',
        'comp_id', 'ratings', 'rating', 'apply_nonmember','status'
    ];
    protected $casts  = [ 'resume_file' => 'array'];

    public function member()
    {
        return $this->hasOne(Member::class,'id','member_id');
    }

    public function job()
    {
        return $this->hasOne(Job::class,'id','job_id');
    }

    // public function resume()
    // {
    //     return $this->hasOne(Resume::class,'id','resume_id');
    // }

}
