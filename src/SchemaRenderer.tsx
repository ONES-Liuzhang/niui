import { resolveRender } from './factory';
import { RendererProps } from './types';
import { renderChild, RenderChildProps } from './Root';
import { SchemaNode, Schema } from './Schema';

interface SchemaRenderer extends Partial<RendererProps> {
  $path: string;
  schema: SchemaNode;
}

function SchemaRenderer(props: SchemaRenderer) {
  const { schema, $path, ...restProps } = props;

  console.log('当前路径', $path);
  const renderer = resolveRender($path, schema);

  const { data: defaultData, ...restSchema } = schema as Schema;

  function render(path: string, node: SchemaNode, props: RenderChildProps) {
    path = `${$path}/${path}`;
    return renderChild(path, node, props);
  }

  if (renderer && renderer.component) {
    const Component = renderer.component;
    return (
      <Component
        {...restProps}
        {...restSchema}
        $path={$path}
        render={render}
        defaultData={defaultData}
      ></Component>
    );
  } else {
    return (
      <div>
        <p>未找到指定的渲染器</p>
        <p>
          路径: {$path} 配置：<code>{JSON.stringify(schema)}</code>
        </p>
      </div>
    );
  }
}

export default SchemaRenderer;
