<?php
namespace App\Http\Controllers\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Session;
use App\Models\User;
use App\Models\UserVerify;
use Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\BaseHelpers\Input;
use App\Rules\AlphaNumericWithOneUnderscore;

class RegisterController extends Controller
{
    const GUEST = 0;
    const REGISTR = 1;          // View statistics
    const MODERATOR = 2;      // Answer comments, answer by questions, write, but not publish NEWS, cannot edit !himself materials
    const ENGINEER = 3;       // ^ Also can create and edit STUFF
    const ADMINISTRATOR = 4;  // ^ Also can create and Manage Users, can manage and create News 
    const SUPERUSER = 5;      // Can make all
    public static $roles = [
        self::GUEST => "GUEST",
        self::REGISTR => "REGISTERED",
        self::MODERATOR => "MODERATOR",
        self::ENGINEER => "ENGINEER",
        self::ADMINISTRATOR => "ADMIN",
        self::SUPERUSER => "SUPERUSER"
    ];

    public static $roleNames = [
        self::GUEST => "Гость",
        self::REGISTR => "Зарегистрированный",
        self::MODERATOR => "Модератор",
        self::ENGINEER => "Инженер",
        self::ADMINISTRATOR => "Админ",
        self::SUPERUSER => "СуперПользователь"
    ];
/**
* Write code on Method
*
* @return response()
*/
    public function index()
    {
        return view('public.auth.login');
    }  
    /**
    * Write code on Method
    *
    * @return response()
    */
    public function registration()
    {
        return view('public.auth.registration');
    }


    public function forget()
    {
    return view('public.auth.forget');
    }
    /**
    * Write code on Method
    *
    * @return response()
    */

    public function post_login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        //$credentials['password'] =  Hash::make($credentials['password']);

        $user = User::get($credentials['email']);
        if ($user == false){
            return response()->json(['message' => "Threre is no user founded."], 401);
        }
        $boo = Hash::check( $credentials['password'], $user->password);

        try {
            $val = Auth::attempt($credentials);
            if ($val) {
                // Authentication passed...
                $user = Auth::user();
                return response()->json(['user_id' => $user->id, 'token' => $user->api_token, 'message' => 'You are successfully logged in!.', 'code' => '0']); // Replace 'api_token' with your token column name
            } else {
                // Authentication failed...
                return response()->json(['message' => 'Wrong credentials.', 'code' => '1'], 500);
            }
        } catch (ValidationException $e) {
            // Handle validation errors (e.g., invalid credentials)
            return response()->json(['message' => $e->getMessage()], 401);
        } catch (\Exception $e) {
            // Handle other exceptions (e.g., database connection issues, server errors)
            return response()->json(['message' => 'Something went wrong. Please try again later.'], 500);
        }
    }

    public function generateApiToken()
    {
        $token = Str::random(80); // Generate an 80-character random string
        $this->api_token = hash('sha256', $token); // Hash the token before saving it
        $this->save();
        return $token;
    }

    public function post_registration(Request $request)
    {  
        
        $exName = User::userNameExists($request->name);
        $exMail = User::userEmailExists($request->email);
        if ($exMail || $exName){
            return response()->json(['message' => 'This credentials is already in use.', 'code' => '1'], 401);
        }
        $request->validate([
            'name' => ['required', 'string', 'max:65', 'unique:users', new AlphaNumericWithOneUnderscore],
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);


        // Create a new user
        $user = $this->create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
        ]);
        // Generate a token for email verification
        $token = Str::random(64);
        
        // Save the token in the UserVerify model
        UserVerify::create([
            'user_id' => $user->id, 
            'token' => $token,
        ]);
    
        // Send the verification email
        // Mail::send('email.emailVerificationEmail', ['token' => $token], function ($message) use ($request) {
        //     $message->to($request->email);
        //     $message->subject('Email Verification Mail');
        // });
    
        // Return a JSON response indicating success
        return response()->json(['message' => 'Registration successful. Please check your email for verification.', 'code' => '0'], 200);
    }


    public function old_postLogin(Request $request)
    {
        $request->validate([
        'email' => 'required|string',
        'password' => 'required|string',
        ]);
        // a crutch, that loads email if user entered true login
        // then login by email
        $username = $request->only('email')['email'];
        $credentials = $request->only('email', 'password');
        if (!str_contains( $username, '@')){
            $credentials = ['login' => $username, 'password' => $credentials['password']];
        }
        if (Auth::attempt($credentials)) {
            return redirect()->intended('apps/splmod/downloads/')
        ->withSuccess('You have Successfully loggedin');
        }
        if (!$request->session()->has('user_login_attempts')){
            $request->session()->put('user_login_attempts', 0);
        } else {
            $n = $request->session()->get('user_login_attempts') + 1;
            $request->session()->put('user_login_attempts', $n);
        }
        $recall = (object) array();
        $recall->message = 'Неверные логин или пароль.<br>Попробуйте ещё раз.';
        $recall->count = $request->session()->get('user_login_attempts');
        $recall->block = 0;
        if ($request->session()->get('user_login_attempts') > 30){

            $recall->message =  'Лимит попыток входа исчерпан. Зайдите позже.';
            $recall->block = 1;
        }

        return view('public.auth.login')->with('recall', $recall);
        
    }
    /**
    * Write code on Method
    *
    * @return response()
    */



    public function old_postRegistration(Request $request)
    {  
        $request->validate([
        'name' => 'required',
        'email' => 'required|email|unique:users',
        'password' => 'required|min:6',
        ]);
        $data = $request->all();
        $createUser = $this->create($data);
        $token = Str::random(64);
        UserVerify::create([
        'user_id' => $createUser->id, 
        'token' => $token
        ]);
        Mail::send('email.emailVerificationEmail', ['token' => $token], function($message) use($request){
        $message->to($request->email);
        $message->subject('Email Verification Mail');
        });
        return redirect("index")->withSuccess('Great! You have Successfully loggedin');
    }
    /**
    * Write code on Method
    *
    * @return response()
    */
    public function dashboard()
    {
        if(Auth::check()){
        return view('dashboard');
        }
        return redirect("index")->withSuccess('Opps! You do not have access');
    }
    /**
    * Write code on Method
    *
    * @return response()
    */
    protected function create(array $data)
    {
        return User::create([
            'id' => User::generateUserid(),
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }
    /**
    * Write code on Method
    *
    * @return response()
    */
    public function post_logout() {
        $user = Auth::user();
        Session::flush();
        Auth::logout();
        return response()->json(['message' => 'You are successfully logout.', 'code' => '0'], 200);
    }
    /**
    * Write code on Method
    *
    * @return response()
    */
    public function verifyAccount($token)
    {
        $verifyUser = UserVerify::where('token', $token)->first();
        $message = 'Sorry your email cannot be identified.';
        if(!is_null($verifyUser) ){
        $user = $verifyUser->user;
        if(!$user->is_email_verified) {
        $verifyUser->user->is_email_verified = 1;
        $verifyUser->user->save();
        $message = "Your e-mail is verified. You can now login.";
        } else {
        $message = "Your e-mail is already verified. You can now login.";
        }
        }
        return redirect()->route('login')->with('message', $message);
    }




    public function CheckLoginDuplicates(Request $request, $value)
    {
        $value = Input::filterMe("URL", $value, 40);
        $response = (object) array();
        $response->message = "true";
        if (strlen($value) < 5) {
            return true;
        }
        /// Prevent numerous calls
        if (!$request->session()->has('checkCount')){
            $request->session()->put('checkCount', 0);
        } else {
            $n = $request->session()->get('checkCount') + 1;
            $request->session()->put('checkCount', $n);
        }
            if ($request->session()->get('checkCount') == 100){
                die(true);
            }
        $response->count = $request->session()->get('checkCount');
        //$response->message = UsersDB::CheckLoginDuplicates($value);
        return json_encode($response);
    }


    public function CheckEmailDuplicates(Request $request, $value)
    {
        $value = Input::filterMe("EMAIL", $value, 40);
        $response = (object) array();
        $response->message = "true";
        if (strlen($value) < 5) {
            return true;
        }
        /// Prevent numerous calls
        if (!$request->session()->has('checkCount')){
            $request->session()->put('checkCount', 0);
        } else {
            $n = $request->session()->get('checkCount') + 1;
            $request->session()->put('checkCount', $n);
        }
            if ($request->session()->get('checkCount') == 100){
                die(true);
            }
        $response->count = $request->session()->get('checkCount');
        //$response->message = UsersDB::CheckMailDuplicates($value);
        return json_encode($response);
    }

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

}


?>