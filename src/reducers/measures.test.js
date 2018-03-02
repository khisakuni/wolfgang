import reducer, { addMeasure, deleteMeasure, types, initialState } from './measures'
import Measure from '../models/measure'

describe('reducers/measures', () => {
  describe('action creators', () => {
    const measure = new Measure()

    describe('addMeasure', () => {
      it('returns ADD_MEASURE action', () => {
        const expected = {
          type: types.ADD_MEASURE,
          payload: { [measure.id]: measure },
        }

        expect(addMeasure(measure)).toEqual(expected)
      })
    })

    describe('deleteMeasure', () => {
      it('returns DELETE_MEASURE action', () => {
        const expected = {
          type: types.DELETE_MEASURE,
          payload: { id: measure.id },
        }

        expect(deleteMeasure(measure)).toEqual(expected)
      })
    })
  })

  describe('reducer', () => {
    describe('undefined', () => {
      it('returns initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
      })
    })

    describe('ADD_MEASURE', () => {
      const measure = new Measure({ index: 0 })

      it('adds measure to state', () => {
        const expected = { [measure.id]: measure }

        expect(reducer(initialState, addMeasure(measure))).toEqual(expected)
      })

      it('orders measures by index', () => {
        const anotherMeasure = new Measure({ index: 1 })
        const state = { [anotherMeasure.id]: anotherMeasure }
        const expected = { [measure.id]: measure, ...state }

        expect(reducer(state, addMeasure(measure))).toEqual(expected)
      })
    })

    describe('DELETE_MEASURE', () => {
      const measure1 = new Measure({ index: 0 })
      const measure2 = new Measure({ index: 1 })
      const measure3 = new Measure({ index: 2 })
      const state = {
        [measure1.id]: measure1,
        [measure2.id]: measure2,
        [measure3.id]: measure3,
      }

      it('deletes measure from state', () => {
        const expected = {
          [measure2.id]: measure2,
          [measure3.id]: measure3,
        }

        expect(reducer(state, deleteMeasure(measure1))).toEqual(expected)
      })

      it('orders measures by index', () => {
        const expected = {
          [measure1.id]: measure1,
          [measure3.id]: measure3,
        }

        expect(reducer(state, deleteMeasure(measure2))).toEqual(expected)
      })
    })
  })
})
