interface WeatherDetails {
    time: number;
    summary: string;
    icon: string;
    precipIntensity: number;
    precipProbability: number;
    temperature: number;
    apparentTemperature: number;
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

interface WeatherHourlySummary {
    summary: string;
    icon: string;
    name: string;
    data: WeatherDetails[];
}

export interface City {
    latitude: number;
    longitude: number;
    timezone: string;
    hourly: WeatherHourlySummary;
    name: string;
}
