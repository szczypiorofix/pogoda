import React from 'react'
import './Mainheader.css'


export default class Mainheader extends React.Component {
  render () {
    return (
      <header>
        <div className="header-title"><b>Pogodynka</b> - aktualna prognoza pogody w Polsce</div>
        <button id="butRefresh" aria-label="Refresh"></button>
      </header>
    )
  }
}
