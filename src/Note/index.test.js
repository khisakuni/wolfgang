import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import _ from 'lodash'
import NoteContainer from './index'
import { initialState, reducer, types } from '../reducers/notes'
import models from '../models'

const mockStore = configureMockStore([])

describe('<NoteContainer />', () => {
  const store = mockStore({ notes: initialState })

  beforeEach(store.clearActions)

  it ('dispatches ADD_NOTE action on componentDidMount', () => {
    const wrapper = mount(<NoteContainer store={store} />)
    const actions = store.getActions()

    expect(actions.length).toBe(1)
    expect(actions[0].type).toBe(types.ADD_NOTE)
    expect(_.values(actions[0].payload)[0].constructor).toBe(models.Note)

    wrapper.unmount()
  })

  it('dispatchs DELETE_NOTE action componentWillUnmount', () => {
    mount(<NoteContainer store={store} />).unmount()
    const actions = store.getActions()

    expect(actions.length).toBe(2)
    expect(actions[1].type).toBe(types.DELETE_NOTE)
    expect(actions[1].payload.constructor).toBe(models.Note)
  })
})
