import React from "react";
import "./Mainheader.css";
import { RefreshData } from "../models";

export default class Mainheader extends React.Component<RefreshData, {}> {
  render() {
    return (
      <header>
        <div className="header-title">
          <b>Pogodynka</b> - aktualna prognoza pogody w Polsce
        </div>
        <button
          id="butRefresh"
          onClick={() => this.props.onRefresh()}
          aria-label="Refresh"
        ></button>
      </header>
    );
  }
}
