import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router';
import Home from './Home.vue';
import Test from './Test';
import Layout from './layout/Layout.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: 'home',
        component: Home
      },
      {
        path: 'test',
        component: Test
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
