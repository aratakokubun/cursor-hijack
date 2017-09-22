import React from 'react';
import { render } from 'react-dom';
import PseudoCursor from './pseudo-cursor/pseudo-cursor';
import TrueCursorOverlay from './pseudo-cursor/true-cursor-overlay';
import { createMouseMoveAction, createMouseClickAction, createMouseNoneAction } from '../action/cursor-action-creator';

import SampleButton from '../sample-button';

const defaultParams = {
  cursorImageUrl: './../assets/cursor.jpg',
  cursorPos: {
    top: 0,
    left: 0,
    width: 10,
    height: 10,
    zIndex: 100
  },
  overlayPos: {
    top: 0,
    left: 0,
    widthPercent: 100,
    heightPercent: 102,
    zIndex: 100
  },
  display: false
}

export default class App extends React.Component {
  getAppRefs = () => (this.buttonRef)

  render() {
    return (
      <div>
        <PseudoCursor
          cursorImageUrl={defaultParams.cursorImageUrl} 
          pos={defaultParams.cursorPos} 
          display={defaultParams.display} />
        <TrueCursorOverlay
          pos={defaultParams.overlayPos}
          getAppRefs={this.getAppRefs} />
        <SampleButton ref="sampleButton" />
      </div>
    );
  };
};