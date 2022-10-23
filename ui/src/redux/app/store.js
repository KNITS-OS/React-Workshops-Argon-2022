import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";

import { employeeReducer } from "redux/features/employees/employee.reducer";

const middleware = [thunk];

export const rootReducer = combineReducers({
  employee: employeeReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware, logger))
);
