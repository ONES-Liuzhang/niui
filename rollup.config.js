import babel from '@rollup/plugin-babel';
import { defineConfig } from 'rollup';

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      file: 'lib/niui.common.js',
      format: 'cjs',
      exports: 'named'
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
    babel({
      extensions: ['ts', 'js', 'jsx', 'tsx'],
      babelHelpers: 'bundled'
    })
  ]
});
