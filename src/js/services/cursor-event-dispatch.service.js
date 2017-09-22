import * as _ from 'lodash';
import { simulateEvent } from './utils/cursor-simulator/cursor-simulator';
import { searchRefElementAtCoordinate } from './services/search-element.service';

/**
 * Dispatch event to ref elements.
 * @param {string} event: mouse event
 * @param {HTMLInputElement} ref: React ref
 */
const dispatchEvent = (event, ref) => {
  // TODO: Dispatch event to all mouse event.
  switch (event.type) {
    case 'click':
      ref.focus();
      ref.click();
      break;
    case 'dblclick':
    case 'contextmenu':
    case 'mousedown':
    case 'mouseup':
    case 'mouseover':
    case 'mouseenter':
    case 'mouseout':
    case 'mouseleave':
    case 'mousemove':
    case 'wheel':
      simulateEvent(ref, event);
      break;
    default:
      break;
  }
}

/**
 * Dispatch event at the specified coordinates.
 * @param {MouseEvent} event: Mouse event occurred 
 * @param {x:number, y:number} targetScreenCoordinates: Target coordinates to dispatch event
 * @param {Array{HTMLInputElement}} refs: React refs
 */
export const dispatchPseduoEvent = (event, targetScreenCoordinates, refs) => {
  _.forEach(searchRefElementAtCoordinate, (ref) => {
    dispatchEvent(event, ref);
  });
}