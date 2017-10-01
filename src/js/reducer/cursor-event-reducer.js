import React from 'react';
import { handleActions } from 'redux-actions';
import ActionTypes from '../action/action-types';
import assign from 'lodash.assign';

const createInitialState = () => (
  {
    event: {
      clientX: 0,
      clientY: 0,
      type: 'none'
    }
  }
)

const mergeState = (state, action) => (
  {
    event: action.event
  }
)

const cursorEventReducer = handleActions({
  [ActionTypes.CURSOR_EVENT]: (state, action) => mergeState(state, action),
}, createInitialState());

export default cursorEventReducer;