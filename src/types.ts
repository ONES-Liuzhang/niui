import { SchemaNode } from './Schema';

export type PlainObject<T = any> = Record<string, T>;

export interface RendererProps {
  $path: string;
  $schema: SchemaNode;
  [propsName: string]: any;
}
