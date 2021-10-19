<?php
class BaseModel extends Database
{

    protected $connect;

    public function __construct()
    {
        $this->connect = $this->connect();
    }

    public function all($table, $select = ['*'], $orderBys = [], $limit = 15)
    {

        $columns = implode(',', $select);            //concatenate chosen columns with ',' in between, ex: id,name,level 

        $orderByString = implode(' ', $orderBys);   //concatenate chosen columns with order with ' ' in between, ex: id asc.

        if ($orderByString) {
            $sql = "SELECT ${columns} FROM ${table} ORDER BY ${orderByString} LIMIT ${limit}";   //
        } else {
            $sql = "SELECT ${columns} FROM ${table} LIMIT ${limit}";
        }

        $query = $this->_query($sql);
        $data = [];
        while ($row = mysqli_fetch_assoc($query)) {
            array_push($data, $row);
        }
        return $data;
    }

    public function getById($table, $id)
    {
        $sql = "SELECT * FROM ${table} WHERE id= ${id}";
        $query = $this->_query($sql);
        return mysqli_fetch_assoc($query);
    }

    public function create($table, $data = [])
    {

        $columns = implode(',', array_keys($data));
        $values = implode(',', array_values($data));
        $newValues = array_map(function ($values) {
            return "'" . $values . "'";
        }, array_values($data));
        $newValues= implode(',', array_values($newValues));
        $sql= "INSERT INTO ${table}(${columns}) VALUES (${newValues})";
        $this->_query($sql);
        return mysqli_insert_id($this->connect);
    }

    public function update($table, $id, $data)
    {
        $dataSets = [];

        foreach ($data as $key => $val) {
            array_push($dataSets, "${key} = '" . $val . "'");
        }
        $dataSetString = implode(',', $dataSets);
        $sql = "UPDATE ${table} SET ${dataSetString} WHERE id = ${id}";
        return $this->_query($sql);
    }

    public function delete($table, $id)
    {
        $sql = "DELETE FROM ${table} WHERE id = ${id}";
        $this->_query($sql);
    }
    
    //for login
    public function getInfo($table, $username, $password){
        $sql= "SELECT * FROM ${table} WHERE username =" . "'${username}'" ." AND password =" ."'${password}'";
        $result = $this->_query($sql);
        return mysqli_fetch_assoc($result);
    }

    public function readChecklistByCardId($table, $cardId){
        $sql= "SELECT * FROM checklists WHERE cardid = ${cardId}";
        $result= $this->_query($sql);
        $data=[];
        while ($row = mysqli_fetch_assoc($result)){
            array_push($data, $row);
        }
        return $data;
    }

    private function _query($sql)
    {
        return mysqli_query($this->connect, $sql);
    }
}