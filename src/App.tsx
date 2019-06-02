import React from 'react';
import './App.css';
import Mainheader from './components/Mainheader';
import OtherCities from './components/OtherCities';
import CurrentCity from './components/CurrentCity';
import Apod from './components/Apod';
import { City } from './models/WeatherData';
import CommonData from './models/WeatherData';


export default class App extends React.Component<{}, CommonData> {
  
  private intervalId?: NodeJS.Timeout;

  state: Readonly<CommonData> = {
    dateAndTime: new Date().toLocaleDateString(),
    weatherData: [],
    currentCity: 0,
    weatherDataLoaded: false,
    date: "",
    time: "",
    apod: {
      copyright:"", title:"", url:"", date:"", explanation: "", hdurl:"", media_type:""
    }
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
          weatherDataLoaded: true,
          apod: resp.apod,
          time: resp.time,
          date: resp.date
      });
    });

    this.doTimeTick();
    // this.intervalId = setInterval( () => this.doTimeTick(), 10000);

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
           today.getDate()+" "+months[today.getMonth()]+" "+today.getFullYear()
    });
  }

  render():JSX.Element {
    return (
      <div className="App">
          <Mainheader />
          <OtherCities onCityChange={this.onCityChange} />
          <CurrentCity
            dateAndTime = { this.state.dateAndTime }
            city        = { this.state.weatherData[this.state.currentCity]}
          />
          <Apod
            copyright = {this.state.apod.copyright}
            url = {this.state.apod.url}
            title = {this.state.apod.title}
            explanation = {this.state.apod.explanation}
            date = {this.state.apod.date}
            hdurl = {this.state.apod.hdurl}
            media_type = {this.state.apod.media_type}
          />
          <p style={{textAlign:'center', fontSize:'10px'}}>Data aktualizacji: {this.state.time}, {this.state.date}</p>
      </div>
    );
  }

}
