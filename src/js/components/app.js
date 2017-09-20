import React from 'react';
import { render } from 'react-dom';
import FakeCusorImpl from './fake-cursor-impl';
import TrueCursorOverlay from './fake-cursor/true-cursor-overlay';
import { createMouseMoveAction, createMouseClickAction, createMouseNoneAction } from '../action/cursor-action-creator';

const defaultParams = {
  top: 0,
  left: 0,
  zIndexCursor: 102,
  zIndexOverlay: 100,
  display: true
}

export default class App extends React.Component {
  render = () => (
    <div>
      <FakeCusorImpl
        cursorImageUrl={'../assets/cursor.jpg'}
        top={defaultParams.top} left={defaultParams.left} zIndex={defaultParams.zIndexCursor}
        display={defaultParams.display} />
      <TrueCursorOverlay
        top={defaultParams.top} left={defaultParams.left} zIndex={defaultParams.zIndexOverlay}
        widthPercent={100} heightPercent={100}
      />
    </div>
    , document.getElementById('app'));
};