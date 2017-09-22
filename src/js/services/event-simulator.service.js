import assign from 'lodash.assign';

/**
 * Simulate event to target cloned from basic event.
 * @param {HTMLElement} target : target element
 * @param {MouseEvent} event : event to clone
 * @param {*} externalOpts: replace options of event
 */
export const simulateMouseEvent = (target, event, externalOpts) => {
  const pseudoEvent = target.ownerDocument.createEvent('MouseEvents');

  let opts = {
    type: event.type,
    canBubble: event.canBubble,
    cancelable: event.cancelable,
    view: target.ownerDocument.defaultView,
    detail: event.detail,
    screenX: event.screenX, //The coordinates within the entire page
    screenY: event.screenY,
    clientX: event.clientX, //The coordinates within the viewport
    clientY: event.clientY,
    ctrlKey: event.ctrlKey,
    altKey: event.altKey,
    shiftKey: event.shiftKey,
    metaKey: event.metaKey, //I *think* 'meta' is 'Cmd/Apple' on Mac, and 'Windows key' on Win. Not sure, though!
    button: event.button, //0 = left, 1 = middle, 2 = right
    relatedTarget: event.relatedTarget,
  }
  assign(opts, externalOpts);

  pseudoEvent.initMouseEvent(
      opts.type,
      opts.canBubble,
      opts.cancelable,
      opts.view,
      opts.detail,
      opts.screenX,
      opts.screenY,
      opts.clientX,
      opts.clientY,
      opts.ctrlKey,
      opts.altKey,
      opts.shiftKey,
      opts.metaKey,
      opts.button,
      opts.relatedTarget
  );

  target.dispatchEvent(pseudoEvent);
}