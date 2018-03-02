import _ from 'lodash'

const ADD_VOICE = 'ADD_VOICE'
const DELETE_VOICE = 'DELETE_VOICE'

export const types = { ADD_VOICE, DELETE_VOICE }

export function addVoice(voice) {
  return {
    type: ADD_VOICE,
    payload: { [voice.id]: voice },
  }
}

export function deleteVoice(voice) {
  return {
    type: DELETE_VOICE,
    payload: voice,
  }
}

function orderByIndex(voices) {
  return _.values(voices).sort((a, b) => a.index - b.index).reduce((acc, voice) => {
    acc[voice.id] = voice
    return acc
  }, {})
}

export const initialState = {}

export default (state = initialState, { type, payload}) => {
  switch (type) {
    case ADD_VOICE:
      return orderByIndex({ ...state, ...payload })
    case DELETE_VOICE:
      const ids = Object.keys(state).filter(id => id !== payload.id)
      const voices = ids.reduce(((acc, id) => {
        acc[id] = state[id]
        return acc
      }), {})
      return orderByIndex(voices)
    default:
      return orderByIndex(state)
  }
}
