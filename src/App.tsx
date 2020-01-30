import React from "react";

import "./App.css";

import Mainheader from "./components/MainHeader";
import OtherCities from "./components/OtherCities";
import CurrentCity from "./components/CurrentCity";
import Apod from "./components/Apod";
import { City, CommonData } from "./models";
import Speech from "speak-tts";

export default class App extends React.Component<{}, CommonData> {
  speech: any;

  state: Readonly<CommonData> = {
    weatherData: [],
    currentCity: 0,
    date: "",
    time: "",
    apod: {
      copyright: "",
      title: "",
      url: "",
      date: "",
      explanation: "",
      hdurl: "",
      media_type: ""
    },
    refresh: false
  };

  constructor(props: any) {
    super(props);
    this.speech = new Speech();
    if (this.speech.hasBrowserSupport()) {
      console.log("speech synthesis supported");
    }
    this.speech
      .init()
      .then(() => {
        console.log("Speech is ready, voices are available");
      })
      .catch(() => {
        console.error("An error occured while initializing : ");
      });
  }

  onCityChange = (city: number) => {
    this.speech.cancel();
    let r: string = "";
    switch (this.state.weatherData[city].airly.current.indexes[0].level) {
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
        r = "DUNNO";
        break;
    }
    let stopni: string =
      Math.round(this.state.weatherData[city].currently.temperature) + "";
    if (stopni.endsWith("1")) stopni = "stopień";
    else if (
      stopni.endsWith("2") ||
      stopni.endsWith("3") ||
      stopni.endsWith("4")
    )
      stopni = "stopnie";
    else stopni = "stopni";

    this.speech.speak({
      text:
        this.state.weatherData[city].name +
        ". " +
        this.state.weatherData[city].currently.summary +
        ". Temperatura: " +
        Math.round(this.state.weatherData[city].currently.temperature) +
        " " +
        stopni +
        " Celsjusza. Stan czystości powietrza: " +
        r
    });
    this.setState({
      currentCity: city
    });
  };

  async getData() {
    try {
      const response = await fetch(
        "https://pogoda.wroblewskipiotr.pl/weather.json"
      );
      if (response.ok) {
        let resp: any = await response.json();
        var cities: City[] = resp.cities;
        this.setState({
          weatherData: cities,
          apod: resp.apod,
          time: resp.time,
          date: resp.date,
          refresh: false
        });
      } else {
        throw new Error("Fetch error!!!");
      }
    } catch (err) {
      console.error(err);
    }
  }

  onRefresh = () => {
    this.speech.cancel();
    // console.log("Refresh!");
    this.speech.speak({
      text: "Odświeżam dane, proszę czekać."
    });
    this.getData();
  };

  componentDidMount() {
    this.getData();
  }

  render(): JSX.Element {
    if (this.state && this.state.weatherData) {
      return (
        <div className="App">
          <Mainheader onRefresh={this.onRefresh} />
          {this.state && this.state.weatherData && this.state.apod && (
            <React.Fragment>
              <OtherCities onCityChange={this.onCityChange} />
              <CurrentCity
                date={this.state.date}
                time={this.state.time}
                city={this.state.weatherData[this.state.currentCity]}
              />
              <Apod
                copyright={this.state.apod.copyright}
                url={this.state.apod.url}
                title={this.state.apod.title}
                explanation={this.state.apod.explanation}
                date={this.state.apod.date}
                hdurl={this.state.apod.hdurl}
                media_type={this.state.apod.media_type}
              />
            </React.Fragment>
          )}
        </div>
      );
    } else {
      return (
        <h1 style={{ color: "black" }}>Something went wrong, mister...</h1>
      );
    }
  }
}
