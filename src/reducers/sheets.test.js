import reducer, { addSheet, deleteSheet, types, initialState } from './sheets'
import Sheet from '../models/sheet'

describe('reducers/sheets', () => {
  const sheet = new Sheet()

  describe('action creators', () => {
    describe('addSheet', () => {
      it('returns ADD_SHEET action', () => {
        const expected = {
          type: types.ADD_SHEET,
          payload: { [sheet.id]: sheet },
        }

        expect(addSheet(sheet)).toEqual(expected)
      })
    })

    describe('deleteSheet', () => {
      it('returns DELETE_SHEET action', () => {
        const expected = {
          type: types.DELETE_SHEET,
          payload: sheet,
        }

        expect(deleteSheet(sheet)).toEqual(expected)
      })
    })
  })

  describe('reducer', () => {
    describe('undefined', () => {
      it('returns inistal state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
      })
    })

    describe('ADD_SHEET', () => {
      const sheet = new Sheet({ index: 0 })

      it('adds sheet to state', () => {
        const expected = { [sheet.id]: sheet }

        expect(reducer(initialState, addSheet(sheet))).toEqual(expected)
      })

      it('orders measures by index', () => {
        const anotherSheet = new Sheet({ index: 1 })
        const state = { [anotherSheet.id]: anotherSheet }
        const expected = { [sheet.id]: sheet, ...state }

        expect(reducer(state, addSheet(sheet))).toEqual(expected)
      })
    })

    describe('DELETE_SHEET', () => {
      const sheet1 = new Sheet({ index: 0 })
      const sheet2 = new Sheet({ index: 1 })
      const sheet3 = new Sheet({ index: 2 })
      const state = {
        [sheet1.id]: sheet1,
        [sheet2.id]: sheet2,
        [sheet3.id]: sheet3,
      }

      it('deletes sheet from state', () => {
        const expected = {
          [sheet2.id]: sheet2,
          [sheet3.id]: sheet3,
        }

        expect(reducer(state, deleteSheet(sheet1))).toEqual(expected)
      })

      it('orders sheets by index', () => {
        const expected = {
          [sheet1.id]: sheet1,
          [sheet3.id]: sheet3,
        }

        expect(reducer(state, deleteSheet(sheet2))).toEqual(expected)
      })
    })
  })
})
