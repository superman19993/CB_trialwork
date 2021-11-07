<?php
namespace weather;
class WeatherClient
{
    private $service;
    public function __construct(WeatherService $service)
    {
        $this->service = $service;
    }

    public function display($location)
    {
        $temperature = $this->service->getTemperature($location);
        $message = 'The weather is ' . ($temperature > 30 ? 'hot' : 'cool');
        return $message;
    }
}
