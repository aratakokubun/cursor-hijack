import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as MouseActionCreators from '../../action/cursor-action-creator'

class TrueCursorOverlay extends React.Component {

  static propTypes = {
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
  }

  constructor(props) {
    super(props);
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
      "cursor": "none"
    }
    return (
      <div style={style}
        onMouseMove={event => this.props.createMouseMoveAction(event)}
        onMouseOver={event => this.props.createMouseOverAction(event)}
        onClick={event => this.props.createMouseClickAction(event)}
        onMouseOut={event => this.props.createMouseOutAction(event)}>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(MouseActionCreators, dispatch);
}

export default connect(null, mapDispatchToProps)(TrueCursorOverlay);