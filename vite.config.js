import { defineConfig } from 'vite';
import vuePlugin from 'rollup-plugin-vue';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default defineConfig({
  root: 'docs',
  server: {
    port: 5555
  },
  css: {
    sass: {}
  },
  plugins: [
    nodeResolve(),
    vuePlugin(),
    babel({
      extensions: ['ts', 'js', 'jsx', 'tsx'],
      babelHelpers: 'bundled'
    })
  ]
});
