import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import ActionTypes from './action/action-types';
import assign from 'lodash.assign';
import { isCursorInScope } from './utils/action-type-utils';
import { simulateEvent } from './utils/cursor-simulator/cursor-simulator';
import { searchRefElementAtCoordinate } from './services/search-element.service';

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
    const dom = this.refs.fugaInput;
    // if (dom != undefined) {
    //   console.log(dom);
    //   simulatedClick(dom, { 
    //   clientX: this.props.pos.left, clientY: this.props.pos.top,
    //   screenX: this.props.pos.left, screenY: this.props.pos.top  
    //   });
    //   // dom.focus();
    // }
    const event = this.props.event;
    if (dom != undefined && event != undefined) {
      //  dom.dispatchEvent(event);
      //  simulateEvent(dom, event);
      dom.focus();
      dom.click();
      const coords = {x: event.clientX, y: event.clientY};
      console.log(searchRefElementAtCoordinate(this.refs, coords));
    }
    return (
      <div ref="SampleButton">
        <form action="https://github.com/aratakokubun/cursor-jack" method="get"/>
        {/*<input type="submit" name="submit" value="submit" onClick={confirm('jump to github page?')}/>*/}
        <input type="text" name="name" defaultValue="hoge" ref="hogeInput"/>
        <input type="text" name="name" defaultValue="fuga" ref="fugaInput"/>
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

export default connect(mapStateToProps, null, mergeProps)(SampleButton);