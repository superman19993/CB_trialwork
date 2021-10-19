<?php
require './Core/CreateTables.php';        //if db has existed, please comment this line
require './Controllers/BaseController.php';
require './Core/Database.php';
require './Models/BaseModel.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);


$controllerName = ucfirst((strtolower($uri[2])) . 'Controller');
require "./Controllers/${controllerName}.php";

$requestMethod = $_SERVER["REQUEST_METHOD"];
$controllerObject = new $controllerName($requestMethod);
if ($uri[2] === "auth")
    $controllerObject->processRequest($uri[3]);
else
    $controllerObject->processRequest();

//
// $columnId= isset($_REQUEST['columnId']) ? $_REQUEST['columnId']: '';
// $cardId= isset($_REQUEST['cardId'])? $_REQUEST['cardId']: '';