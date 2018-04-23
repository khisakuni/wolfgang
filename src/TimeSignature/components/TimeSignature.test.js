import React from "react";
import { shallow } from "enzyme";
import sinon from "sinon";
import TimeSignature from "./TimeSignature";
import models from "../../models";

describe("<TimeSignature />", () => {
  it("calls componentDidMount", () => {
    sinon.spy(TimeSignature.prototype, "componentDidMount");
    const wrapper = shallow(<TimeSignature />);

    expect(TimeSignature.prototype.componentDidMount.calledOnce).toBe(true);
  });

  it("calls componentWillUnmount", () => {
    sinon.spy(TimeSignature.prototype, "componentWillUnmount");
    shallow(<TimeSignature />).unmount();

    expect(TimeSignature.prototype.componentWillUnmount.calledOnce).toBe(true);
  });

  it("calls props.addTimeSignature", () => {
    const addTimeSignature = timeSignature =>
      expect(timeSignature.constructor).toBe(models.TimeSignature);

    shallow(<TimeSignature addTimeSignature={addTimeSignature} />);
  });

  it("calls props.deleteTimeSignature", () => {
    const deleteTimeSignature = timeSignature =>
      expect(timeSignature.constructor).toBe(models.TimeSignature);

    shallow(
      <TimeSignature deleteTimeSignature={deleteTimeSignature} />
    ).unmount();
  });
});
