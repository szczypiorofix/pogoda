import React from 'react'
import './Mainheader.css'


export default class Mainheader extends React.Component {
  render () {
    return (
      <header>
        <div className="header-title">
          Prognoza Pogody
        </div>
        <button id="butRefresh" aria-label="Refresh"></button>
      </header>
    )
  }
}
