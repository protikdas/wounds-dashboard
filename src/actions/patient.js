import { GET_PATIENTS, GET_WOUNDS } from "./types";
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
