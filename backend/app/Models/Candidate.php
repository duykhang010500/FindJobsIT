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
        'job_id', 'member_id', 'resume_id', 'resume_file', 'resume_online', 'letter_content',
        'comp_id', 'ratings', 'rating', 'apply_nonmember','status','date_apply'
    ];
    protected $casts  = [ 'resume_file' => 'array'];

    public function member()
    {
        return $this->belongsTo(Member::class,'member_id');
    }

    public function job()
    {
        return $this->belongsTo(Job::class,'job_id');
    }

    public function resume()
    {
        return $this->belongsTo(Resume::class,'resume_id');
    }

    public function company()
    {
        return $this->belongsTo(Company::class,'comp_id');
    }

}
