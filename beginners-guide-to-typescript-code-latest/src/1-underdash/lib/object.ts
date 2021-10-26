/**
 * Checks if given path exists in given object. The path
 * is separated by a "." character for each nested level.
 *
 * @example
 * hasPath({ a: { b: { c: 10 } } }, 'a.b.c'); // true
 * hasPath({ c: 2 }, 'c'); // true
 * hasPath({ a: 4 }, 'a.b'); // false
 */
export function hasPath(obj: object, path: string): boolean {
  const keys = path.split('.');
  let currObj = obj;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (currObj.hasOwnProperty(key)) {
      currObj = currObj[key];
    } else {
      return false;
    }
  }

  return true;
}

/**
 * Constructs a new object from two objects, shallowly merging
 * the properties of both objects.
 *
 * @example
 * mergeShallow({ a: 1 }, { b: 2 }); // { a: 1, b: 2}
 * mergeShallow({ a, 10 }, { a: 20 }); // { a: 20 }
 */
export function mergeShallow<T extends object, E extends object>(
  obj1: T,
  obj2: E
): T & E {
  return Object.assign(obj1, obj2);
}

/**
 * Returns an array of the property values of the given object.
 *
 * @example
 * values({ a: 1, b: 1 }); // [1, 1]
 * values({ a: [], b: 'apple' }); // [[], 'apple']
 */
export function values<T>(obj: T): Array<T[keyof T]> {
  const mapper = (key) => obj[key];
  const keys = Object.keys(obj);
  return keys.map(mapper);
}
