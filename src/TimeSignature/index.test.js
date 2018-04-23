import React from "react";
import { mount } from "enzyme";
import configureMockStore from "redux-mock-store";
import _ from "lodash";
import TimeSignatureContainer from "./index";
import { initialState, reducer, types } from "../reducers/time-signatures";
import models from "../models";

const mockStore = configureMockStore([]);

describe("<TimeSignatureContainer />", () => {
  const store = mockStore({ timeSignatures: initialState });

  beforeEach(store.clearActions);

  it("dispatches ADD_TIME_SIGNATURE action on componentDidMount", () => {
    const wrapper = mount(<TimeSignatureContainer store={store} />);
    const actions = store.getActions();

    expect(actions.length).toBe(1);
    expect(actions[0].type).toBe(types.ADD_TIME_SIGNATURE);
    expect(_.values(actions[0].payload)[0].constructor).toBe(
      models.TimeSignature
    );
  });

  it("dispatches DELETE_TIME_SIGNATURE action on componenetWillUnmount", () => {
    mount(<TimeSignatureContainer store={store} />).unmount();
    const actions = store.getActions();

    expect(actions.length).toBe(2);
    expect(actions[1].type).toBe(types.DELETE_TIME_SIGNATURE);
    expect(actions[1].payload.constructor).toBe(models.TimeSignature);
  });
});
