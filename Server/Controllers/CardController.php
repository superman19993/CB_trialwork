<?php

class CardController extends BaseController
{

    private $requesMethod;
    private $service;
    private $inputReader;

    public function __construct($method, $service, $inputReader)
    {
        //$this->loadModel('CardModel');
        //$this->cardModel = new CardModel;
        $this->service= $service;
        $this->requesMethod = $method;
        $this->inputReader=$inputReader;
    }


    // POST: http://localhost/practice2/Server/index.php/card?columnId={int}
    public function create()
    {
        if (!isset($_REQUEST['columnId'])) {
            echo json_encode(array('message' => "Invalid columnId."));
            return http_response_code(400);
        }
        //$input = (array) json_decode(file_get_contents('php://input'), TRUE);
        $input= $this->inputReader->read();
        $cardName = isset($input['card_name']) ? $input['card_name'] : '';
        $des = isset($input['description']) ? $input['description'] : '';
        $data = [
            'card_name' => $cardName,
            'description' => $des,
            'columnid' => $_REQUEST['columnId']
        ];

        $results=$this->service->store($data);
        if ($results!=0){
            $response['message'] = 'Success';
            echo json_encode($response);
            return $results;
        }
        else{
            echo json_encode(array('message' => "Create failed"));
            return http_response_code(400);
        }

    }

    public function read()
    {
        $columns = ['*'];
        $orderBys = ['column' => 'id', 'order' => 'desc'];
        $limit = 15;
        $results = $this->service->findAll($columns, $orderBys, $limit);

        if (!$results) echo json_encode(array('message' => 'No cards found.'));

        else {
            $response['data'] = $results;
            $response['message'] = 'Success';
            echo json_encode($response);
        }
        return $results;
    }

    public function readOne()
    {
        $cardId = isset($_REQUEST['cardId']) ? $_REQUEST['cardId'] : '';
        if ($cardId <= 0) return http_response_code(400);
        $card = $this->cardModel->find($cardId);
        return $card;
    }

    // http://localhost/practice2/Server/index.php/card?columnId={}&cardId={}
    public function update()
    {

        $columnId = isset($_REQUEST['columnId']) ? $_REQUEST['columnId'] : '';
        $cardId = isset($_REQUEST['cardId']) ? $_REQUEST['cardId'] : '';

        $oldCard = $this->readOne();
        if (!$oldCard) {
            echo json_encode(array('message' => 'Card not found'));
            return http_response_code(400);
        };
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        $cardName = isset($input['title']) ? $input['title'] : $oldCard['card_name'];
        $des = isset($input['description']) ? $input['description'] : $oldCard['description'];

        $data = [
            'card_name' => $cardName,
            'description' => $des,
            'columnid' => $columnId
        ];
        $this->cardModel->updateData($cardId, $data);
        $response['message'] = 'Success';
        $response['data'] = $data;
        echo json_encode($response);
    }

    public function changeCardForCol()
    {
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        $destColId = isset($input['destColId']) ? $input['destColId'] : '';

        $cardId = isset($_REQUEST['cardId']) ? $_REQUEST['cardId'] : '';
        try {
            $res = $this->cardModel->changeCardForCol($cardId, $destColId);
            return json_encode($res);
        } catch (Exception $e) {
            echo json_encode(array('message' => "$e"));
            return http_response_code(500);
        }
    }

    public function delete()
    {
        $cardId = isset($_REQUEST['cardId']) ? $_REQUEST['cardId'] : '';
        if (!$cardId) {
            echo json_encode(array('message' => 'URL parameters not found'));
            return http_response_code(400);
        }
        if (!$this->readOne()) {
            echo json_encode(array('message' => 'Card not found'));
            return http_response_code(400);
        }
        $response['message'] = 'Success';
        echo json_encode($response);

        return $this->cardModel->destroy($cardId);
    }

    public function getPercentage()
    {
        $cardId = isset($_REQUEST['cardId']) ? $_REQUEST['cardId'] : '';
        $response = $this->cardModel->readPercentage($cardId);
        echo json_encode($response);
    }

    public function processRequest($type = null)
    {
        switch ($this->requesMethod) {
            case 'GET':
                if (isset($_REQUEST['cardId'])) $this->getPercentage();
                else $this->read();
                break;
            case 'POST':
                $this->create();
                break;
            case 'PUT':
                if ($type)
                    $this->changeCardForCol();
                else
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
