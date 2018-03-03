import React, { Component } from 'react'
import Vex from 'vexflow'
import _ from 'lodash'
import models from '../../models'
import Voice from '../../Voice'
import Clef from '../../Clef'
import TimeSignature from '../../TimeSignature'

class Measure extends Component {
  constructor(props) {
    super(props)

    this.state = { voices: [] }
    this.renderVoices = this.renderVoices.bind(this)
    this.voiceComponents = this.voiceComponents.bind(this)
    this.renderClefs = this.renderClefs.bind(this)
    this.clefComponents = this.clefComponents.bind(this)
    this.renderTimeSignatues = this.renderTimeSignatures.bind(this)
    this.timeSignatureComponents = this.timeSignatureComponents.bind(this)
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
    return React.Children.map(this.clefComponents(), (clefComponent) => {
      return React.cloneElement(clefComponent, { measureId: this.measure.id, key: clefComponent.props.type })
    })
  }

  timeSignatureComponents() {
    return React.Children.toArray(this.props.children).filter(component => component.type === TimeSignature)
  }

  renderTimeSignatures() {
    return React.Children.map(this.timeSignatureComponents(), (component) => {
      const props = { measureId: this.measure.id, key: component.props.value, value: component.props.value }
      return React.cloneElement(component, props)
    })
  }

  render() {
    return (
      <div>
        {this.renderClefs()}
        {this.renderVoices()}
        {this.renderTimeSignatures()}
      </div>
    )
  }
}

Measure.defaultProps = {
  addMeasure: () => {},
  deleteMeasure: () => {},
}

Measure.propTypes = {
  children: (props, propName, componentName) => {
    const validTypes = { [Voice]: true, [Clef]: true, [TimeSignature]: true }
    const prop = props[propName]
    let error
    React.Children.forEach(prop, (child) => {
      if(child && !validTypes[child.type]) {
        error = new Error(`${componentName} children must be of types Voice, Clef, or TimeSignature`)
      }
    })
    return error
  }
}

export default Measure
