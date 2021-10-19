<?php


class UserModel extends BaseModel
{
    const TABLE = 'users';

    public function getAll($select = ['*'], $orderBys = [], $limit = 15)
    {
        return $this->all(self::TABLE, $select, $orderBys, $limit);
    }

    public function find($id)
    {
        return $this->getById(self::TABLE, $id);
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
}