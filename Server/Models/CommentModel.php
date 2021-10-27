<?php

class CommentModel extends BaseModel
{

    public function getAllComment($uid, $cardId)
    {
        $sql = "SELECT * FROM comments where uid='$uid' and cardId='$cardId'";
        $comments = $this->_query($sql);
        $data = [];
        while ($row = mysqli_fetch_assoc($comments)) {
            array_push($data, $row);
        }
        return $data;
    }

    public function findCommentById($id)
    {
        $sql = "SELECT * FROM comments where id='$id'";
        $createdWorkspace = $this->_query($sql);
        return mysqli_fetch_assoc($createdWorkspace);
    }

    public function createComment($content, $uid, $cardId)
    {
        $id = uniqid();
        $sql = "INSERT INTO comments (id, content,cardid, uid) values ('$id', '$content', '$cardId','$uid')";
        echo $sql;
        $this->_query($sql);

        $createdComment = $this->findCommentById($id);
        return $createdComment;
    }

    public function updateComment($content, $uid, $cardId, $commentId)
    {
        $sql = "UPDATE comments set content='$content' where cardid='$cardId' and uid='$uid'";
        $this->_query($sql);
        $updatedComment = $this->findCommentById($commentId);
        return $updatedComment;
    }

    public function deleteComment($cid, $uid, $cardId)
    {
        $sql = "DELETE from comments where id='$cid' and uid='$uid' and $cardId='$cardId'";
        $this->_query($sql);
    }
}