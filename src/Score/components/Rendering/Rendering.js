import React, { Component } from "react";
import Vex from "vexflow";
import { sheetsForScore } from "./selectors";

export default class Rendering extends Component {
  componentDidUpdate() {
    const {
      sheets,
      measures,
      voices,
      notes,
      clefs,
      timeSignatures
    } = this.props;

    const renderingEl = document.getElementById("rendering");
    while (renderingEl.firstChild) {
      renderingEl.removeChild(renderingEl.firstChild);
    }
    sheetsForScore(this.props).forEach(sheet => {
      const newEl = document.createElement("div");
      newEl.setAttribute("id", sheet.id);
      renderingEl.appendChild(newEl);
      const renderer = new Vex.Flow.Renderer(
        newEl,
        Vex.Flow.Renderer.Backends.SVG
      );
      renderer.resize(sheet.height, sheet.width);
      const context = renderer.getContext();

      sheet.staves.forEach(staff => {
        staff.measures.forEach(measure => {
          const m = new Vex.Flow.Stave(measure.x, measure.y, measure.width);

          measure.clefs.forEach(clef => {
            m.addClef(clef.type);
          });

          let hasTimeSignature = false;
          measure.timeSignatures.forEach(timeSignature => {
            hasTimeSignature = true;
            m.addTimeSignature(timeSignature.value);
          });

          const voices = [];
          measure.voices.forEach(voice => {
            const v = new Vex.Flow.Voice({
              clef: "treble",
              num_beats: voice.numBeats,
              beat_value: voice.beatValue
            });

            const notes = [];
            voice.notes.forEach(note => {
              notes.push(
                new Vex.Flow.StaveNote({
                  keys: [note.value],
                  duration: note.duration
                })
              );
            });
            v.addTickables(notes);
            voices.push(v);
          });

          m.setContext(context).draw();

          if (voices.length > 0) {
            const offset = hasTimeSignature ? m.getNoteStartX() : 0;
            const formatter = new Vex.Flow.Formatter()
              .joinVoices(voices)
              .format(voices, measure.width - offset);
            voices.forEach(voice => {
              voice.draw(context, m);
            });
          }
        });
      });
    });
  }

  render() {
    return (
      <div>
        {this.props.children}
        <div id="rendering" />
      </div>
    );
  }
}
