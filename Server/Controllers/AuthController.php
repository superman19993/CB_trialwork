<?php

class AuthController extends BaseController
{

    private $requesMethod;

    public function __construct($method)
    {
        $this->loadModel('UserModel');
        $this->userModel = new UserModel;
        $this->requesMethod = $method;
        session_start();
    }

    public function login()
    {

        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        $username = isset($input['username']) ? $input['username'] : '';
        $password = isset($input['password']) ? $input['password'] : '';

        try {
            if ($username != '' && $password != '') {
                $user = $this->userModel->login($username, $password);

                if (!$user) {
                    echo json_encode(array('message' => 'Wrong username or password provided'));
                }

                if (!$this->userModel->checkPassword($username, $password)) {
                    echo json_encode(array('message' => 'Username or password is invalid'));
                    return http_response_code(400);
                }
                $_SESSION['id'] = $user['id'];

                echo json_encode($user);
            } else {
                echo json_encode(array('message' => 'input or password is not provided'));
                return http_response_code(400);
            }
        } catch (Exception $e) {
            echo json_encode(array('message' => "$e"));
            return http_response_code(500);
        }
    }

    public function register()
    {
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        $username = isset($input['username']) ? $input['username'] : '';
        $email = isset($input['email']) ? $input['email'] : '';
        $password = isset($input['password']) ? $input['password'] : '';
        $confirmPassword = isset($input['confirmPassword']) ? $input['confirmPassword'] : '';


        try {
            $foundUser = $this->userModel->findUserByUsername($username);
            if ($foundUser > 0) {
                echo json_encode(array('message' => "Username or password is unvalid!!"));
                return http_response_code(400);
            }

            if ($password !== $confirmPassword) {
                echo json_encode(array('message' => "Password not match!!"));
                return http_response_code(400);
            }

            $hash = password_hash($password, PASSWORD_DEFAULT);

            $createdUser = $this->userModel->register($email, $username, $hash);

            echo json_encode($createdUser);
        } catch (Exception $e) {
            echo json_encode(array('message' => "$e"));
            return http_response_code(500);
        }
    }


    public function logOut()
    {
        unset($_SESSION['username']);
        echo json_encode(array('message' => 'Logged out'));
    }

    public function processRequest($type)
    {
        switch ($this->requesMethod) {
            case 'GET':
                $this->logOut();
                break;
            case 'POST':
                if ($type === "login") {
                    $this->login();
                } else if ($type === "register") {
                    $this->register();
                }
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