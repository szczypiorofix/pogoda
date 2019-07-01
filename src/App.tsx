import React from 'react';

import './App.css';

import Mainheader   from './components/Mainheader';
import OtherCities  from './components/OtherCities';
import CurrentCity  from './components/CurrentCity';
import Apod         from './components/Apod';
import {City, CommonData} from './models';
import Speech from 'speak-tts';


const speech = new Speech() // will throw an exception if not browser supported
if(speech.hasBrowserSupport()) { // returns a boolean
    console.log("speech synthesis supported")
}
speech.init().then(() => {
  // The "data" object contains the list of available voices and the voice synthesis params
  console.log("Speech is ready, voices are available")
}).catch(() => {
  console.error("An error occured while initializing : ");
})



export default class App extends React.Component<{}, CommonData> {
  
  state: Readonly<CommonData> = {
    weatherData: [],
    currentCity: 0,
    date: "",
    time: "",
    apod: {
      copyright:"", title:"", url:"", date:"", explanation: "", hdurl:"", media_type:""
    },
    refresh: false
  };

  onCityChange = (city:number) => {
    speech.cancel();
    let r:string = "";
      switch(this.state.weatherData[city].airly.current.indexes[0].level) {
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
    let stopni:string =  Math.round(this.state.weatherData[city].currently.temperature)+"";
    if (stopni.endsWith('1')) stopni = "stopień";
    else if (stopni.endsWith('2') || stopni.endsWith('3') || stopni.endsWith('4')) stopni = "stopnie";
    else stopni = "stopni";


    speech.speak({
      text: this.state.weatherData[city].name+". "+this.state.weatherData[city].currently.summary
      +". Temperatura: "+Math.round(this.state.weatherData[city].currently.temperature)
      +" "+stopni+" Celsjusza. Stan czystości powietrza: "+r
    });
    this.setState({
      currentCity: city
    });
  }

  getData() {
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
          refresh: false
      });
    });
  }

  onRefresh = () => {
    speech.cancel();
    console.log("Refresh!");
    speech.speak({
      text: "Odświeżam dane, proszę czekać."
    });
    this.getData();
  }
  
  componentDidMount() {
    this.getData();
  }

  render():JSX.Element {

    if (this.state && this.state.weatherData) {
      return (
        <div className="App">
            <Mainheader onRefresh = {this.onRefresh}/>
            {
              this.state && this.state.weatherData && this.state.apod && (
                <React.Fragment>
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
                </React.Fragment>
              )
            }
            
            
        </div>
      ); 
    } else {
      return ( <h1 style={{color:"black"}} >Something went wrong, mister...</h1> );
    }

  }

}
