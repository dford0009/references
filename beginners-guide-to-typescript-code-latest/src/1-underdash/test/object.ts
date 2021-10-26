import { deepStrictEqual } from 'assert';
import {
  hasPath,
  mergeShallow,
  values,
} from '../lib/object';

/**
 * hasPath()
 *
 * should return false if given path does not exist in the
 * given object
 */
deepStrictEqual(
  hasPath({ a: {} }, "a.b"),
  false,
  "hasPath({ a: {} }, 'a.b') -> false"
);

/**
 * hasPath()
 *
 * should return true if given path exists in the given
 * object
 */
deepStrictEqual(
  hasPath({ a: { b: { c: 10 } } }, "a.b.c"),
  true,
  "hasPath({ a: { b: { c: 10 } } }, 'a.b.c') -> true"
);

/**
 * mergeShallow()
 *
 * given two objects, it should return a new object that
 * contains all properties of the two objects
 */
deepStrictEqual(
  mergeShallow({ a: 1 }, { b: 2, c: 3 }),
  { a: 1, b: 2, c: 3 },
  "mergeShallow({ a: 1 }, { b: 2, c: 3 }) -> { a: 1, b: 2, c: 3 }"
);

/**
 * values()
 *
 * should return an empty array when given an object with no
 * properties
 */
deepStrictEqual(
  values({}),
  [],
  "values({}) -> []"
);

/**
 * values()
 *
 * should return an array containing the property values of a given
 * object
 */
deepStrictEqual(
  values({ a: 1, b: 2, c: 'hello' }),
  [1, 2, 'hello'],
  "values({ a: 1, b: 2, c: 'hello' }) -> [1, 2, 'hello']",
);
