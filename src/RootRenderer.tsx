import { defineComponent } from 'vue';
import { RootRendererProps } from './Root';

const RootRenderer = defineComponent<RootRendererProps>({
  setup(props) {
    console.log(props);
    return () => props.schema;
  }
});

export default RootRenderer;
