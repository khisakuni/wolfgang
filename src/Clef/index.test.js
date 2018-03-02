import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import _ from 'lodash'
import ClefContainer from './index'
import { initialState, reducer, types } from '../reducers/clefs'
import models from '../models'

const mockStore = configureMockStore([])

describe('<ClefContainer />', () => {
  const store = mockStore({ clefs: initialState })

  beforeEach(store.clearActions)

  it('dispatches ADD_CLEF action on componentDidMount', () => {
    const wrapper = mount(<ClefContainer store={store} />)
    const actions = store.getActions()

    expect(actions.length).toBe(1)
    expect(actions[0].type).toBe(types.ADD_CLEF)
    expect(_.values(actions[0].payload)[0].constructor).toBe(models.Clef)

    wrapper.unmount()
  })

  it('dispatches DELETE_CLEF action on componentWillUnmount', () => {
    mount(<ClefContainer store={store} />).unmount()
    const actions = store.getActions()

    expect(actions.length).toBe(2)
    expect(actions[1].type).toBe(types.DELETE_CLEF)
    expect(actions[1].payload.constructor).toBe(models.Clef)
  })
})
