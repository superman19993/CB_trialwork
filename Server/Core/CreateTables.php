<?php

// use DevCoder\DotEnv;

// (new DotEnv(__DIR__ . '/.env'))->load();


// $HOST = getenv('DB_HOST');
// $USERNAME = getenv('DB_USERNAME');
// $PASSWORD = getenv('DB_PASSWORD');
// $DB_NAME = getenv('DB_NAME');

// $HOST = '127.0.0.1';
// $USERNAME = 'root';
// $PASSWORD = 'LocT@2031';
// $DB_NAME = 'practice2';

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
$sql = "CREATE TABLE if not exists users (
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
$sql = "CREATE TABLE if not exists workspaces (
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

$sql = "CREATE TABLE if not exists users_workspaces (
  userid INT UNSIGNED,
  workspaceid INT UNSIGNED,
  FOREIGN KEY (userid) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (workspaceid) REFERENCES workspaces (id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (userid, workspaceid))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;";

if ($conn->query($sql) === TRUE) {
  echo "Table users-workspaces created successfully";
} else {
  echo "Error creating table: " . $conn->error;
}


//columns table
$sql = "CREATE TABLE if not exists columns (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    column_name VARCHAR(45) NOT NULL,
    workspaceid INT UNSIGNED,
    FOREIGN KEY (workspaceid) REFERENCES workspaces (id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (id))
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;";

if ($conn->query($sql) === TRUE) {
  echo "Table columns created successfully";
} else {
  echo "Error creating table: " . $conn->error;
}

//cards table
$sql = "CREATE TABLE if not exists cards (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    card_name VARCHAR(40) NOT NULL,
    description VARCHAR(255) NULL,
    columnid INT UNSIGNED,
    FOREIGN KEY (columnid) REFERENCES columns (id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (id))
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;";

if ($conn->query($sql) === TRUE) {
  echo "Table cards created successfully";
} else {
  echo "Error creating table: " . $conn->error;
}


//many-to-many (users-cards)
$sql = "CREATE TABLE if not exists users_cards (
    userid INT UNSIGNED,
    cardid INT UNSIGNED,
    FOREIGN KEY (userid) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (cardid) REFERENCES cards (id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (userid, cardid))
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;";


if ($conn->query($sql) === TRUE) {
  echo "Table users-cards created successfully";
} else {
  echo "Error creating table: " . $conn->error;
}

//checklists table
$sql = "CREATE TABLE if not exists checklists (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NULL,
  status BOOLEAN DEFAULT FALSE,
  cardid INT UNSIGNED,
  FOREIGN KEY (cardid) REFERENCES cards (id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (id))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;";

if ($conn->query($sql) === TRUE) {
echo "Table checklists created successfully";
} else {
echo "Error creating table: " . $conn->error;
}

//comments table
$sql = "CREATE TABLE if not exists comments (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  content VARCHAR(255) NULL,
  cardid INT UNSIGNED,
  FOREIGN KEY (cardid) REFERENCES cards (id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (id))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;";

if ($conn->query($sql) === TRUE) {
echo "Table comments created successfully";
} else {
echo "Error creating table: " . $conn->error;
}

//include table between comments & cards & users
$sql = "CREATE TABLE if not exists includes (
  cardid INT UNSIGNED,
  commentid INT UNSIGNED,
  userid INT UNSIGNED,
  FOREIGN KEY (cardid) REFERENCES cards (id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (commentid) REFERENCES comments (id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (userid) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (cardid, commentid, userid ))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;";

if ($conn->query($sql) === TRUE) {
echo "Table includes created successfully";
} else {
echo "Error creating table: " . $conn->error;
}

//has table between cards & checklists
$sql = "CREATE TABLE if not exists has (
  cardid INT UNSIGNED,
  checklistid INT UNSIGNED,
  percent FLOAT,
  FOREIGN KEY (cardid) REFERENCES cards (id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (checklistid) REFERENCES checklists (id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (cardid, checklistid))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;";


if ($conn->query($sql) === TRUE) {
echo "Table has created successfully";
} else {
echo "Error creating table: " . $conn->error;
}

$conn->close();