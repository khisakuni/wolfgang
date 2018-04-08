import { createSelector } from "reselect";
import _ from "lodash";

function ModelFactory(state = {}) {
  this.sheet = sheet => {
    sheet.staves = stavesForSheet(sheet)(state).map(this.staff);
    return sheet;
  };

  this.staff = staff => {
    staff.measures = measuresForStaff(staff)(state).map(this.measure);
    return staff;
  };

  this.measure = measure => {
    measure.voices = voicesForMeasure(measure)(state).map(this.voice);
    measure.clefs = clefsForMeasure(measure)(state);
    measure.timeSignatures = timeSignaturesForMeasure(measure)(state);
    return measure;
  };

  this.voice = voice => {
    voice.notes = notesForVoice(voice)(state);
    return voice;
  };
}

export const sheetsForScore = state => {
  const mf = new ModelFactory(state);
  return _.values(state.sheets).map(mf.sheet);
};

export const stavesForSheet = sheet =>
  createSelector(stavesSelector, staves =>
    find(staves, makeFilterFn(sheet.id, "sheetId"))
  );

export const measuresForStaff = staff =>
  createSelector(measuresSelector, measures =>
    find(measures, makeFilterFn(staff.id, "staffId"))
  );

export const clefsForMeasure = measure =>
  createSelector(clefsSelector, clefs =>
    find(clefs, makeFilterFn(measure.id, "measureId"))
  );

export const timeSignaturesForMeasure = measure =>
  createSelector(timeSignaturesSelector, timeSignatures =>
    find(timeSignatures, makeFilterFn(measure.id, "measureId"))
  );

export const voicesForMeasure = measure =>
  createSelector(voicesSelector, voices =>
    find(voices, makeFilterFn(measure.id, "measureId"))
  );

export const notesForVoice = voice =>
  createSelector(notesSelector, notes =>
    find(notes, makeFilterFn(voice.id, "voiceId"))
  );

const stavesSelector = ({ staves }) => staves;
const measuresSelector = ({ measures }) => measures;

const clefsSelector = ({ clefs }) => clefs;

const timeSignaturesSelector = ({ timeSignatures }) => timeSignatures;

const voicesSelector = ({ voices }) => voices;

const notesSelector = ({ notes }) => notes;

const find = (childrenObj, filterFn) =>
  filterChildren(_.values(childrenObj), filterFn);

const filterChildren = (children, filterFn) => children.filter(filterFn);

const makeFilterFn = (id, key) => obj => obj[key] === id;
