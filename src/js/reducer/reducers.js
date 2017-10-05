import { combineReducers } from 'redux'
import cursorEventReducer from './cursor-event-reducer';
import distorterEventReducer from './distorter-event-reducer';

export const Reducers = combineReducers({
  cursorEventReducer,
  distorterEventReducer
});