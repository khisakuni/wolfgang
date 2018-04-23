import React from "react";
import { shallow } from "enzyme";
import sinon from "sinon";
import Measure from "./Measure";
import Voice from "../../Voice";
import Clef from "../../Clef";
import TimeSignature from "../../TimeSignature";
import models from "../../models";

describe("<Measure />", () => {
  it("calls componentDidMount", () => {
    sinon.spy(Measure.prototype, "componentDidMount");
    shallow(<Measure />);

    expect(Measure.prototype.componentDidMount.calledOnce).toBe(true);
  });

  it("calls componentWillUnmount", () => {
    sinon.spy(Measure.prototype, "componentWillUnmount");
    shallow(<Measure />).unmount();

    expect(Measure.prototype.componentWillUnmount.calledOnce).toBe(true);
  });

  it("calls props.addMeasure with measure", () => {
    const addMeasure = measure =>
      expect(measure.constructor).toBe(models.Measure);

    shallow(<Measure addMeasure={addMeasure} />);
  });

  it("calls props.deleteMeasure with measure", () => {
    const deleteMeasure = measure =>
      expect(measure.constructor).toBe(models.Measure);

    shallow(<Measure deleteMeasure={deleteMeasure} />);
  });

  it("renders voices", () => {
    const wrapper = shallow(
      <Measure>
        <Voice />
      </Measure>
    );

    expect(wrapper.find(Voice).length).toBe(1);
  });

  it("renders clefs", () => {
    const wrapper = shallow(
      <Measure>
        <Clef />
      </Measure>
    );

    expect(wrapper.find(Clef).length).toBe(1);
  });

  it("renders time signatures", () => {
    const wrapper = shallow(
      <Measure>
        <TimeSignature />
      </Measure>
    );

    expect(wrapper.find(TimeSignature).length).toBe(1);
  });

  it("raises error if children are not correct types", () => {
    const printError = console.error;
    console.error = sinon.spy();

    const wrapper = shallow(
      <Measure>
        <h1>hi there</h1>
      </Measure>
    );

    expect(console.error.calledOnce).toBe(true);
    console.error = printError;
  });
});
