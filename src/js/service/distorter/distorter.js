'use strict';

import CursorPointer from './cursor-pointer';
import NotImplementedException from '../exceptions/not-implemented-exception';

const format = require('string-format');

export default class Distorter {

  /**
   * @param {string} key: unique key to identify object
   * @param {number} priority: Priority to apply. LARGER is applied earlier than SMALLER.
   */
  constructor(key, priority) {
    this.key = key;
    this.priority = priority;
  }
  
  getKey = () => (this.key)

  getPriority = () => (this.priority)
  
  /**
   * Get is in the ditorted range.
   * @param {CursorPointer} defaultPointer: default position of cursor
   * @param {CursorPointer} distortedPointer: poisition of cursor distorted on current event
   * @return {boolean}: true is in range, else false
   */
  isInRange = (defaultPointer, distortedPointer) => {
    throw NotImplementedException(format("isInRange is not implemented."));
  }
  
  /**
   * Distort cursor position.
   * @param {CursorPointer} defaultPointer: default position of cursor
   * @param {CursorPointer} distortedPointer: poisition of cursor distorted on current event
   * @return {CursorPointer}: position of cursor distorted on this distortor
   */
  distort = (defaultPointer, distortedPointer) => {
    // Return original position in this orginal class.
    // Distort position in extended class!
    return distortedPointer;
  }

  equals = (object) => (
    object instanceof Distorter && this.getKey() === object.getKey()
  )
}