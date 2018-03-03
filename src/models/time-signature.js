import _ from 'lodash'

export default function TimeSignature(params = {}) {
  this.id = params.id || _.uniqueId('timeSignature_')
  this.measureId = params.measureId
}
