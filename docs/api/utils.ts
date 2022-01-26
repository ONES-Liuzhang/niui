export function normailzePath(baseURL: string, url: string) {
  return `${baseURL}/${url}`.replace(/\/+/, '');
}
