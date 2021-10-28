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


$controllerName = ucfirst((strtolower($uri[4])) . 'Controller');
require "./Controllers/${controllerName}.php";

$requestMethod = $_SERVER["REQUEST_METHOD"];
$controllerObject = new $controllerName($requestMethod);
if ($uri[4] === "auth" || ($uri[4] === "card") || $uri[4] == 'workspace'){
    if (count($uri)<=5) $controllerObject->processRequest();
    else $controllerObject->processRequest($uri[5]);
}
else
    $controllerObject->processRequest();