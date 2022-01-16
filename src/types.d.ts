import { VNodeChild } from 'vue';

export interface Schema {
  type: string;
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
