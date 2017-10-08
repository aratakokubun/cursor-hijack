import * as _ from 'lodash';

/**
 * Distort cursor position.
 * @param {Array{Distorter}} distorters: Distorters to apply
 * @param {CursorPointer} defaultPointer: default position of cursor
 * @return {CursorPointer}: position of cursor distorted on this distorter
 */
export const distort = (distorters, defaultPointer) => {
  let distortedPointer = defaultPointer;
  _.forEach(distorters, (distorter) => {
    if (distorter.isInRange(defaultPointer, distortedPointer)) {
      distortedPointer = distorter.distort(defaultPointer, distortedPointer);
    }
  })
  return distortedPointer;
}