import { RootRenderProps } from './types';
import { renderChild } from './Root';
import { RendererStore, IRendererStore } from './store';
import { guid } from './utils/helper';

const RootRenderer = function RootRenderer(props: RootRenderProps) {
  const { pathPrefix, schema, rootStore, data, ...rest } = props;

  const store = rootStore!.addStore({
    id: guid(),
    storeType: RendererStore.name,
    path: pathPrefix || '/',
    parentId: ''
  }) as IRendererStore;

  if (data) {
    store.initData(data);
  }

  function handleDialogConfirm() {
    console.log('弹窗确认');
  }

  function handleDialogCancel() {
    console.log('弹窗关闭');
  }

  return (
    <div>
      {renderChild(pathPrefix ? pathPrefix : '/', schema, { ...rest, store })}
    </div>
  );
};

export default RootRenderer;
