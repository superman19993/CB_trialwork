<?php

class WorkspaceController extends BaseController
{

    private $requesMethod;

    public function __construct($method)
    {
        $this->loadModel('WorkspaceModel');
        $this->workspaceModel = new WorkspaceModel;
        $this->requesMethod = $method;
        session_start();
    }

    public function getAllWorkspace()
    {
        // session_start();
        // if (!isset($_SESSION['id'])) {
        //     echo "not authorize";
        // }
        // $uid = $_SESSION['id'];

        $uid = isset($_REQUEST['uid']) ? $_REQUEST['uid'] : '';
        try {
            $workspace_list = $this->workspaceModel->getAllWorkspace($uid);
            $response = array();
            $response['data'] = $workspace_list;
            echo json_encode($response);
        } catch (Exception $e) {
            echo json_encode(array('message' => "$e"));
            return http_response_code(500);
        }
    }

    public function createNewWorkspace()
    {
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        $workspace_name = isset($input['name']) ? $input['name'] : '';
        $uid = $_SESSION['id'];

        try {
            $createdWorkspace = $this->workspaceModel->createWorkspace($workspace_name, $uid);
            echo json_encode($createdWorkspace);
        } catch (Exception $e) {
            echo json_encode(array('message' => "$e"));
            return http_response_code(500);
        }
    }

    public function updateWorkspace()
    {
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        $workspace_name = isset($input['workspace_name']) ? $input['workspace_name'] : '';
        // $uid = $_SESSION['id'];
        $uid = isset($_REQUEST['uid']) ? $_REQUEST['uid'] : '';
        $wid = isset($_REQUEST['wid']) ? $_REQUEST['wid'] : '';

        try {
            $updatedWorkspace = $this->workspaceModel->updateWorkspace($workspace_name, $uid, $wid);
            echo json_encode($updatedWorkspace);
        } catch (Exception $e) {
            echo json_encode(array('message' => "$e"));
            return http_response_code(500);
        }
    }

    public function deleteWorkspace()
    {
        $wid = isset($_REQUEST['wid']) ? $_REQUEST['wid'] : '';
        $uid = isset($_REQUEST['uid']) ? $_REQUEST['uid'] : '';

        try {
            $this->workspaceModel->deleteWorkspace($wid, $uid);
            echo  json_encode(array('message' => "Deleted successfully"));
        } catch (Exception $e) {
            echo json_encode(array('message' => "$e"));
            return http_response_code(500);
        }
    }

    public function processRequest()
    {
        switch ($this->requesMethod) {
            case 'GET':
                $this->getAllWorkspace();
                break;
            case 'POST':
                $this->createNewWorkspace();
                break;
            case 'PUT':
                $this->updateWorkspace();
                break;
            case 'DELETE':
                $this->deleteWorkspace();
                break;
            default:
                echo "Response not found!";
                break;
        }
    }
}