import React, { Component } from "react";
import "./App.css";

import { Link } from "react-router";

import settingsIcon from "./images/settings.svg";
import homeIcon from "./images/home.svg";
import { getCookie } from "redux-cookie";
import { setFiatCurrency } from "../src/actions/globals-actions";
import { setDefaultFiat } from "../src/actions/currencies-actions";

import { connect } from "react-redux";

class App extends Component {
  /* If cookie exists, extract fiat currency info and save it to store. */
  componentWillMount() {
    var fiatCookie = this.props.onGetCookie("cookieFiatCurrency");
    if (fiatCookie !== undefined) {
      this.props.onSetFiatCurrency(fiatCookie);
      this.props.onSetDefaultFiat(fiatCookie);
    }
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Link to="/">
            <img className="Menu-icon" src={homeIcon} alt="home" />
          </Link>
          <Link to={"/settings"}>
            <img className="Menu-icon" src={settingsIcon} alt="settings" />
          </Link>
        </div>

        <div>{this.props.children}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapActionsToProps = {
  onGetCookie: getCookie,
  onSetFiatCurrency: setFiatCurrency,
  onSetDefaultFiat: setDefaultFiat
};

export default connect(mapStateToProps, mapActionsToProps)(App);
