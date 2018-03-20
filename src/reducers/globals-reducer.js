import {
  SET_DETAILED_CURRENCY,
  SET_FIAT_CURRENCY
} from "../actions/globals-actions";

export default function globalsReducer(state = "", { type, payload }) {
  switch (type) {
    case SET_DETAILED_CURRENCY:
      return { ...state, detailedCurrency: payload };
    case SET_FIAT_CURRENCY:
      return { ...state, fiatCurrency: payload };
    default:
      return state;
  }
}
