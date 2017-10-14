'use strct';

import * as _ from 'lodash';

/**
 * Distort cursor position.
 * @param {Array{Distorter}} distorters: Distorters to apply
 * @param {CursorPointer} defaultPointer: default position of cursor
 * @param {CursorPointer} prevDistortedPointer: distorted position of cursor on previous event
 * @return {CursorPointer}: position of cursor distorted on this distorter
 */
export const distort = (distorters, defaultPointer, prevDistortedPointer) => {
  let distortedPointer = defaultPointer;
  if (!_.isUndefined(prevDistortedPointer)) {
    distortedPointer.prevX = prevDistortedPointer.currentX;
    distortedPointer.prevY = prevDistortedPointer.currentY;
  }
  _.forEach(distorters, (distorter) => {
    if (distorter.isInRange(defaultPointer, distortedPointer)) {
      distortedPointer = distorter.distort(defaultPointer, distortedPointer);
    }
  })
  return distortedPointer;
}