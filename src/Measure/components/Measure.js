import React, { Component } from 'react'
import Vex from 'vexflow'
import _ from 'lodash'
import models from '../../models'
import Voice from '../../Voice'
import Clef from '../../Clef'

class Measure extends Component {
  constructor(props) {
    super(props)

    this.state = { voices: [] }
    this.renderVoices = this.renderVoices.bind(this)
    this.voiceComponents = this.voiceComponents.bind(this)
    this.renderClefs = this.renderClefs.bind(this)
    this.clefComponents = this.clefComponents.bind(this)
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
    return React.Children.toArray(this.props.children).filter(component => component.type === Voice)
  }

  clefComponents() {
    return React.Children.toArray(this.props.children).filter(component => component.type === Clef)
  }

  renderVoices() {
    return React.Children.map(this.voiceComponents(), (voiceComponent, i) => {
      return React.cloneElement(voiceComponent, {
        numBeats: 4,
        beatValue: 4,
        addVoice: this.addVoice,
        index: i,
        measureId: this.measure.id,
        staffId: this.props.staffId,
        sheetId: this.props.sheetId,
      })
    })
  }

  renderClefs() {
    return React.Children.map(this.clefComponents(), (clefComponent, i) => {
      return React.cloneElement(clefComponent, { measureId: this.measure.id, key: clefComponent.props.type })
    })
  }

  render() {
    return (
      <div>
        {this.renderClefs()}
        {this.renderVoices()}
      </div>
    )
  }
}

export default Measure
