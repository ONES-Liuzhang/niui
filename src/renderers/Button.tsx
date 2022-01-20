import { Renderer } from '../factory';
import { RendererProps } from '../types';
import { defineComponent, ExtractPropTypes, PropType } from 'vue';
import { SchemaNode } from '../Schema';
import { isPlainObject } from '../utils/share';

const ButtonProps = {
  variant: {
    type: String as PropType<ButtonVariants>,
    default: 'primary'
  },
  disabled: Boolean,
  width: String,
  size: String as PropType<'sm' | 'md' | 'lg'>,
  icon: String,
  onClick: Function
} as const;

type ButtonVariants = 'primary' | 'common' | 'danger' | 'text';

type ButtonProps = ExtractPropTypes<typeof ButtonProps>;

interface ButtonSchema {
  type: 'button';

  variant?: ButtonVariants;

  width?: string;

  icon?: string;

  /** 按钮行为 */
  actionType?: 'none' | 'link' | 'request';

  /** 按钮发送请求时的 api */
  api?: string;

  body?: SchemaNode;
}

interface ButtonRendererProps extends RendererProps {
  $schema: ButtonSchema;
}

const Button = defineComponent({
  name: 'NButton',
  props: ButtonProps,
  setup(props, ctx) {
    const variant = props.variant;
    const size = props.size;
    console.log('button variant ', variant);

    // btnCls
    let btnCls = 'n-btn';
    btnCls = `${btnCls} n-btn--${variant} n-btn--${size}`;

    const onClick = (e: MouseEvent) => {
      props.onClick?.(e);
    };

    return () => {
      return (
        <button class={btnCls} onClick={onClick}>
          {ctx.slots.default?.()}
        </button>
      );
    };
  }
});

const ButtonRenderer = function ButtonRenderer(props: ButtonRendererProps) {
  const schema = props.$schema;
  const renderChild = props.render;
  const { variant, body } = schema;

  let content = body;
  if (isPlainObject(body)) {
    content = renderChild(props.$path, body);
  }

  return <Button variant={variant}>{content}</Button>;
};

export default Renderer({ type: 'button' })(ButtonRenderer);
