import React from 'react'
import { WiDayCloudyWindy } from 'react-icons/wi';
import { WiDaySunny } from 'react-icons/wi';
import { WiDayRainMix } from 'react-icons/wi';
import { WiDaySunnyOvercast } from 'react-icons/wi';
import './Currentcity.css'
import CurrentCityInterface from '../models/CurrentCityInterface';



export default class Currentcity extends React.Component<CurrentCityInterface, {}> {

    render():JSX.Element {
      // const divStyleH = {
      //   visibility: 'hidden'
      // } as React.CSSProperties;
      
      // const divStyleV = {
      //   visibility: 'visible'
      // } as React.CSSProperties;

      // console.log(this.props);
      
      return (
        <div className="card">
          <div className="loaded">
            <div className="loader"></div>
          </div>
          <div className="current-city">
            <div className="city-info">
                <span className="city-name" id="currentCityName">{this.props.city.name}</span>
                <span className="current-date">{this.props.dateAndTime}</span>
                <WiDayCloudyWindy className="weather-icon" />
            </div>
            <div className="city-weather">
              <span className="summary">{this.props.city.summary}</span>
              <span>Temperatura najwyższa: {this.props.city.daily.data[0].temperatureHigh}  &#8451;</span>
              <span>Temperatura najniższa: {this.props.city.daily.data[0].temperatureLow}  &#8451;</span>
              <span>Wilgotność: {this.props.city.daily.data[0].humidity * 100}%</span>
              <span>Ciśnienie atmosferyczne: {this.props.city.daily.data[0].pressure} hPa</span>
              <span>Siła wiatru: {this.props.city.daily.data[0].windSpeed} km/h</span>
            </div>
          </div>

          <div className="nextdays">
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
