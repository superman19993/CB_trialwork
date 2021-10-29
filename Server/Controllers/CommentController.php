<?php

class CommentController extends BaseController
{

    private $requesMethod;

    public function __construct($method)
    {
        $this->loadModel('CommentModel');
        $this->commentModel = new CommentModel;
        $this->requesMethod = $method;
        session_start();
    }

    public function getAllComment()
    {
        // session_start();
        // if (!isset($_SESSION['id'])) {
        //     echo "not authorize";
        // }
        // $uid = $_SESSION['id'];

        $uid = isset($_REQUEST['uid']) ? $_REQUEST['uid'] : '';
        $cardId = isset($_REQUEST['cardId']) ? $_REQUEST['cardId'] : '';

        try {
            $comment_list = $this->commentModel->getAllComment($uid, $cardId);
            $response = array();
            $response['data'] = $comment_list;
            echo json_encode($response);
        } catch (Exception $e) {
            echo json_encode(array('message' => "$e"));
            return http_response_code(500);
        }
    }

    public function getAllCommentByCardId()
    {
        $cardId = isset($_REQUEST['cardId']) ? $_REQUEST['cardId'] : '';

        try {
            $comment_list = $this->commentModel->readAllCommentByCardId($cardId);
            $response = array();
            $response['data'] = $comment_list;
            echo json_encode($response);
        } catch (Exception $e) {
            echo json_encode(array('message' => "$e"));
            return http_response_code(500);
        }
    }

    public function createNewComment()
    {
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);

        $content = isset($input['content']) ? $input['content'] : '';

        // $uid = $_SESSION['id'];
        $uid = isset($_REQUEST['uid']) ? $_REQUEST['uid'] : '';
        $cardId = isset($_REQUEST['cardId']) ? $_REQUEST['cardId'] : '';


        try {
            $createdComment = $this->commentModel->createComment($content, $uid, $cardId);
            echo json_encode($createdComment);
        } catch (Exception $e) {
            echo json_encode(array('message' => "$e"));
            return http_response_code(500);
        }
    }

    public function updateComment()
    {
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        $content = isset($input['content']) ? $input['content'] : '';
        // $uid = $_SESSION['id'];
        $uid = isset($_REQUEST['uid']) ? $_REQUEST['uid'] : '';
        $cardId = isset($_REQUEST['cardId']) ? $_REQUEST['cardId'] : '';
        $commentId = isset($_REQUEST['commentId']) ? $_REQUEST['commentId'] : '';

        try {
            $updateComment = $this->commentModel->updateComment($content, $uid, $cardId, $commentId);
            echo json_encode($updateComment);
        } catch (Exception $e) {
            echo json_encode(array('message' => "$e"));
            return http_response_code(500);
        }
    }

    public function deleteComment()
    {
        $commentid = isset($_REQUEST['commentId']) ? $_REQUEST['commentId'] : '';
        $uid = isset($_REQUEST['uid']) ? $_REQUEST['uid'] : '';
        $cardId = isset($_REQUEST['cardId']) ? $_REQUEST['cardId'] : '';

        try {
            $this->commentModel->deleteComment($commentid, $uid, $cardId);
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
                $this->getAllCommentByCardId();
                break;
            case 'POST':
                $this->createNewComment();
                break;
            case 'PUT':
                $this->updateComment();
                break;
            case 'DELETE':
                $this->deleteComment();
                break;
            default:
                echo "Response not found!";
                break;
        }
    }
}