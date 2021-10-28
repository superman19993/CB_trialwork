<?php


class UserModel extends BaseModel
{
    const TABLE = 'users';

    public function getAll($select = ['*'], $orderBys = [], $limit = 15)
    {
        return $this->all(self::TABLE, $select, $orderBys, $limit);
    }

    public function store($data)
    {
        return $this->create(self::TABLE, $data);
    }

    public function updateData($id, $data)
    {
        return $this->update(self::TABLE, $id, $data);
    }
    public function destroy($id)
    {
        return $this->delete(self::TABLE, $id);
    }

    public function login($username, $password)
    {
        $sql = "SELECT * FROM users WHERE username ='${username}'";
        $user = $this->_query($sql);
        return mysqli_fetch_assoc($user);
    }

    public function checkPassword($username, $password)
    {
        $sql = "SELECT * FROM users WHERE username ='${username}'";
        $user = $this->_query($sql);
        $user = mysqli_fetch_assoc($user);
        return password_verify($password, $user['password']);
    }

    public function findUserByUsername($username)
    {
        $sql = "SELECT * FROM users WHERE username ='${username}'";
        $user = $this->_query($sql);
        return mysqli_fetch_assoc($user);
    }

    public function findUserById($id)
    {
        $sql = "SELECT * FROM users WHERE id ='${id}'";
        $user = $this->_query($sql);
        return mysqli_fetch_assoc($user);
    }

    public function findUserByEmail($email)
    {
        $sql = "SELECT * FROM users WHERE email ='${email}'";
        $user = $this->_query($sql);
        return mysqli_num_rows($user);
    }

    public function register($email, $username, $password)
    {
        $sql = "INSERT INTO users (email, username, password)
            value ('$email', '$username', '$password')";
        $createdUser = $this->_query($sql);

        return $createdUser;
    }

    public function getUsersByWorkspaceId($workspaceId)
    {
        $sql= "SELECT users.* FROM users INNER JOIN users_workspaces ON users.id = users_workspaces.userid WHERE users_workspaces.workspaceid='$workspaceId'";
        $users = $this->_query($sql);
        $data = [];
        while ($row = mysqli_fetch_assoc($users)) {
            array_push($data, $row);
        }
        return $data;
    }

    public function getUsersByCardId($cardId)
    {
        $sql= "SELECT users.* FROM users INNER JOIN users_cards ON users.id = users_cards.userid WHERE users_cards.cardid='$cardId'";
        $users = $this->_query($sql);
        $data = [];
        while ($row = mysqli_fetch_assoc($users)) {
            array_push($data, $row);
        }
        return $data;
    }

    public function findWorkspaceById($workspaceId){
        $sql = "SELECT * FROM workspaces WHERE id ='${workspaceId}'";
        $workspace = $this->_query($sql);
        return mysqli_fetch_assoc($workspace);
    }

    public function findCardById($cardId){
        $sql = "SELECT * FROM cards WHERE id ='${cardId}'";
        $card = $this->_query($sql);
        return mysqli_fetch_assoc($card);
    }

    public function findUserInWorkspace($workspaceId, $userId){
        $sql = "SELECT * FROM users_workspaces WHERE userid = ${userId} AND workspaceid= ${workspaceId}";
        $user = $this->_query($sql);
        return mysqli_fetch_assoc($user);
    }

    public function removeUserInWorkspace($workspaceId, $userId){
        $sql = "DELETE FROM users_workspaces WHERE userid = ${userId} AND workspaceid= ${workspaceId}";
        return $this->_query($sql);
    }

    public function findUserInCard($cardId, $userId){
        $sql = "SELECT * FROM users_cards WHERE userid = ${userId} AND cardid= ${cardId}";
        $user = $this->_query($sql);
        return mysqli_fetch_assoc($user);
    }

    public function removeUserInCard($cardId, $userId){
        $sql = "DELETE FROM users_cards WHERE userid = ${userId} AND cardid= ${cardId}";
        return $this->_query($sql);
    }

    public function createUserToWorkspace($workspaceId, $userId){
        $sql= "INSERT INTO users_workspaces (userid, workspaceid) VALUES (${userId}, ${workspaceId})";
        return $this->_query($sql);
    }

    public function createUserToCard($cardId, $userId){
        $sql= "INSERT INTO users_cards (userid, cardid) VALUES (${userId}, ${cardId})";
        return $this->_query($sql);
    }

}