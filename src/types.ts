import { RendererEnv } from './env';
import { RenderChildProps } from './Root';
import { SchemaNode, Schema, SchemaApi } from './Schema';
import { IRootStore, IRendererStore } from './store';

export type PlainObject<T = any> = Record<string, T>;

export interface RootProps {
  schema: Schema;
  rootStore?: IRootStore;
  env?: RendererEnv;
  pathPrefix?: string;
  theme?: string;
  data?: any;
  [propsName: string]: any;
}

export type RootRenderProps = RootProps;

/** 渲染器 props */
export interface RendererProps {
  render: (
    region: string,
    schema: SchemaNode,
    props?: RenderChildProps
  ) => JSX.Element;
  env?: RendererEnv;
  $path: string;
  store?: IRendererStore;
  defaultData?: any;
  [propsName: string]: any;
}

export type Api = SchemaApi;

export interface FetcherResult {
  headers: any;
  status: number;
  data: {
    code: number;
    data: any;
    message: string;
    [key: string]: any;
  };
}

export interface FetcherConfig {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  data?: any;
  config?: any;
}

export interface Payload {
  ok: boolean;
  status: number;
  data: any;
  msg: string;
}
