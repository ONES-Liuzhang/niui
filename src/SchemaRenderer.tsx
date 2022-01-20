import { resolveRender } from './factory';
import { RendererProps } from './types';
import { renderChild } from './Root';

function SchemaRenderer(props: RendererProps) {
  const { $schema, $path, ...rest } = props;
  const renderer = resolveRender($path, $schema);

  if (renderer && renderer.component) {
    const Component = renderer.component;
    return (
      <Component $schema={$schema} $path={$path} render={renderChild} {...rest}>
        SchemaRenderer
      </Component>
    );
  } else {
    return <div>renderer {$path} no fund</div>;
  }
}

export default SchemaRenderer;
