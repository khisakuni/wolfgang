import { combineReducers } from 'redux'
import sheets from './sheets'
import staves from './staves'
import measures from './measures'
import voices from './voices'
import notes from './notes'
import clefs from './clefs'


export default combineReducers({
  sheets,
  staves,
  measures,
  voices,
  notes,
  clefs,
})
