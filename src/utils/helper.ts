import { PlainObject } from './../types';
import { isPlainObject, isArray } from './share';

export function hasOwn(obj: PlainObject, key: string) {
  return Object.hasOwnProperty.call(obj, key);
}

// canAccessSuper 是否读取原型链
export function getVariable(
  data: { [propsName: string]: any },
  key: string,
  canAccessSuper = true
) {
  if (!data || !key) {
    return undefined;
  } else if (canAccessSuper ? key in data : hasOwn(data, key)) {
    return data[key];
  }

  return keyToPath(key).reduce(
    (obj, key) =>
      obj && typeof obj === 'object' && key in obj ? obj[key] : undefined,
    data
  );
}

export function setVariable(
  data: { [propsName: string]: any },
  key: string,
  val: any
) {
  data = data || {};

  if (key in data) {
    data[key] = val;
    return;
  }

  const parts = keyToPath(key);
  const last = parts.pop() as string;

  while (parts.length) {
    const k = parts.shift() as string;
    if (isPlainObject(data[k])) {
      data = data[k] = {
        ...data[k]
      };
    } else if (isArray(data[k])) {
      data[k] = data[k].concat();
      data = data[k];
    } else {
      // 强转成对象
      data = data[k] = {};
    }
  }

  data[last] = val;
}

/**
 * 将例如像 a.b.c 或 a[1].b 的字符串转换为路径数组
 *
 * @param key 要转换的字符串
 *
 */
export function keyToPath(string: string): string[] {
  const result = [];

  if (string.charCodeAt(0) === '.'.charCodeAt(0)) {
    result.push('');
  }

  string.replace(
    new RegExp(
      '[^.[\\]]+|\\[(?:([^"\'][^[]*)|(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2)\\]|(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))',
      'g'
    ),
    (match, expression, quote, subString) => {
      let key = match;
      if (quote) {
        key = subString.replace(/\\(\\)?/g, '$1');
      } else if (expression) {
        key = expression.trim();
      }
      result.push(key);
      return '';
    }
  );

  return result;
}
