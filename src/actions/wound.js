import { SELECT_WOUND, PATCH_WOUND } from "./types";
import api from "../api";

export const selectWound = woundID => dispatch => {
  console.log(woundID);
  dispatch({
    type: SELECT_WOUND,
    payload: woundID
  });
};

export const patchWound = (type, wound) => dispatch => {
  switch (type) {
    case "resolve":
      if ((wound || {}).attributes) {
        wound.attributes.resolved = !wound.attributes.resolved;
        api.wound.patchWound(wound).then(wound => {
          dispatch({
            type: PATCH_WOUND,
            payload: JSON.parse(wound)
          });
        });
      }
    default:
      dispatch({
        type: PATCH_WOUND,
        payload: wound
      });
  }
};
