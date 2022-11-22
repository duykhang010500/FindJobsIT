<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Experience extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'rexp_title', 'rexp_company', 'rexp_date_start', 'rexp_date_end', 'rexp_current_end'
        , 'rexp_description', 'resume_id'
    ];

    public function resume()
    {
        return $this->belongsTo(Resume::class,'resume_id');
    }
}
