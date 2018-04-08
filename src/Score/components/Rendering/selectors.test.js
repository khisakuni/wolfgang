import * as selectors from "./selectors";
import models from "../../../models";

describe("Rendering/selectors", () => {
  describe("notesForVoice", () => {
    const voice = new models.Voice();
    const includedNote = new models.Note({ voiceId: voice.id });
    const excludedNote = new models.Note();
    const state = {
      notes: {
        [includedNote.id]: includedNote,
        [excludedNote.id]: excludedNote
      }
    };

    it("returns notes that belong to voice", () => {
      expect(selectors.notesForVoice(voice)(state)).toContain(includedNote);
    });

    it("excludes notes that do not belong to voice", () => {
      expect(
        selectors.notesForVoice(state, { voiceId: voice.id })
      ).not.toContain(excludedNote);
    });
  });

  describe("voicesForMeasure", () => {
    const measure = new models.Measure();
    const includedVoice = new models.Voice({ measureId: measure.id });
    const excludedVoice = new models.Voice();
    const state = {
      voices: {
        [includedVoice.id]: includedVoice,
        [excludedVoice.id]: excludedVoice
      }
    };

    it("returns voices that belong to measure", () => {
      expect(selectors.voicesForMeasure(measure)(state)).toContain(
        includedVoice
      );
    });

    it("excludes voices that do not belong to measure", () => {
      expect(selectors.voicesForMeasure(measure)(state)).not.toContain(
        excludedVoice
      );
    });
  });

  describe("measuresForStaff", () => {
    const staff = new models.Staff();
    const includedMeasure = new models.Measure({ staffId: staff.id });
    const excludedMeasure = new models.Measure();
    const state = {
      measures: {
        [includedMeasure.id]: includedMeasure,
        [excludedMeasure.id]: excludedMeasure
      }
    };

    it("returns measures that belong to staff", () => {
      expect(selectors.measuresForStaff(staff)(state)).toContain(
        includedMeasure
      );
    });

    it("excludes measures that do not belong to staff", () => {
      expect(selectors.measuresForStaff(staff)(state)).not.toContain(
        excludedMeasure
      );
    });
  });

  describe("stavesForSheet", () => {
    const sheet = new models.Sheet();
    const includedStaff = new models.Staff({ sheetId: sheet.id });
    const excludedStaff = new models.Staff();
    const state = {
      staves: {
        [includedStaff.id]: includedStaff,
        [excludedStaff.id]: excludedStaff
      }
    };

    it("returns staves that belong to sheet", () => {
      expect(selectors.stavesForSheet(sheet)(state)).toContain(includedStaff);
    });

    it("excludes staves that do not belong to sheet", () => {
      expect(selectors.stavesForSheet(sheet)(state)).not.toContain(
        excludedStaff
      );
    });
  });

  describe("clefsForMeasure", () => {
    const measure = new models.Measure();
    const includedClef = new models.Clef({ measureId: measure.id });
    const excludedClef = new models.Clef();
    const state = {
      clefs: {
        [includedClef.id]: includedClef,
        [excludedClef.id]: excludedClef
      }
    };

    it("returns clefs that belong to measure", () => {
      expect(selectors.clefsForMeasure(measure)(state)).toContain(includedClef);
    });

    it("excludes clefs that do not belong to measure", () => {
      expect(selectors.clefsForMeasure(measure)(state)).not.toContain(
        excludedClef
      );
    });
  });

  describe("timeSignaturesForMeasure", () => {
    const measure = new models.Measure();
    const includedTimeSignature = new models.TimeSignature({
      measureId: measure.id
    });
    const excludedTimeSignature = new models.TimeSignature();
    const state = {
      timeSignatures: {
        [includedTimeSignature.id]: includedTimeSignature,
        [excludedTimeSignature.id]: excludedTimeSignature
      }
    };

    it("returns time signatures that belong to measure", () => {
      expect(selectors.timeSignaturesForMeasure(measure)(state)).toContain(
        includedTimeSignature
      );
    });

    it("exlcudes time signatures that do not belong to measure", () => {
      expect(selectors.timeSignaturesForMeasure(measure)(state)).not.toContain(
        excludedTimeSignature
      );
    });
  });

  describe("sheetsForScore", () => {
    const sheet = new models.Sheet();
    const staff = new models.Staff({ sheetId: sheet.id });
    const measure = new models.Measure({ staffId: staff.id });
    const clef = new models.Clef({ measureId: measure.id });
    const timeSignature = new models.TimeSignature({ measureId: measure.id });
    const voice = new models.Voice({ measureId: measure.id });
    const note = new models.Note({ voiceId: voice.id });
    const state = {
      sheets: { [sheet.id]: sheet },
      staves: { [staff.id]: staff },
      measures: { [measure.id]: measure },
      clefs: { [clef.id]: clef },
      timeSignatures: { [timeSignature]: timeSignature },
      voices: { [voice.id]: voice },
      notes: { [note.id]: note }
    };
    const result = selectors.sheetsForScore(state);

    it("returns sheets", () => {
      expect(result).toEqual([sheet]);
    });

    it("returns sheets with complete staves", () => {
      expect(result[0].staves).toContain(staff);
    });

    it("returns sheets with complete measures", () => {
      expect(result[0].staves[0].measures).toContain(measure);
    });

    it("returns sheets with complete voices");
  });
});
