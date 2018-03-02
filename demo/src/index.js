import React, {Component} from 'react'
import {render} from 'react-dom'
import { Score, Sheet, Staff, Measure, Voice, Note, Clef } from '../../src'

class Demo extends Component {
  constructor(props) {
    super(props)

    this.state = { changeNote: false, showVoice: false, showMeasure: false, clef: 'treble' }
    this.changeNote = this.changeNote.bind(this)
    this.showVoice = this.showVoice.bind(this)
    this.renderVoice = this.renderVoice.bind(this)
    this.showMeasure = this.showMeasure.bind(this)
    this.renderMeasure = this.renderMeasure.bind(this)
    this.showStaff = this.showStaff.bind(this)
    this.renderStaff = this.renderStaff.bind(this)
    this.changeClef = this.changeClef.bind(this)
  }

  changeNote() {
    this.setState({ changeNote: !this.state.changeNote })
  }

  showVoice() {
    this.setState({ showVoice: !this.state.showVoice })
  }

  renderVoice() {
    if (this.state.showVoice) {
      return (
        <Voice>
          <Note value="a/3" duration="w" />
        </Voice>
      )
    }
  }

  showMeasure() {
    this.setState({ showMeasure: !this.state.showMeasure })
  }

  renderMeasure() {
    if (this.state.showMeasure) {
      return (
        <Measure>
          <Voice>
            <Note duration="h" value="g/4" />
            <Note duration="h" value="c/4" />
          </Voice>
        </Measure>
      )
    }
  }

  showStaff() {
    this.setState({ showStaff: !this.state.showStaff })
  }

  renderStaff() {
    if (this.state.showStaff) {
      return (
        <Staff>
          <Measure>
            <Voice>
              <Note value="f/4" duration="q" />
              <Note value="g/4" duration="q" />
              <Note value="c/4" duration="h" />
            </Voice>
          </Measure>
        </Staff>
      )
    }
  }

  changeClef() {
    if (this.state.clef === 'treble') {
      this.setState({ clef: 'bass' })
    } else {
      this.setState({ clef: 'treble' })
    }
  }

  render() {
    return <div>
      <h1>schubert Demo</h1>
      <button onClick={this.changeNote}>Change note</button>
      <button onClick={this.showVoice}>Show Voice</button>
      <button onClick={this.showMeasure}>Show Measure</button>
      <button onClick={this.showStaff}>Show Staff</button>
      <button onClick={this.changeClef}>Change Clef</button>
      <Score>
        <Sheet>
          <Staff>
            <Measure>
              <Clef type={this.state.clef} />
              <Voice>
                <Note value={this.state.changeNote ? 'b/4' : 'c/4'} duration="q" />
                <Note value="f/4" duration="q" />
                <Note value="g/4" duration="q" />
                <Note value="c/4" duration="q" />
              </Voice>
              {this.renderVoice()}
            </Measure>
            {this.renderMeasure()}
          </Staff>
          {this.renderStaff()}
        </Sheet>
      </Score>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
