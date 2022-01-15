import { createApp } from 'vue';
import AppVue from './App.vue';
import global from './global';
import './styles/index.scss';

createApp(AppVue).use(global).mount('#app');
