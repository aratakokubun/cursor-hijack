'use strict';

import { combineReducers } from 'redux'
import cjk_cursorEventReducer from './cursor-event-reducer';
import cjk_distorterEventReducer from './distorter-event-reducer';

// Add prefix 'cjk_' to avoid duplication.
// 'cjk' is an abbreviation of 'cursor-hijack'.
export const Reducers = combineReducers({
  cjk_cursorEventReducer,
  cjk_distorterEventReducer
});