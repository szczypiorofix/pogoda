export interface WeatherDetails {
    time:number;
    summary:string;
    icon:string;
    sunriseTime:number;
    sunsetTime:number;
    moonPhase:number;
    precipIntensity:number;
    precipIntensityMax:number;
    precipIntensityMaxTime:number;
    precipProbability:number;
    precipType:string;
    temperatureHigh:number;
    temperatureHighTime:number;
    temperatureLow:number;
    temperatureLowTime:number;
    apparentTemperatureHigh:number;
    apparentTemperatureHighTime:number;
    apparentTemperatureLow:number;
    apparentTemperatureLowTime:number;
    dewPoint:number;
    humidity:number;
    pressure:number;
    windSpeed:number;
    windGust:number;
    windGustTime:number;
    windBearing:number;
    cloudCover:number;
    uvIndex:number;
    uvIndexTime:number;
    visibility:number;
    ozone:number;
    temperatureMin:number;
    temperatureMinTime:number;
    temperatureMax:number;
    temperatureMaxTime:number;
    apparentTemperatureMin:number;
    apparentTemperatureMinTime:number;
    apparentTemperatureMax:number;
    apparentTemperatureMaxTime:number;
}

export interface WeatherDaily {
    summary: string;
    icon: string;
    name: string;
    data: WeatherDetails[];
}

interface AirlyCurrentIndexes {
    name: string;
    value: number;
    level: string;
    description: string;
    advice: string;
    color:string;
}

interface AirlyCurrentValues {
    name: string;
    value: number;
}

interface AirlyCurrent {
    indexes: AirlyCurrentIndexes[];
    values: AirlyCurrentValues[];
}

export interface Airly {
    current: AirlyCurrent;
}

export interface City {
    latitude: number;
    longitude: number;
    timezone: string;
    daily: WeatherDaily;
    name: string;
    summary: string;
    airly: Airly;
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

  
export interface CommonData {
    weatherData: City[];
    currentCity: number;
    apod: APOD;
    date:string;
    time:string;
}
