import { normailzePath } from './utils';

interface IFetcherConfig {
  url: string;
  method?: 'get' | 'post';
  data?: any;
  headers?: any;
}

interface IBaseConfig {
  baseURL?: string;
  headers?: any;
}

interface Payload {
  ok: boolean;
  data: any;
  message: string;
  code: number;
}

const defaultConfig = {
  baseURL: '',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'same-origin'
};

// 封装一个简易的 fetcher 来做一下接口测试即可
class Fetcher {
  config: IBaseConfig;
  baseURL: string;
  intercepters: { request: Array<any>; response: Array<any> };

  constructor(config: IBaseConfig) {
    this.config = config;
    this.baseURL = config.baseURL!;
    this.intercepters = {
      request: [],
      response: []
    };
  }

  // request({ method: "get", url: "xxx" })
  request(config: IFetcherConfig) {
    const url = normailzePath(this.baseURL, config.url);

    const options: any = {
      headers: {
        ...this.config.headers,
        ...config.headers
      },
      method: config.method || 'get'
    };

    if (config.method && config.method.toUpperCase() === 'POST') {
      options.body = JSON.stringify(config.data);
    }

    return fetch(url, options);
  }
}

function createInstance(options: IBaseConfig) {
  const context = new Fetcher(options);

  const instance: any = Fetcher.prototype.request.bind(context);

  const proto: any = Fetcher.prototype;
  for (const key in proto) {
    instance[key] =
      typeof proto[key] === 'function' ? proto[key].bind(context) : proto[key];
  }

  return instance;
}

const fetcher = createInstance(defaultConfig);

fetcher.create = function createFetcher(options: IBaseConfig) {
  return createInstance(options);
};

export default fetcher;
