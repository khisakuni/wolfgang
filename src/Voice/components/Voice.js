import React, { Component } from 'react'
import Vex from 'vexflow'
import _ from 'lodash'
import models from '../../models'
import Note from '../../Note'

class Voice extends Component {
  constructor(props) {
    super(props)

    this.noteComponents = this.noteComponents.bind(this)
    this.renderNotes = this.renderNotes.bind(this)
    this.voice = new models.Voice()
  }

  componentDidMount() {
    this.voice = new models.Voice({ id: this.voice.id, ...this.props })
    this.props.addVoice(this.voice)
  }

  componentWillUnmount() {
    this.props.deleteVoice(this.voice)
  }

  noteComponents() {
    return this.props.children
  }

  renderNotes() {
    return React.Children.map(this.noteComponents(), (noteComponent, index) => {
      const props = {
        key: noteComponent.props.value + noteComponent.props.duration,
        index,
        voiceId: this.voice.id,
        measureId: this.props.measureId,
        staffId: this.props.staffId,
        sheetId: this.props.sheetId,
      }
			return React.cloneElement(noteComponent, props)
    })
  }

  render() {
    return (
      <div>
				{this.renderNotes()}
      </div>
    )
  }
}

Voice.defaultProps = {
  addVoice: () => {},
  deleteVoice: () => {},
}

Voice.propTypes = {
  children: (props, propName, componentName) => {
    const prop = props[propName]
    let error
    React.Children.forEach(prop, (child) => {
      if (child.type !== Note) {
        error = new Error(`${componentName} children must be of type Note`)
      }
    })
    return error
  }
}

export default Voice
