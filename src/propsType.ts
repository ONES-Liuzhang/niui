import { SchemaNode } from './Schema';

export interface RootProps {
  schema: SchemaNode;
  rootStore?: any;
  pathPrefix?: string;
  theme?: string;
  data?: any;
}

export type RootRenderProps = RootProps;

export interface RendererProps {
  $path: string;
  $schema: string;
}
