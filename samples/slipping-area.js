import React from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CursorHijack from '../index';

class SlippingDistorter extends CursorHijack.Distorter {
  constructor(key, priority, getRangeFunc) {
    super(key, priority);
    this.getRangeFunc = getRangeFunc;
  }

  isInRange = (defaultPointer, distortedPointer, prevDistortedPointer) => {
    const range = this.getRangeFunc();
    const curX = distortedPointer.currentX;
    const curY = distortedPointer.currentY;
    const prevX = distortedPointer.prevX;
    const prevY = distortedPointer.prevY;
    return range.left <= curX && curX <= range.right
           && range.top <= curY && curY <= range.bottom
           && range.left <= prevX && prevX <= range.right
           && range.top <= prevY && prevY <= range.bottom;
  }

  distort = (defaultPointer, distortedPointer, prevDistortedPointer) => {
    const reducingRate = 0.5;
    const slipX = prevDistortedPointer.getMoveX() * reducingRate;
    const slipY = prevDistortedPointer.getMoveY() * reducingRate;
    const range = this.getRangeFunc();

    const distortX = distortedPointer.prevX + defaultPointer.getMoveX() + slipX;
    const distortY = distortedPointer.prevY + defaultPointer.getMoveY() + slipY;
    const distortDiffX = distortX - distortedPointer.currentX;
    const distortDiffY = distortY - distortedPointer.currentY;
    const relativeX = distortedPointer.currentX - range.left;
    const relativeY = distortedPointer.currentY - range.top;
    const relativeCos2X = (1 - Math.cos(Math.PI * 2 * (relativeX / range.width))) / 2;
    const relativeCos2Y = (1 - Math.cos(Math.PI * 2 * (relativeY / range.height))) / 2;
    return new CursorHijack.CursorPointer(
      distortedPointer.prevX, distortedPointer.prevY, 
      distortedPointer.currentX + distortDiffX * relativeCos2Y,
      distortedPointer.currentY + distortDiffY * relativeCos2X);
  }
}

class SlippingArea extends React.Component {
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
    this.distorter = new SlippingDistorter('slipping-distorter', 100, this.getRangeFunc);
  }

  render() {
    const style = {
      "width": this.props.pos.width,
      "height": this.props.pos.height,
      "backgroundColor": "#6699ff",
      "textAlign": "center"
    };
    return (
      <div style={style}>
        <p>Slip Cursor</p>
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

export default connect(null, mapDispatchToProps, null, {withRef: true})(SlippingArea);
