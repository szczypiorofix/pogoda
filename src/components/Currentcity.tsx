import React from 'react'

import { WiDayCloudyWindy } from 'react-icons/wi';
import { WiDaySunny } from 'react-icons/wi';
import { WiDayRainMix } from 'react-icons/wi';
import { WiDaySunnyOvercast } from 'react-icons/wi';

import './Card.css'
import './Currentcity.css'



interface DateAndTimeState {
  value:string;
}


export default class Currentcity extends React.Component<{}, DateAndTimeState> {

    private intervalId?: NodeJS.Timeout;

    state: Readonly<DateAndTimeState> = {
      value: '...'
    };
    
    doTick() {
      const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień",
          "Wrzesień", "Październik", "Listopad", "Grudzień"];
      let today:Date = new Date();
      let h:number = today.getHours();
      let m:string = ('0' + today.getMinutes()).slice(-2);
      let s:string = ('0' + today.getSeconds()).slice(-2);
      
      this.setState({value: today.getDate()+" "+months[today.getMonth()]+" "+today.getFullYear()+" "+h+":"+m+":"+s+" "});
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
          console.log(resp.cities);
      })

      this.intervalId = setInterval( () => this.doTick(), 1000);
    }

    componentWillUnmount() {
      if (this.intervalId) {
          clearInterval(this.intervalId);
      }
    }

    render():JSX.Element {
      return (
        <div className="card">

          <div className="current-city">
            <div className="city-info">
                <span className="city-name" id="currentCityName">Warszawa</span>
                <span className="current-date">{this.state.value}</span>
                <WiDayCloudyWindy className="weather-icon" />
            </div>
            <div className="city-weather">
              <span>Temperatura: 20 &#8451;</span>
              <span>Wilgotność: 66%</span>
              <span>Ciśnienie atmosferyczne: 1024 hPa</span>
              <span>Siła wiatru: 30 km/h</span>
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
