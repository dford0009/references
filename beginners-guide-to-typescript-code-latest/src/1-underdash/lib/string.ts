/**
 * Returns the length of the given string.
 *
 * @example
 * strLength('abcd'); // 4
 */
export function strLength(str: string): number {
  return str.length;
}

/**
 * Returns a new string that has replaced a pattern in the
 * given string with another string.
 *
 * @example
 * replaceStr('hello', 'h', 'tr'); // 'trello'
 * replaceStr('an apple', /e|a/, 'o'); // 'on opplo'
 */
export function replaceStr(
  str: string,
  pattern: string | RegExp,
  replacement: string,
): string {
  return str.replace(pattern, replacement);
}

/**
 * Returns an array of words as defined by a provided pattern.
 * If no pattern is provided, a word is an alphanumeric string of
 * characters.
 *
 * @example
 * strWords('these are words'); // ['these', 'are', 'words']
 * strWords('these are words', /these|words/); // ['these', 'words']
 */
export function strWords(
  str: string,
  pattern: RegExp = /[a-zA-Z0-9]+/
): string[] {
  const allWords = new RegExp(pattern.source, "g");
  return str.match(allWords);
}
