import { SELECT_WOUND } from "./types";
import api from "../api";

export const selectWound = woundID => dispatch => {
  dispatch({
    type: SELECT_WOUND,
    payload: woundID
  });
};
