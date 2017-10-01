import * as _ from 'lodash';

/**
 * Execute string name function on context.
 * @param {String} funcNameSpaces: namespaces splitted by '.'
 * @param {Context} context: context to execute funtion (e.g. window, ...)
 */
export const executeFunctionByName = (funcNameSpaces, context) => {
  const args = [].slice.call(arguments).splice(2);
  const namespaces = funcNameSpaces.split('.');
  const func = namespaces.pop();
  _.forEach(namespaces, (namespace) => {
    context = context[namespace];
  });
  console.log(context[func]);
  return context[func].apply(context, args);
}