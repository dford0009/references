/**
 * Returns the nth value of a given array or an optional
 * fallback value if the given index is out of bounds.
 *
 * @example
 * nth([1, 2, 3], 2); // 3
 * nth([1], 1, 10); // 10
 */
export function nth<T, E = T>(
  arr: T[],
  index: number,
  fallback?: E,
): T | E {
  if (index >= arr.length) {
    return fallback;
  }
  return arr[index];
}

/**
 * Returns a new array containing the unique values of the
 * given array.
 *
 * @example
 * unique([1, 2, 2]); // [1, 2]
 * unique([1, 1, 1]); // [1]
 */
export function unique<T>(arr: T[]): T[] {
  let uniqueValues = new Set(arr);
  return Array.from(uniqueValues);
}

/**
 * Returns a new array that contains the values of all of the
 * arrays that are passed to the function.
 *
 * concat([1], [2], [3]); // [1, 2, 3]
 * concat([1, 2, 3], [4, 5]); // [1, 2, 3, 4, 5]
 */
export function concat<T>(...arrs: Array<T[]>): T[] {
  let finalArr = [];

  for (let i = 0; i < arrs.length; i++) {
    finalArr.concat(arrs[i]);
  }

  return finalArr;
}
