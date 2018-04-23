import React, { Component } from 'react';
import Vex from 'vexflow';
import { sheetsForScore } from './selectors';

export default class Rendering extends Component {
  componentDidUpdate() {
    const renderingEl = document.getElementById('rendering');
    while (renderingEl.firstChild) {
      renderingEl.removeChild(renderingEl.firstChild);
    }
    sheetsForScore(this.props).forEach(sheet => {
      const newEl = document.createElement('div');
      newEl.setAttribute('id', sheet.id);
      renderingEl.appendChild(newEl);
      const renderer = new Vex.Flow.Renderer(
        newEl,
        Vex.Flow.Renderer.Backends.SVG
      );
      renderer.resize(sheet.height, sheet.width);
      const context = renderer.getContext();

      const svg = context.svg;
      svg.style.pointerEvents = 'bounding-box';

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

          const voices = measure.voices.map(voice => {
            const v = new Vex.Flow.Voice({
              clef: 'treble',
              num_beats: voice.numBeats,
              beat_value: voice.beatValue
            });

            const notes = voice.notes.map(note => {
              const n = new Vex.Flow.StaveNote({
                keys: [note.value],
                duration: note.duration,
                onClick: note.onClick
              });
              n.setStyle({
                fillStyle: note.style.color,
                strokeStyle: note.style.color
              });
              return n;
            });
            v.addTickables(notes);
            return v;
          });

          m.setContext(context).draw();

          if (voices.length > 0) {
            const offset = hasTimeSignature ? m.getNoteStartX() : 0;
            const formatter = new Vex.Flow.Formatter()
              .joinVoices(voices)
              .format(voices, measure.width - offset);
            voices.forEach((voice, i) => {
              voice.draw(context, m);

              voice.tickables.forEach((t, j) => {
                const n = measure.voices[i].notes[j];
                t.attrs.el.onclick = n.onClick;
                t.attrs.el.onmouseover = n.onHover;
                t.attrs.el.onmouseenter = n.onMouseEnter;
                t.attrs.el.onmouseleave = n.onMouseLeave;
                if (n.hover) {
                  t.attrs.el.dispatchEvent(new Event('mouseenter'));
                }
              });
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
