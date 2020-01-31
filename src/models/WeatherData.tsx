export interface IWeatherDailyDetails {
  time: number;
  summary: string;
  icon: string;
  sunriseTime: number;
  sunsetTime: number;
  moonPhase: number;
  precipIntensity: number;
  precipIntensityMax: number;
  precipIntensityMaxTime: number;
  precipProbability: number;
  precipType: string;
  temperatureHigh: number;
  temperatureHighTime: number;
  temperatureLow: number;
  temperatureLowTime: number;
  apparentTemperatureHigh: number;
  apparentTemperatureHighTime: number;
  apparentTemperatureLow: number;
  apparentTemperatureLowTime: number;
  dewPoint: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windGust: number;
  windGustTime: number;
  windBearing: number;
  cloudCover: number;
  uvIndex: number;
  uvIndexTime: number;
  visibility: number;
  ozone: number;
  temperatureMin: number;
  temperatureMinTime: number;
  temperatureMax: number;
  temperatureMaxTime: number;
  apparentTemperatureMin: number;
  apparentTemperatureMinTime: number;
  apparentTemperatureMax: number;
  apparentTemperatureMaxTime: number;
}

export interface IWeatherCurrentlyDetails {
  time: number;
  summary: string;
  icon: string;
  precipIntensity: number;
  precipProbability: number;
  precipType: string;
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

export interface IWeatherDaily {
  summary: string;
  icon: string;
  name: string;
  data: IWeatherDailyDetails[];
}

export interface IAirlyCurrentIndexes {
  name: string;
  value: number;
  level: string;
  description: string;
  advice: string;
  color: string;
}

export interface IAirlyCurrentValues {
  name: string;
  value: number;
}

export interface IAirlyCurrent {
  indexes: IAirlyCurrentIndexes[];
  values: IAirlyCurrentValues[];
}

export interface IAirly {
  current: IAirlyCurrent;
}

export interface ICity {
  latitude: number;
  longitude: number;
  timezone: string;
  daily: IWeatherDaily;
  name: string;
  summary: string;
  airly: IAirly;
  currently: IWeatherCurrentlyDetails;
}

export interface IAPOD {
  copyright: string;
  url: string;
  title: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  date: string;
}

export interface ICommonData {
  weatherData: ICity[];
  currentCity: number;
  apod: IAPOD;
  date: string;
  time: string;
  refresh: boolean;
}

export interface IRefreshData {
  onRefresh: () => void;
}
