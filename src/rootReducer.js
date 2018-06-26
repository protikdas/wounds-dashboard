import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import patient from "./reducers/patient";
import wound from "./reducers/wound";

export default combineReducers({
  patient,
  wound,
  router: routerReducer
});
