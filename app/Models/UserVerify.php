<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UserVerify extends Model
{
    use HasFactory;
    public $table = "users_verify";
   
    /**
     * Write code on Method
     *
     * @return response()
     */
    protected $fillable = [
        'user_id',
        'token',
    ];
   
    /**
     * Write code on Method
     *
     * @return response()
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function create($array)
    {
        try {
            DB::table('user_verifies')->insert([
                'user_id' => $array['user_id'],
                'token' =>  $array['token']
            ]);
        } catch (\Exception $e) {
            // Handle the error here
            // For example, you can log the error or return a custom error message
            // You can also re-throw the exception if you want to let it propagate further
            // throw $e;
            // For now, let's log the error message and return false to indicate the error
            \Log::error('Error during user verification creation: ' . $e->getMessage());
            return false;
        }

        return true;
    }
}
