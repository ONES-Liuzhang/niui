import { defineComponent, PropType, ExtractPropTypes } from 'vue';
import { Renderer } from '../factory';
import { RendererProps } from '../types';
import { SchemaApi, SchemaNode } from '../Schema';
import { normalizeApi } from '../utils/api';

const pageSchema = {
  /**
   * 页面名称
   */
  title: String,

  /**
   * 副标题
   */
  subTitle: String,

  /**
   * 内部其他组件
   */
  body: Object as PropType<SchemaNode>,

  /**
   * 页面初始化数据
   */
  initFetch: Object as PropType<SchemaApi>
} as const;

const pageProps = {
  ...pageSchema,
  onClick: Function as PropType<(e: MouseEvent) => void>
} as const;

type PageSchema = ExtractPropTypes<typeof pageSchema>;

const Page = defineComponent({
  name: 'NPage',
  props: pageProps,
  setup(props, ctx) {
    return () => (
      <div>
        <h2>{props.title}</h2>
        {ctx.slots?.default?.()}
      </div>
    );
  }
});

const PageRenderer = function PageRenderer(props: PageSchema & RendererProps) {
  const { body, $path: _, render, initFetch, ...restProps } = props;

  // 初始化页面数据
  if (initFetch) {
    props.env?.fetcher(normalizeApi(initFetch));
  }

  // 页面级别的事件代理，处理 a 标签跳转
  const handleClick = (e: MouseEvent) => {
    const { env } = props;
    const target = e.target as HTMLElement;

    // closest 获取最近祖先元素
    const link =
      target.tagName === 'A' && target.hasAttribute('data-link')
        ? target.getAttribute('data-link')
        : target.closest('a[data-link]')?.getAttribute('data-link');

    if (link && env) {
      env.jumpTo(link);
    }
  };

  return (
    <Page onClick={handleClick} {...restProps}>
      {body ? render('body', body) : null}
    </Page>
  );
};

export default Renderer({ type: 'page' })(PageRenderer);
