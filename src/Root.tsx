import { isArray, isString } from './utils/share';
import { SchemaNode } from './Schema';
import { RootProps, RendererProps } from './types';
import RootRenderer from './RootRenderer';
import SchemaRenderer from './SchemaRenderer';

type VueJSXElement = JSX.Element | null | undefined | Array<VueJSXElement>;

export type RenderChildProps = Partial<RendererProps>;

const Root = function Root(props: RootProps) {
  // 数据处理
  return <RootRenderer {...props} />;
};

function renderChildren(
  pathPrefix: string,
  node: SchemaNode,
  props: RenderChildProps
): VueJSXElement {
  if (isArray(node)) {
    return node.map((child, index) =>
      renderChild(`${pathPrefix}/${index}`, child, {
        key: `${pathPrefix}_${index}`,
        ...props
      })
    );
  }

  return renderChild(pathPrefix, node, props);
}

export function renderChild(
  pathPrefix: string,
  node: SchemaNode,
  props: RenderChildProps
): VueJSXElement {
  if (!node) return null;

  if (isArray(node)) {
    return renderChildren(pathPrefix, node, props);
  }

  if (isString(node)) {
    return <span>{node}</span>;
  }

  const path =
    pathPrefix && pathPrefix !== '/'
      ? `${pathPrefix}/${node.type}`
      : '/' + node.type;

  return <SchemaRenderer $path={path} schema={node} {...props} />;
}

export default Root;
