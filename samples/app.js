import React from 'react';
import { render } from 'react-dom';
import CursorHijack from '../index';

import RepellingButton from './repelling-button';
import ReversingArea from './reversing-area';
import RandommoveArea from './randommove-area';
import ForceChoiceButton from './force-choice-button';

const defaultParams = {
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
  forceChoicePos: {
    width: 400,
    height: 200,
    buttonWidth: 80,
    buttonHeight: 40
  },
}

export default class App extends React.Component {
  getAppRefs = () => (this.refs);

  render() {
    return (
      <div>
        <CursorHijack.PseudoCursor/>
        <CursorHijack.CursorHijackOverlay
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
        <ForceChoiceButton 
          ref="ForceChoiceButton"
          pos={defaultParams.forceChoicePos}/>
      </div>
    );
  };
};