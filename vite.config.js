import { defineConfig } from 'vite';
import vuePlugin from 'rollup-plugin-vue';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

export default defineConfig({
  root: '/examples',
  mode: 'development',
  server: {
    port: 5555
  },
  css: {
    sass: {}
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    vuePlugin(),
    babel({
      extensions: ['ts', 'js', 'jsx', 'tsx'],
      babelHelpers: 'bundled'
    })
  ]
});
