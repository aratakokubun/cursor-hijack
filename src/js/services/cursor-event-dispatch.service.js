import * as _ from 'lodash';
import { simulateMouseEvent } from './event-simulator.service';
import { searchRefElementsAtCoordinate } from './search-element.service';

/**
 * Dispatch event to ref elements.
 * @param {string} event: mouse event
 * @param {HTMLElement} instance: React instance
 * @param {*} externalOpts: replace options of event
 */
const dispatchEvent = (event, instance, externalOpts) => {
  // TODO: Check if these functions works for any html elements.
  switch (event.type) {
    case 'click':
      instance.focus();
      instance.click();
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
      simulateMouseEvent(instance, event);
      break;
    default:
      break;
  }
}

/**
 * Dispatch event at the specified coordinates.
 * @param {MouseEvent} event: Mouse event occurred 
 * @param {x:number, y:number} targetScreenCoordinates: Target coordinates to dispatch event
 * @param {Dict{HTMLElement}} refs: React refs
 * @param {*} externalOpts: replace options of event
 */
export const dispatchPseuduoEvent = (event, targetScreenCoordinates, refs, externalOpts) => {
  console.log(searchRefElementsAtCoordinate(refs, targetScreenCoordinates));
  _.forEach(searchRefElementsAtCoordinate(refs, targetScreenCoordinates), (instance) => {
    dispatchEvent(event, instance);
  });
}