import { deepStrictEqual } from 'assert';
import {
  nth,
  unique,
  concat,
} from '../lib/array';

/**
 * nth()
 *
 * should return the value at the given index of an array
 */
deepStrictEqual(
  nth([1, 2, 3], 1),
  2,
  "nth([1, 2, 3], 1) -> 2"
);

/**
 * nth()
 *
 * should return fallback value if provided index is out of bounds
 */
deepStrictEqual(
  nth(['a', 'b', 'c'], 3, 'd'),
  'd',
  "nth(['a', 'b', 'c'], 3, 'd') -> 'd'"
);

/**
 * unique()
 *
 * should return array with same values as given array if given array
 * contains no duplicates
 */
deepStrictEqual(
  unique([1, 2, 3]),
  [1, 2, 3],
  "unique([1, 2, 3]) -> [1, 2, 3]"
);

/**
 * unique()
 *
 * should return an array of unique values given an array that contains
 * duplicate elements
 */
deepStrictEqual(
  unique(['a', 'b', 'a', 'b']),
  ['a', 'b'],
  "unique(['a', 'b', 'a', 'b']) -> ['a', 'b']"
);

/**
 * concat()
 *
 * should return an empty array when called with no arguments
 */
deepStrictEqual(
  concat(),
  [],
  "concat() -> []"
);

/**
 * concat()
 *
 * should return an array containing the elements of all of the
 * given arrays
 */
deepStrictEqual(
  concat([1], [2], [3], [4]),
  [1, 2, 3, 4],
  "concat([1], [2], [3], [4]) -> [1, 2, 3, 4]"
);
