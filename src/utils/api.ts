import { Api } from './../types';

export function normalizeApi(api: Api) {
  if (typeof api === 'string') {
    api = {
      method: 'get',
      url: api
    };
  }

  return api;
}
