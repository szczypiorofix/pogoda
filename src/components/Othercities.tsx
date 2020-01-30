import React from "react";
import "./Othercities.css";
import { OtherCitiesInterface } from "../models";

export default class OtherCities extends React.Component<
  OtherCitiesInterface,
  {}
> {
  render(): JSX.Element {
    // const { onCityChange } = this.props;
    const onCityChange = this.props.onCityChange;
    return (
      <div className="othercities card">
        <div className="cities-panel">
          <div className="othercitiesBlock" onClick={() => onCityChange(0)}>
            <span>&#9656;</span>
            <button>Warszawa</button>
          </div>
          <div className="othercitiesBlock" onClick={() => onCityChange(1)}>
            <span>&#9656;</span>
            <button>Gdańsk</button>
          </div>
          <div className="othercitiesBlock" onClick={() => onCityChange(2)}>
            <span>&#9656;</span>
            <button>Szczecin</button>
          </div>
          <div className="othercitiesBlock" onClick={() => onCityChange(3)}>
            <span>&#9656;</span>
            <button>Poznań</button>
          </div>
          <div className="othercitiesBlock" onClick={() => onCityChange(4)}>
            <span>&#9656;</span>
            <button>Wrocław</button>
          </div>
          <div className="othercitiesBlock" onClick={() => onCityChange(5)}>
            <span>&#9656;</span>
            <button>Kraków</button>
          </div>
          <div className="othercitiesBlock" onClick={() => onCityChange(6)}>
            <span>&#9656;</span>
            <button>Rzeszów</button>
          </div>
          <div className="othercitiesBlock" onClick={() => onCityChange(7)}>
            <span>&#9656;</span>
            <button>Kielce</button>
          </div>
          <div className="othercitiesBlock" onClick={() => onCityChange(8)}>
            <span>&#9656;</span>
            <button>Lublin</button>
          </div>
          <div className="othercitiesBlock" onClick={() => onCityChange(9)}>
            <span>&#9656;</span>
            <button>Suwałki</button>
          </div>
        </div>
      </div>
    );
  }
}
