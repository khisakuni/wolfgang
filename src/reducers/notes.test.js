import reducer, {
  addNote,
  deleteNote,
  updateNote,
  types,
  initialState
} from './notes';
import Note from '../models/note';

describe('reducers/notes', () => {
  describe('action creators', () => {
    const note = new Note();

    describe('addNote', () => {
      it('returns ADD_NOTE action', () => {
        const expected = {
          type: types.ADD_NOTE,
          payload: { [note.id]: note }
        };

        expect(addNote(note)).toEqual(expected);
      });
    });

    describe('deleteNote', () => {
      it('returns DELETE_NOTE action', () => {
        const expected = {
          type: types.DELETE_NOTE,
          payload: note
        };

        expect(deleteNote(note)).toEqual(expected);
      });
    });

    describe('updateNote', () => {
      it('returns UPDATE_NOTE action', () => {
        const expected = {
          type: types.UPDATE_NOTE,
          payload: note
        };

        expect(updateNote(note)).toEqual(expected);
      });
    });
  });

  describe('reducer', () => {
    describe('undefined', () => {
      it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
      });
    });

    describe('ADD_NOTE', () => {
      const note = new Note({ index: 0 });

      it('adds note to state', () => {
        const expected = { [note.id]: note };

        expect(reducer(initialState, addNote(note))).toEqual(expected);
      });

      it('orders notes by index', () => {
        const anotherNote = new Note({ index: 1 });
        const state = { [anotherNote.id]: anotherNote };
        const expected = { [note.id]: note, ...state };

        expect(reducer(state, addNote(note))).toEqual(expected);
      });
    });

    describe('DELETE_NOTE', () => {
      const note1 = new Note({ index: 0 });
      const note2 = new Note({ index: 1 });
      const note3 = new Note({ index: 2 });
      const state = {
        [note1.id]: note1,
        [note2.id]: note2,
        [note3.id]: note3
      };

      it('delets note from state', () => {
        const expected = {
          [note2.id]: note2,
          [note3.id]: note3
        };

        expect(reducer(state, deleteNote(note1))).toEqual(expected);
      });

      it('orders notes by index', () => {
        const expected = {
          [note1.id]: note1,
          [note3.id]: note3
        };

        expect(reducer(state, deleteNote(note2))).toEqual(expected);
      });
    });
  });
});
