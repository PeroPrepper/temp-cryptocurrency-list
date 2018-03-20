import { FETCH_CURRENCY_DETAIL } from "../actions/currency-detail-action";

export default function currencyDetailReducer(state = "", { type, payload }) {
  switch (type) {
    case FETCH_CURRENCY_DETAIL:
      return payload;
    default:
      return state;
  }
}
