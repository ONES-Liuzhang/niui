import { isArray } from './utils/share';
import { RendererEnv } from './env';
import { RendererProps } from './factory';
import { Schema, SchemaNode } from './types';
import SchemaRenderer from './SchemaRenderer';
import Vue, { defineComponent, h, provide } from 'vue';
import RootRenderer from './RootRenderer';

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

// TODO ?
export interface renderChildProps extends Partial<RendererProps> {
  env: RendererEnv;
}

export type VueJSXElement = Vue.Component | JSX.Element | null | false;

const Root = defineComponent<RootProps>({
  setup(props) {
    provide('rootStore', props.rootStore);
    return () => <RootRenderer {...{ props }} />;
  }
});

export function renderChildren(
  prefix: string,
  children: SchemaNode,
  props: renderChildProps
): VueJSXElement {
  // TODO
  if (isArray(children)) {
    return children.map((child, idx) =>
      renderChild(`${prefix}/${idx}`, child, {
        key: `${props.key ? `${props.key}-` : ''}${idx}`,
        ...props
      })
    );
  }

  return renderChild(prefix, children, props);
}

export function renderChild(
  prefix: string,
  node: SchemaNode,
  props: renderChildProps
): VueJSXElement {
  // TODO
  if (isArray(node)) {
    return renderChildren(prefix, node, props);
  }

  const typeofnode = typeof node;

  if (node === null || typeofnode === 'undefined') {
    return null;
  }

  const schema = node as Schema;

  return (
    <SchemaRenderer
      {...{ props }}
      $path={`${prefix ? `${prefix}/` : ''}` + `${schema && schema.type}`}
      schema={schema}
    />
  );
}

export default Root;
