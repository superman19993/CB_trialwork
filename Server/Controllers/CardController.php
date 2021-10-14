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

    public function readOne(){
        $cardId= isset($_REQUEST['cardId']) ? $_REQUEST['cardId']:'';
        if ($cardId<=0) return http_response_code(400);
        $card=mysqli_fetch_assoc($this->cardModel->find($cardId));
        return $card;
    }


    // http://localhost/practice2/Server/index.php/card?columnId={}&cardId={}
    public function update(){
        
        $columnId= isset($_REQUEST['columnId']) ? $_REQUEST['columnId']:'';
        $cardId= isset($_REQUEST['cardId']) ? $_REQUEST['cardId']:'';
        if ($columnId<=0 || $cardId<=0) return http_response_code(400);

        $oldCard= $this->readOne($cardId);
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

    public function processRequest(){
        switch ($this->requesMethod){
            case 'GET':
                $this->readOne();
                break;
            case 'POST':
                $this->create();
                break;
            case 'PUT':
                $this->update();
                break;
            case 'DELETE':
                break;
            default:
                echo "Response not found!";
                break;
           
        }
    }

}