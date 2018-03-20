import React, { Component } from "react";
import { CellChange } from "./HelperCells";

import { connect } from "react-redux";
class CryptocurrencyDetail extends Component {
  render() {
    if (this.props.currencyDetail.error) {
      console.log("error");
      return (
        <div>
          Ooops, something went wrong fetching detailed cryptocurrency data!
          {String(this.props.currencyDetail.error)}
        </div>
      );
    } else if (this.props.currencyDetail.loading)
      return <div> Loading... </div>;
    else {
      var currentFiat = String(this.props.globals.fiatCurrency).toLowerCase();
      var priceKey = "price_" + currentFiat;
      var volumeKey = "24h_volume_" + currentFiat;
      var marketCapKey = "market_cap_" + currentFiat;

      return (
        <div>
          <div>
            <h1>
              {this.props.currencyDetail.currencyDetailInfo["name"]} Details
            </h1>
          </div>
          <div>
            <b>Rank: </b> {this.props.currencyDetail.currencyDetailInfo["rank"]}
          </div>
          <div>
            <b>Name: </b> {this.props.currencyDetail.currencyDetailInfo["name"]}
          </div>
          <div>
            <b>Symbol: </b>
            {this.props.currencyDetail.currencyDetailInfo["symbol"]}
          </div>
          <div>
            <b>Price ({currentFiat.toUpperCase()}): </b>
            {this.props.currencyDetail.currencyDetailInfo[priceKey]}
          </div>
          <div>
            <b>Volume 24h ({currentFiat.toUpperCase()}): </b>
            {this.props.currencyDetail.currencyDetailInfo[volumeKey]}
          </div>
          <div>
            <b>Market cap ({currentFiat.toUpperCase()}): </b>
            {this.props.currencyDetail.currencyDetailInfo[marketCapKey]}
          </div>
          <div>
            <b>Price (BTC): </b>
            {this.props.currencyDetail.currencyDetailInfo["price_btc"]}
          </div>
          <div>
            <b>Change 1h: </b>
            <CellChange
              change={
                this.props.currencyDetail.currencyDetailInfo[
                  "percent_change_1h"
                ]
              }
            />
          </div>
          <div>
            <b>Change 24h: </b>
            <CellChange
              change={
                this.props.currencyDetail.currencyDetailInfo[
                  "percent_change_24h"
                ]
              }
            />
          </div>
          <div>
            <b>Change 7d: </b>
            <CellChange
              change={
                this.props.currencyDetail.currencyDetailInfo[
                  "percent_change_7d"
                ]
              }
            />
          </div>
          <div>
            <b>Total supply: </b>
            {this.props.currencyDetail.currencyDetailInfo["total_supply"]}
          </div>
          <div>
            <b>Available supply: </b>
            {this.props.currencyDetail.currencyDetailInfo["available_supply"]}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    currencyDetail: state.currencyDetail,
    globals: state.globals
  };
};

export default connect(mapStateToProps)(CryptocurrencyDetail);
