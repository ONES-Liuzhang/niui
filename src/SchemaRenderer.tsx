import { defineComponent } from 'vue';
import { RendererEnv } from './env';
import { RendererProps } from './factory';
import { Schema } from './types';

export interface SchemaRendererProps extends Partial<RendererProps> {
  schema: Schema;
  $path: string;
  env: RendererEnv;
}

const SchemaRenderer = defineComponent<SchemaRendererProps>({});

export default SchemaRenderer;
