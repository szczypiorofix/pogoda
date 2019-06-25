<?php

define('CONFIG_FILE', './config.ini');

require_once 'config.php';

define('WEATHER_API_KEY', Config::get('DARKSKY_API_KEY'));
define('NASA_API_KEY', Config::get('NASA_API_KEY'));
define('AIRLY_API_KEY', Config::get('AIRLY_API_KEY'));


$args = '';
$results = [];

$locations = [
    [
        'name' => "Warszawa",
        'latitude' => 52.232,
        'longitude' => 21.015
    ],
    [
        'name' => "Gdańsk",
        'latitude' => 54.348,
        'longitude' => 18.649
    ],
    [
        'name' => "Szczecin",
        'latitude' => 53.438,
        'longitude' => 14.551
    ],
    [
        'name' => "Poznań",
        'latitude' => 52.410,
        'longitude' => 16.906
    ],
    [
        'name' => "Wrocław",
        'latitude' => 51.111,
        'longitude' => 17.029
    ],
    [
        'name' => "Kraków",
        'latitude' => 50.055,
        'longitude' => 19.947
    ],
    [
        'name' => "Rzeszów",
        'latitude' => 50.0321,
        'longitude' => 22.0662
    ],
    [
        'name' => "Kielce",
        'latitude' => 50.869,
        'longitude' => 20.635
    ],
    [
        'name' => "Lublin",
        'latitude' => 51.235,
        'longitude' => 22.575
    ],
    [
        'name' => "Suwałki",
        'latitude' => 54.103,
        'longitude' => 22.922
    ]
];


// Examples:
// https://api.darksky.net/forecast/DARKSKY_API_KEY/52.23,21.00?lang=pl&exclude=hourly,currently,minutely,flags,alerts&units=si
// https://api.nasa.gov/planetary/apod?api_key=NASA_API_KEY
// curl -X GET \
//     --header 'Accept: application/json' \
//     --header 'apikey: AIRLY_API_KEY' \
//     'https://airapi.airly.eu/v2/measurements/point?lat=200&lng=19.940984'


// DarkSky & Airly

foreach($locations as $location => $name) {

    // DarkSky

    // Daily weather
    $args = $name['latitude'].','.$name['longitude'];
    
    $c = curl_init();
    curl_setopt($c, CURLOPT_HEADER, 0);
    curl_setopt($c, CURLOPT_VERBOSE, 0);
    curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($c, CURLOPT_ENCODING, "gzip");
    curl_setopt($c, CURLOPT_URL, 'https://api.darksky.net/forecast/'.WEATHER_API_KEY.'/'.$args.'?lang=pl&exclude=hourly,minutely,flags&units=si');
    curl_setopt($c, CURLOPT_HTTPGET, 1);
    $data = curl_exec($c);
    echo curl_error($c);
    curl_close($c);
    $dataFromAPI = json_decode($data);
    $dataFromAPI->name = $name['name'];

    // Airly
    $coordinates = 'lat='.$name['latitude'].'&lng='.$name['longitude'];

    $c = curl_init();
    curl_setopt($c, CURLOPT_HEADER, 0);
    curl_setopt($c, CURLOPT_VERBOSE, 0);
    curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($c, CURLOPT_ENCODING, "gzip");
    curl_setopt($c, CURLOPT_HTTPHEADER, array(
        'Accept: application/json',
        'apikey: '.AIRLY_API_KEY,
        'Accept-Encoding: gzip',
        'Accept-Language: pl'
    ));
    curl_setopt($c, CURLOPT_URL, 'https://airapi.airly.eu/v2/measurements/point?'.$coordinates);
    curl_setopt($c, CURLOPT_HTTPGET, 1);
    $data = curl_exec($c);
    echo curl_error($c);
    curl_close($c);

    $dataFromAPI->airly = json_decode($data);

    $results['cities'][] = $dataFromAPI;
}




// NASA - A Picture Of the Day

$c = curl_init();
curl_setopt($c, CURLOPT_HEADER, 0);
curl_setopt($c, CURLOPT_VERBOSE, 0);
curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($c, CURLOPT_URL, 'https://api.nasa.gov/planetary/apod?api_key='.NASA_API_KEY);
curl_setopt($c, CURLOPT_HTTPGET, 1);
$data = curl_exec($c);
echo curl_error($c);
curl_close($c);

$results['apod'] = json_decode($data);



// CURRENT DATE & TIME
$results['date'] = date("d.m.Y");
$results['time'] = date("H:i:s");



// Write data to json file
$fp = fopen('weather.json', 'w');
fwrite($fp, json_encode($results));
fclose($fp);
