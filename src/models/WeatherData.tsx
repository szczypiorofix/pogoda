export interface WeatherDailyDetails {
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

export interface WeatherCurrentlyDetails {
    time:number;
    summary:string;
    icon:string;
    precipIntensity:number;
    precipProbability:number;
    precipType:string;
    temperature:number;
    apparentTemperature:number;
    dewPoint:number;
    humidity:number;
    pressure:number;
    windSpeed:number;
    windGust:number;
    windBearing:number;
    cloudCover:number;
    uvIndex:number;
    visibility:number;
    ozone:number;
}

export interface WeatherDaily {
    summary: string;
    icon: string;
    name: string;
    data: WeatherDailyDetails[];
}

export interface AirlyCurrentIndexes {
    name: string;
    value: number;
    level: string;
    description: string;
    advice: string;
    color:string;
}

export interface AirlyCurrentValues {
    name: string;
    value: number;
}

export interface AirlyCurrent {
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
    currently: WeatherCurrentlyDetails;
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
