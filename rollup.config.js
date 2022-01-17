import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import vuePlugin from 'rollup-plugin-vue';

import { defineConfig } from 'rollup';

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      file: 'lib/niui.common.js',
      format: 'cjs',
      exports: 'auto'
    },
    {
      file: 'lib/niui.es.js',
      format: 'esm'
    },
    {
      file: 'lib/niui.js',
      format: 'umd',
      name: 'Niui'
    }
  ],
  plugins: [
    nodeResolve({
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue']
    }),
    vuePlugin(),
    babel({
      extensions: ['.ts', '.tsx', '.js', '.jsx', 'vue'],
      babelHelpers: 'bundled'
    })
  ]
});
