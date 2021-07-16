import { createRouter, createWebHashHistory } from 'vue-router';
import Game from '../views/Game.vue';

const routes = [
  {
    path: '/',
    name: 'Game',
    component: Game,
  },
  {
    path: '/stats',
    name: 'Stats',
    component: () => import(/* webpackChunkName: "stats" */ '../views/Stats.vue'),
  },
  {
    path: '/Settings',
    name: 'settings',
    component: () => import(/* webpackChunkName: "settings" */ '../views/Settings.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
