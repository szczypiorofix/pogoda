export interface WeatherDetails {
    
    time	:	number;
    summary	:	string;
    icon	:	string;
    sunriseTime	:	number;
    sunsetTime	:	number;
    moonPhase	:	number;
    precipIntensity	:	number;
    precipIntensityMax	:	number;
    precipIntensityMaxTime	:	number;
    precipProbability	:	number;
    precipType	:	string;
    temperatureHigh	:	number;
    temperatureHighTime	:	number;
    temperatureLow	:	number;
    temperatureLowTime	:	number;
    apparentTemperatureHigh	:	number;
    apparentTemperatureHighTime	:	number;
    apparentTemperatureLow	:	number;
    apparentTemperatureLowTime	:	number;
    dewPoint	:	number;
    humidity	:	number;
    pressure	:	number;
    windSpeed	:	number;
    windGust	:	number;
    windGustTime	:	number;
    windBearing	:	number;
    cloudCover	:	number;
    uvIndex	:	number;
    uvIndexTime	:	number;
    visibility	:	number;
    ozone	:	number;
    temperatureMin	:	number;
    temperatureMinTime	:	number;
    temperatureMax	:	number;
    temperatureMaxTime	:	number;
    apparentTemperatureMin	:	number;
    apparentTemperatureMinTime	:	number;
    apparentTemperatureMax	:	number;
    apparentTemperatureMaxTime	:	number;
}

interface WeatherDaily {
    summary: string;
    icon: string;
    name: string;
    data: WeatherDetails[];
}

export interface City {
    latitude: number;
    longitude: number;
    timezone: string;
    daily: WeatherDaily;
    name: string;
    summary: string;
}

export interface APOD {
    copyright:string;
    url:string;
    title:string;
    explanation:string;
    hdurl:string;
    media_type:string;
    date:string;
}

  
export default interface CommonData {
    dateAndTime: string;
    weatherData: City[];
    currentCity: number;
    weatherDataLoaded:boolean;
    apod: APOD;
    date:string;
    time:string;
}
