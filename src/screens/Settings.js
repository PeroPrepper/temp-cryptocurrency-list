import React from "react";

import { browserHistory } from "react-router";
import { connect } from "react-redux";
import { setFiatCurrency } from "../actions/globals-actions";
import { setCookie } from "redux-cookie";

class Settings extends React.Component {
  /* When fiat currency is selected, save it to store and to a cookie. */
  selectFiatCurrency(event) {
    this.props.onSetFiatCurrency(event.target.value);
    this.props.onSetCookie("cookieFiatCurrency", event.target.value, {
      expires: 365
    });
  }

  render() {
    return (
      <div onChange={this.selectFiatCurrency.bind(this)}>
        <h1>Settings </h1>
        <h2>Choose fiat currency</h2>
        <input
          type="radio"
          value="USD"
          name="gender"
          defaultChecked={
            this.props.globals.fiatCurrency === "USD" ? true : null
          }
        />USD
        <input
          type="radio"
          value="EUR"
          name="gender"
          defaultChecked={
            this.props.globals.fiatCurrency === "EUR" ? true : null
          }
        />{" "}
        EUR
        <input
          type="radio"
          value="CNY"
          name="gender"
          defaultChecked={
            this.props.globals.fiatCurrency === "CNY" ? true : null
          }
        />{" "}
        CNY
        <br />
        <button onClick={browserHistory.goBack} className="buttonBack">
          {"<< "} Back
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    globals: state.globals
  };
};

const mapActionsToProps = {
  onSetFiatCurrency: setFiatCurrency,
  onSetCookie: setCookie
};

export default connect(mapStateToProps, mapActionsToProps)(Settings);
