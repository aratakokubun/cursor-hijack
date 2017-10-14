'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import assign from 'lodash.assign';
import * as ActionCreators from '../action/action-creators';
import { dispatchPseuduoEvent } from '../service/event-dispatcher/cursor-event-dispatch.service';
import { distort } from '../service/distorter/cursor-distorter.service';
import CursorPointer from '../service/distorter/cursor-pointer';

class CursorHijackOverlay extends React.Component {
  static propTypes = {
    getAppRefs: PropTypes.func.isRequired,
    pos: PropTypes.shape({
      top: PropTypes.number.isRequired,
      left: PropTypes.number.isRequired,
    }),
    shape: PropTypes.shape({
      width: PropTypes.any.isRequired,
      height: PropTypes.any.isRequired,
      zIndex: PropTypes.number.isRequired,
    }),
    createCursorEvent: PropTypes.func,
    distorters: PropTypes.array,
    debug: PropTypes.bool
  }

  static defaultProps = {
    pos: {
      top: 0,
      left: 0,
    },
    shape: {
      width: '100%',
      height: '100%',
      zIndex: 100,
    },
    debug: false
  }

  constructor(props) {
    super(props);
  }

  _onMouseEvent = (event) => {
    event.stopPropagation();

    // Note: movement may not be taken correctly for now. This is future improvement.
    const orgPointer = new CursorPointer(
      event.clientX - event.movementX, event.clientY - event.movementY,
      event.clientX, event.clientY);
    const distortedPointer = distort(this.props.distorters, orgPointer);

    const targetCoordinates = {
      x: distortedPointer.currentX,
      y: distortedPointer.currentY,
    }

    this.props.createCursorEvent(targetCoordinates, event.type);
    dispatchPseuduoEvent(event, targetCoordinates, this.props.getAppRefs());
  }

  render() {
    const style = {
      "position": "fixed",
      "background": "transparent",
      "cursor": this.props.debug ? "default" : "none",
    };
    _.merge(style, this.props.pos, this.props.shape);
    return (
      <div style={style}
        onMouseMove   = {event => this._onMouseEvent(event)}
        onMouseOver   = {event => this._onMouseEvent(event)}
        onClick       = {event => this._onMouseEvent(event)}
        onDoubleClick = {event => this._onMouseEvent(event)}
        onContextMenu = {event => this._onMouseEvent(event)}
        onMouseDown   = {event => this._onMouseEvent(event)}
        onMouseUp     = {event => this._onMouseEvent(event)}
        onMouseEnter  = {event => this._onMouseEvent(event)}
        onMouseLeave  = {event => this._onMouseEvent(event)}
        onMouseOut    = {event => this._onMouseEvent(event)}
        onWheel       = {event => this._onMouseEvent(event)}
        />
    );
  }
}

const mapStateToProps = (state) => (
  {
    distorters: state.distorterEventReducer.distorters
  }
)

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(ActionCreators, dispatch)
)

const mergeProps = (stateProps, dispatchProps, ownProps) => (
  assign({}, ownProps, dispatchProps, stateProps)
)

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CursorHijackOverlay);