import ActionTypes from './action-types';

export const createMouseMoveAction = (event) => (
  {
    type: ActionTypes.MOUSE_MOVE,
    event: event
  }
);

export const createMouseOverAction = (event) => (
  {
    type: ActionTypes.MOUSE_OVER,
    event: event
  }
);

export const createMouseOutAction = (event) => (
  {
    type: ActionTypes.MOUSE_OUT,
    event: event
  }
);
export const createMouseClickAction = (event) => (
  {
    type: ActionTypes.MOUSE_CLICK,
    event: event
  }
);

export const createMouseNoneAction = () =>  (
  {
    type: ActionTypes.MOUSE_NONE,
    event: null
  }
);
