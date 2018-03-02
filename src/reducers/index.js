import { combineReducers } from 'redux'
import sheets from './sheets'
import staves from './staves'
import measures from './measures'
import voices from './voices'
import notes from './notes'

/*

vvv GOOD vvv
sheets: { 0: {}, 1: {} }

staves: {
  0: {
    id: ...,
  },
  1: {
    id: ...,
  }
}

measures: {
  0: {
    id: ...,
    sheetId: ...,
    staffId: ...,
  },
  1: {
    id: ...,
    sheetId: ...,
    staffId: ...,
  }
}

voices: {
  0: {
    id: ...,
    sheetId: ...,
    staffId: ...,
    measureId: ...,
  },
  1: {
    id: ...,
    sheetId: ...,
    staffId: ...,
    measureId: ...,
  },
}

notes: {
  0: {
    id: ...,
    voiceId: ...,
    measureId: ...,
    staffId: ...,
    sheetId: ...,
  },
  1: {
    id: ...,
    voiceId: ...,
    measureId: ...,
    staffId: ...,
    sheetId: ...,
  },
}

*/

export default combineReducers({
  sheets,
  staves,
  measures,
  voices,
  notes,
})
