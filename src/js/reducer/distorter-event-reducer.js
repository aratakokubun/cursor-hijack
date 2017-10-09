'use strict';

import React from 'react';
import { handleActions } from 'redux-actions';
import ActionTypes from '../action/action-types';
import * as _ from 'lodash';
import Distorter from '../service/distorter/distorter';

const format = require('string-format');
const sortOn = require('sort-on');

const createInitialState = () => (
  {
    distorters: []
  }
)

const mergeAddState = (state, action) => {
  const addDistorters = _.filter(action.distorters, (addDistorter) => {
    if (!(addDistorter instanceof Distorter)) {
      console.warn(
        format("Type of arg should be {0}, but actually {1}", typeof Distorter, typeof addDistorter)
      );
      return false;
    } else if (_.some(state.distorters, (alreadySet) => alreadySet.equals(addDistorter))) {
      console.warn(
        format("Distorter with key {0} is already set.", addDistorter.getKey())
      );
      return false;
    } else {
      return true;
    }
  });
  return {
    distorters: _.concat(state.distorters, addDistorters)
  }
}

const mergeDeleteState = (state, action) => (
  {
    distorters: _.remove(_.assign({}, state.distorters), (distorter) => (
      _.some(action.distorters, (other) => {
          return distorter.eqauls(other);
      })
    ))
  }
)

const distorterEventReducer = handleActions({
  [ActionTypes.ADD_DISTORTER_EVENT]: (state, action) => mergeAddState(state, action),
  [ActionTypes.DELETE_DISTORTER_EVENT]: (state, action) => mergeDeleteState(state, action),
}, createInitialState());

export default distorterEventReducer;