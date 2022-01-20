import { defineComponent, ExtractPropTypes, PropType } from 'vue';

const ButtonProps = {
  label: String,
  level: {
    type: String as PropType<'primary' | 'common' | 'danger' | 'text'>,
    default: 'primary'
  },
  disabled: Boolean,
  width: String,
  size: {
    type: String as PropType<'sm' | 'md' | 'lg'>,
    default: 'md'
  },
  icon: String,
  loading: Boolean,
  onClick: Function as PropType<(e: MouseEvent) => void>
} as const;

type ButtonProps = ExtractPropTypes<typeof ButtonProps>;

const Button = defineComponent({
  name: 'NButton',
  props: { ...ButtonProps },
  setup(props, ctx) {
    const { level, size, label, onClick } = props;

    // btnCls
    let btnCls = 'n-btn';
    btnCls = `${btnCls} n-btn--${level} n-btn--${size}`;

    return () => {
      return (
        <button
          onClick={onClick}
          class={{
            'n-btn': true
          }}
        >
          {label}
        </button>
      );
    };
  }
});

// const ButtonRenderer = function ButtonRenderer(
//   props: ButtonSchema & RendererProps
// ) {
//   const renderChild = props.render;
//   const { variant } = props;

//   return (
//     <Button variant={variant}>{body && renderChild(props.$path, body)}</Button>
//   );
// };

export default Button;
