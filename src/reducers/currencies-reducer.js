import {
  UPDATE_CURRENCIES,
  CURRENCIES_SET_DEFAULT_FIAT
} from "../actions/currencies-actions";

export default function currenciesReducer(state = "", { type, payload }) {
  switch (type) {
    case UPDATE_CURRENCIES:
      return payload;
    case CURRENCIES_SET_DEFAULT_FIAT:
      return { ...state, fiat: payload.fiat };
    default:
      return state;
  }
}
