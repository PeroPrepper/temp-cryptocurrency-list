import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import App from "./App";

import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Home } from "./screens/Home";
import { createMockStore } from "redux-test-utils";

import currenciesReducer from "./reducers/currencies-reducer";
import globalsReducer from "./reducers//globals-reducer";
import {
  UPDATE_CURRENCIES,
  CURRENCIES_SET_DEFAULT_FIAT
} from "./actions/currencies-actions";

import { showErrorFetchingCurrencies } from "./actions/currencies-actions";

import { CellChange } from "./screens/components/presentational/HelperCells";
import renderer from "react-test-renderer";

// TEST A COMPONENT
describe("Price Change Component Rendering", () => {
  it("Renders correctly with  positive input value.", () => {
    const tree = renderer.create(<CellChange change={10} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Renders correctly with passed negative input value.", () => {
    const tree = renderer.create(<CellChange change={-15} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

// TEST A REDUCER
describe("Currencies Reducer", () => {
  it("Should return the initial state when no action type is provided", () => {
    expect(currenciesReducer("SomeState", {})).toEqual("SomeState");
  });

  it("Should return the initial state when unknown action type is provided", () => {
    const someAction = {
      type: "WrongType",
      payload: { fiat: "USD" }
    };

    expect(currenciesReducer({ test: true }, someAction)).toEqual({
      test: true
    });
  });

  it("Should handle UPDATE_CURRENCIES action and return the payload", () => {
    const updateCurrenciesAction = {
      type: UPDATE_CURRENCIES,
      payload: { fiat: "USD" }
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(currenciesReducer({ test: true }, updateCurrenciesAction)).toEqual({
      fiat: "USD"
    });
  });

  it("Should handle CURRENCIES_SET_DEFAULT_FIAT action and return previos state + payload", () => {
    const setDefaultFiat = {
      type: CURRENCIES_SET_DEFAULT_FIAT,
      payload: { fiat: "USD" }
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(currenciesReducer({ test: true }, setDefaultFiat)).toEqual({
      fiat: "USD",
      test: true
    });
  });
});

// TEST AN ACTION
describe("Currencies Error Action", () => {
  it("Should return an error object with correct type and message.", () => {
    expect(showErrorFetchingCurrencies("Error Message")).toEqual({
      type: UPDATE_CURRENCIES,
      payload: { error: "Error Message" }
    });
  });
});
