<?php

use PHPUnit\Framework\TestCase;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Exception\RequestException;


class UserTest extends TestCase
{
    private $url = "http://localhost/practice2/Server/index.php/user";
    

    public function testGetUsersByCardId()
    {
        $client = new Client();

        $header = [];
        $request = new Request('GET', "{$this->url}?cardId=4", $header);
        $response = $client->send($request);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(), true);
        $this->assertArrayHasKey('data', $data);
    }

    public function testGetUsersByInvalidCardId()
    {
        $client = new Client();
        $header = [];
        $request = new Request('GET', "{$this->url}?cardId=1000", $header);
        try {
            $response = $client->send($request);
            $this->assertEquals(200, $response->getStatusCode());
        } catch (RequestException $error) {
            if ($error->hasResponse()) {
                $message = $error->getResponse()->getBody();
                $code = $error->getResponse()->getStatusCode();
                $this->assertArrayNotHasKey('data', json_decode($message, true));
                $this->assertEquals(400, $code);
            }
        }
    }

    public function testGetUsersByWorkspaceId()
    {
        $client = new Client();

        $header = [];
        $request = new Request('GET', "{$this->url}?workspaceId=1", $header);
        $response = $client->send($request);
        $this->assertEquals(200, $response->getStatusCode());
        $data = json_decode($response->getBody(), true);
        $this->assertArrayHasKey('data', $data);
    }

    public function testGetUsersByInvalidWorkspaceId()
    {
        $client = new Client();
        $header = [];
        $request = new Request('GET', "{$this->url}?workspaceId=0", $header);
        try {
            $response = $client->send($request);
            $this->assertEquals(200, $response->getStatusCode());
        } catch (RequestException $error) {
            if ($error->hasResponse()) {
                $message = $error->getResponse()->getBody();
                $code = $error->getResponse()->getStatusCode();
                $this->assertArrayNotHasKey('data', json_decode($message, true));
                $this->assertEquals(400, $code);
            }
        }
    }

   
}
