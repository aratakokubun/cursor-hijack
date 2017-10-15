import React from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as assign from 'lodash.assign';
import CursorHijack from '../index';

class ForceChoiceDistorter extends CursorHijack.Distorter {
  constructor(key, priority, getRangeFunc, getPositiveRangeFunc, getNegativeRangeFunc) {
    super(key, priority);
    this.getRangeFunc = getRangeFunc;
    this.getPositiveRangeFunc = getPositiveRangeFunc;
    this.getNegativeRangeFunc = getNegativeRangeFunc;
  }

  isInRange = (defaultPointer, distortedPointer, prevDistortedPointer) => {
    const range = this.getRangeFunc();
    const curX = distortedPointer.currentX;
    const curY = distortedPointer.currentY;
    return range.left <= curX && curX <= range.right
           && range.top <= curY && curY <= range.bottom;
  }
  
  distort = (defaultPointer, distortedPointer, prevDistortedPointer) => {
    const range = this.getRangeFunc();
    const positiveRange = this.getPositiveRangeFunc();
    const shrinkRate = 6.0;

    const relativeX = distortedPointer.currentX - range.left;
    const relativeY = distortedPointer.currentY - range.top;
    const fromPositiveCenterX = relativeX - (positiveRange.left + positiveRange.right) / 2;

    const distortDiffX = fromPositiveCenterX * (1/shrinkRate - 1);
    const relativeCos2X = (1 - Math.cos(Math.PI * 2 * (relativeX / range.width))) / 2;
    const relativeCos2Y = (1 - Math.cos(Math.PI * 2 * (relativeY / range.height))) / 2;

    const distortedRelativeX = distortDiffX * relativeCos2Y * relativeCos2X + relativeX;
    const distortedX = distortedRelativeX + range.left;

    return new CursorHijack.CursorPointer(distortedPointer.prevX, distortedPointer.prevY, distortedX, distortedPointer.currentY);
  }
}

class ForceChoiceButton extends React.Component {
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
    this.distorter = new ForceChoiceDistorter('force-choice-distorter', 100,
      this.getRangeFunc, this.getPositiveRangeFunc, this.getNegativeRangeFunc);
  }

  render() {
    const style = {
      "width": this.props.pos.width,
      "height": this.props.pos.height,
      "backgroundColor": "#dddddd",
    };
    const positiveButtonStyle = {
      "marginTop": (this.props.pos.height - this.props.pos.buttonHeight) / 3,
      "marginLeft": (this.props.pos.width - this.props.pos.buttonWidth * 2) / 3,
      "width": this.props.pos.buttonWidth,
      "height": this.props.pos.buttonHeight
    };
    const negativeButtonStyle = {
      "marginTop": (this.props.pos.height - this.props.pos.buttonHeight) / 3,
      "marginLeft": (this.props.pos.width - this.props.pos.buttonWidth * 2) / 3,
      "width": this.props.pos.buttonWidth,
      "height": this.props.pos.buttonHeight
    };
    return (
        <div style={style}>
          <p>Do you think usefull library?</p>
          <button style={positiveButtonStyle}
            ref="positive-button"
            onClick={event => confirm('You are right!')}>
            Yes!
          </button>
          <button style={negativeButtonStyle}
            ref="negative-button"
            onClick={event => confirm('You maybe wrong!')}>
            No!
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

  getPositiveRangeFunc = () => (
    {
      left: (this.props.pos.width - this.props.pos.buttonWidth * 2) / 3,
      right: (this.props.pos.width - this.props.pos.buttonWidth * 2) / 3 + this.props.pos.buttonWidth,
      top: (this.props.pos.height - this.props.pos.buttonHeight) / 2,
      bottom: (this.props.pos.height + this.props.pos.buttonHeight) / 2,
      width: this.props.pos.buttonWidth,
      height: this.props.pos.buttonHeight
    }
  )

  getNegativeRangeFunc = () => (
    {
      left: this.props.pos.width - ((this.props.pos.width - this.props.pos.buttonWidth * 2) / 3 + this.props.pos.buttonWidth),
      right: this.props.pos.width - (this.props.pos.width - this.props.pos.buttonWidth * 2) / 3,
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

export default connect(null, mapDispatchToProps, null, {withRef: true})(ForceChoiceButton);