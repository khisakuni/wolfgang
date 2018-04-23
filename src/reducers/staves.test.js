import reducer, { addStaff, deleteStaff, types, initialState } from "./staves";
import Staff from "../models/staff";

describe("reducers/staves", () => {
  describe("action creators", () => {
    const staff = new Staff();

    describe("addStaff", () => {
      it("returns ADD_STAFF action", () => {
        const expected = {
          type: types.ADD_STAFF,
          payload: { [staff.id]: staff }
        };

        expect(addStaff(staff)).toEqual(expected);
      });
    });

    describe("deleteStaff", () => {
      it("returns DELETE_STAFF action", () => {
        const expected = {
          type: types.DELETE_STAFF,
          payload: staff
        };

        expect(deleteStaff(staff)).toEqual(expected);
      });
    });
  });

  describe("reducer", () => {
    describe("undefined", () => {
      it("returns initialState", () => {
        expect(reducer(undefined, {})).toEqual(initialState);
      });
    });

    describe("ADD_STAFF", () => {
      const staff = new Staff({ index: 0 });

      it("adds a staff to state", () => {
        const expected = { [staff.id]: staff };

        expect(reducer(initialState, addStaff(staff))).toEqual(expected);
      });

      it("orders staff by index", () => {
        const anotherStaff = new Staff({ index: 1 });
        const state = { [anotherStaff.id]: anotherStaff };
        const expected = { [staff.id]: staff, ...state };

        expect(reducer(state, addStaff(staff))).toEqual(expected);
      });
    });

    describe("DELETE_STAFF", () => {
      const staff1 = new Staff({ index: 0 });
      const staff2 = new Staff({ index: 1 });
      const staff3 = new Staff({ index: 2 });
      const state = {
        [staff1.id]: staff1,
        [staff2.id]: staff2,
        [staff3.id]: staff3
      };

      it("deletes staff from state", () => {
        const expected = {
          [staff2.id]: staff2,
          [staff3.id]: staff3
        };

        expect(reducer(state, deleteStaff(staff1))).toEqual(expected);
      });

      it("orders staff by index", () => {
        const expected = {
          [staff1.id]: staff1,
          [staff3.id]: staff3
        };

        expect(reducer(state, deleteStaff(staff2))).toEqual(expected);
      });
    });
  });
});
