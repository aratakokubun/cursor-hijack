'use strict';

export const ref2instance = (ref) => {
  if (ref.getWrappedInstance != undefined) {
    return ref.getWrappedInstance();
  } else {
    return ref;
  }
}