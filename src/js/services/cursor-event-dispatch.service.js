import ReactTestUtils from 'react-dom/test-utils';
import * as _ from 'lodash';
import { createPseudoEvent, simulateMouseEvent } from './event-simulator.service';
import { searchRefElementsAtCoordinate } from './search-element.service';
import NotInterestedEventException from './exceptions/not-interested-event-exception';

const format = require('string-format')
const _try = require('try-catch-finally');

/**
 * Get ready to dispatch event.
 * @param {HTMLElement} instance: React instance
 * @param {MouseEvent} event: mouse event
 * @throws {NotInterestedEventException}: on event type is not included targe events.
 */
const readyDispatch = (instance, event) => {
  switch (event.type) {
    case 'click':
    case 'contextmenu':
    case 'mousedown':
    case 'mouseup':
    case 'mouseover':
    case 'mouseenter':
    case 'mousemove':
    case 'wheel':
      if (!instance.hasFocus) {
        instance.focus();
      }
      return;
    case 'mouseout':
    case 'mouseleave':
      if (instance.hasFocus) {
        instance.blur();
      }
      return;
    case 'dblclick':
      if (!instance.hasFocus) {
        instance.focus();
      }
      if (typeof instance.select === 'function') {
        instance.select();
      }
      return;
    default:
      throw new NotInterestedEventException(format("event type {0} is not target.", event.type), event.type);
  }
}

/**
 * Simulate event according to event type
 * @param {HTMLElement} instance 
 * @param {MouseEvent} pseudoEvent: event to simulate
 * @throws {NotInterestedEventException}: on event type is not included targe events.
 */
const simulateEventSpecificFunc = (instance, pseudoEvent) => {
  switch (pseudoEvent.type) {
    case 'click':
      ReactTestUtils.Simulate.click(instance, pseudoEvent);
      return;
    case 'contextmenu':
      ReactTestUtils.Simulate.contextMenu(instance, pseudoEvent);
      return;
    case 'dblclick':
      ReactTestUtils.Simulate.doubleClick(instance, pseudoEvent);
      return;
    case 'mousedown':
      ReactTestUtils.Simulate.mouseDown(instance, pseudoEvent);
      return;
    case 'mouseenter':
      ReactTestUtils.Simulate.mouseEnter(instance, pseudoEvent);
      return;
    case 'mouseleave':
      ReactTestUtils.Simulate.mouseLeave(instance, pseudoEvent);
      return;
    case 'mousemove':
      ReactTestUtils.Simulate.mouseMove(instance, pseudoEvent);
      return;
    case 'mouseout':
      ReactTestUtils.Simulate.mouseOut(instance, pseudoEvent);
      return;
    case 'mouseover':
      ReactTestUtils.Simulate.mouseOver(instance, pseudoEvent);
      return;
    case 'mouseup':
      ReactTestUtils.Simulate.mouseUp(instance, pseudoEvent);
      return;
    case 'wheel':
      ReactTestUtils.Simulate.wheel(instance, pseudoEvent);
      return;
    default:
      throw new NotInterestedEventException(format("event type {} is not target.", event.type), event.type);
  }
}

/**
 * Dispatch event to ref elements.
 * @param {HTMLElement} instance: React instance
 * @param {MouseEvent} event: mouse event
 * @param {*} externalOpts: replace options of event
 */
export const dispatchEvent = (instance, event, externalOpts) => {
  _try(() => {
    readyDispatch(instance, event);
    const pseudoEvent = createPseudoEvent(instance, event, externalOpts);
    simulateEventSpecificFunc(instance, pseudoEvent);
  })
  .catch(NotInterestedEventException, (e) => {
    // Just Ignore not interested event
    return;
  })
  .catch(Error, (e) => {
    throw e;
  });
}

/**
 * Dispatch native event to ref elements.
 * CAUTION: DO NOT USE REACT BECAUSE THIS MAY CREATE INIFITE CALLSTACK.
 * @param {HTMLElement} instance: React instance
 * @param {string} event: mouse event
 * @param {*} externalOpts: replace options of event
 */
export const dispatchNativeEvent = (instance, event, externalOpts) => {
  _try(() => {
    readyDispatch(instance, event);
    simulateMouseEvent(instance, event, externalOpts);
  })
  .catch(NotInterestedEventException, (e) => {
    // Just Ignore not interested event
    return;
  })
  .catch(Error, (e) => {
    throw e;
  });
}

/**
 * Inactivate focused element.
 */
const inactivate = () => {
  // TODO: body tag would be got deafult for activeElement. ignore it.
  const focused = document.activeElement;
  if (focused != undefined) {
    focused.blur();
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
  const targets = searchRefElementsAtCoordinate(refs, targetScreenCoordinates);
  if (_.isEmpty(targets)) {
    inactivate();
  } else {
    _.forEach(targets, (instance) => {
      dispatchEvent(instance, event, externalOpts);
    });
  }
}