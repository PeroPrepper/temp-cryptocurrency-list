import React from "react";
import { connect } from "react-redux";

import CryptocurrencyTable from "./components/CryptocurrencyTable";
import { fetchAllCurrencies } from "../actions/currencies-actions";

class Home extends React.Component {
  componentDidMount() {
    /* Fetch data from API if the list is empty or if there was a change in the fiat currency selection */
    if (
      this.props.currencies.currencyList.length === 0 ||
      this.props.globals.fiatCurrency !== this.props.currencies.fiat
    ) {
      this.props.onFetchAllCurrencies(this.props.globals.fiatCurrency);
    }
  }

  render() {
    return (
      <div>
        <h1> Cryptocurrency List</h1>
        <button
          id="button"
          onClick={() =>
            this.props.onFetchAllCurrencies(this.props.globals.fiatCurrency)
          }
          className="button"
        >
          Refresh
        </button>
        <div className="tableHolder">
          <CryptocurrencyTable />
        </div>
      </div>
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
  onFetchAllCurrencies: fetchAllCurrencies
};

export default connect(mapStateToProps, mapActionsToProps)(Home);
