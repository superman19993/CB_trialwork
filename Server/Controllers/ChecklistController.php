<?php

class ChecklistController extends BaseController
{

    private $requesMethod;

    public function __construct($method)
    {
        $this->loadModel('ChecklistModel');
        $this->checklistModel = new ChecklistModel;
        $this->requesMethod = $method;
    }


    // POST: http://localhost/practice2/Server/index.php/checklist?cardId={int}
    public function create()
    {
        if (!isset($_REQUEST['cardId']) || $_REQUEST['cardId'] <=    0) {
            echo json_encode(array('message' => "Invalid card id."));
            return http_response_code(400);
        }
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);

        $title = isset($input['title']) ? $input['title'] : '';
        $status = isset($input['status']) ? $input['status'] : '';
        $data = [
            'title' => $title,
            'status' => $status,
            'cardId' => $_REQUEST['cardId']
        ];

        $id = $this->checklistModel->store($data);
        if ($id==0){
            echo json_encode(array('message' => 'Card not found.'));
            return http_response_code(400);
        }
        $response['message'] = 'Success';
        $data['id']= $id;
        $response['data']= $data;
        echo json_encode($response);
        return $id;
    }

    // GET: http://localhost/practice2/Server/index.php/checklist
    public function read()
    {
        $columns = ['*'];
        $orderBys = ['column' => 'id', 'order' => 'desc'];
        $limit = 15;
        $results = $this->checklistModel->findAll($columns, $orderBys, $limit);

        if (!$results) echo json_encode(array('message' => 'No checklists found.'));

        else {
            $response['data'] = $results;
            $response['message'] = 'Success';
            echo json_encode($response);
        }
    }

    // GET: http://localhost/practice2/Server/index.php/checklist?cardId={number}
    public function readByCardId(){
        $cardId= isset($_REQUEST['cardId']) ? $_REQUEST['cardId']:'';
        if ($cardId<=0) 
        {
            echo json_encode(array('message'=>'Invalid card id.'));
            return http_response_code(400);
        }
        $checklists= $this->checklistModel->getByCardId($cardId);
        if (!$checklists) {
            echo json_encode(array('message'=>'No checklist found.'));
            die;
        }
        $response['data'] = $checklists;
        $response['message'] = 'Success';
        echo json_encode($response);
    }

    public function readOne($id){
        $checklist= $this->checklistModel->find($id);
        return $checklist;
    }

    // PUT: http://localhost/practice2/Server/index.php/checklist?id={}
    public function update()
    {
        $checklistId= isset($_REQUEST['id']) ? $_REQUEST['id'] : '';
        if ($checklistId=='') {
            echo json_encode(array('message'=>'No id provided.'));
            return http_response_code(400);
        }
        $oldChecklist = $this->readOne($checklistId);
        if (!$oldChecklist) {
            echo json_encode(array('message' => 'Checklist not found'));
            return http_response_code(400);
        };
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        $title = isset($input['title']) ? $input['title'] : $oldChecklist['title'];
        $status = isset($input['status']) ? $input['status'] : $oldChecklist['status'];

        $data = [
            'title' => $title,
            'status' => $status
        ];
        $result= $this->checklistModel->updateData($checklistId, $data);
        if ($result==1){
            $data['id']= $checklistId;
            $data['cardid']= $oldChecklist['cardid'];
            $response['data']= $data;
        }
        $response['message'] = 'Success';
        echo json_encode($response);
    }

    //DELETE: http://localhost/practice2/Server/index.php/checklist?id={}
    public function delete()
    {
        $checklistId= isset($_REQUEST['id']) ? $_REQUEST['id'] : '';
        if ($checklistId=='') {
            echo json_encode(array('message'=>'No id provided.'));
            return http_response_code(400);
        }
        $oldChecklist = $this->readOne($checklistId);
        if (!$oldChecklist) {
            echo json_encode(array('message' => 'Checklist not found'));
            return http_response_code(400);
        };
        $response['message'] = 'Success';
        echo json_encode($response);
        return $this->checklistModel->destroy($checklistId);
    }

    public function processRequest()
    {
        switch ($this->requesMethod) {
            case 'GET':
                if (isset($_REQUEST['cardId'])) $this->readByCardId();
                else $this->read();
                break;
            case 'POST':
                $this->create();
                break;
            case 'PUT':
                $this->update();
                break;
            case 'DELETE':
                $this->delete();
                break;
            default:
                echo "Response not found!";
                break;
        }
    }
}