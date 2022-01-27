export function normailzePath(baseURL: string, url: string) {
  if (isAbsoluteURL(url)) {
    return url;
  }

  return baseURL.replace(/\/+$/, '') + '/' + url.replace(/^\//, '');
}

function isAbsoluteURL(url: string) {
  return /^([a-z][a-z\d+-.]*:)?\/\//i.test(url);
}
