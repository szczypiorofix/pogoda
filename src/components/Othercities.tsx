import React from 'react'
import './Othercities.css'



export default class Othercities extends React.Component {

    handleClick() {
        // e.preventDefault();
        console.log('The link was clicked.');
    }

    render():JSX.Element {
      return (
        <div className="othercities card">
            <div className="cities-panel">
                <div>
                    <span>&#9656;</span>
                    <button onClick={this.handleClick}>Warszawa</button>
                </div>
                <div>
                    <span>&#9656;</span>
                    <button>Kraków</button>
                </div>
                <div>
                    <span>&#9656;</span>
                    <button>Gdańsk</button>
                </div>
                <div>
                    <span>&#9656;</span>
                    <button>Poznań</button>
                </div>
                <div>
                    <span>&#9656;</span>
                    <button>Wrocław</button>
                </div>
                <div>
                    <span>&#9656;</span>
                    <button>Szczecin</button>
                </div>
                <div>
                    <span>&#9656;</span>
                    <button>Lublin</button>
                </div>
                <div>
                    <span>&#9656;</span>
                    <button>Rzeszów</button>
                </div>
                <div>
                    <span>&#9656;</span>
                    <button>Kielce</button>
                </div>
                <div>
                    <span>&#9656;</span>
                    <button>Suwałki</button>
                </div> 
            </div>
        </div>
      )
    }
  }

