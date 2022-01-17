import { defineConfig } from 'vite';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { resolve } from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  root: 'docs',
  server: {
    port: 5555
  },
  resolve: {
    alias: {
      niui: resolve(__dirname, 'src/components/index.ts')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue']
  },
  css: {
    sass: {}
  },
  plugins: [
    nodeResolve({
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    }),
    babel({
      babelrc: false,
      presets: [
        [
          '@babel/env',
          {
            useBuiltIns: 'entry',
            corejs: '3.6.4'
          }
        ]
      ],
      exclude: ['node_modules/**']
    }),
    vueJsx()
  ],
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false
  }
});
