const _toString = Object.prototype.toString;

const isType =
  <T>(type: string) =>
  (obj: unknown): obj is T =>
    _toString.call(obj) === `[object ${type}]`;

export const isFunction = isType<typeof Function>('Function');

export const isPlainObject = isType<typeof Object>('Object');

export const isArray = Array.isArray;

export const isString = (str: unknown): str is string =>
  typeof str === 'string';

export const isNumber = (number: unknown): number is number =>
  typeof number === 'number';

export const isNaN = Number.isNaN;

export const isUndefined = (obj: unknown): obj is undefined =>
  typeof obj === 'undefined';

export const isNull = (obj: unknown): obj is null => obj === null;
