import React, { Component } from 'react'
import Vex from 'vexflow'
import _ from 'lodash'
import models from '../../models'

class Measure extends Component {
  constructor(props) {
    super(props)

    this.state = { voices: [] }
    this.renderVoices = this.renderVoices.bind(this)
    this.getVoiceAtIndex = this.getVoiceAtIndex.bind(this)
    this.updateVoiceAtIndex = this.updateVoiceAtIndex.bind(this)
    this.measure = new models.Measure()
  }

  componentDidMount() {
    this.measure = new models.Measure({ id: this.measure.id, ...this.props })
    this.props.addMeasure(this.measure)
  }

  componentWillUnmount() {
    this.props.deleteMeasure(this.measure)
  }

  voiceComponents() {
    return React.Children.toArray(this.props.children)
  }

  renderVoices() {
    return React.Children.map(this.voiceComponents(), (voiceComponent, i) => {
      return React.cloneElement(voiceComponent, {
        numBeats: 4,
        beatValue: 4,
        addVoice: this.addVoice,
        index: i,
        updateVoiceAtIndex: this.updateVoiceAtIndex,
        getVoiceAtIndex: this.getVoiceAtIndex,
        measureId: this.measure.id,
        staffId: this.props.staffId,
        sheetId: this.props.sheetId,
      })
    })
  }

  updateVoiceAtIndex(index, voice) {
		const voices = this.state.voices.slice()
		voices[index] = voice
		this.setState({ voices })
  }

  getVoiceAtIndex(index) {
    if (index >= this.state.voices.length) {
      // throw error?
      return
    }

    return this.state.voices[index]
  }

  render() {
    return (
      <div>{this.renderVoices()}</div>
    )
  }
}

export default Measure
