import { SchemaNode, Schema } from './Schema';
import { RendererProps } from './types';
import { find } from './utils/share';

interface RendererBaseConfig {
  type?: string;
  name?: string;
}

interface RendererConfig<T extends RendererProps = any>
  extends RendererBaseConfig {
  renderer?: RendererComponent<T>;
  component?: RendererComponent<T>;
}

/** 注册的渲染器 type */
type RendererType = 'page' | 'button' | 'input';

export interface RendererComponent<T extends RendererProps = any> {
  (props: T): JSX.Element;
}

const rid = 0;
const renderers: Array<any> = [];
const rendererNames: Array<string> = [];
/** 解析渲染器 */
export function resolveRender(path: string, schema: SchemaNode) {
  if (!schema) {
    throw new TypeError('schema is undefined!');
  } else if (path && path.length > 1024) {
    throw new Error('陷入死循环了！');
  }

  const type = (schema as Schema).type;

  const renderer = find(renderers, r => r.type === type);

  return renderer;
}

/** 生成渲染器 */
export function Renderer(config: RendererBaseConfig) {
  return function <T extends RendererComponent>(component: T) {
    return registerRenderer({
      ...config,
      component
    });
  };
}

function registerRenderer(config: RendererConfig) {
  if (typeof config.type !== 'string' || !config.type) {
    throw new TypeError('请传入渲染器类型');
  }

  config.type = config.type.toLocaleLowerCase();
  config.name = config.name || config.type || 'unnamed-' + rid;
  config.renderer = config.component;

  if (~rendererNames.indexOf(config.name)) {
    throw new Error(`renderer name ${config.name}重复注册！`);
  }

  renderers.push(config);
  rendererNames.push(config.name);

  return config.renderer;
}
