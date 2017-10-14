'use strict';

import ActionTypes from './action-types';

/**
 * Create mouse event.
 * @param {CurosrPointer} pointer: CursorPointer for current mouse event
 * @param {string} type: Mouse event type
 */
export const createCursorEvent = (pointer, type) => (
  {
    type: ActionTypes.CURSOR_EVENT,
    event: {
      pointer: pointer,
      type: type
    }
  }
);

export const createAddDistorterEvent = (distorters) => (
  {
    type: ActionTypes.ADD_DISTORTER_EVENT,
    distorters: distorters
  }
)
export const createDeleteDistorterEvent = (removeDistorters) => (
  {
    type: ActionTypes.DELETE_DISTORTER_EVENT,
    distorters: distorters
  }
)
