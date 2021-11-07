<?php

use PHPUnit\Framework\TestCase;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Exception\RequestException;

require '/xampp/htdocs/practice2/Server/Core/Database.php';
require '/xampp/htdocs/practice2/Server/Models/BaseModel.php';
require '/xampp/htdocs/practice2/Server/Models/CardModel.php';
require '/xampp/htdocs/practice2/Server/Controllers/BaseController.php';
require '/xampp/htdocs/practice2/Server/Controllers/CardController.php';
require '/xampp/htdocs/practice2/Server/Core/InputReader.php';

require '/xampp/htdocs/practice2/Server/Controllers/WeatherService.php';
require '/xampp/htdocs/practice2/Server/Controllers/WeatherClient.php';
use weather\WeatherService;
use weather\WeatherClient;

class CardControllerTest extends TestCase
{
    private $url = "http://localhost/practice2/Server/index.php/card";

    /**
     * @dataProvider createCardProvider
     */
    public function testCreate($columnId, $body, $statusCode)
    {
        $client = new Client();
        $header = [];

        $request = new Request('POST', "{$this->url}?columnId={$columnId}", $header, json_encode($body));


        try {
            $response = $client->send($request);

            $this->assertEquals($statusCode, $response->getStatusCode());
        } catch (RequestException $error) {
            $code = $error->getResponse()->getStatusCode();

            $this->assertEquals($code, $statusCode);
        }
    }

    public function createCardProvider()
    {
        return array(
            array(1, ["card_name" => "test unit", "description" => "test dataProvider"], 200),
            array(2, ["card_name" => "test unit", "description" => "test dataProvider"], 200),
            array(3, ["card_name" => "test unit", "description" => "test dataProvider"], 200),
            array('', ["card_name" => "test unit error", "description" => "test dataProvider"], 400),
        );
    }

    public function testCreateWithFullInfo(){
        $service = $this->createMock(CardModel::class);
        $inputReader= $this->createMock(inputReader::class);
        $_REQUEST['columnId']= 1;
        $inputReader->method('read')->willReturn([
            'card_name'=>'test create',
            'description'=>'test create description'
        ]);
        $service->method('store')->willReturn(123);
        $client= new CardController('POST', $service, $inputReader);

        $actual= $client->create();

        $this->assertSame(123, $actual);
    }

    public function testCreateWithNoColumnId(){
        $service = $this->createMock(CardModel::class);
        $inputReader= $this->createMock(inputReader::class);
        $_REQUEST['columnId']= null;
        $inputReader->method('read')->willReturn([
            'card_name'=>'test create',
            'description'=>'test create description'
        ]);
        $service->method('store')->willReturn(123);
        $client= new CardController('POST', $service, $inputReader);

        $client->create();

        $this->assertSame(400, http_response_code());
    }

    //Unit test with Stub
    public function testRead()
    {
        $service = $this->createMock(CardModel::class);
        $service->method('findAll')->willReturn('');
        $inputReader= $this->createMock(inputReader::class);
        $client= new CardController('GET', $service, $inputReader);

        $actual=$client->read();

        $this->assertSame('', $actual);

    }

    public function testReadSuccesfully(){
        $service = $this->createMock(CardModel::class);
        $inputReader= $this->createMock(inputReader::class);
        $returnValue= json_decode('[
            {
                "id": "138",
                "card_name": "test unit",
                "description": "test dataProvider",
                "columnid": "3",
                "position": "0",
                "percentage": null
            },
            {
                "id": "137",
                "card_name": "test unit",
                "description": "test dataProvider",
                "columnid": "2",
                "position": "0",
                "percentage": null
            }]');
        $service->method('findAll')->willReturn($returnValue);
        $client= new CardController('GET', $service, $inputReader);
        
        $actual=$client->read();

        $this->assertSame($returnValue, $actual);
    }

    // public function testDisplay()
    // {
    //     // Create the mock of WeatherService
    //     $service = $this->createMock(WeatherService::class);
    //     $service->method('getTemperature')->willReturn(20);
    //     $client = new WeatherClient($service);

    //     $actual = $client->display('Tokyo');

    //     $expected = 'The weather is cool';
    //     $this->assertSame($expected, $actual);
    // }

    // public function testDisplayShouldCallTheServiceWithCorrectLocation()
    // {
    //     $expected_location = 'Tokyo';
    //     $service = $this->createMock(WeatherService::class);

    //     // Expect the "getTemperature" method will be called once
    //     // and with the string "Tokyo" as its parameter
    //     $service->expects($this->once())->method('getTemperature')->with($this->equalTo($expected_location));
    //     $client = new WeatherClient($service);
    //     $client->display('Tokyo');
    // }

    // /**
    //  * @dataProvider updateCardProvider
    //  */
    // public function testUpdate($columnId, $cardId, $body, $statusCode)
    // {
    //     $client = new Client();
    //     $header = [];
    //     if ($columnId && $cardId) {
    //         $request = new Request('PUT', "{$this->url}?columnId={$columnId}&cardId={$cardId}", $header, json_encode($body));
    //     } elseif (!$columnId && $cardId) {
    //         $request = new Request('PUT', "{$this->url}?cardId={$cardId}", $header, json_encode($body));
    //     } elseif (!$cardId && $columnId) {
    //         $request = new Request('PUT', "{$this->url}?columnId={$columnId}", $header, json_encode($body));
    //     }

    //     try {
    //         $response = $client->send($request);
    //         $data = json_decode($response->getBody(), true);

    //         $this->assertEquals($statusCode, $response->getStatusCode());
    //         $this->assertArrayHasKey('data', $data);
    //     } catch (RequestException $error) {
    //         $code = $error->getResponse()->getStatusCode();

    //         $this->assertEquals($code, $statusCode);
    //     }
    // }
    // public function updateCardProvider()
    // {
    //     return array(
    //         array(1, 1, ["title" => "test unit", "description" => "test dataProvider"], 200),
    //         array(2, 6, ["title" => "test unit", "description" => "test dataProvider"], 200),
    //         array(3, 4, ["title" => "test unit", "description" => "test dataProvider"], 400),
    //         array(1, 1000, ["title" => "test unit error", "description" => "test dataProvider"], 400),
    //         array(4, 3, ["title" => "test unit error", "description" => "test dataProvider"], 200),
    //     );
    // }
}
