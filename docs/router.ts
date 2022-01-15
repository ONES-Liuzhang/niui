import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router';
import HomeVue from './Home.vue';
import LayoutVue from './layout/Layout.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
    component: LayoutVue,
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
