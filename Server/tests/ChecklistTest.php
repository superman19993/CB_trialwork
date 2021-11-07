<?php

use PHPUnit\Framework\TestCase;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Exception\RequestException;


class ChecklistTest extends TestCase
{
    private $url = "http://localhost/practice2/Server/index.php/checklist";
    
    public function testCreateChecklist()
    {
        $client = new Client();
        $header = [];
        $bodyData = [
            "title" => "test unit",
            "status" => 0
        ];
        $request = new Request('POST', "{$this->url}?cardId=1", $header, json_encode($bodyData));

        try {
            $response = $client->send($request);

            $data = json_decode($response->getBody(), true);
            $this->assertEquals(200, $response->getStatusCode());
            $this->assertArrayHasKey('data', $data);
        } catch (RequestException $error) {
            $message = $error->getResponse()->getBody();
            $code = $error->getResponse()->getStatusCode();
            $this->assertArrayNotHasKey('data', json_decode($message, true));
            $this->assertEquals(400, $code);
        }
    }

    public function testGetChecklists()
    {
        $client = new Client();
        $header = [];
        $request = new Request('GET', "{$this->url}", $header);

        try {
            $response = $client->send($request);

            $this->assertEquals(200, $response->getStatusCode());
            $data = json_decode($response->getBody(), true);
            $this->assertArrayHasKey('data', $data);
        } catch (RequestException $error) {
            $message = $error->getResponse()->getBody();
            $code = $error->getResponse()->getStatusCode();
            $this->assertArrayNotHasKey('data', json_decode($message, true));
            $this->assertEquals(400, $code);
        }
    }


    public function testUpdate()
    {
        $client = new Client();
        $header = [];
        $bodyData = [
            "title" => "test unit edit",
            "status" => 1
        ];
        $request = new Request('PUT', "{$this->url}?id=1000", $header, json_encode($bodyData));

        try {
            $response = $client->send($request);

            $data = json_decode($response->getBody(), true);
            $this->assertEquals(200, $response->getStatusCode());
            $this->assertArrayHasKey('data', $data);
        } catch (RequestException $error) {
            if ($error->hasResponse()) {
                $message = $error->getResponse()->getBody();
                $code = $error->getResponse()->getStatusCode();
                $this->assertArrayNotHasKey('data', json_decode($message, true));
                $this->assertEquals(400, $code);
            }
        }
    }

    public function testDelete()
    {
        $client = new Client();
        $request = new Request('DELETE', "{$this->url}?id=10");
        try {
            $response = $client->send($request);

            $data= json_decode($response->getBody(), true);
            $this->assertEquals(200, $response->getStatusCode());
        } catch (RequestException $error) {
            if ($error->hasResponse()) {
                $message = $error->getResponse()->getBody();
                $code = $error->getResponse()->getStatusCode();

                $this->assertEquals(400, $code);
            }
        }
    }
}
