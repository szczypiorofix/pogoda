import React from 'react';
import './Othercities.css';
import OtherCitiesInterface from '../models/OtherCitiesInterface';




export default class OtherCities extends React.Component<OtherCitiesInterface,{}> {
    

    render():JSX.Element {
        // const { onCityChange } = this.props;
        const onCityChange = this.props.onCityChange;
        return (
            <div className="othercities card">
                <div className="cities-panel">
                    <div>
                        <span>&#9656;</span>
                        <button onClick={() => onCityChange(0)}>Warszawa</button>
                    </div>
                    <div>
                        <span>&#9656;</span>
                        <button onClick={() => onCityChange(1)}>Kraków</button>
                    </div>
                    <div>
                        <span>&#9656;</span>
                        <button onClick={() => onCityChange(2)}>Gdańsk</button>
                    </div>
                    <div>
                        <span>&#9656;</span>
                        <button onClick={() => onCityChange(3)}>Poznań</button>
                    </div>
                    <div>
                        <span>&#9656;</span>
                        <button onClick={() => onCityChange(4)}>Wrocław</button>
                    </div>
                    <div>
                        <span>&#9656;</span>
                        <button onClick={() => onCityChange(5)}>Szczecin</button>
                    </div>
                    <div>
                        <span>&#9656;</span>
                        <button onClick={() => onCityChange(6)}>Lublin</button>
                    </div>
                    <div>
                        <span>&#9656;</span>
                        <button onClick={() => onCityChange(7)}>Rzeszów</button>
                    </div>
                    <div>
                        <span>&#9656;</span>
                        <button onClick={() => onCityChange(8)}>Kielce</button>
                    </div>
                    <div>
                        <span>&#9656;</span>
                        <button onClick={() => onCityChange(9)}>Suwałki</button>
                    </div> 
                </div>
            </div>
        )
    }
  }
