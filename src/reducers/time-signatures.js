const ADD_TIME_SIGNATURE = 'ADD_TIME_SIGNATURE'
const DELETE_TIME_SIGNATURE = 'DELETE_TIME_SIGNATURE'

export const types = {
  ADD_TIME_SIGNATURE,
  DELETE_TIME_SIGNATURE,
}

export const addTimeSignature = (timeSignature) => ({
  type: ADD_TIME_SIGNATURE,
  payload: { [timeSignature.id]: timeSignature },
})

export const deleteTimeSignature = (timeSignature) => ({
  type: DELETE_TIME_SIGNATURE,
  payload: timeSignature,
})

export const initialState = {}
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TIME_SIGNATURE:
      return { ...state, ...payload }
    case DELETE_TIME_SIGNATURE:
      const ids = Object.keys(state).filter(id => id !== payload.id)
      return ids.reduce(((acc, id) => {
        acc[id] = state[id]
        return acc
      }), {})
    default:
      return state
  }
}
