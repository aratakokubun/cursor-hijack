import assign from 'lodash.assign';

/**
 * Create pseudo event cloned from basic event.
 * @param {HTMLElement} target : target element
 * @param {MouseEvent} event : event to clone
 * @param {*} externalOpts: replace options of event
 */
export const createPseudoEvent = (target, event, externalOpts) => {
  const pseudoEvent = target.ownerDocument.createEvent('MouseEvents');
  let opts = {
    type: event.type,
    canBubble: event.canBubble,
    cancelable: event.cancelable,
    view: target.ownerDocument.defaultView,
    detail: event.detail,
    screenX: event.screenX,
    screenY: event.screenY,
    clientX: event.clientX,
    clientY: event.clientY,
    ctrlKey: event.ctrlKey,
    altKey: event.altKey,
    shiftKey: event.shiftKey,
    metaKey: event.metaKey,
    button: event.button,
    relatedTarget: event.relatedTarget,
  }
  Object.assign(opts, externalOpts);

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
  pseudoEvent['useDefault'] = true;

  return pseudoEvent;
}

/**
 * Simulate event to target cloned from basic event.
 * @param {HTMLElement} target : target element
 * @param {MouseEvent} event : event to clone
 * @param {*} externalOpts: replace options of event
 */
export const simulateMouseEvent = (target, event, externalOpts) => {
  const pseudoEvent = createPseudoEvent(target, event, externalOpts);
  target.dispatchEvent(pseudoEvent);
}