<?php

define('CONFIG_FILE', './config.ini');

require_once 'config.php';

define('WEATHER_API_KEY', Config::get('DARKSKY_API_KEY'));
define('NASA_API_KEY', Config::get('NASA_API_KEY'));


$args = '';
$results = [];

$locations = [
    [
        'name' => "Warszawa",
        'latitude' => 52.23,
        'longitude' => 21.00
    ],
    [
        'name' => "Gdańsk",
        'latitude' => 54.39,
        'longitude' => 18.66
    ],
    [
        'name' => "Szczecin",
        'latitude' => 53.74,
        'longitude' => 14.92
    ],
    [
        'name' => "Poznań",
        'latitude' => 52.35,
        'longitude' => 16.93
    ],
    [
        'name' => "Wrocław",
        'latitude' => 51.09,
        'longitude' => 16.87
    ],
    [
        'name' => "Kraków",
        'latitude' => 50.12,
        'longitude' => 19.43
    ],
    [
        'name' => "Rzeszów",
        'latitude' => 50.02,
        'longitude' => 22.08
    ],
    [
        'name' => "Kielce",
        'latitude' => 50.98,
        'longitude' => 20.41
    ],
    [
        'name' => "Lublin",
        'latitude' => 51.20,
        'longitude' => 22.69
    ],
    [
        'name' => "Suwałki",
        'latitude' => 53.96,
        'longitude' => 22.28
    ]
];



// https://api.darksky.net/forecast/DARKSKY_API_KEY/52.23,21.00?lang=pl&exclude=hourly,currently,minutely,flags,alerts&units=si

// https://api.nasa.gov/planetary/apod?api_key=NASA_API_KEY

foreach($locations as $location => $name) {

    $args = $name['latitude'].','.$name['longitude'];
    
    $c = curl_init();
    curl_setopt($c, CURLOPT_HEADER, 0);
    curl_setopt($c, CURLOPT_VERBOSE, 0);
    curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($c, CURLOPT_ENCODING, "gzip");
    curl_setopt($c, CURLOPT_URL, 'https://api.darksky.net/forecast/'.WEATHER_API_KEY.'/'.$args.'?lang=pl&exclude=hourly,currently,minutely,flags,alerts&units=si');
    curl_setopt($c, CURLOPT_HTTPGET, 1);
    $data = curl_exec($c);
    echo curl_error($c);
    curl_close($c);

    $dataFromAPI = json_decode($data);
    $dataFromAPI->name = $name['name'];
    $results['cities'][] = $dataFromAPI;

}

$c = curl_init();
curl_setopt($c, CURLOPT_HEADER, 0);
curl_setopt($c, CURLOPT_VERBOSE, 0);
curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($c, CURLOPT_URL, 'https://api.nasa.gov/planetary/apod?api_key='.NASA_API_KEY);
curl_setopt($c, CURLOPT_HTTPGET, 1);
$data = curl_exec($c);
echo curl_error($c);
curl_close($c);

$dataFromAPI = json_decode($data);
$results['apod'] = $dataFromAPI;

$results['date'] = date("d.m.Y");
$results['time'] = date("H:i:s");

$fp = fopen('weather.json', 'w');
fwrite($fp, json_encode($results));
fclose($fp);
