import { createApp } from 'vue';
import AppVue from './App.vue';
import global from './global';
import './style/index.css';

createApp(AppVue).use(global).mount('#app');
