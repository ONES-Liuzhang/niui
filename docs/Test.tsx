import { render } from '../src';
import fetcher from './api';

const schema = {
  type: 'page',
  title: '测试页面',
  initFetch: '/dict',
  body: [
    {
      type: 'button',
      label: 'dialog',
      actionType: 'dialog'
    },
    {
      type: 'button',
      label: 'link',
      actionType: 'link',
      link: '#home'
    },
    {
      type: 'button',
      label: '发送请求',
      actionType: 'ajax',
      api: '/abc?a=1'
    }
  ]
};

const rootData = {
  userName: 'lz',
  age: 28
};
const Test = function TestFunctional() {
  return (
    <div>
      {render(
        schema,
        {
          data: rootData
        },
        {
          fetcher: fetcher,
          theme: 'oooo'
        }
      )}
    </div>
  );
};

export default Test;
