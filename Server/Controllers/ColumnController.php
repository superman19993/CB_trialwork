<?php

class ColumnController extends BaseController
{

    private $requesMethod;

    public function __construct($method)
    {
        $this->loadModel('ColumnModel');
        $this->columnModel = new ColumnModel;
        $this->requesMethod = $method;
    }


    public function read()
    {
        $columns = ['*'];
        $orderBys = ['column' => 'id', 'order' => 'asc'];
        $limit = 15;
        $columns = $this->columnModel->getAll($columns, $orderBys, $limit);

        if (!$columns) echo json_encode(array('message' => 'No columns found.'));
        else $response['data'] = $columns;

        $cards = $this->columnModel->getAllCards(['*'], $orderBys, 100);

        $response2 = array();
        $response2['data'] = array();
        foreach ($response['data'] as $key) {
            $key['cards'] = array();
            array_push($response2['data'], $key);
        }

        $response = array();
        $response['data'] = array();
        foreach ($response2['data'] as $key) {
            foreach ($cards as $key2) {
                if ($key2['columnid'] == $key['id']) {
                    $temp = array(
                        'card_id' => $key2['id'],
                        'title' => $key2['card_name'],
                        'description' => $key2['description']
                    );
                    array_push($key['cards'], $temp);
                }
            }
            array_push($response['data'], $key);
        }
        $response['message'] = "Success";
        echo json_encode($response);
    }

    public function readOne($id)
    {
        $result = $this->columnModel->find($id);
        return $result;
    }

    private function validateColumn($input)
    {
        if (!isset($input['column_name'])) {
            return false;
        }
        if (!isset($input['workspace_id'])) {
            return false;
        }
        return true;
    }

    public function create()
    {
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        if (!$this->validateColumn($input)) {
            http_response_code(400);
            echo json_encode(array('message' => 'Invalid input'));
            die;
        }
        $data = [
            'column_name' => $input['column_name'],
            'workspaceid' => $input['workspace_id']
        ];
        $res = $this->columnModel->store($data);
        $response['message'] = 'Success';
        $response['data'] = $res;
        echo json_encode($response);
    }

    //DELETE: http://localhost/practice2/Server/index.php/column?columnId={}
    public function delete($columnId){
        $column= $this->readOne($columnId);
        if (!$column) {
            echo json_encode(array('message' => 'No columns found.'));
            return http_response_code(400);
        } 

        else{
            $this->columnModel->destroy($columnId);
            $response['message'] = 'Success';
            echo json_encode($response);
        }
    }

    //PUT: http://localhost/practice2/Server/index.php/column?columnId={}
    public function update($columnId){
        //check if column is not existed
        $oldColumn= $this->readOne($columnId);
        if (!$oldColumn) {
            echo json_encode(array('message' => 'No columns found.'));
            return http_response_code(400);
        }
        else{
            $input = (array) json_decode(file_get_contents('php://input'), TRUE);
            $columnName = isset($input['column_name']) ? $input['column_name'] : $oldColumn['column_name'];
            $workspaceId = isset($input['workspace_id']) ? $input['workspace_id'] : $oldColumn['workspaceid'];
            $data = [
                'column_name' => $columnName,
                'workspaceid' => $workspaceId
            ];
            if (!$this->columnModel->updateData($columnId, $data)){
                echo json_encode(array('message' => 'Workspace not found.'));
                return http_response_code(400);
            }
            $response['message'] = 'Success';
            echo json_encode($response);
        }
    }

    public function processRequest()
    {
        switch ($this->requesMethod) {
            case 'GET':
                if (!isset($_REQUEST['columnId'])) $this->read();
                else $this->readOne($_REQUEST['columnId']);
                break;
            case 'POST':
                $this->create();
                break;
            case 'PUT':
                if (isset($_REQUEST['columnId'])) $this->update($_REQUEST['columnId']);
                else echo json_encode(array('message'=> 'columnId not found.'));
                break;
            case 'DELETE':
                if (isset($_REQUEST['columnId'])) $this->delete($_REQUEST['columnId']);
                else echo json_encode(array('message'=> 'columnId not found.'));
                break;
            default:
                echo "Response not found!";
                break;
        }
    }
}