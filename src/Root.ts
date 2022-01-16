import { Schema } from './types';

export interface RootProps {
  schema: Schema;
  rootStore: any;
  env: any;
  theme: string;
  pathPrefix?: string;
  [propsName: string]: any;
}

export interface RootRendererProps {
  schema: Schema;
  rootStore: any;
  env: any;
  theme: string;
  pathPrefix?: string;
  [propsName: string]: any;
}

export function renderChildren() {
  // TODO
}

export function renderChild() {
  // TODO
}
