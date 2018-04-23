import React from "react";
import { mount } from "enzyme";
import configureMockStore from "redux-mock-store";
import _ from "lodash";
import VoiceContainer from "./index";
import { initialState, types } from "../reducers/voices";
import models from "../models";

const mockStore = configureMockStore([]);

describe("<VoiceContainer />", () => {
  const store = mockStore({ voices: initialState });

  beforeEach(store.clearActions);

  it("dispatches ADD_VOICE action on componentDidMount", () => {
    const wrapper = mount(<VoiceContainer store={store} />);
    const actions = store.getActions();

    expect(actions.length).toBe(1);
    expect(actions[0].type).toBe(types.ADD_VOICE);
    expect(_.values(actions[0].payload)[0].constructor).toBe(models.Voice);
  });

  it("dispatches DELETE_VOICE action on componentWillUnmount", () => {
    mount(<VoiceContainer store={store} />).unmount();
    const actions = store.getActions();

    expect(actions.length).toBe(2);
    expect(actions[1].type).toBe(types.DELETE_VOICE);
    expect(actions[1].payload.constructor).toBe(models.Voice);
  });
});
