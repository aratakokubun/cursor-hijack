/**
 * Get if cursor is in scope or not from the mouse event.
 * @param {MouseEvent} event 
 * @return {true} if is in scope, else {false}
 */
export const isCursorInScope = (event) => {
  switch (event.type) {
    case 'click':
    case 'dblclick':
    case 'contextmenu':
    case 'mousedown':
    case 'mouseup':
    case 'mouseover':
    case 'mouseenter':
    case 'mousemove':
    case 'wheel':
      return true;
    case 'mouseout':
    case 'mouseleave':
    default:
      return false;
  }
}