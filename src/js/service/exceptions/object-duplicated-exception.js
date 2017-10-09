'use strict';

export default class ObjectDuplicatedException extends Error {
  constructor(message) {
    super(message);
  }
}