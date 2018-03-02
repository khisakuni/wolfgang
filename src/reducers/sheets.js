import _ from 'lodash'

const ADD_SHEET = 'ADD_SHEET'
const DELETE_SHEET = 'DELETE_SHEET'

export const types = { ADD_SHEET, DELETE_SHEET }

export function addSheet(sheet) {
  return {
    type: ADD_SHEET,
    payload: { [sheet.id]: sheet },
  }
}

export function deleteSheet(sheet) {
  return {
    type: DELETE_SHEET,
    payload: sheet,
  }
}

function orderByIndex(sheets) {
  return _.values(sheets).sort((a, b) => a.index - b.index).reduce((acc, sheet) => {
    acc[sheet.id] = sheet
    return acc
  }, {})
}

export const initialState = {}
export default (state = initialState, { type, payload }) => {
	switch (type) {
		case ADD_SHEET:
      return orderByIndex({ ...state, ...payload })
    case DELETE_SHEET:
      const ids = Object.keys(state).filter(id => id !== payload.id)
      const sheets = ids.reduce(((acc, id) => {
        acc[id] = state[id]
        return acc
      }), {})
      return orderByIndex(sheets)
    default:
      return orderByIndex(state)
  }
}
