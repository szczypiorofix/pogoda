// tslint:disable-next-line: no-submodule-imports
import "moment/locale/pl";
import React from "react";
import Moment from "react-moment";
import Skycons from "react-skycons";
import {
  ICity,
  ICurrentCityInterface,
  IWeatherCurrentlyDetails,
  IWeatherDailyDetails
} from "../models";
import "./Currentcity.scss";

interface ICurrentDay {
  day: number;
}

// Dzień tygodnia: <span className="weekday-name"><Moment locale="pl" unix format="dddd">{city.time}</Moment></span>

export default class Currentcity extends React.Component<
  ICurrentCityInterface,
  ICurrentDay
> {
  public componentDidMount() {
    this.setState({
      day: 0
    });
  }

  public skyconIcon(icon: string, w: number, c: string, p: boolean) {
    return (
      <Skycons
        style={{ width: w + "px", height: w / 2 + "px" }}
        color={c}
        icon={icon.replace(/-/g, "_").toUpperCase()}
        autoplay={p}
      />
    );
  }

  public msToKmh(n: number) {
    return Math.round(n * 3.6);
  }

  public nextDayElement(city: IWeatherDailyDetails, id: number) {
    const calendarStrings = {
      lastDay: "[wczoraj]",
      sameDay: "[dzisiaj]",
      nextDay: "[jutro]",
      lastWeek: "dddd",
      nextWeek: "dddd",
      sameElse: "dddd"
    };

    return (
      <div key={id} className="day" onClick={() => this.setState({ day: id })}>
        <p className="weekday-name">
          <Moment locale="pl" unix calendar={calendarStrings}>
            {city.time}
          </Moment>
        </p>
        <p className="weekday-date">
          <Moment locale="pl" unix format="DD.MM.YYYY">
            {city.time}
          </Moment>
        </p>
        {this.skyconIcon(city.icon, 100, "#eeeeee", true)}
        <p className="weekday-temp">
          {Math.round(city.temperatureHigh)}&#8451; /{" "}
          {Math.round(city.temperatureLow)}&#8451;
        </p>
      </div>
    );
  }

  public precipitationType(type: IWeatherCurrentlyDetails) {
    let t: string;
    switch (type.precipType) {
      case "rain":
        t = "deszcz";
        break;
      case "snow":
        t = "śnieg";
        break;
      case "sleet":
        t = "śnieg z deszczem";
        break;
      default:
        t = "brak";
        break;
    }
    if (type.precipProbability > 0) {
      return t + " " + Math.round(type.precipProbability * 100) + "%";
    }
    return t;
  }

  public airConditionLevel(a: string) {
    let r: string = "";
    switch (a) {
      case "EXTREME":
        r = "EKSTREMALNY";
        break;
      case "VERY_HIGH":
        r = "BARDZO WYSOKI";
        break;
      case "HIGH":
        r = "WYSOKI";
        break;
      case "MEDIUM":
        r = "ŚREDNI";
        break;
      case "LOW":
        r = "DOBRY";
        break;
      case "VERY_LOW":
        r = "BARDZO DOBRY";
        break;
      default:
        r = "BRAK DANYCH";
        break;
    }
    return r;
  }

  public render(): JSX.Element {
    // FAZY KSIĘŻYCA !!!
    // https://codepen.io/agm65/pen/mmpvzr/

    const city: ICity = this.props.city;

    if (city) {
      const currentAirColor: string = city.airly.current.indexes[0].color;

      const bgImage = {
        backgroundImage: "url(/images/" + city.currently.icon + ".jpg)"
      };

      return (
        <div className="card citypanel" style={bgImage}>
          <div className="bg-div"></div>
          <div className="airly">
            <p>
              Aktualny stan powietrza:{" "}
              <span style={{ backgroundColor: currentAirColor }}>
                {this.airConditionLevel(city.airly.current.indexes[0].level)}
              </span>
            </p>
            <p>
              PM1{" "}
              {city.airly.current.values.length > 0
                ? city.airly.current.values[0].value
                : "brak danych"}
              , PM25{" "}
              {city.airly.current.values.length > 0
                ? city.airly.current.values[1].value
                : "brak danych"}
              , PM10{" "}
              {city.airly.current.values.length > 0
                ? city.airly.current.values[2].value
                : "brak danych"}
            </p>
            <p>
              Jakość powietrza:{" "}
              <span>
                {city.airly.current.indexes[0].description
                  ? city.airly.current.indexes[0].description
                  : "brak danych"}
              </span>{" "}
            </p>
            <p>
              Rada:{" "}
              <span>
                {city.airly.current.indexes[0].advice
                  ? city.airly.current.indexes[0].advice
                  : "brak danych"}
              </span>
            </p>
            <p>
              Dane dostarczone przez:{" "}
              <a href="https://airly.eu/pl/" target="blank">
                <img
                  src="https://cdn.airly.eu/assets/LogoBlue.png"
                  alt="Airly logo"
                ></img>
              </a>
            </p>
            <p>
              Ostatnia aktualizacja: {this.props.time}, {this.props.date}
            </p>
          </div>
          <div className="current-city">
            <div className="city-info">
              <p className="city-name" id="currentCityName">
                {city.name}
              </p>
              <p className="current-date">
                <Moment locale="pl" unix format="DD.MM.YYYY">
                  {city.currently.time}
                </Moment>
              </p>
              {this.skyconIcon(city.currently.icon, 200, "#eeeeee", true)}
            </div>

            <h3 className="summary">{city.currently.summary}</h3>

            <div className="city-weather details1">
              <p className="temperature day">
                <span className="tempInd">
                  {Math.round(city.currently.temperature)}&#8451;{" "}
                </span>
                {Math.round(city.currently.temperature) !==
                Math.round(city.currently.apparentTemperature) ? (
                  <span>
                    odczuwalna {Math.round(city.currently.apparentTemperature)}
                    &#8451;
                  </span>
                ) : (
                  ""
                )}
              </p>
              <p className="temperature night">
                <span className="tempInd">
                  {Math.round(city.daily.data[0].temperatureLow)}&#8451;
                </span>
                {Math.round(city.daily.data[0].temperatureLow) !==
                Math.round(city.daily.data[0].apparentTemperatureLow) ? (
                  <span>
                    {" "}
                    odczuwalna{" "}
                    {Math.round(city.daily.data[0].apparentTemperatureLow)}
                    &#8451;
                  </span>
                ) : (
                  ""
                )}
              </p>
              <p>
                Świt{" "}
                <Moment locale="pl" unix format="LT">
                  {city.daily.data[0].sunriseTime}
                </Moment>
              </p>
              <p>
                Zmierzch{" "}
                <Moment locale="pl" unix format="LT">
                  {city.daily.data[0].sunsetTime}
                </Moment>
              </p>
            </div>

            <div className="city-weather details2">
              <p>Wilgotność: {Math.round(city.currently.humidity * 100)} %</p>
              <p>
                Ciśnienie atmosferyczne: {Math.round(city.currently.pressure)}{" "}
                hPa
              </p>
              <p>
                Wiatr: {this.msToKmh(city.currently.windSpeed)} km/h, w porywach{" "}
                {this.msToKmh(city.currently.windGust)} km/h
              </p>
              <p>Widoczność: {Math.round(city.currently.visibility)} km</p>
              <p>
                Zachmurzenie: {Math.round(city.currently.cloudCover * 100)}%
              </p>
              <p>
                Prawdopodobieństwo opadów:{" "}
                {this.precipitationType(city.currently)}
              </p>
            </div>
          </div>

          <div className="nextDays">
            {city.daily.data.map((item, index) =>
              this.nextDayElement(item, index)
            )}
          </div>
        </div>
      );
    }
    return <div></div>;
  }
}
