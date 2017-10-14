import React from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CursorHijack from '../index';

class RepellingDistorter extends CursorHijack.Distorter {
  constructor(key, priority, getRangeFunc, getRepellingRangeFunc) {
    super(key, priority);
    this.getRangeFunc = getRangeFunc;
    this.getRepellingRangeFunc = getRepellingRangeFunc;
  }

  isInRange = (defaultPointer, distortedPointer) => {
    const range = this.getRangeFunc();
    const curX = distortedPointer.currentX;
    const curY = distortedPointer.currentY;
    return range.left <= curX && curX <= range.right
           && range.top <= curY && curY <= range.bottom;
  }

  distortLineary = (defaultPointer, distortedPointer) => {
    const convertPoint = (wholeLength, repellingLeft, repellingLength, repellingRate, point) => {
      const aroundAreaRate = (wholeLength - repellingLength) / (wholeLength - repellingLength / repellingRate);
      const repellingRangeStart = repellingLeft + (1 - 1/repellingRate) * repellingLength/2;
      const repellingRangeEnd = repellingLeft + repellingLength - (1 - 1/repellingRate) * repellingLength/2;
      let convertedPoint = 0;
      if (point < repellingRangeStart) {
        convertedPoint = point * aroundAreaRate; 
      } else if (point <= repellingRangeEnd) {
        convertedPoint = repellingRangeStart * aroundAreaRate + (point - repellingRangeStart) * repellingRate; 
      } else {
        convertedPoint = repellingRangeStart * aroundAreaRate + repellingLength + (point - repellingRangeEnd) * aroundAreaRate; 
      }
      return convertedPoint;
    };

    const repellingRate = 5.0;
    const range = this.getRangeFunc();
    const repellingRange = this.getRepellingRangeFunc();
    const relativeX = distortedPointer.currentX - range.left;
    const relativeY = distortedPointer.currentY - range.top;

    const distortDiffX = convertPoint(range.width, repellingRange.left, repellingRange.width, repellingRate, relativeX) - relativeX;
    const distortDiffY = convertPoint(range.height, repellingRange.top, repellingRange.height, repellingRate, relativeY) - relativeY;
    const relativeCos2X = (1 - Math.cos(Math.PI * 2 * (relativeX / range.width))) / 2;
    const relativeCos2Y = (1 - Math.cos(Math.PI * 2 * (relativeY / range.height))) / 2;

    const distortedRelativeX = distortDiffX * relativeCos2Y + relativeX;
    const distortedRelativeY = distortDiffY * relativeCos2X + relativeY;
    const distortedX = distortedRelativeX + range.left;
    const distortedY = distortedRelativeY + range.top;

    return new CursorHijack.CursorPointer(distortedPointer.prevX, distortedPointer.prevY, distortedX, distortedY);
  }

  distort = (defaultPointer, distortedPointer) => {
    return this.distortLineary(defaultPointer, distortedPointer);
  }
}

class RepellingButton extends React.Component {
  static propTypes = {
    pos: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      buttonWidth: PropTypes.number.isRequired,
      buttonHeight: PropTypes.number.isRequired,
    }),
    createAddDistorterEvent: PropTypes.func,
    createDeleteDistorterEvent: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.distorter = new RepellingDistorter('repelling-distorter', 100, this.getRangeFunc, this.getRepellingRangeFunc);
  }

  render() {
    const style = {
      "width": this.props.pos.width,
      "height": this.props.pos.height,
      "backgroundColor": "#99ff99",
    };
    const buttonStyle = {
      "marginTop": (this.props.pos.height - this.props.pos.buttonHeight) / 2,
      "marginBottom": (this.props.pos.height - this.props.pos.buttonHeight) / 2,
      "marginLeft": (this.props.pos.width - this.props.pos.buttonWidth) / 2,
      "marginRight": (this.props.pos.width - this.props.pos.buttonWidth) / 2,
      "width": this.props.pos.buttonWidth,
      "height": this.props.pos.buttonHeight
    };
    return (
      <div style={style}>
        <button style={buttonStyle}
          ref="repelling-button"
          onClick={event => confirm('Do you feel this button repelling you?')}>
          Hard to click
        </button>
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

  getRepellingRangeFunc = () => (
    {
      left: (this.props.pos.width - this.props.pos.buttonWidth) / 2,
      right: (this.props.pos.width + this.props.pos.buttonWidth) / 2,
      top: (this.props.pos.height - this.props.pos.buttonHeight) / 2,
      bottom: (this.props.pos.height + this.props.pos.buttonHeight) / 2,
      width: this.props.pos.buttonWidth,
      height: this.props.pos.buttonHeight
    }
  )
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(CursorHijack.ActionCreators, dispatch);
}

export default connect(null, mapDispatchToProps, null, {withRef: true})(RepellingButton);