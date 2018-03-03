import React, { Component } from 'react'
import models from '../../models'

class TimeSignature extends Component {
  constructor(props) {
    super(props)

    this.timeSignature = new models.TimeSignature()
  }

  componentDidMount() {
    this.timeSignature = new models.TimeSignature({ id: this.timeSignature.id, ...this.props })
    this.props.addTimeSignature(this.timeSignature)
  }

  componentWillUnmount() {
    this.props.deleteTimeSignature(this.timeSignature)
  }

  render() {
    return (
      <div />
    )
  }
}

TimeSignature.defaultProps = {
  addTimeSignature: () => {},
  deleteTimeSignature: () => {},
}

export default TimeSignature
