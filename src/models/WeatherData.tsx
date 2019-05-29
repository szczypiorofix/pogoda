interface WeatherDetails {
    
    apparentTemperatureHigh:number;
    apparentTemperatureHighTime:number;
    apparentTemperaturLow:number;
    apparentTemperatureLowTime:number;
    
    temperatureHigh:number;
    temperatureLow:number;
    
    time: number;
    summary: string;
    icon: string;
    precipIntensity: number;
    precipProbability: number;
    
    dewPoint: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    windGust: number;
    windBearing: number;
    cloudCover: number;
    uvIndex: number;
    visibility: number;
    ozone: number;
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

  
export default interface CommonData {
    dateAndTime: string;
    weatherData: City[];
    currentCity: number;
    weatherDataLoaded:boolean;
}
