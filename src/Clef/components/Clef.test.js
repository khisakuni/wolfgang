import React from "react";
import { shallow } from "enzyme";
import sinon from "sinon";
import models from "../../models";
import Clef from "./Clef";

describe("<Clef />", () => {
  it("calls componentDidMount", () => {
    sinon.spy(Clef.prototype, "componentDidMount");
    shallow(<Clef />);

    expect(Clef.prototype.componentDidMount.calledOnce).toBe(true);
  });

  it("calls componentWillUnmount", () => {
    sinon.spy(Clef.prototype, "componentWillUnmount");
    shallow(<Clef />).unmount();

    expect(Clef.prototype.componentWillUnmount.calledOnce).toBe(true);
  });

  it("calls props.addClef with clef", () => {
    const addClef = clef => {
      expect(clef.constructor).toBe(models.Clef);
    };

    shallow(<Clef addClef={addClef} />);
  });

  it("calls props.deleteClef with clef", () => {
    const deleteClef = clef => {
      expect(clef.constructor).toBe(models.Clef);
    };

    shallow(<Clef deleteClef={deleteClef} />).unmount();
  });
});
