import { SELECT_WOUND } from "../actions/types";

const initialState = {
  selectedWound: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_WOUND:
      return {
        ...state,
        selectedWound:
          action.payload && action.payload !== state.selectedWound
            ? action.payload
            : null
      };
    default:
      return state;
  }
};
