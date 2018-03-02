import React from 'react'
import { shallow, mount } from 'enzyme'
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

  it('does not render if children are not Note components', () => {
    console.error = () => {}

    const wrapper = shallow((
      <div>
        <Voice>
          <h1>Hi there</h1>
        </Voice>
      </div>
    ))

    expect(wrapper.find(Voice).length).toBe(1)
  })
})

