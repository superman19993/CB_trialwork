<?php

use PHPUnit\Framework\TestCase;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Exception\RequestException;

require '../vendor/autoload.php';

class SampleTest extends TestCase
{

    public function testCreateChecklist()
    {
        $client = new Client();

        $header = [];
        $bodyData = [
            "title" => "test unit",
            "status" => 0
        ];
        $request = new Request('POST', 'http://localhost/practice2/Server/index.php/checklist?cardId=4', $header, json_encode($bodyData));
        $response = $client->send($request);
        $data= json_decode($response->getBody(),true);
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertArrayHasKey('data',$data);
    }

    public function testCreateChecklistMissingCardid()
    {
        $client = new Client();
        $header = [];

        $bodyData = [
            "title" => "test unit",
            "status" => 0
        ];
        $request = new Request('POST', 'http://localhost/practice2/Server/index.php/checklist', $header, json_encode($bodyData));

        try{
            $response = $client->send($request);
        } catch(RequestException $error){
            if($error->hasResponse()){
                $message= $error->getResponse()->getBody();
                $code= $error->getResponse()->getStatusCode();
                $this->assertArrayNotHasKey('data',json_decode($message, true));
                $this->assertEquals(400, $code);
            }
        }
    }
}
