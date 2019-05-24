import React from 'react'

import { WiDayCloudyWindy } from 'react-icons/wi';
import { WiDaySunny } from 'react-icons/wi';
import { WiDayRainMix } from 'react-icons/wi';
import { WiDaySunnyOvercast } from 'react-icons/wi';

import { City } from '../models/WeatherData';


import './Currentcity.css'



interface DateAndTimeState {
  value:string;
}

interface CommonData {
  dateAndTime: DateAndTimeState;
  weatherData: City[];
  currentCity: number;
  weatherDataLoaded:boolean;
}


export default class Currentcity extends React.Component<{}, CommonData> {

    private intervalId?: NodeJS.Timeout;
    
    

    state: Readonly<CommonData> = {
      dateAndTime: {value: '...'},
      weatherData: [],
      currentCity: 0,
      weatherDataLoaded: false
    };
    



    doTick() {
      const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień",
          "Wrzesień", "Październik", "Listopad", "Grudzień"];
      let today:Date = new Date();
      let h:number = today.getHours();
      let m:string = ('0' + today.getMinutes()).slice(-2);
      let s:string = ('0' + today.getSeconds()).slice(-2);
      
      this.setState({
          dateAndTime: {
            value: today.getDate()+" "+months[today.getMonth()]+" "+today.getFullYear()+" "+h+":"+m+":"+s+" "
          }
      });
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
      })

      this.intervalId = setInterval( () => this.doTick(), 500);
    }



    componentWillUnmount() {
      if (this.intervalId) {
          clearInterval(this.intervalId);
      }
    }




    render():JSX.Element {
      const divStyleH = {
        visibility: 'hidden'
      } as React.CSSProperties;
      
      const divStyleV = {
        visibility: 'visible'
      } as React.CSSProperties;

      return (
        <div className="card">
          <div className={this.state.weatherDataLoaded ? "loaded" : "notloaded"}>
            <div className="loader"></div>
          </div>
          <div className="current-city" style={this.state.weatherDataLoaded ? divStyleV : divStyleH }>
            <div className="city-info">
                <span className="city-name" id="currentCityName">{
                  this.state.weatherData[this.state.currentCity] ? this.state.weatherData[this.state.currentCity].name : ""
                }</span>
                <span className="current-date">{this.state.dateAndTime.value}</span>
                <WiDayCloudyWindy className="weather-icon" />
            </div>
            <div className="city-weather">
              <span>Temperatura: {this.state.weatherData[this.state.currentCity] ? this.state.weatherData[this.state.currentCity].hourly.data[0].temperature : ""} &#8451;</span>
              <span>Wilgotność: {this.state.weatherData[this.state.currentCity] ? (this.state.weatherData[this.state.currentCity].hourly.data[0].humidity *100).toFixed(1) : ""}%</span>
              <span>Ciśnienie atmosferyczne: {this.state.weatherData[this.state.currentCity] ? this.state.weatherData[this.state.currentCity].hourly.data[0].pressure : ""} hPa</span>
              <span>Siła wiatru: {this.state.weatherData[this.state.currentCity] ? this.state.weatherData[this.state.currentCity].hourly.data[0].windSpeed : ""} km/h</span>
            </div>
          </div>

          <div className="nextdays" style={this.state.weatherDataLoaded ? divStyleV : divStyleH }>
            <div className="day">
                <span className="weekday-name">Piątek</span>
                <WiDaySunny className="weekday-icon" />
                <span className="weekday-temp">20 &#8451;</span>
            </div>
            <div className="day">
                <span className="weekday-name">Sobota</span>
                <WiDayRainMix className="weekday-icon" />
                <span className="weekday-temp">20 &#8451;</span>
            </div>
            <div className="day">
                <span className="weekday-name">Niedziela</span>
                <WiDaySunnyOvercast className="weekday-icon" />
                <span className="weekday-temp">20 &#8451;</span>
            </div>
            <div className="day">
                <span className="weekday-name">Poniedziałek</span>
                <WiDaySunny className="weekday-icon" />
                <span className="weekday-temp">20 &#8451;</span>
            </div>
            <div className="day">
                <span className="weekday-name">Wtorek</span>
                <WiDayRainMix className="weekday-icon" />
                <span className="weekday-temp">20 &#8451;</span>
            </div>
            <div className="day">
                <span className="weekday-name">Środa</span>
                <WiDaySunnyOvercast className="weekday-icon" />
                <span className="weekday-temp">20 &#8451;</span>
            </div>
          </div>

        </div>
      )
    }
  }
