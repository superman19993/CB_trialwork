<?php
class inputReader{
    
    public function read(){
        return (array) json_decode(file_get_contents('php://input'), TRUE);
    }
}