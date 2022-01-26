import { render } from '../src';
const schema = {
  type: 'page',
  title: '测试页面',
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
      {render(schema, {
        data: rootData
      })}
    </div>
  );
};

export default Test;
