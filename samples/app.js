import React from 'react';
import { render } from 'react-dom';
import CursorHijack from '../index';

import SampleButton from './sample-button';
import RepellingButton from './repelling-button';
import ReversingArea from './reversing-area';
import RandommoveArea from './randommove-area';

const defaultParams = {
  cursorImageUrl: '../assets/240x320-mac-osx-arrow-cursor.png',
  cursorPos: {
    top: 0,
    left: 0,
    width: 16,
    height: 24,
    zIndex: 100
  },
  overlayPos: {
    top: 0,
    left: 0,
    widthPercent: 100,
    heightPercent: 100,
    zIndex: 102
  },
  buttonPos: {
    width: 200,
    height: 100,
    buttonWidth: 80,
    buttonHeight: 40
  },
  reversingPos: {
    width: 400,
    height: 200
  },
  automovePos: {
    width: 400,
    height: 200
  },
  display: true
}

export default class App extends React.Component {
  getAppRefs = () => (this.refs);

  render() {
    return (
      <div>
        <CursorHijack.PseudoCursor
          cursorImageUrl={defaultParams.cursorImageUrl} 
          pos={defaultParams.cursorPos} 
          display={defaultParams.display}/>
        <CursorHijack.CursorHijackOverlay
          pos={defaultParams.overlayPos}
          getAppRefs={this.getAppRefs}/>
        <RepellingButton
          ref="RepellingButton"
          pos={defaultParams.buttonPos} />
        <ReversingArea 
          ref="ReversingArea"
          pos={defaultParams.reversingPos}/>
        <RandommoveArea 
          ref="RandommoveArea"
          pos={defaultParams.automovePos}/>
      </div>
    );
  };
};