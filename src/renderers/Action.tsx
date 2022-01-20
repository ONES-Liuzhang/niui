import { Renderer } from '../factory';
import { ExtractPropTypes, PropType } from 'vue';
import { NButton } from '../components';
import { SchemaApi, Schema } from '../Schema';
import { PlainObject, RendererProps } from '../types';

// export const ActionProps = {
//   /** 按钮行为 */
//   actionType: String as PropType<
//     'link' | 'url' | 'ajax' | 'submit' | 'reset' | 'clear'
//   >,
//   label: String,
//   width: String,
//   icon: String,
//   size: String as PropType<'sm' | 'md' | 'lg'>,
//   level: String as PropType<'primary' | 'common' | 'danger' | 'text'>,
//   onAction: Function as PropType<
//     (e?: MouseEvent | undefined | null, action?: PlainObject) => void
//   >,
//   onClick: Function as PropType<(e: MouseEvent | undefined | null) => void>
// } as const;

export interface ButtonSchema extends Schema {
  type: 'button';

  label: string;

  level?: 'primary' | 'common' | 'danger' | 'text';

  width?: string;

  icon?: string;

  /** 按钮行为 */
  actionType?: 'link' | 'url' | 'ajax' | 'submit' | 'reset' | 'clear';

  disabled?: boolean;

  loading?: boolean;
}

export interface LinkButtonSchema extends ButtonSchema {
  /**
   * 单页跳转
   */
  actionType: 'link';

  /**
   * 跳转路径
   */
  link: string;
}

export interface UrlButtonSchema extends ButtonSchema {
  /**
   * 跳转到url，支持新打开标签
   */
  actionType: 'url';

  /**
   * 是否在新窗口打开
   */
  blank?: boolean;

  /**
   * 要打开的url路径
   */
  url: string;
}

export interface AjaxButtonSchema extends ButtonSchema {
  /**
   * ajax 发送请求
   */
  actionType: 'ajax';

  /**
   * 请求的 api 或者 对象
   */
  api: SchemaApi;
}

// 在这里添加 Action
export type ActionSchema =
  | LinkButtonSchema
  | UrlButtonSchema
  | AjaxButtonSchema;

// type ActionProps = ExtractPropTypes<typeof ActionProps>;

/** action 渲染器 */
const ActionRenderer = function ActionRenderer(
  props: RendererProps & ActionSchema
) {
  const onClick = () => {
    if (props.actionType === 'link') {
      window.location.href = props.link;
    }
  };

  return <NButton onClick={onClick} label={props.label} />;
};

export default Renderer({ type: 'button' })(ActionRenderer);
