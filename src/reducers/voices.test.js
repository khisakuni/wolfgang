import reducer, { addVoice, deleteVoice, types, initialState } from "./voices";
import Voice from "../models/voice";

describe("reducers/voices", () => {
  describe("action creators", () => {
    const voice = new Voice();

    describe("addVoice", () => {
      it("returns ADD_VOICE action", () => {
        const expected = {
          type: types.ADD_VOICE,
          payload: { [voice.id]: voice }
        };

        expect(addVoice(voice)).toEqual(expected);
      });
    });

    describe("deleteVoice", () => {
      it("returns DELETE_VOICE action", () => {
        const expected = {
          type: types.DELETE_VOICE,
          payload: voice
        };

        expect(deleteVoice(voice)).toEqual(expected);
      });
    });
  });

  describe("reducer", () => {
    describe("undefined", () => {
      it("returns initial state", () => {
        expect(reducer(undefined, {})).toEqual(initialState);
      });
    });

    describe("ADD_VOICE", () => {
      const voice = new Voice({ index: 0 });

      it("adds voice to state", () => {
        const expected = { [voice.id]: voice };

        expect(reducer(initialState, addVoice(voice))).toEqual(expected);
      });

      it("orders voices by index", () => {
        const anotherVoice = new Voice({ index: 1 });
        const state = { [anotherVoice.id]: anotherVoice };
        const expected = { [voice.id]: voice, ...state };

        expect(reducer(state, addVoice(voice))).toEqual(expected);
      });
    });

    describe("DELETE_VOICE", () => {
      const voice1 = new Voice({ index: 0 });
      const voice2 = new Voice({ index: 1 });
      const voice3 = new Voice({ index: 2 });
      const state = {
        [voice1.id]: voice1,
        [voice2.id]: voice2,
        [voice3.id]: voice3
      };

      it("deletes voice from state", () => {
        const expected = {
          [voice2.id]: voice2,
          [voice3.id]: voice3
        };

        expect(reducer(state, deleteVoice(voice1))).toEqual(expected);
      });

      it("orders voices by index", () => {
        const expected = {
          [voice1.id]: voice1,
          [voice3.id]: voice3
        };

        expect(reducer(state, deleteVoice(voice2))).toEqual(expected);
      });
    });
  });
});
