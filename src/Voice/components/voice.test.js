import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import Voice from './Voice'
import Note from '../../Note'
import models from '../../models'

describe('<Voice />', () => {
  it('calls componentDidMount', () => {
    sinon.spy(Voice.prototype, 'componentDidMount')
    shallow(<Voice />)

    expect(Voice.prototype.componentDidMount.calledOnce).toBe(true)
  })

  it('calls componentWillUnmount', () => {
    sinon.spy(Voice.prototype, 'componentWillUnmount')
    shallow(<Voice />).unmount()

    expect(Voice.prototype.componentWillUnmount.calledOnce).toBe(true)
  })

  it('calls props.addVoice with voice', () => {
    const addVoice = voice => expect(voice.constructor).toBe(models.Voice)

    shallow(<Voice addVoice={addVoice} />)
  })

  it('calls props.deleteVoice with voice', () => {
    const deleteVoice = voice => expect(voice.constructor).toBe(models.Voice)

    shallow(<Voice deleteVoice={deleteVoice} />)
  })

  it('renders Note components', () => {
    const wrapper = shallow((
      <Voice>
        <Note />
      </Voice>
    ))

    expect(wrapper.find(Note).length).toBe(1)
  })

  it('raises error if children are not Note components', () => {
    const printError = console.error
    console.error = sinon.spy()

    const wrapper = shallow((
      <Voice>
        <h1>Hi there</h1>
      </Voice>
    ))

    expect(console.error.calledOnce).toBe(true)
    console.error = printError
  })
})

