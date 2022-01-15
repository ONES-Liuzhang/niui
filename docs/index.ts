import { createApp } from 'vue';
import AppVue from './App.vue';
import global from './global';
import '../scss/base/_normalize.scss';

createApp(AppVue).use(global).mount('#app');
