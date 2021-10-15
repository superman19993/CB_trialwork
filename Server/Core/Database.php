<?php
class Database
{
    const HOST= 'localhost';
    const USERNAME= 'root';
    const PASSWORD= '';
    const DB_NAME= 'practice2';

    // const HOST = '127.0.0.1';
    // const USERNAME = 'root';
    // const PASSWORD = 'LocT@2031';
    // const DB_NAME = 'practice2';

    public function connect()
    {
        $connect = mysqli_connect(self::HOST, self::USERNAME, self::PASSWORD, self::DB_NAME);

        mysqli_set_charset($connect, "utf8");
        if (mysqli_connect_errno() === 0) {
            return $connect;
        }
        return false;
    }
}