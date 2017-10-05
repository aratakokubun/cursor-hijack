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

export const createDistorerEvent = (distorters) => (
  {
    type: ActionTypes.ADD_DISTORTER_EVENT,
    distorter: distorters
  }
)
export const createDeleteDistorterEvent = (removeDistorters) => (
  {
    type: ActionTypes.DELETE_DISTORTER_EVENT,
    distorters: distorters
  }
)
