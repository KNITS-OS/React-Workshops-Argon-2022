import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import { rootReducer } from "redux/app";

export const createStoreWithState = (preloadedState) => {
  return createStore(rootReducer, preloadedState, applyMiddleware(thunk));
};
export const renderWithProviders = (ui) => {
  const store = createStore(rootReducer, applyMiddleware(thunk));

  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return { store, ...render(ui, { wrapper: Wrapper }) };
};
// re-export everything
export * from "@testing-library/react";
