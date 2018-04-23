import _ from "lodash";

export default function Staff(params = {}) {
  this.id = params.id || _.uniqueId("staff_");
  this.sheetId = params.sheetId;
  this.index = params.index;
}
