import React, { Component } from "react";
import { DetailItem } from "./presentational/DetailItem";
import { CellChange } from "./presentational/HelperCells";

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
          <DetailItem
            title="Rank"
            value={this.props.currencyDetail.currencyDetailInfo["rank"]}
          />
          <DetailItem
            title="Name"
            value={this.props.currencyDetail.currencyDetailInfo["name"]}
          />
          <DetailItem
            title="Symbol"
            value={this.props.currencyDetail.currencyDetailInfo["symbol"]}
          />
          <DetailItem
            title={"Price (" + currentFiat.toUpperCase() + ")"}
            value={this.props.currencyDetail.currencyDetailInfo[priceKey]}
          />
          <DetailItem
            title={"Volume 24h (" + currentFiat.toUpperCase() + ")"}
            value={this.props.currencyDetail.currencyDetailInfo[volumeKey]}
          />
          <DetailItem
            title={"Market cap (" + currentFiat.toUpperCase() + ")"}
            value={this.props.currencyDetail.currencyDetailInfo[marketCapKey]}
          />
          <DetailItem
            title="Price (BTC)"
            value={this.props.currencyDetail.currencyDetailInfo["price_btc"]}
          />
          <DetailItem
            title="Change 1h"
            value={
              <CellChange
                change={
                  this.props.currencyDetail.currencyDetailInfo[
                    "percent_change_1h"
                  ]
                }
              />
            }
          />
          <DetailItem
            title="Change 24h"
            value={
              <CellChange
                change={
                  this.props.currencyDetail.currencyDetailInfo[
                    "percent_change_24h"
                  ]
                }
              />
            }
          />
          <DetailItem
            title="Change 7d"
            value={
              <CellChange
                change={
                  this.props.currencyDetail.currencyDetailInfo[
                    "percent_change_7d"
                  ]
                }
              />
            }
          />
          <DetailItem
            title="Total supply"
            value={this.props.currencyDetail.currencyDetailInfo["total_supply"]}
          />
          <DetailItem
            title="Available supply"
            value={
              this.props.currencyDetail.currencyDetailInfo["available_supply"]
            }
          />
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
