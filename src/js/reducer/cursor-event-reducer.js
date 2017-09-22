import React from 'react';
import { handleActions } from 'redux-actions';
import ActionTypes from '../action/action-types';
import { CursorEventBuilder, CursorStateBuilder } from './builder/event-builder';
import assign from 'lodash.assign';

const createInitialState = () => {
  const cursorEvent = new CursorEventBuilder()
    .setClientX(0)
    .setClientY(0)
    .setScreenX(0)
    .setScreenY(0)
    .setMoveX(0)
    .setMoveY(0)
    .build();
  return new CursorStateBuilder()
    .setState(ActionTypes.MOUSE_NONE)
    .setCursorEvent(cursorEvent)
    .setEvent(null)
    .build();
}

const mergeState = (state, action) => {
  const cursorEvent = new CursorEventBuilder()
    .setClientX(action.event.clientX)
    .setClientY(action.event.clientY)
    .setScreenX(action.event.screenX)
    .setScreenY(action.event.screenY)
    .setMoveX(action.event.movementX)
    .setMoveY(action.event.movementY)
    .build();
  return new CursorStateBuilder()
    .setState(action.type)
    .setCursorEvent(cursorEvent)
    .setEvent(Object.assign({}, action.event))
    .build();
}

const cursorEventReducer = handleActions({
  [ActionTypes.MOUSE_MOVE]: (state, action) => mergeState(state, action),
  [ActionTypes.MOUSE_CLICK]: (state, action) => mergeState(state, action),
  [ActionTypes.MOUSE_OVER]: (state, action) => mergeState(state, action),
  [ActionTypes.MOUSE_OUT]:  (state, action) => mergeState(state, action),
  [ActionTypes.MOUSE_NONE]: (state, action) => createInitialState()
}, createInitialState());

export default cursorEventReducer;