import {
  GET_PATIENTS,
  GET_WOUNDS,
  PATCH_WOUND,
  SORT_PATIENTS_BY_LAST_NAME
} from "../actions/types";

const initialState = {
  patients: [],
  sorted: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PATIENTS:
      return {
        ...state,
        patients: action.payload ? action.payload : null,
        sorted: false
      };
    case GET_WOUNDS:
      return {
        ...state,
        wounds: action.payload ? action.payload : null
      };
    case PATCH_WOUND:
      return {
        ...state,
        wounds: state.wounds.map(
          wound => (wound.id === action.payload.id ? action.payload : wound)
        )
      };
    case SORT_PATIENTS_BY_LAST_NAME:
      const sortedPatients = state.patients.sort((patientA, patientB) => {
        if (patientA.attributes.lastName < patientB.attributes.lastName)
          return -1;
        if (patientA.attributes.lastName > patientB.attributes.lastName)
          return 1;
        return 0;
      });
      return {
        ...state,
        patients: sortedPatients,
        sorted: true
      };
    default:
      return state;
  }
};
