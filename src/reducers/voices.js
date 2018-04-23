import { orderObjectValuesByIndex, deleteById } from "./helpers";

const ADD_VOICE = "ADD_VOICE";
const DELETE_VOICE = "DELETE_VOICE";

export const types = { ADD_VOICE, DELETE_VOICE };

export function addVoice(voice) {
  return {
    type: ADD_VOICE,
    payload: { [voice.id]: voice }
  };
}

export function deleteVoice(voice) {
  return {
    type: DELETE_VOICE,
    payload: voice
  };
}

export const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_VOICE:
      return orderObjectValuesByIndex({ ...state, ...payload });
    case DELETE_VOICE:
      return orderObjectValuesByIndex(deleteById(state, payload.id));
    default:
      return orderObjectValuesByIndex(state);
  }
};
