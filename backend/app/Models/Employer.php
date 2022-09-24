<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Employer extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'comp_id', 'fullname', 'lastname', 'firstname', 'phone', 'email', 'password', 'status', 'last_login', 'avatar'
    ];

    public function company()
    {
        return $this->hasOne(Company::class,'id','comp_id');
    }
}
