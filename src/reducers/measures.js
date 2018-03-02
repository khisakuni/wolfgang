import _ from 'lodash'

const ADD_MEASURE = 'ADD_MEASURE'
const DELETE_MEASURE = 'DELETE_MEASURE'

export const types = { ADD_MEASURE, DELETE_MEASURE }

export function addMeasure(measure) {
  return {
    type: ADD_MEASURE,
    payload: { [measure.id]: measure },
  }
}

export function deleteMeasure(measure) {
  return {
    type: DELETE_MEASURE,
    payload: measure
  }
}

function orderByIndex(measures) {
  return _.values(measures).sort((a, b) => a.index - b.index).reduce((acc, measure) => {
    acc[measure.id] = measure
    return acc
  }, {})
}

export const initialState = {}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_MEASURE:
      return orderByIndex({ ...state, ...payload })
    case DELETE_MEASURE:
      const ids = Object.keys(state).filter(id => id !== payload.id)
      const measures = ids.reduce(((acc, id) => {
        acc[id] = state[id]
        return acc
      }), {})
      return orderByIndex(measures)
    default:
      return orderByIndex(state)
  }
}
