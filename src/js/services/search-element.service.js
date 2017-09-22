// TODO: Unit Test

import * as _ from 'lodash';

/**
 * Get if element is at the coordinates.
 * @param {HTMLInputElement} ref 
 * @param {x: number, y: number} absCoords : X and Y including Scroll
 * @return {true} if the coordinates in the element area, else {false}.
 */
const isElementAtCoordinate = (ref, absCoords) => {
  const elemArea = {
    top: ref.offsetTop + ref.clientTop,
    left: ref.offsetLeft + ref.clientLeft,
    width: ref.clientWidth,
    height: ref.clientHeight
  }
  return elemArea.left <= absCoords.x && absCoords.x <= elemArea.left + elemArea.width &&
         elemArea.top <= absCoords.y && absCoords.y <= elemArea.top + elemArea.height;
}

/**
 * Search an element matched with specified coordinates condition.
 * @param {Array{HTMLInputElement}} refs 
 * @param {x: number, y: number} targetClientCoordinates : Client X and Y
 * @return {Array{HTMLInputElement}}. empty array if none of them matches condition.
 */
export const searchRefElementAtCoordinate = (refs, targetClientCoordinates) =>  {
  const absCoords = {
    x: targetClientCoordinates.x + window.scrollX,
    y: targetClientCoordinates.y + window.scrollY
  };
  return _.filter(refs, (ref) => (
    isElementAtCoordinate(ref, absCoords)
  ));
}