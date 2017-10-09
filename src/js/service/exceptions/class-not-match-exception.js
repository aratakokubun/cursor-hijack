'use strict';

export default class ClassNotMatchException extends Error {
  constructor(message) {
    super(message);
  }
}