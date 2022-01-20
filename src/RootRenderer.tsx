import { RootRenderProps } from './propsType';
import { renderChild } from './Root';

const RootRenderer = function RootRenderer() {
  function handleDialogConfirm() {
    console.log('弹窗确认');
  }

  function handleDialogCancel() {
    console.log('弹窗关闭');
  }

  return (props: RootRenderProps) => {
    const { pathPrefix, schema, ...rest } = props;

    return (
      <div>{renderChild(pathPrefix ? pathPrefix : '/', schema, rest)}</div>
    );
  };
};

export default RootRenderer();
