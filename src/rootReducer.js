import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import auth from "./reducers/auth";
import patient from "./reducers/patient";
import wound from "./reducers/wound";

export default combineReducers({
  auth,
  patient,
  wound,
  router: routerReducer
});
