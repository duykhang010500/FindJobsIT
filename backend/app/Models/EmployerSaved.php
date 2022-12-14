<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class EmployerSaved extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'employer_saved';

    protected $fillable = [
        'resume_id' ,'comp_id' , 'employer_folder_id', 'emp_id','member_id'
    ];

    public function resume(){
        return $this->belongsTo(Resume::class);
    }

    public function company(){
        return $this->belongsTo(Company::class,'comp_id');
    }

    public function EmployerFolders(){
        return $this->belongsTo(EmployerFolder::class,'employer_folder_id');
    }

    public function employer(){
        return $this->belongsTo(Employer::class, 'emp_id');
    }

    public function member(){
        return $this->belongsTo(Member::class);
    }

}
