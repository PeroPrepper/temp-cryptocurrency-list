import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import CryptocurrencyDetail from "./components/CryptocurrencyDetail";
import {
  fetchCurrencyDetail,
  setCurrencyDetail
} from "../actions/currency-detail-action";
import {
  setDetailedCurrency,
  setFiatCurrency
} from "../actions/globals-actions";
import { getCookie } from "redux-cookie";

class Details extends React.Component {
  constructor() {
    super();

    this.error = false;
    this.refreshCheck = this.refreshCheck.bind(this);
  }

  refreshCheck() {
    if (
      this.props.globals.fiatCurrency !== this.props.currencyDetail.fiat &&
      !(
        this.props.globals.fiatCurrency === this.props.currencies.fiat &&
        this.props.currencies.currencyList.length > 0
      )
    )
      return true;
    else return false;
  }

  componentWillMount() {
    /* If there is no info about selected fiat currency or detailed currency in the state,
    check cookies. If cookies don't hold that info either, show error. */
    if (
      this.props.globals.detailedCurrency === undefined ||
      this.props.globals.fiatCurrency === undefined
    ) {
      var pDetailedCurrency = this.props.onGetCookie("cookieDetailedCurrency");
      var pFiatCurrency = this.props.onGetCookie("cookieFiatCurrency");

      if (pFiatCurrency === undefined || pDetailedCurrency === undefined) {
        this.error = true;
        return;
      }
      this.props.onSetFiatCurrency(pFiatCurrency);
      this.props.onSetDetailedCurrency(pDetailedCurrency);
      this.props.onFetchCurrencyDetail(pDetailedCurrency, pFiatCurrency);
    } else if (this.refreshCheck()) {
      /* Fetch new crypto currency details from API if selected fiat was changed or if we don't have that data loaded already.*/
      this.props.onFetchCurrencyDetail(
        this.props.globals.detailedCurrency,
        this.props.globals.fiatCurrency
      );
    } else {
      /* Get cryptocurrency detail from already downloaded data if there was no need to refresh.*/
      var detailedCurrency = this.props.globals.detailedCurrency;
      var currencyDetail = this.props.currencies.currencyList.filter(function(
        obj
      ) {
        return obj.id === detailedCurrency;
      });

      if (currencyDetail.length > 0) {
        this.props.onSetCurrencyDetail(
          currencyDetail[0],
          this.props.currencies.fiat
        );
      }
    }
  }

  render() {
    return (
      <div>
        <br />
        {this.error === true ? (
          <div>
            {" "}
            Details for which currency are you looking for? Click "back" to
            select one!{" "}
          </div>
        ) : (
          <div>
            <button
              onClick={() =>
                this.props.onFetchCurrencyDetail(
                  this.props.globals.detailedCurrency,
                  this.props.globals.fiatCurrency
                )
              }
              className="button"
            >
              Refresh
            </button>
            <CryptocurrencyDetail />
          </div>
        )}{" "}
        <Link to="/">
          <button className="buttonBack">{"<< "} Back</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    globals: state.globals,
    currencies: state.currencies,
    currencyDetail: state.currencyDetail
  };
};

const mapActionsToProps = {
  onFetchCurrencyDetail: fetchCurrencyDetail,
  onSetCurrencyDetail: setCurrencyDetail,
  onSetFiatCurrency: setFiatCurrency,
  onSetDetailedCurrency: setDetailedCurrency,
  onGetCookie: getCookie
};

export default connect(mapStateToProps, mapActionsToProps)(Details);
