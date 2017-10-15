'use strict';

export const ref2instance = (ref) => {
  if (ref.getWrappedInstance != undefined && typeof ref.getWrappedInstance === 'function') {
    return ref.getWrappedInstance();
  } else {
    return ref;
  }
}