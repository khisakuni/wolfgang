import React, { Component } from 'react'
import Vex from 'vexflow'
import _ from 'lodash'
import models from '../../models'

class Sheet extends Component {
  constructor(props) {
    super(props)

    this.staveComponents = this.staveComponents.bind(this)
    this.renderStaves = this.renderStaves.bind(this)
    this.sheet = new models.Sheet()
  }

  componentDidMount() {
    this.sheet = new models.Sheet({ id: this.sheet.id, ...this.props })
    this.props.addSheet(this.sheet)
  }

  componentWillUnmount() {
    this.props.deleteSheet(this.sheet)
  }

  staveComponents() {
    return React.Children.toArray(this.props.children)
  }

  renderStaves() {
    return React.Children.map(this.staveComponents(), (staffComponent, i) => {
      const staff = _.values(this.props.staves)[i]
      let key
      if (staff) {
        const measures = _.values(this.props.measures).filter(measure => measure.staffId === staff.id)
        key = measures.length
      }
      const props = {
        staffIndex: i,
        staffWidth: this.props.width,
        sheetId: this.sheet.id,
        index: i,
        key
      }

      return React.cloneElement(staffComponent, props)
    })
  }

  render() {
    return (
      <div>
        {this.renderStaves()}
      </div>
    )
  }
}

Sheet.defaultProps = {
  height: 800,
  width: 500,
}

export default Sheet
