import _ from 'lodash'

const ADD_STAFF = 'ADD_STAFF'
const DELETE_STAFF = 'DELETE_STAFF'

export const types = { ADD_STAFF, DELETE_STAFF }

export function addStaff(staff) {
  return {
    type: ADD_STAFF,
    payload: { [staff.id]: staff },
  }
}

export function deleteStaff(staff) {
  return {
    type: DELETE_STAFF,
    payload: { id: staff.id }
  }
}

function orderByIndex(staves) {
  return _.values(staves).sort((a, b) => a.index - b.index).reduce((acc, staff) => {
    acc[staff.id] = staff
    return acc
  }, {})
}

export const initialState = {}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_STAFF:
      return orderByIndex({ ...state, ...payload })
    case DELETE_STAFF:
      const ids = Object.keys(state).filter(id => id !== payload.id)
      const staves = ids.reduce(((acc, id) => {
        acc[id] = state[id]
        return acc
      }), {})
      return orderByIndex(staves)
    default:
      return orderByIndex(state)
  }
}
