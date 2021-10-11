<?php
//require './Core/CreateTables.php';        //if db has existed, please comment this line
require './Controllers/BaseController.php';
require './Core/Database.php';
require './Models/BaseModel.php';


$controllerName= ucfirst((strtolower($_REQUEST['controller'] ?? 'User')   ). 'Controller');
$actionName= $_REQUEST['action'] ?? 'index';
require "./Controllers/${controllerName}.php";
$controllerObject= new $controllerName;
$controllerObject->$actionName();

?>