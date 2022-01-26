import { Renderer } from '../factory';
import { NButton } from '../components';
import { SchemaApi, Schema, SchemaNode } from '../Schema';
import { PlainObject, RendererProps } from '../types';
import { normalizeApi } from '../utils/api';

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

  /**
   * 是否内联 默认为false
   */
  block?: boolean;

  label: string;

  level?: 'primary' | 'common' | 'danger' | 'text';

  width?: string;

  icon?: string;

  /** 按钮行为 */
  actionType?:
    | 'link'
    | 'url'
    | 'ajax'
    | 'submit'
    | 'reset'
    | 'clear'
    | 'dialog';

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

export interface DialogButtonSchema extends ButtonSchema {
  actionType: 'dialog';

  // TODO: 这里要写 DialogSchemaNode
  dialog: SchemaNode;
}

// 在这里添加 Action
export type ActionSchema =
  | LinkButtonSchema
  | UrlButtonSchema
  | AjaxButtonSchema
  | DialogButtonSchema;

// type ActionProps = ExtractPropTypes<typeof ActionProps>;

/**
 * action 渲染器
 *
 * Button 只负责渲染样式，交互逻辑放在 Action 里，包一层
 *
 * 受控组件
 */
const ActionRenderer = function ActionRenderer(
  props: RendererProps &
    ActionSchema & {
      onAction: (e: MouseEvent, action?: PlainObject, data?: any) => void;
      onClick: (e: MouseEvent) => void;
    }
) {
  const env = props.env;

  switch (props.actionType) {
    case 'ajax':
      // 发请求
      env?.fetcher(normalizeApi(props.api));
      break;
    case 'dialog':
      // 弹窗
      break;
    case 'link':
      // 跳转
      env?.jumpTo(props.link);
      break;
    case 'url':
      // 和 link 类似 支持新开标签
      env?.jumpTo(props.url);
      break;
  }
  const handleClick = (e: MouseEvent) => {
    // 传入了 click，就执行
    if (props.onClick) {
      props.onClick(e);
    }

    // 再解析 action 执行
    if (props.onAction) {
      props.onAction(e, props.action, props.data);
    }
  };

  return (
    <NButton
      onClick={handleClick}
      label={props.label}
      disabled={props.disabled}
    />
  );
};

export default Renderer({ type: 'button' })(ActionRenderer);
