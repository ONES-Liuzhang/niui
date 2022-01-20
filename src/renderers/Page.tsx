import { Schema, SchemaNode } from '../Schema';
import { defineComponent } from 'vue';
import { Renderer } from '../factory';
import { RendererProps } from '../types';

interface IPageSchema extends Schema {
  title: string;
  body?: SchemaNode;
}

interface IPageRendererProps extends RendererProps {
  $schema: IPageSchema;
}

const Page = defineComponent({
  name: 'NPage',
  props: {
    title: String
  },
  setup(props, ctx) {
    return () => (
      <div>
        <h2>{props.title}</h2>
        {ctx.slots.default?.()}
      </div>
    );
  }
});

const PageRenderer = function PageRenderer(props: IPageRendererProps) {
  const schema = props.$schema;
  const path = props.$path;
  const renderChild = props.render;

  const { title, body } = schema;

  return <Page title={title}>{body ? renderChild(path, body) : null}</Page>;
};

export default Renderer({ type: 'page' })(PageRenderer);
