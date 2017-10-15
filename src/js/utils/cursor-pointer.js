'use strict';

export default class CursorPointer {
  constructor(prevX, prevY, currentX, currentY) {
    this.prevX = prevX;
    this.prevY = prevY;
    this.currentX = currentX;
    this.currentY = currentY;
  }

  getMoveX = () => (this.currentX - this.prevX)
  getMoveY = () => (this.currentY - this.prevY)
  clone = () => (
    new CursorPointer(this.prevX, this.prevY, this.currentX, this.currentY)
  )
}