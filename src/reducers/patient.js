import { GET_PATIENTS, GET_WOUNDS } from "../actions/types";

const initialState = {
  patients: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PATIENTS:
      return {
        ...state,
        patients: action.payload ? action.payload : null
      };
    case GET_WOUNDS:
      return {
        ...state,
        wounds: action.payload ? action.payload : null
      };
    default:
      return state;
  }
};
