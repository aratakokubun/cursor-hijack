'use strict';

import React from 'react';
import { handleActions } from 'redux-actions';
import ActionTypes from '../action/action-types';
import assign from 'lodash.assign';

const createInitialState = () => (
  {
    clientX: 0,
    clientY: 0,
    type: 'none'
  }
)

const mergeState = (state, action) => (
  {
    clientX: action.event.clientX,
    clientY: action.event.clientY,
    type: action.event.type
  }
)

const cursorEventReducer = handleActions({
  [ActionTypes.CURSOR_EVENT]: (state, action) => mergeState(state, action),
}, createInitialState());

export default cursorEventReducer;