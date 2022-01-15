import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router';
import HomeVue from './Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: 'home',
    children: [
      {
        path: 'home',
        component: HomeVue
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
