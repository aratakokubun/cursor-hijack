import test from 'ava';
import sinon from 'sinon';
import cjk from '../../../';

let ref;
let wrappedInstance;

test.beforeEach(t => {
  ref = new Object();
  wrappedInstance = new Object();
});

test('ref2instance#when wrapped then return wrapped instance', t => {
  ref.getWrappedInstance = sinon.stub().returns(wrappedInstance);
  t.is(wrappedInstance, cjk.RefConvertService.ref2instance(ref));
});

test('ref2instance#when not wrapped then return ref', t => {
  t.is(ref, cjk.RefConvertService.ref2instance(ref));
});