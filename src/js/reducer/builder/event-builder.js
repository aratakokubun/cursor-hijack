export class CursorEventBuilder {
  constructor() {}
  setClientX = (clientX) => {
    this.clientX = clientX;
    return this;
  }
  setClientY = (clientY) => {
    this.clientY = clientY;
    return this;
  }
  setScreenX = (screenX) => {
    this.screenX = screenX;
    return this;
  }
  setScreenY = (screenY) => {
    this.screenY = screenY;
    return this;
  }
  setMoveX = (moveX) => {
    this.moveX = moveX;
    return this;
  }
  setMoveY = (moveY) =>  {
    this.moveY = moveY;
    return this;
  }
  build = () => (
    {
      clientX: this.clientX,
      clientY: this.clientY,
      screenX: this.screenX,
      screenY: this.screenY,
      moveX: this.moveX,
      moveY: this.moveY
    }
  )
}

export class CursorStateBuilder {
  constructor() {}
  setState = (state) => {
    this.state = state;
    return this;
  }
  setCursorEvent = (event) => {
    this.cursorEvent = event;
    return this;
  }
  setEvent = (event) => {
    this.event = event;
    return this;
  }
  build = () => (
    {
      cursorState: this.state,
      cursorEvent: this.cursorEvent,
      event: this.event
    }
  )
}