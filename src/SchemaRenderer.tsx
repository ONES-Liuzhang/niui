import { resolveRender } from './factory';
import { RendererProps } from './types';
import { renderChild } from './Root';
import { SchemaNode, Schema } from './Schema';

interface SchemaRenderer extends Partial<RendererProps> {
  $path: string;
  schema: SchemaNode;
}

function SchemaRenderer(props: SchemaRenderer) {
  const { schema, $path, ...restProps } = props;
  const renderer = resolveRender($path, schema);
  const { data: defaultData, ...restSchema } = schema as Schema;
  if (renderer && renderer.component) {
    const Component = renderer.component;
    return (
      <Component
        {...restProps}
        {...restSchema}
        $path={$path}
        render={renderChild}
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
