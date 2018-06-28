import { UPDATE_AUTH_FIELD, LOGIN } from "../actions/types";

export const updateAuthField = e => dispatch => {
  dispatch({
    type: UPDATE_AUTH_FIELD,
    payload: { field: e.target.name, value: e.target.value }
  });
};

export const login = e => dispatch => {
  dispatch({
    type: LOGIN
  });
};
