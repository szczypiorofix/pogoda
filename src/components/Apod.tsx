import React from 'react';
import {APOD} from '../models/WeatherData';
import './Apod.css';

// LIVE STREAM! https://www.ustream.tv/embed/17074538?v=3&wmode=direct&autoplay=true

export default class Apod extends React.Component<APOD, {}> {

    pictureOrVideo(p:APOD) {
        if (p.url.endsWith("jpg") || p.url.endsWith("png")) {
            return <img src={p.url} className="apod-image" alt={p.title}/>
        } else {
            return <iframe src={p.url} width="480px" height="270px"  style={{marginTop:'20px', borderBlockWidth:0, borderWidth:0, borderStyle:'none'}} scrolling='no' title={p.title} allowFullScreen frameBorder={'0'} />
        }
    }

    render():JSX.Element {
        
        return <div className="card">
            <div className="apod-div">
                <h1>Astronomy Picture of the Day !</h1>
                <div className="image-description-div">
                    <div className="image-div">
                        {this.pictureOrVideo(this.props)}
                    </div>
                    <div className="description-div">
                        <h3>{this.props.title}</h3>
                        <p>{this.props.explanation}</p>
                        <p className="copyright">Copyright by {this.props.copyright}, {this.props.date}</p>
                    </div>
                </div>
            </div>
        </div>
    }

}