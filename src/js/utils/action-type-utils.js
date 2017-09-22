import ActionTypes from '../action/action-types';

export const isCursorInScope = (actionType) => {
  switch (actionType) {
    case ActionTypes.MOUSE_CLICK:
    case ActionTypes.MOUSE_MOVE:
    case ActionTypes.MOUSE_OVER:
      return true;
    default:
      return false;
  }
}