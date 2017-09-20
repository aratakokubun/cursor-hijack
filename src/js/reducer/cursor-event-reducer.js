import { React, PropTypes } from 'react';
import handleActions from 'redux-actions';
import assign from 'lodash.assign';
import ActionTypes from '../action/action-types';

const initialState = {
  clientX: 0,
  clientY: 0,
  preClientX: 0,
  preClientY: 0,
  cursorState: ActionTypes.MOUSE_NONE
}

const cursorEventReducer = handleActions({
  [ActionTypes.MOUSE_MOVE]: (state, action) => {
    return {
      clientX: action.clientX,
      clientY: action.clientY,
      preClientX: state.clientX,
      preClientY: state.clientY,
      cursorState: action.type
    };
  },
  [ActionTypes.MOUSE_CLICK]: (state, action) => {
    return {
      clientX: action.clientX,
      clientY: action.clientY,
      preClientX: state.clientX,
      preClientY: state.clientY,
      cursorState: action.type
    };
  },
  [ActionTypes.MOUSE_MOVE]: (state, action) => {
    return initialState;
  }
}, initialState);

export default CursorEventReducer;