<?php

class CardController extends BaseController {

    private $requesMethod;

    public function __construct($method)
    {
        $this->loadModel('CardModel');
        $this->cardModel= new CardModel;
        $this->requesMethod= $method;
    }

    
    // POST: http://localhost/practice2/Server/index.php/card?columnId={int}
    public function create(){
        if (!isset($_REQUEST['columnId'])) {
            echo json_encode(array('message'=> "Invalid columnId."));
            return http_response_code(400);
        }
        $input= (array) json_decode(file_get_contents('php://input'),TRUE);

        $cardName= isset($input['title']) ? $input['title'] : '';
        $des= isset($input['description']) ? $input['description'] : '';
        $data=[
            'card_name'=> $cardName,
            'description'=> $des,
            'columnid'=> $_REQUEST['columnId']
        ];

        $this->cardModel->store($data);
        $response['message']= 'Success';
        echo json_encode($response);
    }

    public function read(){
        $columns = ['*'];
        $orderBys = ['column' => 'id', 'order' => 'desc'];
        $limit = 15;
        $results = $this->cardModel->findAll($columns, $orderBys, $limit);

        if (!$results) echo json_encode(array('message' => 'No columns found.'));

        else {
            $response['data'] = $results;
            $response['message'] = 'Success';
            echo json_encode($response);
        }
    }
    public function readOne(){
        $cardId= isset($_REQUEST['cardId']) ? $_REQUEST['cardId']:'';
        if ($cardId<=0) return http_response_code(400);
        $card=$this->cardModel->find($cardId);
        return $card;
    }


    // http://localhost/practice2/Server/index.php/card?columnId={}&cardId={}
    public function update(){

        $columnId= isset($_REQUEST['columnId']) ? $_REQUEST['columnId']:'';
        $cardId= isset($_REQUEST['cardId']) ? $_REQUEST['cardId']:'';
        if ($columnId<=0 || $cardId<=0) {
            echo json_encode(array('message'=> 'Parameters not found'));
            return http_response_code(400);
        };

        $oldCard= $this->readOne();
        if (!$oldCard) {
            echo json_encode(array('message'=> 'Card not found'));
            return http_response_code(400);
        };
        $input= (array) json_decode(file_get_contents('php://input'),TRUE);
        $cardName= isset($input['title']) ? $input['title'] : $oldCard['card_name'];
        $des= isset($input['description']) ? $input['description'] : $oldCard['description'];

        $data=[
            'card_name'=> $cardName,
            'description'=> $des,
            'columnid'=> $_REQUEST['columnId']
        ];
        $this->cardModel->updateData($cardId, $data);
        $response['message']= 'Success';
        echo json_encode($response);
    }

    public function delete(){
        $cardId= isset($_REQUEST['cardId']) ? $_REQUEST['cardId'] : '';
        if (!$cardId) {
            echo json_encode(array('message'=> 'URL parameters not found'));
            return http_response_code(400);
        }
        if (!$this->readOne()) {
            echo json_encode(array('message'=> 'Card not found'));
            return http_response_code(400);
        }
        $response['message']= 'Success';
        echo json_encode($response);
        return $this->cardModel->destroy($cardId);
    }

    public function processRequest(){
        switch ($this->requesMethod){
            case 'GET':
                if (isset($_REQUEST['cardId'])) $this->readOne();
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