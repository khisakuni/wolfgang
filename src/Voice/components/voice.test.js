import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Voice from './Voice';
import Note from '../../Note';
import models from '../../models';

const store = configureMockStore([])({});

describe('<Voice />', () => {
  it('calls componentDidMount', () => {
    sinon.spy(Voice.prototype, 'componentDidMount');
    shallow(<Voice store={store} />);

    expect(Voice.prototype.componentDidMount.calledOnce).toBe(true);
  });

  it('calls componentWillUnmount', () => {
    sinon.spy(Voice.prototype, 'componentWillUnmount');
    shallow(<Voice store={store} />).unmount();

    expect(Voice.prototype.componentWillUnmount.calledOnce).toBe(true);
  });

  it('calls props.addVoice with voice', () => {
    const addVoice = voice => expect(voice.constructor).toBe(models.Voice);

    shallow(<Voice addVoice={addVoice} store={store} />);
  });

  it('calls props.deleteVoice with voice', () => {
    const deleteVoice = voice => expect(voice.constructor).toBe(models.Voice);

    shallow(<Voice deleteVoice={deleteVoice} store={store} />);
  });

  it('renders Note components', () => {
    const wrapper = shallow(
      <Voice store={store}>
        <Note />
      </Voice>
    ).dive();

    expect(wrapper.find(Note).length).toBe(1);
  });

  it('raises error if children are not Note components', () => {
    const printError = console.error;
    console.error = sinon.spy();

    const wrapper = shallow(
      <Voice store={store}>
        <h1>Hi there</h1>
      </Voice>
    ).dive;

    expect(console.error.calledOnce).toBe(true);
    console.error = printError;
  });
});
