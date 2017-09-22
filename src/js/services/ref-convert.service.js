export const ref2instance = (ref) => {
  if (ref instanceof Connect) {
    return connect.getWrappedInstance();
  } else {
    return ref;
  }
}