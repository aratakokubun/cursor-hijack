import React from 'react';
import { render } from 'react-dom';
import PseudoCursor from './pseudo-cursor/pseudo-cursor';
import CursorHijackOverlay from './cursor-hijack-overlay';
import { createMouseMoveAction, createMouseClickAction, createMouseNoneAction } from '../action/cursor-action-creator';

import SampleButton from '../sample-button';

const defaultParams = {
  cursorImageUrl: './../assets/cursor.jpg',
  cursorPos: {
    top: 0,
    left: 0,
    width: 10,
    height: 10,
    zIndex: 1000
  },
  overlayPos: {
    top: 0,
    left: 0,
    widthPercent: 100,
    heightPercent: 100,
    zIndex: 1002
  },
  display: false
}

export default class App extends React.Component {
  getAppRefs = () => (this.refs)

  render() {
    return (
      <div>
        <PseudoCursor
          cursorImageUrl={defaultParams.cursorImageUrl} 
          pos={defaultParams.cursorPos} 
          display={defaultParams.display} />
        <CursorHijackOverlay
          pos={defaultParams.overlayPos}
          getAppRefs={this.getAppRefs} />
        <SampleButton ref="sampleButton" />
      </div>
    );
  };
};