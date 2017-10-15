import test from 'ava';
import cjk from '../../';

let pointer;

test.beforeEach(t => {
  pointer = new cjk.CursorPointer(1, 2, 3, 4);
});

test('getMove#return (current - prev)', t => {
  t.is(pointer.getMoveX(), 3 - 1);
  t.is(pointer.getMoveY(), 4 - 2);
});

test('getMove#after set prev then return (current - new prev)', t => {
  pointer.prevX = 10;
  pointer.prevY = 100;
  t.is(pointer.getMoveX(), 3 - 10);
  t.is(pointer.getMoveY(), 4 - 100);
});

test('clone#clone creat exactly same content but different object', t => {
  const cloned = pointer.clone();
  t.is(cloned.currentX, pointer.currentX);
  t.is(cloned.currentY, pointer.currentY);
  t.is(cloned.prevX, pointer.prevX);
  t.is(cloned.prevY, pointer.prevY);
  t.is(cloned.getMoveX(), pointer.getMoveX());
  t.is(cloned.getMoveY(), pointer.getMoveY());
  t.false(cloned === pointer);
});