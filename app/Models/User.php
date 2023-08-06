<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    public $incrementing = false;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'name',
        'email',
        'password',
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

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public static function generateUserid(int $length = 8): string
    {
        $user_id = Str::random($length);//Generate random string
        $exists = DB::table('users')
            ->where('id', '=', $user_id)
            ->get(['id']);//Find matches for id = generated id
        if (isset($exists[0]->id)) {//id exists in users table
            return self::generateUserid();//Retry with another generated id
        }
        return $user_id;//Return the generated id as it does not exist in the DB
    }

    public static function userNameExists($name)
    {
        $userWithName = DB::table('users')->where('name', '=', $name)->first();
        if ($userWithName) {
            return true;
            // throw ValidationException::withMessages(['name' => 'Username already exists.']);
        }
        return false;
    }

    public static function userEmailExists($email)
    {
        $userWithEmail = DB::table('users')->where('email', '=', $email)->first();
        if ($userWithEmail) {
            // throw ValidationException::withMessages(['email' => 'Email already exists.']);\
            return true;
        }
        return false;
    }

    public static function get($email)
    {
        $userWithName = DB::table('users')->where('email', '=', $email)->first();
        if ($userWithName) {
            return $userWithName;
            // throw ValidationException::withMessages(['name' => 'Username already exists.']);
        }
        return false;
    }
}



