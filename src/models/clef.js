import _ from 'lodash'

export default function Clef(params = {}) {
  this.id = _.uniqueId('clef_')
  this.measureId = params.measureId
  this.type = params.type
}
