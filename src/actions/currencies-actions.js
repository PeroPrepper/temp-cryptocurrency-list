import axios from "axios";
export const UPDATE_CURRENCIES = "currencies:updateAllCurrencies";
export const CURRENCIES_SET_DEFAULT_FIAT = "currencies:setDefaultFiat";

export function updateAllCurrencies(newCurrenciesData) {
  return {
    type: UPDATE_CURRENCIES,
    payload: {
      currencyList: newCurrenciesData.data,
      fiat: newCurrenciesData.fiat
    }
  };
}

export function showLoadingFetchingCurrencies() {
  return {
    type: UPDATE_CURRENCIES,
    payload: { loading: true }
  };
}

export function showErrorFetchingCurrencies(errorMsg) {
  return {
    type: UPDATE_CURRENCIES,
    payload: { error: errorMsg }
  };
}

export function setDefaultFiat(newFiat) {
  return {
    type: CURRENCIES_SET_DEFAULT_FIAT,
    payload: {
      fiat: newFiat
    }
  };
}

export function fetchAllCurrencies(fiatCurrency) {
  return dispatch => {
    dispatch(showLoadingFetchingCurrencies());

    axios
      .get(
        "https://api.coinmarketcap.com/v1/ticker/?convert=" +
          fiatCurrency +
          "&start=0&limit=100"
      )
      .then(function(response) {
        dispatch(
          updateAllCurrencies({ data: response.data, fiat: fiatCurrency })
        );
      })
      .catch(function(error) {
        dispatch(showErrorFetchingCurrencies(error));
      });
  };
}
