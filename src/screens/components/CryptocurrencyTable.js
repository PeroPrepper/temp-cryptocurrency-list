import React, { Component } from "react";

import { connect } from "react-redux";
import { browserHistory } from "react-router";

import { setDetailedCurrency } from "../../actions/globals-actions";
import { setCookie } from "redux-cookie";

import { CellChange } from "./presentational/HelperCells";

class CryptocurrencyTable extends Component {
  /* When currency is selected, save it to store and to a cookie, then navigate to details page. */
  handleCurrencySelection = selectedCurrencyId => {
    this.props.onSetDetailedCurrency(selectedCurrencyId);
    this.props.onSetCookie("cookieDetailedCurrency", selectedCurrencyId, {
      expires: 365
    });
    browserHistory.push("details");
  };

  render() {
    if (this.props.currencies.error) {
      return (
        <div>
          Ooops, something went wrong fetching cryptocurrency data!
          {String(this.props.currencies.error)}
        </div>
      );
    } else if (this.props.currencies.loading) {
      return <div>Loading...</div>;
    } else
      return (
        <table className="cryptoCurrencyTable">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Symbol</th>
              <th>Price ({String(this.props.globals.fiatCurrency)})</th>
              <th>24h Change</th>
            </tr>
          </thead>
          <tbody>
            {this.props.currencies.currencyList.map((data, index) => {
              var priceKey =
                "price_" + String(this.props.currencies.fiat).toLowerCase();
              var priceInCurrentFiat = data[priceKey];

              return (
                <tr
                  key={data.id}
                  onClick={() => this.handleCurrencySelection(data.id)}
                  className="tableRow"
                >
                  <td>{data.rank}</td>
                  <td>{data.symbol}</td>
                  <td>{priceInCurrentFiat}</td>
                  <td>
                    <CellChange change={data.percent_change_24h} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
  }
}

const mapStateToProps = state => {
  return {
    currencies: state.currencies,
    globals: state.globals
  };
};

const mapActionsToProps = {
  onSetDetailedCurrency: setDetailedCurrency,
  onSetCookie: setCookie
};

export default connect(mapStateToProps, mapActionsToProps)(CryptocurrencyTable);
