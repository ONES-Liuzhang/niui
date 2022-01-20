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
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  css: {
    sass: {}
  },
  plugins: [vueJsx(), vue()]
});
