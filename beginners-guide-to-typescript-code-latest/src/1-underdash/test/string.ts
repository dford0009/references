import { deepStrictEqual } from 'assert';
import {
  strLength,
  replaceStr,
  strWords,
} from '../lib/string';

/**
 * strLength()
 *
 * should return 0 when given an empty string
 */
deepStrictEqual(
  strLength(''),
  0,
  "strLength('') -> 0"
);

/**
 * strLength()
 *
 * should return the length of a non-empty string
 */
deepStrictEqual(
  strLength('abc'),
  3,
  "strLength('abc') -> 3"
);

/**
 * replaceStr()
 *
 * should replace the given string pattern with a new string
 */
deepStrictEqual(
  replaceStr('water bottle', 'bottle', 'balloon'),
  'water balloon',
  "replaceStr('water bottle', 'bottle', 'balloon') -> 'water balloon'"
);

/**
 * replaceStr()
 *
 * should replace the given regex pattern with a new string
 */
deepStrictEqual(
  replaceStr('board game', /board/, 'video'),
  'video game',
  "replaceStr('board game', /board/, 'video') -> 'video game'"
);

/**
 * strWords()
 *
 * should return an array of alphanumeric words when not provided
 * a custom regex definition of a word
 */
deepStrictEqual(
  strWords('cat in the hat!'),
  ['cat', 'in', 'the', 'hat'],
  "strWords('cat in the hat!') -> ['cat', 'in', 'the', 'hat']"
);

/**
 * strWords()
 *
 * should return an array of words as defined by the provided
 * regex definition of a word
 */
deepStrictEqual(
  strWords('hello to the world!', /hello|world/),
  ['hello', 'world'],
  "strWords('hello to the world!', /hello|world/) -> ['hello', 'world']"
);
