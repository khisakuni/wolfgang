import { orderObjectValuesByIndex, deleteById } from './helpers'

const ADD_NOTE = 'ADD_NOTE'
const DELETE_NOTE = 'DELETE_NOTE'

export const types = { ADD_NOTE, DELETE_NOTE }

export function addNote(note) {
  return {
    type: ADD_NOTE,
    payload: { [note.id]: note },
  }
}

export function deleteNote(note) {
  return {
    type: DELETE_NOTE,
    payload: note,
  }
}

export const initialState = {}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_NOTE:
      return orderObjectValuesByIndex({ ...state, ...payload })
    case DELETE_NOTE:
      return orderObjectValuesByIndex(deleteById(state, payload.id))
    default:
      return orderObjectValuesByIndex(state)
  }
}
