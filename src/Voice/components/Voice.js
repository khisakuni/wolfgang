import React, { Component } from "react";
import Vex from "vexflow";
import _ from "lodash";
import { connect } from "react-redux";
import models from "../../models";
import Note from "../../Note";
import { updateNote } from "../../reducers/notes";

class Voice extends Component {
  constructor(props) {
    super(props);

    this.noteComponents = this.noteComponents.bind(this);
    this.renderNotes = this.renderNotes.bind(this);
    this.voice = new models.Voice();
  }

  componentDidMount() {
    this.voice = new models.Voice({ id: this.voice.id, ...this.props });
    this.props.addVoice(this.voice);
  }

  componentWillUnmount() {
    this.props.deleteVoice(this.voice);
  }

  noteComponents() {
    return this.props.children;
  }

  renderNotes() {
    return React.Children.map(this.noteComponents(), (noteComponent, index) => {
      const props = {
        key:
          noteComponent.props.value +
          noteComponent.props.duration +
          JSON.stringify(noteComponent.props.style),
        index,
        voiceId: this.voice.id,
        measureId: this.props.measureId,
        staffId: this.props.staffId,
        sheetId: this.props.sheetId,
        onMouseEnter: () => {
          const note = Object.values(this.props.notes).filter(
            n => n.index === index
          )[0];

          if (!note.hover) {
            this.props.updateNote(new models.Note({ ...note, hover: true }));
            if (noteComponent.props.onMouseEnter) {
              noteComponent.props.onMouseEnter();
            }
          }
        },
        onMouseLeave: () => {
          const note = Object.values(this.props.notes).filter(
            n => n.index === index
          )[0];

          if (note.hover) {
            this.props.updateNote(new models.Note({ ...note, hover: false }));
            if (noteComponent.props.onMouseLeave) {
              noteComponent.props.onMouseLeave();
            }
          }
        }
      };
      return React.cloneElement(noteComponent, props);
    });
  }

  render() {
    return <div>{this.renderNotes()}</div>;
  }
}

Voice.defaultProps = {
  addVoice: () => {},
  deleteVoice: () => {}
};

Voice.propTypes = {
  children: (props, propName, componentName) => {
    const prop = props[propName];
    let error;
    React.Children.forEach(prop, child => {
      if (child.type !== Note) {
        error = new Error(`${componentName} children must be of type Note`);
      }
    });
    return error;
  }
};

const mapStateToProps = ({ notes }) => ({ notes });

const mapDispatchToProps = dispatch => ({
  updateNote: note => dispatch(updateNote(note))
});

export default connect(mapStateToProps, mapDispatchToProps)(Voice);
