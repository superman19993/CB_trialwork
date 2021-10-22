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
                    return http_response_code(400);
                }

                if (!$this->userModel->checkPassword($username, $password)) {
                    echo json_encode(array('message' => 'Username or password is invalid'));
                    return http_response_code(400);
                }
                $_SESSION['id'] = $user['id'];

                setcookie("token", $user['id'], time() + 7200);

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

            $foundUser = $this->userModel->findUserByUsername($username);

            $_SESSION['id'] = $foundUser['id'];



            echo json_encode($createdUser);
        } catch (Exception $e) {
            echo json_encode(array('message' => "$e"));
            return http_response_code(500);
        }
    }

    public function loadUser()
    {
        $uid = isset($_REQUEST['uid']) ? $_REQUEST['uid'] : '';
        if (true) {
            $user_id = $uid;
            $foundUser = $this->userModel->findUserById($user_id);
            echo json_encode($foundUser);
            return;
        }
        echo "Not authorize";
    }


    public function logout()
    {
        session_start();
        session_unset();
        echo json_encode(array('message' => 'Logged out'));
    }

    public function processRequest($type)
    {
        switch ($this->requesMethod) {
            case 'GET':
                if ($type === "logout") {
                    $this->logout();
                } else if ($type === "loaduser") {
                    $this->loadUser();
                }
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