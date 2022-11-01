<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class EmployerFolder extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'employer_folders';

    protected $fillable = [
        'name', 'emp_id' ,'comp_id' , 'type_id', 'is_private'
    ];

    public function EmployerSaved(){
        return $this->hasMany(EmployerSaved::class);
    }


    public function company(){
        return $this->belongsTo(Company::class,'comp_id');
    }

    // public function employer_save(){
    //     return $this->hasMany(EmployerSave::class);
    // }

}
