import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import assign from 'lodash.assign';
import { isCursorInScope } from '../../utils/cursor-event.utils';

class PseudoCursor extends React.Component {

  static propTypes = {
    cursorImageUrl: PropTypes.string.isRequired,
    pos: PropTypes.shape({
      top: PropTypes.number,
      left: PropTypes.number,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      zIndex: PropTypes.number.isRequired
    }),
    display: PropTypes.bool.isRequired,
    debug: PropTypes.bool
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
    const style = {
      "position": "absolute",
      "top": this.props.pos.top,
      "left": this.props.pos.left,
      "width": this.props.pos.width,
      "height": this.props.pos.height,
      "zIndex": this.props.pos.zIndex,
      "display": this.props.display ? "inline" : "none",
      "cursor": this.props.debug ? "default" : "none",
      "background": "transparent",
      "KhtmlUserSelect": "none",
      "OUserSelect": "none",
      "MozUserSelect": "none",
      "WebkitUserSelect": "none",
      "UserSelect": "none",
    };
    return (
      <img src={this.props.cursorImageUrl}
        style={style}>
      </img>
    );
  }
}

const mapStateToProps = (state) => (
  {
    pos: {
      top: state.cursorEventReducer.clientY,
      left: state.cursorEventReducer.clientX
    },
    display: isCursorInScope(state.cursorEventReducer)
  }
)

const mergeProps = (stateProps, dispatchProps, ownProps) => (
    assign({}, ownProps, {
      pos: assign({}, ownProps.pos, stateProps.pos),
      display: stateProps.display
    })
)

export default connect(mapStateToProps, null, mergeProps)(PseudoCursor);