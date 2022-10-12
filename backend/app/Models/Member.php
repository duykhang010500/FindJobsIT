<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Member extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'fullname',
        'email',
        'password',
        'followed', 'gender', 'ctid', 'source', 'have_resume', 'status',
        'last_login', 'ratings', 'marital', 'source_id', 'expected_position', 'is_labor', 'is_blacklist',
        'phone','address', 'lastname', 'firstname', 'birthday', 'nationality', 'identity', 'images',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function candidate(){
        return $this->hasMany(Candidate::class);
    }

    public function resume(){
        return $this->belongsToMany(Resume::class);
    }

}
