<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Skill extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'skills';

    protected $fillable = [
        'priority', 'status','name'
    ];

    public function jobs(){
        return $this->belongsToMany(Job::class);
    }

    public function resumes(){
        return $this->belongsToMany(Resume::class);
    }

}
