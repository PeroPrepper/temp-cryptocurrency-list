import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Home from "./screens/Home";
import Details from "./screens/Details";
import Settings from "./screens/Settings";
import registerServiceWorker from "./registerServiceWorker";

import { Provider } from "react-redux";
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { syncHistoryWithStore, routerReducer } from "react-router-redux";

import { applyMiddleware, combineReducers, createStore, compose } from "redux";

import thunk from "redux-thunk";

import globalsReducer from "./reducers/globals-reducer";
import currenciesReducer from "./reducers/currencies-reducer";
import currencyDetailReducer from "./reducers/currency-detail-reducer";

import Cookies from "js-cookie";
import { createCookieMiddleware } from "redux-cookie";

const reducers = combineReducers({
  globals: globalsReducer,
  currencies: currenciesReducer,
  currencyDetail: currencyDetailReducer,
  routing: routerReducer
});

const enhancers = compose(
  applyMiddleware(
    thunk,
    createCookieMiddleware(Cookies)
  ) /* ,
  window.devToolsExtension && window.devToolsExtension() */
);

const store = createStore(
  reducers,
  {
    currencies: { currencyList: [], fiat: "USD" },
    globals: { fiatCurrency: "USD" },
    currencyDetail: { currencyDetailInfo: [], fiat: "USD" }
  },
  enhancers
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="details" component={Details} />
        <Route path="settings" component={Settings} />
      </Route>
    </Router>
  </Provider>,

  document.getElementById("root")
);
registerServiceWorker();
