import React, { Component } from 'react'
import Vex from 'vexflow';
import _ from 'lodash'

class Staff extends Component {
  constructor(props) {
    super(props)

    this.measureComponents = this.measureComponents.bind(this)
    this.renderMeasures = this.renderMeasures.bind(this)
    this.id = _.uniqueId('staff_')
  }

  componentDidMount() {
    this.props.addStaff({ id: this.id, sheedId: this.props.sheetId, index: this.props.index })
  }

  componentWillUnmount() {
    this.props.deleteStaff({ id: this.id })
  }

  measureComponents() {
    return React.Children.toArray(this.props.children)
  }

  renderMeasures() {
		return React.Children.map(this.measureComponents(), (measureComponent, i) => {
      const width = this.props.staffWidth / React.Children.count(this.measureComponents())
      const height = 100
      const x = i * width
      const y = this.props.staffIndex * height

      const measure = _.values(this.props.measures)[i]
      let key
      if (measure) {
        const notes = _.values(this.props.notes).filter(note => note.measureId === measure.id)
        key = notes.reduce((acc, note) => acc += note.value + note.duration, '')
      }

      const props = {
        context: this.props.context,
        width,
        x,
        y,
        index: i,
        sheetId: this.props.sheetId,
        staffId: this.id,
        key
      }
			return React.cloneElement(measureComponent, props)
		})
  }

  render() {
    return (
      <div>{this.renderMeasures()}</div>
    )
  }
}

export default Staff
