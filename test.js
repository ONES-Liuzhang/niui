/* eslint-disable @typescript-eslint/no-var-requires */
const babel = require('@babel/core');
const jsx = require('@vue/babel-plugin-jsx');
const ts = require('@babel/plugin-transform-typescript');

const result = babel.transform('let a: number = 2; console.log(<div></div>)', {
  plugins: [
    jsx,
    [
      ts,
      {
        isTSX: true,
        allowExtensions: true
      }
    ]
  ]
});

console.log(result.code);
