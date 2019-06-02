
import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/pl';
import Skycons from 'react-skycons';
import './Currentcity.css';
import CurrentCityInterface from '../models/CurrentCityInterface';
import {WeatherDetails} from '../models/WeatherData';



interface CurrentDay {
  day:number;
}

// Dzień tygodnia: <span className="weekday-name"><Moment locale="pl" unix format="dddd">{city.time}</Moment></span>

export default class Currentcity extends React.Component<CurrentCityInterface, CurrentDay> {

    componentDidMount() {
      this.setState({day: 0});
    }

    skyconIcon(icon:string, w:number, c:string, p:boolean) {
      return <Skycons style={{ width: w+"px", height: (w / 2)+"px" }} color={c} icon={ icon.replace(/-/g, '_').toUpperCase() } autoplay={p} />
    }

    msToKmh(n:number) {
      return Math.round(n * ( (1/1000) / (1/3600) ));
    }

    nextDayElement(city:WeatherDetails, id:number) {
      const calendarStrings = {
        lastDay : '[wczoraj]',
        sameDay : '[dzisiaj]',
        nextDay : '[jutro]',
        lastWeek : '[last]',
        nextWeek : 'dddd',
        sameElse : 'L'
      };
      
      return <div key={id} className="day" onClick={() => this.setState({day: id})}>
          <span className="weekday-name"><Moment locale="pl" unix calendar={calendarStrings}>{city.time}</Moment></span>
          <span className="weekday-date"><Moment locale="pl" unix format="DD.MM.YYYY">{city.time}</Moment></span>
          { this.skyconIcon(city.icon, 100, "#111", false) }
          <span className="weekday-temp">{ 
            Math.round(city.temperatureHigh) }&#8451;
            / { 
            Math.round(city.temperatureLow) }&#8451;
          </span>
        </div>
    }

    precipitationType(type:WeatherDetails) {
        let t:string;
        switch (type.precipType) {
          case 'rain':
                t='deszcz';
                break;
          case 'snow':
                t='śnieg';
                break;
          case 'sleet':
                t='śnieg z deszczem';
                break;
          default:
                t='brak'
                break;
        }
        if (type.precipProbability > 0) return t+" "+(Math.round(type.precipProbability * 100))+"%";
        return t;
    }

    render():JSX.Element {

      // console.log(this.props.city);
      


      // FAZY KSIĘŻYCA !!!
      // https://codepen.io/agm65/pen/mmpvzr/




      let city = this.props.city;
      
      return (
        <div className="card">
          <div className="loaded">
            <div className="loader"></div>
          </div>
          <div className="current-city">

            <div className="city-info">
                <span className="city-name" id="currentCityName">{ city ? city.name : "" }</span>
                <span className="current-date"><Moment locale="pl" unix format="DD.MM.YYYY">{city ? (city.daily.data[this.state.day].time) : ""}</Moment></span>
                { this.skyconIcon(city ? city.daily.data[this.state.day].icon : "CLEAR_DAY", 200, "#111", true) }
            </div>
            <div className="city-weather">
              <span className="summary">{ city ? city.daily.data[this.state.day].summary : "" }</span>
              <span>Temperatura najwyższa: <b>{ city ? Math.round(city.daily.data[this.state.day].temperatureHigh) : "" }&#8451;</b> o { city ? (new Date(city.daily.data[this.state.day].temperatureHighTime * 1000).getHours())+":00" : ""}</span>
              <span>Temperatura odczuwalna najwyższa: <b>{ city ? Math.round(city.daily.data[this.state.day].apparentTemperatureHigh) : "" }&#8451;</b> o { city ? (new Date(city.daily.data[this.state.day].apparentTemperatureHighTime * 1000).getHours())+":00" : ""}</span>
              <span>Temperatura najniższa: <b>{ city ? Math.round(city.daily.data[this.state.day].temperatureLow) : "" }&#8451;</b> o { city ? (new Date(city.daily.data[this.state.day].temperatureLowTime * 1000).getHours())+":00" : ""}</span>
              <span>Temperatura odczuwalna najniższa: <b>{ city ? Math.round(city.daily.data[this.state.day].apparentTemperatureLow) : "" }&#8451;</b> o { city ? (new Date(city.daily.data[this.state.day].apparentTemperatureLowTime * 1000).getHours())+":00" : ""}</span>
              <span>
                Świt <Moment locale="pl" unix format="LT">{city ? city.daily.data[this.state.day].sunriseTime : ""}</Moment>,
                Zmierzch <Moment locale="pl" unix format="LT">{city ? city.daily.data[this.state.day].sunsetTime : ""}</Moment>
              </span>
            </div>
            <div className="city-weather">
              <span style={{marginTop:'50px'}}>Wilgotność: { city ? Math.round(city.daily.data[this.state.day].humidity * 100) : "" } %</span>
              <span>Ciśnienie atmosferyczne: { city ? Math.round(city.daily.data[this.state.day].pressure) : "" } hPa</span>
              <span>
                Wiatr: { city ? this.msToKmh(city.daily.data[this.state.day].windSpeed) : "" } km/h,
                w porywach { city ? this.msToKmh(city.daily.data[this.state.day].windGust) : "" } km/h
              </span>
              <span>Zachmurzenie: { city ? Math.round(city.daily.data[this.state.day].cloudCover * 100) : "" }%</span>
              <span>Prawdopodobieństwo opadów: {city ? this.precipitationType(city.daily.data[this.state.day]) : "brak"}</span>
            </div>
            
          </div>

          <div className="nextdays">
            {city ? city.daily.data.map( (item, index) => this.nextDayElement(item, index)) : ""}
          </div>

        </div>
      )
    }
  }
