import React from 'react';
import FakeCursor from './fake-cursor/fake-cursor';

export default class FakeCursorImpl extends FakeCursor {

  constructor(props) {
    super(props);
  }

  _onMouseMove(event) {
    console.log("mouse move" + event.clientX + "," + event.clientY);
  }

  _onMouseClick(event) {
    console.log("mouse click" + event.clientX + "," + event.clientY);
  }
}