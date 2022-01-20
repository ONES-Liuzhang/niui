import { SchemaNode } from './Schema';

export type PlainObject<T = any> = Record<string, T>;

export interface RendererProps {
  render: (
    region: string,
    schema: SchemaNode,
    props?: RendererProps
  ) => JSX.Element;
  env?: any;
  $path: string;
  defaultData?: any;
  [propsName: string]: any;
}
