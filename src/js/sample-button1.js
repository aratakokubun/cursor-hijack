import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import ActionTypes from './action/action-types';
import assign from 'lodash.assign';
import { isCursorInScope } from './utils/action-type-utils';
import { simulateMouseEvent } from './services/event-simulator.service';
import { searchRefElementAtCoordinate } from './services/search-element.service';

import SampleButton2 from './sample-button2';

class SampleButton1 extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <input type="text" name="name" defaultValue="hoge" ref="hogeInput1"/>
        <input type="text" name="name" defaultValue="fuga" ref="fugaInput1"/>
        <button name="name" onClick={event => alert("hello! cursor-hijack")} ref="helloButton">hello!</button>
        <SampleButton2 ref="SampleButton2"/>
      </div>
    );
  }
}

const mapState = (state) => (state)

export default connect(mapState, null, null, { withRef: true })(SampleButton1);