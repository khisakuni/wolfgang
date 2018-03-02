import _ from 'lodash'

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

function orderByIndex(notes) {
  return _.values(notes).sort((a, b) => a.index - b.index).reduce((acc, note) => {
    acc[note.id] = note
    return acc
  }, {})
}

export const initialState = {}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_NOTE:
      return orderByIndex({ ...state, ...payload })
    case DELETE_NOTE:
      const ids = Object.keys(state).filter(id => id !== payload.id)
      const notes = ids.reduce(((acc, id) => {
        acc[id] = state[id]
        return acc
      }), {})
      return orderByIndex(notes)
    default:
      return orderByIndex(state)
  }
}
