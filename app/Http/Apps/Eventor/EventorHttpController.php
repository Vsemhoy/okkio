<?php
namespace App\Http\Apps\Eventor;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\Http\Controllers\Objects\SideMenuItem;
use App\Http\Controllers\Base\Input;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Components\Budger\BudgerTemplates;
use App\Http\Controllers\Components\Budger\BudgerData;
use DateTime;
use Illuminate\Support\Facades\Auth;


class EventorHttpController extends BaseController
{   
  const REMOTE_HOST_TOKEN = "kd5sjjkqrjke365jqrkj65kjejJJKD356JDjg89k3fjgf";
  const REMOTE_SERVICE_NAME = "localhost";
  
  public static function makeTask($getArray, $userId){
    $obj = (object) array();
    $obj->user = $userId;
    $obj->tasks = $getArray;
    return $obj;
  }

  public function postCall(Request $request)
  {
    //return "HELLO DADDY!";
    //return $_SESSION['LoggedUser'];
    // if (empty($request->code))
    // {
    //   return "WRONG CODE NUMBER";
    // }

  //   $user = User::where('id', '=', session('LoggedUser'))->first();

    $user = Auth::user()->id;
    
    $code = $request->code;
    $json =  file_get_contents('php://input');
    $data = json_decode($json);

    $task = self::makeTask($data, $user);



  


    $url = 'http://microservice?remoteservice=' . self::REMOTE_SERVICE_NAME;

    // Create a new cURL resource
    $ch = curl_init($url);
    
    $payload = json_encode($task);
    
    // Attach encoded JSON string to the POST fields
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    
    // Set the content type to application/json
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
      'Content-Type: application/json',
      'Authorization: TelePost ' . self::REMOTE_HOST_TOKEN // Include the token in the header
    ));
    

    // Return response instead of outputting
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    // Execute the POST request
    $result = curl_exec($ch);
    
    // Check for cURL errors
    if (curl_errno($ch)) {
      // Handle error here (e.g., log or return an error message)
      echo 'cURL error: ' . curl_error($ch);
    }
    // Close cURL resource
    curl_close($ch);
    print_r($result);

    //print_r($obj);
    return;

  //   if ($user == null || empty($user)) // 
  //   {
  //     return false;
  //   }
  //   //return $data->name;
  //  //return $_REQUEST['code'];

  //   /// ------- CREATE NEW ITEMS ------------ ///
  //   if ($code == 100)
  //   {
  //     // returns plain integer of item ID
    
  //   }

  }



};

/*
{
  "user":"7",
  "tasks": [
{
"action": "1",
"type": "event",
"objects": [],
"where": [{"column": "user","value": "7","operator": "="},{"column": "pinned","value": "1","operator": "="}],
"order": "0",
"limit": "12",
"offset": "0",
"setKey": "id",
"postactions": []
}
]
}
*/