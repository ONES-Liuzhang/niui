import { Schema, SchemaNode } from '../Schema';
import { defineComponent } from 'vue';
import { Renderer } from '../factory';
import { RendererProps } from '../types';

interface PageSchema extends Schema {
  title: string;
  body?: SchemaNode;
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

const PageRenderer = function PageRenderer(props: PageSchema & RendererProps) {
  const { title, body, $path, render } = props;

  return <Page title={title}>{body ? render($path, body) : null}</Page>;
};

export default Renderer({ type: 'page' })(PageRenderer);
