<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Member extends Authenticatable implements MustVerifyEmail
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
        'followed', 'gender', 'have_resume', 'status','resume_id','city',
        'last_login', 'ratings', 'marital', 'is_labor', 'is_blacklist','edu_current_end',
        'phone','address', 'lastname', 'firstname', 'birthday', 'nationality', 'identity', 'avatar',
        'rexp_date_end','current_position','current_company','languages','rexp_current_end','edu_date_end', 'email_verified_at'
    ];

    protected $birthday = ['date'];

    protected $casts = [
        'email_verified_at' => 'datetime',
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

    public function resume()
    {
        return $this->belongsTo(Resume::class,'resume_id');
    }

}
