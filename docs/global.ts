import { App } from 'vue';
import router from './router';

export default {
  install(app: App) {
    console.log('注册插件！');
    app.use(router);
  }
};
