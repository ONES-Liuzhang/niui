import { extend, normailzePath } from './utils';
import { IIntercepter, Intercepter, Handler } from './intercepter';

interface IFetcherConfig {
  url: string;
  method?: 'get' | 'post';
  data?: any;
  headers?: any;
  timeout?: number;
}

interface IBaseConfig {
  baseURL?: string;
  headers?: any;
}

// interface Payload {
//   code: number;
//   ok: boolean;
//   data: any;
//   message?: string;
// }

const defaultConfig = {
  baseURL: '',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'same-origin',
  timeout: 3000
};

// 封装一个简易的 fetcher 来做一下接口测试即可
class Fetcher {
  config: IBaseConfig;
  baseURL: string;
  intercepter: { request: IIntercepter; response: IIntercepter };
  chain: Array<any>;

  constructor(config: IBaseConfig) {
    this.config = config;
    this.baseURL = config.baseURL!;
    this.chain = [];
    this.intercepter = {
      request: new Intercepter(),
      response: new Intercepter()
    };

    this.dispatchRequest = this.dispatchRequest.bind(this);
  }

  // request({ method: "get", url: "xxx" })
  request(config: IFetcherConfig) {
    this.chain = [this.dispatchRequest, undefined];

    let promise = Promise.resolve(config);

    this.intercepter.request.list.forEach((handler: Handler) => {
      this.chain.unshift(handler.fulfilled, handler.reason);
    });

    this.intercepter.response.list.forEach((handler: Handler) => {
      this.chain.push(handler.fulfilled, handler.reason);
    });

    while (this.chain.length) {
      promise = promise.then(this.chain.shift(), this.chain.shift());
    }

    return promise;
  }

  dispatchRequest(config: IFetcherConfig) {
    return new Promise((resolve, reject) => {
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

      // TODO: 中止请求，通过 AbortController/AbortSignal
      fetch(url, options).then(response => {
        // 请求成功
        resolve(response);
      });

      if (config.timeout && config.timeout > 0) {
        setTimeout(() => {
          reject({
            ok: false,
            message: 'Network Error！timeout ' + config.timeout,
            data: null
          });
        }, config.timeout);
      }
    });
  }
}

// 借鉴一下 axios 的设计思路，文化人的事能说抄吗？
function createInstance(options: IBaseConfig) {
  const context = new Fetcher(options);

  const instance: any = Fetcher.prototype.request.bind(context);

  extend(instance, Fetcher.prototype, context);
  extend(instance, context);

  return instance;
}

const fetcher = createInstance(defaultConfig);

fetcher.create = function createFetcher(options: IBaseConfig) {
  return createInstance(options);
};

export default fetcher;
