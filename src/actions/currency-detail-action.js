import axios from "axios";
export const FETCH_CURRENCY_DETAIL = "detailed-currency:fetchCurrencyDetail";

export function updateCurrencyDetail(newCurrencyData) {
  return {
    type: FETCH_CURRENCY_DETAIL,
    payload: {
      currencyDetailInfo: newCurrencyData.data,
      fiat: newCurrencyData.fiat
    }
  };
}

export function showLoadingFetchingCurrencyDetail() {
  return {
    type: FETCH_CURRENCY_DETAIL,
    payload: { loading: true }
  };
}

export function showErrorFetchingCurrencyDetail(errorMsg) {
  return {
    type: FETCH_CURRENCY_DETAIL,
    payload: { error: errorMsg }
  };
}

export function fetchCurrencyDetail(currencyId, fiatCurrency) {
  return dispatch => {
    dispatch(showLoadingFetchingCurrencyDetail());

    axios
      .get(
        "https://api.coinmarketcap.com/v1/ticker/" +
          currencyId +
          "/?convert=" +
          fiatCurrency
      )
      .then(function(response) {
        dispatch(
          updateCurrencyDetail({ data: response.data[0], fiat: fiatCurrency })
        );
      })
      .catch(function(error) {
        dispatch(showErrorFetchingCurrencyDetail(error));
      });
  };
}

export function setCurrencyDetail(newCurrencyData, pFiat) {
  return {
    type: FETCH_CURRENCY_DETAIL,
    payload: { currencyDetailInfo: newCurrencyData, fiat: pFiat }
  };
}
