import { getEnv } from 'mobx-state-tree';
import Root from './Root';
import { SchemaNode, Schema } from './Schema';
import { RootStore } from './store';
import { FetcherConfig, FetcherResult, RendererProps } from './types';
import { find } from './utils/share';

interface RendererOptions {
  fetcher?: (config: FetcherConfig) => Promise<FetcherResult>;
  jumpTo?: (to: string) => void;
  theme?: string;
}

interface RendererBaseConfig {
  type?: string;
  name?: string;
}

interface RendererConfig<T extends RendererProps = any>
  extends RendererBaseConfig {
  renderer?: RendererComponent<T>;
  component?: RendererComponent<T>;
}

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

const defaultOptions = {
  fetcher: () => {
    console.warn('请定义发送请求的方法！');
  },

  /** TODO：先用字符串应付一下，此处应该有个 Router 类型，是对象或者字符串都可以，后面要添加一下 */
  jumpTo: (to: string, state: any) => {
    window.history.pushState(state, '', to);
  },

  theme: 'default'
};

/**
 * schema
 * props 主要是为了组件props的透传，传啥都行
 * options 环境配置
 *
 * render ({
 *   type: 'page',
 *   data: { xxx },
 *   // ...
 * })
 */
export function render(
  schema: Schema,
  props: { [propsName: string]: any } = {},
  options: RendererOptions = {},
  pathPrefix = ''
) {
  // 创建一个包含环境变量的根 store
  const store = RootStore.create(
    {},
    {
      ...defaultOptions,
      ...options
    }
  );

  const env = getEnv(store);
  const theme = env.theme;

  return (
    <Root
      {...props}
      schema={schema}
      env={env}
      theme={theme}
      pathPrefix={pathPrefix}
      rootStore={store}
    />
  );
}
