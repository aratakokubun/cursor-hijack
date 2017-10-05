// Instead of struct
export default class CursorPointer {
  constructor(prevX, prevY, currentX, currentY) {
    this.prevX = prevX;
    this.prevY = prevY;
    this.currentX = currentX;
    this.currentY = currentY;
  }
}