import { orderObjectValuesByIndex, deleteById } from './helpers'

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

export const initialState = {}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_STAFF:
      return orderObjectValuesByIndex({ ...state, ...payload })
    case DELETE_STAFF:
      return orderObjectValuesByIndex(deleteById(state, payload.id))
    default:
      return orderObjectValuesByIndex(state)
  }
}
