import _ from 'lodash'

export default function Measure(params = {}) {
  this.id = params.id || _.uniqueId('measure_')
  this.staffId = params.staffId
  this.sheetId = params.sheetId
  this.x = params.x
  this.y = params.y
  this.width = params.width
  this.index = params.index
}
