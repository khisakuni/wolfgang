const ADD_CLEF = "ADD_CLEF";
const DELETE_CLEF = "DELETE_CLEF";

export const types = {
  ADD_CLEF,
  DELETE_CLEF
};

export const addClef = clef => ({
  type: types.ADD_CLEF,
  payload: { [clef.id]: clef }
});

export const deleteClef = clef => ({
  type: types.DELETE_CLEF,
  payload: clef
});

export const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_CLEF:
      return { ...state, ...payload };
    case DELETE_CLEF:
      const ids = Object.keys(state).filter(id => id !== payload.id);
      const clefs = ids.reduce((acc, id) => {
        acc[id] = state[id];
        return acc;
      }, {});
      return clefs;
    default:
      return state;
  }
};
