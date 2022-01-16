import { SchemaApiObject } from './Schema';
import { VNodeChild } from 'vue';

export type PlainObject<T = any> = Record<string, T>;

export interface ApiObject extends SchemaApiObject {
  config?: {
    withCredentials?: boolean;
    cancelExecutor?: (cancel: typeof Function) => void;
  };
  body?: PlainObject;
  query?: PlainObject;
  // adaptor?: (payload: object, response: fetcherResult, api: ApiObject) => any;
  // requestAdaptor?: (api: ApiObject) => ApiObject;
}

type ApiString = string;
export type Api = ApiString | ApiObject;

export interface Payload {
  ok: boolean;
  msg: string;
  msgTimeout?: number;
  data: any;
  status: number;
  errors?: {
    [propName: string]: string;
  };
}

export interface Schema {
  type: string;
  detectField?: string;
  visibleOn?: string;
  hiddenOn?: string;
  children?: VNodeChild;
  definitions?: Definitions;
  [propName: string]: unknown;
}

export type SchemaNode = Schema | string | Array<Schema | string>;
export type SchemaArray = Array<SchemaNode>;
export interface Definitions {
  [propName: string]: SchemaNode;
}
