// TODO: Unit Test

import * as _ from 'lodash';
import { ref2instance } from './ref-convert.service';

/**
 * Get if element is at the coordinates.
 * @param {HTMLElement} instance 
 * @param {x: number, y: number} absCoords : X and Y including Scroll
 * @return {true} if the coordinates in the element area, else {false}.
 */
const isElementAtCoordinate = (instance, absCoords) => {
  const elemArea = {
    top: instance.offsetTop + instance.clientTop,
    left: instance.offsetLeft + instance.clientLeft,
    width: instance.clientWidth,
    height: instance.clientHeight
  }
  return elemArea.left <= absCoords.x && absCoords.x <= elemArea.left + elemArea.width &&
         elemArea.top <= absCoords.y && absCoords.y <= elemArea.top + elemArea.height;
}

/**
 * Search elements recursively.
 * @param {Dict{HTMLElement}} refs 
 * @param {x: number, y: number} absCoords : X and Y including Scroll
 * @return {Dict{HTMLElement}}. empty if none of them matches condition.
 */
const searchElementsRecursive = (refs, absCoords) => {
  const targets = _.chain(refs)
    .map((ref) => {
      const instance = ref2instance(ref);
      if (!_.isEmpty(instance.refs)) {
        return searchElementsRecursive(instance.refs, absCoords);
      } else if (isElementAtCoordinate(instance, absCoords)) {
        return ref;
      }
    })
    .compact()
    .flattenDeep()
    .value();
  return [].concat.apply(targets);
}

/**
 * Search elements matched with specified coordinates condition.
 * {refs} are searched recursively.
 * @param {Dict{HTMLElement}} refs 
 * @param {x: number, y: number} targetClientCoordinates : Client X and Y
 * @return {Dict{HTMLElement}}. empty if none of them matches condition.
 */
export const searchRefElementsAtCoordinate = (refs, targetClientCoordinates) =>  {
  const absCoords = {
    x: targetClientCoordinates.x + window.scrollX,
    y: targetClientCoordinates.y + window.scrollY
  };
  return searchElementsRecursive(refs, absCoords);
}