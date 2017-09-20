import { React, PropTypes } from 'react';
import { connect } from 'react-redux'
import ActionTypes from '../../action/action-types';
import assign from 'lodash.assign';

class FakeCursor extends React.Component {

  static propTypes = {
    cursorImageUrl: PropTypes.string.isRequired,
    pos: PropTypes.shape({
      top: PropTypes.number,
      left: PropTypes.number,
      zIndex: PropTypes.number.isRequired
    }),
    display: PropTypes.bool.isRequired,
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
      "zIndex": this.props.pos.zIndex,
      "display": this.props.display
    };
    return (
      <img src={this.props.cursorImageUrl}
        style={style}>
      </img>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pos: {
      top: state.cursorEventReducer.clientX,
      left: state.cursorEventReducer.clientY
    },
    display: state.cursorEventReducer.cursorState !== ActionTypes.MOUSE_NONE
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, ownProps, {
        redux: {
            state: stateProps,
            actions: dispatchProps
        }
    });
};

export default connect(mapStateToProps, mergeProps)(FakeCursor);