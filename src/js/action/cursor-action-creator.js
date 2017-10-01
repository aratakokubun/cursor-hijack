import ActionTypes from './action-types';

export const createCursorEvent = (event) => (
  {
    type: ActionTypes.CURSOR_EVENT,
    event: event
  }
);
