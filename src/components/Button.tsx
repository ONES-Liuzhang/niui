import { defineComponent } from 'vue';

const Button = defineComponent({
  name: 'NButton',
  props: {
    text: String
  },
  setup(_, { slots }) {
    return () => <button>{slots.default && slots.default()}</button>;
  }
});

export default Button;
