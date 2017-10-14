'use strict';

import Action from './src/js/action';
import Component from './src/js/component';
import Reducers from './src/js/reducer';
import Service from './src/js/service';
import Utils from './src/js/utils';

const CursorHijack = {
  // Action
  ActionCreators: Action.ActionCreators,
  ActionTypes: Action.ActionTypes,
  // Component
  CursorHijackOverlay: Component.CursorHijackOverlay,
  PseudoCursor: Component.PseudoCursor,
  // Reducer
  Reducers: Reducers,
  // Service  
  CursorDistorterService: Service.DistorterService.CursorDistorterService,
  Distorter: Service.DistorterService.Distorter,
  CursorEventDispatchService: Service.EventDispatcher.CursorEventDispatchService,
  EventSimulatorService: Service.EventDispatcher.EventSimulatorService,
  RefConvertService: Service.EventDispatcher.RefConvertService,
  SearchElementService: Service.EventDispatcher.SearchElementService,
  // Service.Exceptions
  ClassNotMatchException: Service.Exceptions.ClassNotMatchException,
  NotImplementedException: Service.Exceptions.NotImplementedException,
  NotInterestedException: Service.Exceptions.NotInterestedException,
  ObjectDuplicatedException: Service.Exceptions.ObjectDuplicatedException,
  // Utils
  CursorEventUtils: Utils.CursorEventUtils,
  CursorPointer: Utils.CursorPointer,
  FuncExecutor: Utils.FuncExecutor,
}
export default CursorHijack;