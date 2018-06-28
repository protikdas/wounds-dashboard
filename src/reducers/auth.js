import { UPDATE_AUTH_FIELD, LOGIN } from "../actions/types";

const initialState = {
  fullName: "Alexander Fleming",
  profession: "Medical Practitioner",
  password: "",
  authenticated: false,
  wrongAttempt: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_AUTH_FIELD:
      return {
        ...state,
        [action.payload.field]: action.payload.value
      };
    case LOGIN:
      if (state.password === "@fleming") {
        return {
          ...state,
          authenticated: true,
          wrongAttempt: false
        };
      } else {
        return {
          ...state,
          authenticated: false,
          wrongAttempt: true
        };
      }
    default:
      return state;
  }
};
