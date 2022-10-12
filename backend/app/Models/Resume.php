<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Resume extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'file_certifies','resume_title', 'industries','locations','summary', 'salary_unit', 'experiences', 'educations',
         'skills', 'references', 'file_link','resume_title','member_id',
         'file_content', 'job_benefits', 'social', 'languages', 'current_company', 'current_position', 'working_type',
         'is_refresh','search_status','current_degree_id', 'current_level_id', 'level_id','degree_id', 'yearofexperience',
          'numview', 'is_lock', 'salary_from', 'salary_to', 'resume_status', 'source_id', 'confirm',

    ];

    public function member()
    {
        return $this->hasOne(Member::class,'id','member_id');
    }


}