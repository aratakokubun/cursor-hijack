import React from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CursorHijack from '../index';

class ForceChooseDistorter extends CursorHijack.Distorter {
  constructor(key, priority, getRangeFunc) {
    super(key, priority);
    this.getRangeFunc = getRangeFunc;
  }

  isInRange = (defaultPointer, distortedPointer) => {
    const range = this.getRangeFunc();
    const curX = distortedPointer.currentX;
    const curY = distortedPointer.currentY;
    return range.left <= curX && curX <= range.right
           && range.top <= curY && curY <= range.bottom;
  }

  distort = (defaultPointer, distortedPointer) => {
    const randomMoveRateX = 0.1*Math.random(), randomMoveRateY = 0.1*Math.random();
    const range = this.getRangeFunc();
    const relativeX = distortedPointer.currentX - range.left;
    const relativeY = distortedPointer.currentY - range.top;
    return new CursorHijack.CursorPointer(
      distortedPointer.prevX, distortedPointer.prevY, 
      distortedPointer.currentX + range.width * randomMoveRateX,
      distortedPointer.currentY + range.height * randomMoveRateY);
  }
}

class ForceChooseArea extends React.Component {
  static propTypes = {
    pos: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }),
    createAddDistorterEvent: PropTypes.func,
    createDeleteDistorterEvent: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.distorter = new ForceChooseDistorter('randommove-distorter', 100, this.getRangeFunc);
  }

  render() {
    const style = {
      "width": this.props.pos.width,
      "height": this.props.pos.height,
      "backgroundColor": "#9999ff",
      "textAlign": "center"
    };
    return (
      <div style={style}>
        <p>ForceChoose Cursor</p>
      </div>
    );
  }

  componentDidMount() {
    this.props.createAddDistorterEvent([
      this.distorter
    ]);
  }

  componentWillUnmount() {
    this.props.createDeleteDistorterEvent([
      this.distorter
    ]);
  }

  getRangeFunc = () => (
    ReactDom.findDOMNode(this).getBoundingClientRect()
  )
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(CursorHijack.ActionCreators, dispatch);
}

export default connect(null, mapDispatchToProps, null, {withRef: true})(ForceChooseArea);