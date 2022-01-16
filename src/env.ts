import { PlainObject, Api, Payload } from './types';

// 渲染器的基本配置
export interface RendererEnv {
  /** 发送请求 */
  fetcher: (api: Api, data?: any, options?: PlainObject) => Promise<Payload>;

  /** 样式 */
  theme: string;

  [propsName: string]: any;
}
