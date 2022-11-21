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

    const   STATUS_CLOSED = 0,
            STATUS_PUBLISHED = 1;

    protected $fillable = [
        'resume_file','resume_title','summary', 'salary_unit', 'experiences', 'educations',
         'skills', 'references', 'file_link','resume_title','edu_description','edu_current_end','edu_date_end',
         'edu_date_start','edu_certify','edu_school','rexp_current_end','rexp_description','rexp_date_end',
         'rexp_date_start','rexp_company','rexp_title','cv_type',
         'file_content', 'job_benefits', 'social', 'languages', 'current_company', 'current_position', 'working_type',
         'is_refresh','search_status','current_degree', 'current_level', 'level','degree', 'yearofexperience',
          'numview', 'is_lock', 'salary_from', 'salary_to', 'resume_status', 'source_id', 'confirm',

    ];

    public function member()
    {
        return $this->hasOne(Member::class);
    }

    public function candidate()
    {
        return $this->hasOne(Candidate::class);
    }

    public function industries(){
        return $this->belongsToMany(Industry::class);
    }

    public function locations(){
        return $this->belongsToMany(Location::class);
    }

    public function skills(){
        return $this->belongsToMany(Skill::class);
    }

}