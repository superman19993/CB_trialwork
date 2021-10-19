<?php

class UserController extends BaseController
{

    private $requesMethod;

    public function __construct($method)
    {
        $this->loadModel('UserModel');
        $this->userModel = new UserModel;
        $this->requesMethod = $method;
        session_start();
    }

    public function getUserInfo(){

        $input= (array) json_decode(file_get_contents('php://input'), TRUE);
        $username= isset($input['username']) ? $input['username']: '';
        $password= isset($input['password']) ? $input['password']: '';

        if ($username != '' && $password != '') {
            $user= $this->userModel->login($username, $password);
            if ($user){
                $_SESSION['username']= $user['username'];
                echo json_encode($user);
            }   
            else echo json_encode(array('message'=> 'Wrong username or password provided'));
        } else {
            echo json_encode(array('message'=>'input or password is not provided'));
            return http_response_code(400);
        }
    }   


    public function logOut(){
        unset($_SESSION['username']);
        echo json_encode(array('message'=> 'Logged out'));
    }

    public function processRequest()
    {
        switch ($this->requesMethod) {
            case 'GET':
                $this->logOut();
                break;
            case 'POST':
                $this->getUserInfo();
                break;
            case 'PUT':
                break;
            case 'DELETE':
                break;
            default:
                echo "Response not found!";
                break;
        }
    }
}