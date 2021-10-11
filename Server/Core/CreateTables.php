<?php

$HOST = 'localhost';
$USERNAME = 'root';
$PASSWORD = '';
$DB_NAME = 'practice2';

// Create connection
$conn = new mysqli($HOST, $USERNAME, $PASSWORD, $DB_NAME);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// sql to create table
// users table
$sql = "CREATE TABLE users (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    email VARCHAR(225) NOT NULL,
    username VARCHAR(45) NOT NULL,
    password VARCHAR(45) NOT NULL,
    PRIMARY KEY (id))
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;";

if ($conn->query($sql) === TRUE) {
  echo "Table users created successfully";
} else {
  echo "Error creating table: " . $conn->error;
}

//workspaces table
$sql = "CREATE TABLE workspaces (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    workspace_name VARCHAR(45) NOT NULL,
    PRIMARY KEY (id))
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;";

if ($conn->query($sql) === TRUE) {
  echo "Table workspace created successfully";
} else {
  echo "Error creating table: " . $conn->error;
}

//many to many (users-workspaces)
$sql = "CREATE TABLE users_workspaces (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    userid INT UNSIGNED,
    workspaceid INT UNSIGNED,
    FOREIGN KEY (userid) REFERENCES users (id) ON DELETE NO ACTION,
    FOREIGN KEY (workspaceid) REFERENCES workspaces (id) ON DELETE NO ACTION,
    PRIMARY KEY (id))
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;";

if ($conn->query($sql) === TRUE) {
  echo "Table users-workspaces created successfully";
} else {
  echo "Error creating table: " . $conn->error;
}

//columns table
$sql = "CREATE TABLE columns (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    column_name VARCHAR(45) NOT NULL,
    workspaceid INT UNSIGNED,
    FOREIGN KEY (workspaceid) REFERENCES workspaces (id),
    PRIMARY KEY (id));";

if ($conn->query($sql) === TRUE) {
  echo "Table columns created successfully";
} else {
  echo "Error creating table: " . $conn->error;
}

//cards table
$sql = "CREATE TABLE cards (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    card_name VARCHAR(40) NOT NULL,
    description VARCHAR(255) NULL,
    columnid INT UNSIGNED,
    FOREIGN KEY (columnid) REFERENCES columns (id),
    PRIMARY KEY (id));";

if ($conn->query($sql) === TRUE) {
  echo "Table cards created successfully";
} else {
  echo "Error creating table: " . $conn->error;
}

//many-to-many (users-cards)
$sql = "CREATE TABLE users_cards (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    userid INT UNSIGNED,
    cardid INT UNSIGNED,
    FOREIGN KEY (userid) REFERENCES users (id) ON DELETE NO ACTION,
    FOREIGN KEY (cardid) REFERENCES cards (id) ON DELETE NO ACTION,
    PRIMARY KEY (id))
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;";


if ($conn->query($sql) === TRUE) {
  echo "Table users-cards created successfully";
} else {
  echo "Error creating table: " . $conn->error;
}



$conn->close();
