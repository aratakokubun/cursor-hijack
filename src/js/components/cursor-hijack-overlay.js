import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as MouseActionCreators from '../action/cursor-action-creator'
import { dispatchPseuduoEvent } from '../services/cursor-event-dispatch.service';

class CursorHijackOverlay extends React.Component {
  // TODO: add flag to disable hijack
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
    debug: PropTypes.bool
  }

  constructor(props) {
    super(props);
  }

  _onMouseEvent = (event) => {
    event.stopPropagation();
    // TODO: call change cursor position callback
    // FIXME: below is temporal test implemnetation
    this.props.createCursorEvent(event);
    const targetCoordinates = {
      x: event.clientX,
      y: event.clientY
    }
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(MouseActionCreators, dispatch);
}

export default connect(null, mapDispatchToProps)(CursorHijackOverlay);