export const SET_DETAILED_CURRENCY = "globals:setDetailedCurrency";
export const SET_FIAT_CURRENCY = "globals:setFiatCurrency";

export function setDetailedCurrency(detailedCurrencyId) {
  return {
    type: SET_DETAILED_CURRENCY,
    payload: detailedCurrencyId
  };
}

export function setFiatCurrency(fiatCurrency) {
  return {
    type: SET_FIAT_CURRENCY,
    payload: fiatCurrency
  };
}
