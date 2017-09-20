import ActionTypes from './action-types';

export const createMouseMoveAction = (event) => {
  return {
    type: ActionTypes.MOUSE_MOVE,
    clientX: event.clientX,
    clientY: event.clientY
  };
};

export const createMouseClickAction = (event) => {
  return {
    type: ActionTypes.MOUSE_CLICK,
    clientX: event.clientX,
    clientY: event.clientY
  };
};

export const createMouseNoneAction = () =>  {
  return {
    type: ActionTypes.MOUSE_NONE
  };
};
