import { defineComponent, ExtractPropTypes, PropType } from 'vue';

const buttonProps = {
  label: String,
  block: {
    type: Boolean,
    default: false
  },
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

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;

const Button = defineComponent({
  name: 'NButton',
  props: buttonProps,
  setup(props) {
    const { level, size, label, onClick } = props;

    return () => {
      return (
        <button
          onClick={onClick}
          class={{
            'n-btn': true,
            [`n-btn--${size}`]: size,
            [`n-btn--${level}`]: level
          }}
        >
          {label}
        </button>
      );
    };
  }
});

export default Button;
