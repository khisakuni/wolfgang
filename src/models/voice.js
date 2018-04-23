import _ from "lodash";

export default function Voice(params = {}) {
  this.id = params.id || _.uniqueId("voice_");
  this.numBeats = params.numBeats;
  this.beatValue = params.beatValue;
  this.index = params.index;
  this.measureId = params.measureId;
  this.staffId = params.staffId;
  this.sheetId = params.sheetId;
  this.notes = params.notes || [];
}
