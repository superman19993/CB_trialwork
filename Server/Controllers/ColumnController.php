<?php

class ColumnController extends BaseController {

    private $requesMethod;
    private $id;

    public function __construct($method, $id)
    {
        $this->loadModel('ColumnModel');
        $this->columnModel= new ColumnModel;
        $this->requesMethod= $method;
        $this->id= $id;
    }

    public function read(){

        $columns= ['*'];
        $orderBys= ['column'=> 'id', 'order'=>'desc'];
        $limit=15;
        $results = $this->columnModel->getAll($columns, $orderBys , $limit);

        $num= mysqli_num_rows($results);
        if ($num <=0) echo json_encode(array('message'=> 'No columns found.'));

        else {
            $response= array();
            $response['data']= array();
            while($row = mysqli_fetch_assoc($results)) {
                extract($row);
                $col_item= array(
                    'id'=> $id,
                    'column_name'=> $column_name,
                    'workspace_id'=> $workspaceid
                );
                array_push($response['data'], $col_item);
            }
            $response['message']= 'Success';
            echo json_encode($response);
            
        }
    }

    public function readOne($id){
        $result= $this->columnModel->find($id);
        $num= mysqli_num_rows($result);

        if ($num<=0){
            http_response_code(400);
            echo json_encode(array('message'=> 'No columns found.'));
        } 
        
        else{
            $response= array();
            $response['data']= array();
            $row = mysqli_fetch_assoc($result);
            extract($row);
            $col_item= array(
                'id'=> $id,
                'column_name'=> $column_name,
                'workspace_id'=> $workspaceid
            );
            array_push($response['data'], $col_item);
            $response['message']= 'Success';
            echo json_encode($response);
        } 
    }

    private function validateColumn($input)
    {
        if (! isset($input['column_name'])) {
            return false;
        }
        if (! isset($input['workspace_id'])) {
            return false;
        }
        return true;
    }

    public function create(){
        $input= (array) json_decode(file_get_contents('php://input'),TRUE);
        if (! $this->validateColumn($input)) {
            http_response_code(400);
            echo json_encode(array('message'=> 'Invalid input'));
            die;
        }
        $data=[
            'column_name'=> $input['column_name'],
            'workspaceid'=> $input['workspace_id']
        ];
        $this->columnModel->store($data);
        $response['message']= 'Success';
        echo json_encode($response);
    }

    public function processRequest(){
        switch ($this->requesMethod){
            case 'GET':
                if (!$this->id) return $this->read();
                else $this->readOne($this->id);
                break;
            case 'POST':
                $this->create();
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