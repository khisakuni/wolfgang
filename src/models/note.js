import _ from 'lodash'

export default function Note(params = {}) {
  this.id = params.id || _.uniqueId('note_')
  this.index = params.index
  this.voiceId = params.voiceId
  this.measureId = params.measureId
  this.staffid = params.staffId
  this.sheetId = params.sheetId
  this.value = params.value
  this.duration = params.duration
}
