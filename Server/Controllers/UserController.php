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

    public function processRequest()
    {
        switch ($this->requesMethod) {
            case 'GET':
                break;
            case 'POST':
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