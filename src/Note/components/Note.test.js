import React from "react";
import { shallow } from "enzyme";
import sinon from "sinon";
import Note from "./Note";
import models from "../../models";

describe("<Note />", () => {
  it("calls componentDidMount", () => {
    sinon.spy(Note.prototype, "componentDidMount");
    const wrapper = shallow(<Note />);

    expect(Note.prototype.componentDidMount.calledOnce).toBe(true);
  });

  it("calls componentWillUnmount", () => {
    sinon.spy(Note.prototype, "componentWillUnmount");
    shallow(<Note />).unmount();

    expect(Note.prototype.componentWillUnmount.calledOnce).toBe(true);
  });

  it("calls props.addNote", () => {
    const addNote = sinon.spy();
    shallow(<Note addNote={addNote} />);

    expect(addNote.calledOnce).toBe(true);
  });

  it("calls props.addNote with a note", () => {
    const addNote = note => {
      expect(note.constructor).toBe(models.Note);
    };

    shallow(<Note addNote={addNote} />);
  });

  it("calls props.deleteNote", () => {
    const deleteNote = sinon.spy();
    shallow(<Note deleteNote={deleteNote} />).unmount();

    expect(deleteNote.calledOnce).toBe(true);
  });

  it("calls props.deleteNote with a note", () => {
    const deleteNote = note => {
      expect(note.constructor).toBe(models.Note);
    };

    shallow(<Note deleteNote={deleteNote} />).unmount();
  });

  it("calls props.deleteNote with same note from props.addNote", () => {
    let note;
    const addNote = n => (note = n);
    const deleteNote = n => expect(n).toBe(note);

    shallow(<Note addNote={addNote} deleteNote={deleteNote} />);
  });
});
