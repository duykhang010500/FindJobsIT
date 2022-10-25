<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Job extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'title',  'job_description','code', 'title','job_requirement','job_description',
         'notes', 'salary', 'keywords', 'contact_name', 'image', 'address', 'company_name',
         'job_type','level','degree', 'exp', 'exp_from', 'exp_to', 'gender', 'salary_from', 'salary_to',
         'candidate_amount', 'age_from', 'age_to', 'applied', 'comp_id', 'unskill_job', 'hide_salary',
         'industries', 'locations', 'job_benefits','end_date','status','contact_emails'
    ];

    // public function user(){
    //     return $this->belongsTo(Employer::class);
    // }
    public function industries(){
        return $this->belongsToMany(Industry::class);
    }

    public function locations(){
        return $this->belongsToMany(Location::class);
    }

    public function company()
    {
        return $this->belongsTo(Company::class,'comp_id');
    }
}
