import React from "react";
import { IRefreshData } from "../models";
import "./Mainheader.scss";

export default class MainHeader extends React.Component<IRefreshData, {}> {
  public render(): JSX.Element {
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
