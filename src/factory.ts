import { IIRendererStore } from './store/iRenderer';
import { RendererEnv } from './env';
import { SchemaNode } from './types';

export interface RendererProps {
  render: (region: string, node: SchemaNode, props?: any) => JSX.Element;
  env: RendererEnv;
  $path: string; // 当前组件所在的层级信息
  $schema: any; // 原始 schema 配置
  store?: IIRendererStore;
  syncSuperStore?: boolean;
  data: {
    [propName: string]: any;
  };
  defaultData?: object;
  className?: any;
  [propName: string]: any;
}
