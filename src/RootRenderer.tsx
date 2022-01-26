import { RootRenderProps } from './types';
import { renderChild } from './Root';
import { RendererStore, IRendererStore } from './store';
import { guid } from './utils/helper';

const RootRenderer = function RootRenderer(props: RootRenderProps) {
  const { pathPrefix = '/', schema, rootStore, data, ...rest } = props;

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

  function handleAction(action: string) {
    console.log('action ', action);
  }

  return (
    <div>
      {renderChild(pathPrefix, schema, { ...rest, store })}

      {renderChild(
        pathPrefix,
        {
          type: 'dialog'
        },
        {
          data: store.dialogData,
          onConfirm: handleDialogConfirm,
          onCancel: handleDialogCancel,
          show: store.dialogOpen,
          onAction: handleAction
        }
      )}
    </div>
  );
};

export default RootRenderer;
