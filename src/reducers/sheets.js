import { orderObjectValuesByIndex, deleteById } from "./helpers";

const ADD_SHEET = "ADD_SHEET";
const DELETE_SHEET = "DELETE_SHEET";

export const types = { ADD_SHEET, DELETE_SHEET };

export function addSheet(sheet) {
  return {
    type: ADD_SHEET,
    payload: { [sheet.id]: sheet }
  };
}

export function deleteSheet(sheet) {
  return {
    type: DELETE_SHEET,
    payload: sheet
  };
}

export const initialState = {};
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_SHEET:
      return orderObjectValuesByIndex({ ...state, ...payload });
    case DELETE_SHEET:
      return orderObjectValuesByIndex(deleteById(state, payload.id));
    default:
      return orderObjectValuesByIndex(state);
  }
};
