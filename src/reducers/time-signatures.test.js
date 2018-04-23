import reducer, {
  addTimeSignature,
  deleteTimeSignature,
  types,
  initialState
} from "./time-signatures";
import TimeSignature from "../models/time-signature";

describe("reducers/time-signatures", () => {
  describe("actions creators", () => {
    const timeSignature = new TimeSignature();
    describe("addTimeSignature", () => {
      it("returns ADD_TIME_SIGNATURE action", () => {
        const expected = {
          type: types.ADD_TIME_SIGNATURE,
          payload: { [timeSignature.id]: timeSignature }
        };

        expect(addTimeSignature(timeSignature)).toEqual(expected);
      });
    });

    describe("deleteTimeSignature", () => {
      it("returns DELETE_TIME_SIGNATURE action", () => {
        const expected = {
          type: types.DELETE_TIME_SIGNATURE,
          payload: timeSignature
        };

        expect(deleteTimeSignature(timeSignature)).toEqual(expected);
      });
    });
  });

  describe("reducer", () => {
    it("returns initial state when undefined", () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });

    const timeSignature = new TimeSignature();

    it("adds time signature when ADD_TIME_SIGNATURE", () => {
      const expected = { [timeSignature.id]: timeSignature };

      expect(reducer(initialState, addTimeSignature(timeSignature))).toEqual(
        expected
      );
    });

    it("deletes time signature when DELETE_TIME_SIGNATURE", () => {
      const expected = {};
      const state = { [timeSignature.id]: timeSignature };

      expect(reducer(state, deleteTimeSignature(timeSignature))).toEqual(
        expected
      );
    });
  });
});
