import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as MouseActionCreators from '../action/cursor-action-creator'
import { dispatchPseuduoEvent } from '../services/cursor-event-dispatch.service';

class CursorHijackOverlay extends React.Component {
  // TODO: add all callback for mouse event
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
    createMouseMoveAction: PropTypes.func,
    createMouseOverAction: PropTypes.func,
    createMouseOutAction: PropTypes.func,
    createMouseClickAction: PropTypes.func,
    debug: PropTypes.bool
  }

  constructor(props) {
    super(props);
  }

  _onMouseEvent = (event) => {
    // TODO: call change cursor position callback
    // FIXME: below is temporal test implemnetation
    this.props.createMouseClickAction(event);
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
      // TODO: Add all mouse event hook
      // FIXME: below is temporal test implemnetation
      <div style={style}
        onMouseMove={event => this.props.createMouseMoveAction(event)}
        onMouseOver={event => this.props.createMouseOverAction(event)}
        onClick={event => this._onMouseEvent(event)}
        onMouseOut={event => this.props.createMouseOutAction(event)}>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(MouseActionCreators, dispatch);
}

export default connect(null, mapDispatchToProps)(CursorHijackOverlay);