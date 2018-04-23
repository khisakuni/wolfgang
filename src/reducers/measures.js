import { orderObjectValuesByIndex, deleteById } from "./helpers";

const ADD_MEASURE = "ADD_MEASURE";
const DELETE_MEASURE = "DELETE_MEASURE";

export const types = { ADD_MEASURE, DELETE_MEASURE };

export function addMeasure(measure) {
  return {
    type: ADD_MEASURE,
    payload: { [measure.id]: measure }
  };
}

export function deleteMeasure(measure) {
  return {
    type: DELETE_MEASURE,
    payload: measure
  };
}

export const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_MEASURE:
      return orderObjectValuesByIndex({ ...state, ...payload });
    case DELETE_MEASURE:
      return orderObjectValuesByIndex(deleteById(state, payload.id));
    default:
      return orderObjectValuesByIndex(state);
  }
};
