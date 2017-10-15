import test from 'ava';
import rewire from 'rewire';
import sinon from 'sinon';
import cjk from '../../';

const reducer = rewire('../../src/js/reducer/distorter-event-reducer.js');
const ORG_KEY = 'org-key';
let orgDistorter;
let state;
let action;

test.beforeEach(t => {
  orgDistorter = new cjk.Distorter(ORG_KEY, 0);
  state = new Object();
  state.distorters = [orgDistorter];
  action = new Object();
});

test('mergeAddState#when new distorter then return concatenated', t => {
  const mergeAddState = reducer.__get__('mergeAddState');
  const distorter = new cjk.Distorter('other-key', 0);
  action.distorters = [distorter];
  const mergedDistorters = mergeAddState(state, action).distorters;
  t.is(mergedDistorters.length, 2);
  t.true(mergedDistorters.indexOf(orgDistorter) >= 0);
  t.true(mergedDistorters.indexOf(distorter) >= 0);
});

test('mergeAddState#when not distorter then return original', t => {
  const mergeAddState = reducer.__get__('mergeAddState');
  const distorter = new Object();
  action.distorters = [distorter];
  const mergedDistorters = mergeAddState(state, action).distorters;
  t.is(mergedDistorters.length, 1);
  t.true(mergedDistorters.indexOf(orgDistorter) >= 0);
});

test('mergeAddState#when distorter with existing-key then return original', t => {
  const mergeAddState = reducer.__get__('mergeAddState');
  const distorter = new cjk.Distorter(ORG_KEY, 0);
  action.distorters = [distorter];
  const mergedDistorters = mergeAddState(state, action).distorters;
  t.is(mergedDistorters.length, 1);
  t.true(mergedDistorters.indexOf(orgDistorter) >= 0);
});