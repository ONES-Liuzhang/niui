export function normailzePath(baseURL: string, url: string) {
  if (isAbsoluteURL(url)) {
    return url;
  }

  return baseURL.replace(/\/+$/, '') + '/' + url.replace(/^\//, '');
}

function isAbsoluteURL(url: string) {
  return /^([a-z][a-z\d+\-\.]*:)?\/\//i.test(url);
}

export function bind(a: any, context: any) {
  if (typeof a === 'function') {
    return (...args: any[]) => a.apply(context, args);
  }
}

export function extend(a: any, b: any, context?: any) {
  for (const key in b) {
    if (typeof b[key] === 'function') {
      a[key] = bind(b[key], context);
    } else {
      a[key] = b[key];
    }
  }

  return a;
}
