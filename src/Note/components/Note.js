import React, { Component } from "react";
import _ from "lodash";
import models from "../../models";

class Note extends Component {
  constructor(props) {
    super(props);

    this.note = new models.Note();
  }

  componentDidMount() {
    this.note = new models.Note({ id: this.note.id, ...this.props });
    this.props.addNote(this.note);
  }

  componentWillUnmount() {
    this.props.deleteNote(this.note);
  }

  render() {
    return <div />;
  }
}

Note.defaultProps = {
  addNote: () => {},
  deleteNote: () => {}
};

export default Note;
