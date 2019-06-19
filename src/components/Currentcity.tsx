
import React from 'react';
import Moment from 'react-moment';
// import 'moment-timezone';
import 'moment/locale/pl';
import Skycons from 'react-skycons';
import './Currentcity.css';
import { WeatherDailyDetails, CurrentCityInterface, City} from '../models';



interface CurrentDay {
  day:number;
}

// Dzień tygodnia: <span className="weekday-name"><Moment locale="pl" unix format="dddd">{city.time}</Moment></span>


export default class Currentcity extends React.Component<CurrentCityInterface, CurrentDay> {

    componentDidMount() {
      this.setState({
        day: 0
      });
    }

    skyconIcon(icon:string, w:number, c:string, p:boolean) {
      return <Skycons style={{ width: w+"px", height: (w / 2)+"px" }} color={c} icon={ icon.replace(/-/g, '_').toUpperCase() } autoplay={p} />
    }

    msToKmh(n:number) {
      return Math.round(n * 3.6);
    }

    nextDayElement(city:WeatherDailyDetails, id:number) {
      const calendarStrings = {
        lastDay : '[wczoraj]',
        sameDay : '[dzisiaj]',
        nextDay : '[jutro]',
        lastWeek : 'dddd',
        nextWeek : 'dddd',
        sameElse : 'dddd'
      };
      
      return <div key={id} className="day" onClick={() => this.setState({day: id})}>
          <p className="weekday-name"><Moment locale="pl" unix calendar={calendarStrings}>{city.time}</Moment></p>
          <p className="weekday-date"><Moment locale="pl" unix format="DD.MM.YYYY">{city.time}</Moment></p>
          { this.skyconIcon(city.icon, 100, "#eeeeee", true) }
          <p className="weekday-temp">{ 
            Math.round(city.temperatureHigh) }&#8451;
            / { 
            Math.round(city.temperatureLow) }&#8451;
          </p>
        </div>
    }

    precipitationType(type:WeatherDailyDetails) {
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
        if (type.precipProbability > 0) return t + " " + (Math.round(type.precipProbability * 100)) + "%";
        return t;
    }

    airConditionLevel(a:string) {
      let r:string = "";
      switch(a) {
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
          r = "ŚREDNI"
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
      return r;
    }

    render():JSX.Element {

      // FAZY KSIĘŻYCA !!!
      // https://codepen.io/agm65/pen/mmpvzr/

      let city:City = this.props.city;

      if (city) {
        let currentAirColor:string = city.airly.current.indexes[0].color;
        
        return (
          <div className="card citypanel">
            <div className="bg-div"></div>
            <div className="airly">
              <p>Aktualny stan powietrza: <span style={{backgroundColor:currentAirColor }}>{ this.airConditionLevel(city.airly.current.indexes[0].level)}</span></p>
              <p>PM1 {city.airly.current.values[0].value},
                  PM25 {city.airly.current.values[1].value}, 
                  PM10 {city.airly.current.values[2].value}</p>
              <p>Jakość powietrza: <span>{city.airly.current.indexes[0].description}</span> </p>
              <p>Rada: <span>{city.airly.current.indexes[0].advice}</span></p>
              <p>Dane dostarczone przez: <a href="https://airly.eu/pl/" target="blank"><img src="https://cdn.airly.eu/assets/LogoBlue.png" alt="Airly logo"></img></a></p>
              <p>Ostatnia aktualizacja: { this.props.time }, { this.props.date }</p>
            </div>
            <div className="current-city">
              <div className="city-info">
                <p className="city-name" id="currentCityName">{city.name}</p>
                <p className="current-date"><Moment locale="pl" unix format="DD.MM.YYYY">{city.daily.data[this.state.day].time}</Moment></p>
                { this.skyconIcon(city.daily.data[this.state.day].icon, 200, "#eeeeee", true) }
              </div>
            
              <h3 className="summary">{city.daily.data[this.state.day].summary}</h3>
            
              <div className="city-weather details1">
                <p className="temperature day"><span className="tempInd">
                  {Math.round(city.currently.temperature)}&#8451; </span>
                  <span>odczuwalna {Math.round(city.daily.data[this.state.day].apparentTemperatureHigh)}&#8451;</span>
                </p>
                <p className="temperature night"><span className="tempInd">{Math.round(city.daily.data[this.state.day].temperatureLow)}&#8451;</span><span> odczuwalna {Math.round(city.daily.data[this.state.day].apparentTemperatureLow)}&#8451;</span></p>
                <p>Świt <Moment locale="pl" unix format="LT">{city.daily.data[this.state.day].sunriseTime}</Moment></p>
                <p>Zmierzch <Moment locale="pl" unix format="LT">{city.daily.data[this.state.day].sunsetTime }</Moment></p>
              </div>
            
              <div className="city-weather details2">
                <p>Wilgotność: { Math.round(city.daily.data[this.state.day].humidity * 100)} %</p>
                <p>Ciśnienie atmosferyczne: { Math.round(city.daily.data[this.state.day].pressure)} hPa</p>
                <p>
                  Wiatr: { this.msToKmh(city.daily.data[this.state.day].windSpeed)} km/h,
                  w porywach { this.msToKmh(city.daily.data[this.state.day].windGust)} km/h
                </p>
                <p>Zachmurzenie: {Math.round(city.daily.data[this.state.day].cloudCover * 100)}%</p>
                <p>Prawdopodobieństwo opadów: {this.precipitationType(city.daily.data[this.state.day])}</p>
              </div>
            
            </div>
  
            <div className="nextDays">
              {city.daily.data.map( (item, index) => this.nextDayElement(item, index))}
            </div>
  
            <div className="nextDaysWeather">
              <h3 className="summary">{city.daily.data[this.state.day].summary}</h3>
              
              <div className="city-weather details1">
                <p className="temperature day"><span className="tempInd">
                  {Math.round(city.currently.temperature) }&#8451; </span>
                  <span>odczuwalna {Math.round(city.daily.data[this.state.day].apparentTemperatureHigh)}&#8451;</span>
                </p>
                <p className="temperature night"><span className="tempInd">{Math.round(city.daily.data[this.state.day].temperatureLow)}&#8451;</span><span> odczuwalna {Math.round(city.daily.data[this.state.day].apparentTemperatureLow)}&#8451;</span></p>
                <p>Świt <Moment locale="pl" unix format="LT">{city.daily.data[this.state.day].sunriseTime}</Moment></p>
                <p>Zmierzch <Moment locale="pl" unix format="LT">{city.daily.data[this.state.day].sunsetTime}</Moment></p>
              </div>
            
              <div className="city-weather details2">
                <p>Wilgotność: {Math.round(city.daily.data[this.state.day].humidity * 100)} %</p>
                <p>Ciśnienie atmosferyczne: {Math.round(city.daily.data[this.state.day].pressure)} hPa</p>
                <p>
                  Wiatr: {this.msToKmh(city.daily.data[this.state.day].windSpeed)} km/h,
                  w porywach {this.msToKmh(city.daily.data[this.state.day].windGust)} km/h
                </p>
                <p>Zachmurzenie: {Math.round(city.daily.data[this.state.day].cloudCover * 100)}%</p>
                <p>Prawdopodobieństwo opadów: {this.precipitationType(city.daily.data[this.state.day])}</p>
              </div>
            </div>
  
          </div>
        )
      }
      return <div></div>

    }
  }
