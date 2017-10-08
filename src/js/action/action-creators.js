import ActionTypes from './action-types';

export const createCursorEvent = (coordinates, type) => (
  {
    type: ActionTypes.CURSOR_EVENT,
    event: {
      clientX: coordinates.x,
      clientY: coordinates.y,
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
