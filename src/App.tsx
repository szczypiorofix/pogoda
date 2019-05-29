import React from 'react';
import './App.css';
import Mainheader from './components/Mainheader';
import OtherCities from './components/OtherCities';
import CurrentCity from './components/CurrentCity';
import { City } from './models/WeatherData';
import CommonData from './models/WeatherData';

const defaultCity:City = {
    latitude: 0,
    longitude: 0,
    timezone: "",
    daily: 
      {
        "summary": "",
        "icon": "",
        "name": "",
        "data": [
          {
            "apparentTemperaturLow": 0,
            "apparentTemperatureLowTime": 0,
            "apparentTemperatureHigh": 0,
            "apparentTemperatureHighTime": 0,
            "icon": "",
            "ozone": 0,
            "precipIntensity": 0,
            "precipProbability": 0,
            "pressure": 0,
            "summary": "",
            "time": 0,
            "visibility": 0,
            "windBearing": 0,
            "windGust": 0,
            "windSpeed": 0,
            "uvIndex": 0,
            "temperatureHigh": 0,
            "temperatureLow": 0,
            "dewPoint": 0,
            "humidity": 0,
            "cloudCover": 0
          }
        ]
      }
      
    ,
    name: "",
    summary: ""
};


export default class App extends React.Component<{}, CommonData> {
  
  private intervalId?: NodeJS.Timeout;

  state: Readonly<CommonData> = {
    dateAndTime: ".",
    weatherData: [],
    currentCity: 0,
    weatherDataLoaded: false
  };

  onCityChange = (city:number) => {
    this.setState({
      currentCity: city
    });
    // console.log("City number: "+city);
  }

  
  componentDidMount() {
    
    fetch("weather.json")
    .then(resp => {
        if (resp.ok) {
            return resp.json();
        } else {
            throw new Error("Fetch error!!!");
        }
    }).then(resp => {
      var cities:City[] = resp.cities;
      this.setState({
          weatherData: cities,
          weatherDataLoaded: true
      });
    });

    this.intervalId = setInterval( () => this.doTimeTick(), 500);

  }

  componentWillUnmount() {
    if (this.intervalId) {
        clearInterval(this.intervalId);
    }
  }


  doTimeTick() {
    const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień",
        "Wrzesień", "Październik", "Listopad", "Grudzień"];
    let today:Date = new Date();
    this.setState({
        dateAndTime:
           today.getDate()+" "+months[today.getMonth()]+" "+today.getFullYear()+" "+today.toLocaleTimeString()
    });
  }

  render():JSX.Element {
    return (
      <div className="App">
          <Mainheader />
          <OtherCities onCityChange={this.onCityChange} />
          <CurrentCity
            dateAndTime = { this.state.dateAndTime }
            city        = { this.state.weatherData[this.state.currentCity] ? this.state.weatherData[this.state.currentCity] : defaultCity }
          />
      </div>
    );
  }

}
