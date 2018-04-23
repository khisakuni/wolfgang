import _ from "lodash";

export default function Sheet(params = {}) {
  this.id = params.id || _.uniqueId("sheet_");
  this.height = params.height;
  this.width = params.width;
}
