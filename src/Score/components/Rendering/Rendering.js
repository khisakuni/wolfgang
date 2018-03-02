import React, { Component } from 'react'
import Vex from 'vexflow'

export default class Rendering extends Component {
  componentDidUpdate() {

    const { sheets, measures, voices, notes } = this.props

    const renderingEl = document.getElementById('rendering')
    while (renderingEl.firstChild) {
      renderingEl.removeChild(renderingEl.firstChild)
    }

     Object.keys(sheets).forEach((sheetId) => {
       // Render sheets
       const sheet = sheets[sheetId]
       const newEl = document.createElement('div')
       newEl.setAttribute('id', sheetId)
       renderingEl.appendChild(newEl)
       const renderer = new Vex.Flow.Renderer(newEl, Vex.Flow.Renderer.Backends.SVG)
       renderer.resize(sheet.height, sheet.width)
       const context = renderer.getContext()

       // Render measures
       Object.keys(measures).forEach((measureId) => {
         const measure = measures[measureId]
         if (measure.sheetId === sheetId) {
           const m = new Vex.Flow.Stave(measure.x, measure.y, measure.width)
           m.setContext(context).draw()

           const vs = []
           // Render voices
           Object.keys(voices).forEach((voiceId) => {
             const voice = voices[voiceId]
             if (voice.measureId === measure.id) {
               const v = new Vex.Flow.Voice({ clef: 'treble', num_beats: voice.numBeats, beat_value: voice.beatValue })

               const ns = []
               // Render notes
               Object.keys(notes).forEach((noteId) => {
                 const note = notes[noteId]
                 if (note.voiceId === voiceId) {
                   ns.push(new Vex.Flow.StaveNote({ keys:[note.value], duration: note.duration }))
                 }
               })

               v.addTickables(ns)
               vs.push(v)
             }
           })

           if (vs.length > 0) {
             const formatter = new Vex.Flow.Formatter().joinVoices(vs).format(vs, measure.width)
             vs.forEach((v) => { v.draw(context, m) })
           }
         }
       })
     })
   }

  render() {
    return (
      <div>
        {this.props.children}
        <div id="rendering">
        </div>
      </div>
    )
  }
}
