import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";

//Root Reducer
import rootReducer from "./rootReducer";

//Navigation middleware
export const history = createHistory();
const navMiddleware = routerMiddleware(history);

//Middleware arrays
const prodMiddleware = [thunk, navMiddleware];
const devMiddleware = prodMiddleware.concat([createLogger()]);

const getMiddleware = () => {
  if (process.env.NODE_ENV === "production") {
    return applyMiddleware(...prodMiddleware);
  } else {
    return applyMiddleware(...devMiddleware);
  }
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(getMiddleware())
);
