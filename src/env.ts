import { PlainObject, Api, Payload } from './types';

// 渲染器的基本配置
export interface RendererEnv {
  /** 发送请求 */
  fetcher: (api?: Api, data?: any, options?: PlainObject) => Promise<Payload>;

  /** 样式 */
  theme: string;

  /** 路由跳转 */
  jumpTo: (to: string, action?: any) => void;

  [propsName: string]: any;
}

/** 默认配置 */
export const defaultConfig: RendererEnv = {
  /** 调用者必须实现该方法 */
  fetcher: () => {
    return Promise.reject('fetcher required!');
  },

  /** 默认路由跳转 */
  jumpTo: to => {
    window.location.href = to;
  },

  theme: 'default'
};
