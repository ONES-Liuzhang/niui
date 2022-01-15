import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
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
    nodeResolve(),
    commonjs(),
    babel({
      extensions: ['ts', 'js', 'jsx', 'tsx'],
      babelHelpers: 'bundled'
    })
  ]
});
