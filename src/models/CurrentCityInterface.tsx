import { ICity } from "./WeatherData";

export interface ICurrentCityInterface {
  city: ICity;
  date: string;
  time: string;
}
