import test from 'ava';
import rewire from 'rewire';
import sinon from 'sinon';

const service = rewire('../../../src/js/service/event-dispatcher/search-element.service.js');
let instance;

test.beforeEach(t => {
  instance = {
    offsetLeft: 40,
    offsetTop: 30,
    clientLeft: 60,
    clientTop: 170,
    clientWidth: 10,
    clientHeight: 20
  };
});

test('isElementAtoCoordinate#when coordinates in instance then return true', t => {
  const isElementAtCoordinate = service.__get__('isElementAtCoordinate');
  const coords1 = {x: 100, y: 200};
  const coords2 = {x: 110, y: 220};
  t.is(isElementAtCoordinate(instance, coords1), true);
  t.is(isElementAtCoordinate(instance, coords2), true);
});

test('isElementAtoCoordinate#when coordinates not in instance then return false', t => {
  const isElementAtCoordinate = service.__get__('isElementAtCoordinate');
  const coords1 = {x: 99, y: 200};
  const coords2 = {x: 111, y: 200};
  const coords3 = {x: 100, y: 199};
  const coords4 = {x: 100, y: 221};
  t.is(isElementAtCoordinate(instance, coords1), false);
  t.is(isElementAtCoordinate(instance, coords2), false);
  t.is(isElementAtCoordinate(instance, coords3), false);
  t.is(isElementAtCoordinate(instance, coords4), false);
});

test('searchElementsRecursive#when recursive then get all refs in array', t => {
  const searchElementsRecursive = service.__get__('searchElementsRecursive');
  service.__set__({
    'isElementAtCoordinate': (refs, absCoords) => (true)
  });
  const instance1 = new Object();
  const instance2 = new Object();
  const instance3 = new Object();
  const refs = [
    {
      refs: [instance1, instance2]
    },
    instance3
  ];
  const absCoords = {x: 0, y:0};
  const targets = searchElementsRecursive(refs, absCoords);
  t.is(targets.length, 3);
  t.true(targets.indexOf(instance1) >= 0);
  t.true(targets.indexOf(instance2) >= 0);
  t.true(targets.indexOf(instance3) >= 0);
});