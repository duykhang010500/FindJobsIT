<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class EmployerFolder extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'employer_folders';

    protected $fillable = [
        'name', 'emp_id' ,'comp_id' , 'type_id', 'is_private'
    ];

    public function employer(){
        return $this->belongsTo(Employer::class,'emp_id');
    }

    public function company(){
        return $this->belongsTo(Company::class,'comp_id');
    }

}