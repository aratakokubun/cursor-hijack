'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import * as _ from 'lodash';
import { isCursorInScope } from '../../utils/cursor-event.utils';

class PseudoCursor extends React.Component {
  static propTypes = {
    cursorImageUrl: PropTypes.string.isRequired,
    pos: PropTypes.shape({
      top: PropTypes.number,
      left: PropTypes.number,
    }),
    shape: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      zIndex: PropTypes.number.isRequired
    }),
    display: PropTypes.bool,
  }

  static defaultProps = {
    cursorImageUrl: '../assets/240x320-mac-osx-arrow-cursor.png',
    pos: {
      top: 0,
      left: 0,
    },
    shape: {
      width: 16,
      height: 24,
      zIndex: 80,
    },
    display: true
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
      "display": this.props.display ? "inline" : "none",
      "background": "transparent",
      "KhtmlUserSelect": "none",
      "OUserSelect": "none",
      "MozUserSelect": "none",
      "WebkitUserSelect": "none",
      "UserSelect": "none",
    }
    _.merge(style, this.props.pos, this.props. shape);
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
      top: state.cjk_cursorEventReducer.pointer.currentY,
      left: state.cjk_cursorEventReducer.pointer.currentX
    },
    display: isCursorInScope(state.cjk_cursorEventReducer)
  }
)

const mergeProps = (stateProps, dispatchProps, ownProps) => (
    _.merge({}, ownProps, stateProps)
)

export default connect(mapStateToProps, null, mergeProps)(PseudoCursor);