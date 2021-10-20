<?php
$HOST = '127.0.0.1';
$USERNAME = 'root';
$PASSWORD = 'LocT@2031';
$DB_NAME = 'practice2';

$conn = new mysqli($HOST, $USERNAME, $PASSWORD, $DB_NAME);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}