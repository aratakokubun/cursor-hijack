import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import ActionTypes from './action/action-types';
import assign from 'lodash.assign';
import { isCursorInScope } from './utils/action-type-utils';
import { simulateMouseEvent } from './services/event-simulator.service';
import { searchRefElementAtCoordinate } from './services/search-element.service';

import SampleButton1 from './sample-button1';

class SampleButton extends React.Component {

  static propTypes = {
    pos: PropTypes.shape({
      top: PropTypes.number,
      left: PropTypes.number,
    }),
    event: PropTypes.any,
  }

  constructor(props) {
    super(props);
  }

  setCursorImageUrl(cusorImageUrl) {
    return this.props.cursorImageUrl = cursorImageUrl;
  }

  toggleDisplay(display) {
    this.display = display;
  }

  render() {
    // const dom = this.refs.fugaInput;
    // // if (dom != undefined) {
    // //   console.log(dom);
    // //   simulatedClick(dom, { 
    // //   clientX: this.props.pos.left, clientY: this.props.pos.top,
    // //   screenX: this.props.pos.left, screenY: this.props.pos.top  
    // //   });
    // //   // dom.focus();
    // // }
    // const event = this.props.event;
    // if (dom != undefined && event != undefined) {
    //   //  dom.dispatchEvent(event);
    //   //  simulateMouseEvent(dom, event);
    //   dom.focus();
    //   dom.click();
    // }
    if (this.refs.SampleButton1 != undefined) {
      console.log(this.refs.SampleButton1.getWrappedInstance().refs);
    }
    return (
      <div>
        <input type="text" name="name" defaultValue="hoge" ref="hogeInput"/>
        <input type="text" name="name" defaultValue="fuga" ref="fugaInput"/>
        <SampleButton1 ref="SampleButton1"/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pos: {
      top: state.cursorEventReducer.cursorEvent.clientY,
      left: state.cursorEventReducer.cursorEvent.clientX
    },
    event: state.cursorEventReducer.event,
    display: isCursorInScope(state.cursorEventReducer.cursorState)
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, ownProps, {
      pos: Object.assign({}, ownProps.pos, stateProps.pos),
      event: stateProps.event,
      display: stateProps.display
    });
};

export default connect(mapStateToProps, null, mergeProps, {withRef: true})(SampleButton);