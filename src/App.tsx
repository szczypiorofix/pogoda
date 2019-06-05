import React from 'react';
import './App.css';

import Mainheader   from './components/Mainheader';
import OtherCities  from './components/OtherCities';
import CurrentCity  from './components/CurrentCity';
import Apod         from './components/Apod';

import {City, CommonData} from './models';



export default class App extends React.Component<{}, CommonData> {
  
  state: Readonly<CommonData> = {
    weatherData: [],
    currentCity: 0,
    date: "",
    time: "",
    apod: 
    {
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
      // console.log(resp);
      this.setState({
          weatherData: cities,
          apod: resp.apod,
          time: resp.time,
          date: resp.date,
      });
    });
  }

  render():JSX.Element {
    return (
      <div className="App">
          <Mainheader />
          <OtherCities onCityChange={this.onCityChange} />
          <CurrentCity
            date        = { this.state.date }
            time        = { this.state.time }
            city        = { this.state.weatherData[this.state.currentCity] }
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
      </div>
    );
  }

}
