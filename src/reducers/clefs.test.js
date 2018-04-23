import reducer, { addClef, deleteClef, types, initialState } from "./clefs";
import models from "../models";

describe("reducers/clefs", () => {
  describe("action creators", () => {
    const clef = new models.Clef();

    describe("addClef", () => {
      it("returns ADD_CLEF action", () => {
        const expected = {
          type: types.ADD_CLEF,
          payload: { [clef.id]: clef }
        };

        expect(addClef(clef)).toEqual(expected);
      });
    });

    describe("deleteClef", () => {
      it("returns DELETE_CLEF action", () => {
        const expected = {
          type: types.DELETE_CLEF,
          payload: clef
        };

        expect(deleteClef(clef)).toEqual(expected);
      });
    });
  });

  describe("reducer", () => {
    describe("undefined", () => {
      it("returns initialState", () => {
        expect(reducer(undefined, {})).toEqual(initialState);
      });
    });

    const measure = new models.Measure();
    const clef = new models.Clef({ measureId: measure.id });

    describe("ADD_CLEF", () => {
      it("adds clef to state", () => {
        const expected = { [clef.id]: clef };

        expect(reducer(initialState, addClef(clef))).toEqual(expected);
      });
    });

    describe("DELETE_CLEF", () => {
      it("deletes clef from state", () => {
        const expected = {};
        const state = { [clef.id]: clef };

        expect(reducer(state, deleteClef(clef))).toEqual(expected);
      });
    });
  });
});
