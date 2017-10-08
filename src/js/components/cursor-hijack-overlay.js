import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import assign from 'lodash.assign';
import * as ActionCreators from '../action/action-creators';
import { dispatchPseuduoEvent } from '../services/cursor-event-dispatch.service';
import { distort } from '../services/distorter/cursor-distorter.service';
import CursorPointer from '../services/distorter/cursor-pointer';

class CursorHijackOverlay extends React.Component {
  // TODO: inject flag to disable hijack
  static propTypes = {
    getAppRefs: PropTypes.func.isRequired,
    pos: PropTypes.shape({
      top: PropTypes.number.isRequired,
      left: PropTypes.number.isRequired,
      widthPercent: PropTypes.number.isRequired,
      heightPercent: PropTypes.number.isRequired,
      zIndex: PropTypes.number.isRequired,
    }),
    createCursorEvent: PropTypes.func,
    distorters: PropTypes.array,
    debug: PropTypes.bool
  }

  constructor(props) {
    super(props);
  }

  _onMouseEvent = (event) => {
    event.stopPropagation();

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
      "top": this.props.pos.top,
      "left": this.props.pos.left,
      "width": this.props.pos.widthPercent + "%",
      "height": this.props.pos.heightPercent + "%",
      "zIndex": this.props.pos.zIndex,
      "background": "transparent",
      "cursor": this.props.debug ? "default" : "none",
    }
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
}

const mergeProps = (stateProps, dispatchProps, ownProps) => (
  assign({}, ownProps, dispatchProps, stateProps)
);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CursorHijackOverlay);