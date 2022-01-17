import { defineConfig } from 'vite';
import { resolve } from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vue from '@vitejs/plugin-vue';

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
  plugins: [vue(), vueJsx()],
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false
  }
});
