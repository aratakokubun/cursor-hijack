import test from 'ava';
import * as _ from 'lodash';
import cjk from '../../../';

let defaultPointer;
let prevPointer;

class ReverseDistorter extends cjk.Distorter {
  isInRange = (defaultPointer, distortedPointer, prevDistortedPointer) => (true)
  distort = (defaultPointer, distortedPointer, prevDistortedPointer) => (
    new cjk.CursorPointer(2, 4, 8, 16)
  )
}

test.beforeEach(t => {
  defaultPointer = new cjk.CursorPointer(1, 2, 3, 4);
  prevPointer = new cjk.CursorPointer(10, 100, 1000, 10000);
});

test('distort#when distorters empty and prev undefined then return default', t => {
  const distortedPointer = cjk.CursorDistorterService.distort([], defaultPointer);
  t.is(distortedPointer.currentX,  3)
  t.is(distortedPointer.currentY,  4);
  t.is(distortedPointer.prevX,  1);
  t.is(distortedPointer.prevY,  2);
  t.is(distortedPointer.getMoveX(),  3 - 1);
  t.is(distortedPointer.getMoveY(),  4 - 2);
});

test('distort#when distorters empty and prev defined then return merge default and prev', t => {
  const distortedPointer = cjk.CursorDistorterService.distort([], defaultPointer, prevPointer);
  t.is(distortedPointer.currentX,  3);
  t.is(distortedPointer.currentY,  4);
  t.is(distortedPointer.prevX,  1000);
  t.is(distortedPointer.prevY,  10000);
  t.is(defaultPointer.prevX,  1);
  t.is(defaultPointer.prevY,  2);
  t.is(distortedPointer.getMoveX(),  3 - 1000);
  t.is(distortedPointer.getMoveY(),  4 - 10000);
});

test('distort#with distorter then return distorted pointer', t => {
  const distorters = [new ReverseDistorter()];
  const distortedPointer = cjk.CursorDistorterService.distort(distorters, defaultPointer);
  t.is(distortedPointer.currentX,  8);
  t.is(distortedPointer.currentY,  16);
  t.is(distortedPointer.prevX,  2);
  t.is(distortedPointer.prevY,  4);
  t.is(defaultPointer.prevX,  1);
  t.is(defaultPointer.prevY,  2);
  t.is(distortedPointer.getMoveX(),  8 - 2);
  t.is(distortedPointer.getMoveY(),  16 - 4);
});