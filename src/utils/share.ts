import { hasOwn } from './helper';
import { PlainObject } from '../types';

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

export function forEach(
  obj: Array<any> | PlainObject,
  cb: (val: any, key: string | number, obj: Array<any> | PlainObject) => void
): void {
  if (isPlainObject(obj)) {
    for (const [key, val] of Object.entries(obj)) {
      cb.call(null, val, key, obj);
    }
  } else if (isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      cb.call(null, obj[i], i, obj);
    }
  }
}

export function find<T = any>(
  obj: Array<T> | PlainObject,
  cb: (val: T, key: string | number, obj: Array<T> | PlainObject) => boolean
): T | undefined {
  let funded: T | undefined;
  if (isPlainObject(obj)) {
    for (const [key, val] of Object.entries(obj)) {
      const res = cb.call(null, val, key, obj);
      if (res === true) {
        funded = val;
        break;
      }
    }
  } else if (isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      const res = cb.call(null, obj[i], i, obj);
      if (res === true) {
        funded = obj[i];
        break;
      }
    }
  }
  return funded;
}

export function findIndex<T = any>(
  obj: Array<T>,
  cb: (val: T, key: number, obj: Array<T>) => boolean
): number {
  let funded = -1;
  if (!isArray(obj)) {
    throw new Error(`${obj} must be an Array`);
  } else {
    for (let i = 0; i < obj.length; i++) {
      const res = cb.call(null, obj[i], i, obj);
      if (res === true) {
        funded = i;
        break;
      }
    }
  }
  return funded;
}

/**
 *
 * @param obj 对象
 * @param omitKeys 要剔除的 keys
 * @returns 新对象
 */
export function omit(obj: PlainObject, omitKeys: Array<string>) {
  const result = { ...obj };

  for (const key in result) {
    if (hasOwn(result, key) && ~omitKeys.indexOf(key)) {
      delete result[key];
    }
  }

  return result;
}
