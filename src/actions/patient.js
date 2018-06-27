import { GET_PATIENTS, GET_WOUNDS, SORT_PATIENTS_BY_LAST_NAME } from "./types";
import api from "../api";

export const getPatients = () => dispatch => {
  api.patient.getAll().then(patients =>
    dispatch({
      type: GET_PATIENTS,
      payload: patients
    })
  );
};

export const getWounds = patientID => dispatch => {
  api.patient.getWounds(patientID).then(wounds =>
    dispatch({
      type: GET_WOUNDS,
      payload: wounds
    })
  );
};

export const sortPatientsByLastName = () => dispatch => {
  dispatch({
    type: SORT_PATIENTS_BY_LAST_NAME
  });
};
