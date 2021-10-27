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

    //Get: http://localhost/practice2/Server/index.php/user?workspaceId={number}
    public function readUsersByWorkspaceId()
    {
        $workspaceId= isset($_REQUEST['workspaceId']) ? $_REQUEST['workspaceId']:'';
        if ($workspaceId<=0) 
        {
            echo json_encode(array('message'=>'Invalid workspace id.'));
            return http_response_code(400);
        }
        $users= $this->userModel->getUsersByWorkspaceId($workspaceId);
        if (!$users) {
            $response['data']= [];
            $response['message']= 'No users found.';
            echo json_encode($response);
            die;
        }
        $response['data'] = $users;
        $response['message'] = 'Success';
        echo json_encode($response);
    }
    
    //Get: http://localhost/practice2/Server/index.php/user?cardId={number}
    public function readUsersByCardId()
    {
        $cardId= isset($_REQUEST['cardId']) ? $_REQUEST['cardId']:'';
        if ($cardId<=0) 
        {
            echo json_encode(array('message'=>'Invalid card id.'));
            return http_response_code(400);
        }
        $users= $this->userModel->getUsersByCardId($cardId);
        if (!$users) {
            $response['data']= [];
            $response['message']= 'No users found.';
            echo json_encode($response);
            die;
        }
        $response['data'] = $users;
        $response['message'] = 'Success';
        echo json_encode($response);
    }

    //POST: http://localhost/practice2/Server/index.php/user?userId={number}&workspaceId={number}
    public function addUserToWorkspace(){
        $workspaceId= isset($_REQUEST['workspaceId']) ? $_REQUEST['workspaceId']:'';
        $userId= isset($_REQUEST['userId']) ? $_REQUEST['userId']:'';
        if ($workspaceId<=0 || $userId <=0) 
        {
            echo json_encode(array('message'=>'Invalid parameters.'));
            return http_response_code(400);
        }
        $user= $this->userModel->findUserById($userId);
        $workspace = $this->userModel->findWorkspaceById($workspaceId);
        if (!$user || !$workspace) {
            echo json_encode(array('message' => 'User or Workspace not found'));
            return http_response_code(404);
        };
        // check if user has already in the workspace
        $user= $this->userModel->findUserInWorkspace($workspaceId, $userId);
        if ($user) {
            echo json_encode(array('message' => 'User has already in the workspace'));
            die;
        };
        $this->userModel->createUserToWorkspace($workspaceId, $userId);
        $response['message'] = 'Success';
        echo json_encode($response);
    }

    //POST: http://localhost/practice2/Server/index.php/user?userId={number}&cardId={number}
    public function addUserToCard(){
        $cardId= isset($_REQUEST['cardId']) ? $_REQUEST['cardId']:'';
        $userId= isset($_REQUEST['userId']) ? $_REQUEST['userId']:'';
        if ($cardId<=0 || $userId <=0) 
        {
            echo json_encode(array('message'=>'Invalid parameters.'));
            return http_response_code(400);
        }
        $user= $this->userModel->findUserById($userId);
        $card = $this->userModel->findCardById($cardId);
        if (!$user || !$card) {
            echo json_encode(array('message' => 'User or Card not found'));
            return http_response_code(404);
        };

        // check if user has already in the card
        $user= $this->userModel->findUserInCard($cardId, $userId);
        if ($user) {
            echo json_encode(array('message' => 'User has already in the card'));
            die;
        };
        $this->userModel->createUserToCard($cardId, $userId);
        $response['message'] = 'Success';
        echo json_encode($response);
    }

    //DELETE: http://localhost/practice2/Server/index.php/user?userId={number}&workspaceId={number}
    public function deleteUserInWorkspace(){
        $workspaceId= isset($_REQUEST['workspaceId']) ? $_REQUEST['workspaceId']:'';
        $userId= isset($_REQUEST['userId']) ? $_REQUEST['userId']:'';
        if ($workspaceId<=0 || $userId <=0) 
        {
            echo json_encode(array('message'=>'Invalid parameters.'));
            return http_response_code(400);
        }
        $user= $this->userModel->findUserInWorkspace($workspaceId, $userId);
        if (!$user) {
            echo json_encode(array('message' => 'User not found'));
            return http_response_code(404);
        };
        $this->userModel->removeUserInWorkspace($workspaceId, $userId);
        $response['message'] = 'Success';
        echo json_encode($response);
    }

    //DELETE: http://localhost/practice2/Server/index.php/user?userId={number}&cardId={number}
    public function deleteUserInCard(){
        $cardId= isset($_REQUEST['cardId']) ? $_REQUEST['cardId']:'';
        $userId= isset($_REQUEST['userId']) ? $_REQUEST['userId']:'';
        if ($cardId<=0 || $userId <=0) 
        {
            echo json_encode(array('message'=>'Invalid parameters.'));
            return http_response_code(400);
        }
        $user= $this->userModel->findUserInCard($cardId, $userId);
        if (!$user) {
            echo json_encode(array('message' => 'User not found'));
            return http_response_code(404);
        };
        $this->userModel->removeUserInCard($cardId, $userId);
        $response['message'] = 'Success';
        echo json_encode($response);
    }


    public function processRequest()
    {
        switch ($this->requesMethod) {
            case 'GET':
                if (isset($_REQUEST['workspaceId'])) $this->readUsersByWorkspaceId();
                elseif (isset($_REQUEST['cardId'])) $this->readUsersByCardId();
                break;
            case 'POST':
                if (isset($_REQUEST['workspaceId']) && isset($_REQUEST['userId']) ) $this->addUserToWorkspace();
                elseif (isset($_REQUEST['cardId']) && isset($_REQUEST['userId']) ) $this->addUserToCard();
                break;
            case 'PUT':
                break;
            case 'DELETE':
                if (isset($_REQUEST['workspaceId']) && isset($_REQUEST['userId']) ) $this->deleteUserInWorkspace();
                elseif (isset($_REQUEST['cardId']) && isset($_REQUEST['userId']) ) $this->deleteUserInCard();
                break;
            default:
                echo "Response not found!";
                break;
        }
    }
}
