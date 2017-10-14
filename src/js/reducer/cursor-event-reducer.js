'use strict';

import React from 'react';
import { handleActions } from 'redux-actions';
import ActionTypes from '../action/action-types';
import assign from 'lodash.assign';
import CursorPointer from '../utils/cursor-pointer';

const createInitialState = () => (
  {
    pointer: new CursorPointer(0, 0, 0, 0),
    type: 'none'
  }
)

const mergeState = (state, action) => (
  {
    pointer: action.event.pointer,
    type: action.event.type
  }
)

const cursorEventReducer = handleActions({
  [ActionTypes.CURSOR_EVENT]: (state, action) => mergeState(state, action),
}, createInitialState());

export default cursorEventReducer;