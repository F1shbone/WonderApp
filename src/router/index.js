import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store';

import Game from './views/Game.vue';
import Results from './views/Results.vue';
import GameEmpty from './views/GameEmpty.vue';
import Login from './views/Login.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/game',
    component: Game,
    beforeEnter(to) {
      const isMatchActive = store.hasModule('match');
      // prevent unnecessary redirects
      if (to.path === '/game/empty' && !isMatchActive) return true;
      if (to.path === '/game/active' && isMatchActive) return true;
      // if the match module is missing there is no active match
      return isMatchActive ? { path: '/game/active' } : { path: '/game/empty' };
    },
    children: [
      {
        path: 'empty',
        component: GameEmpty,
      },
      {
        path: 'active',
        beforeEnter() {
          // if the match module is missing there is no active match
          return store.hasModule('match') ? true : { path: '/game/empty' };
        },
        component: () => import(/* webpackChunkName: "game" */ './views/GameActive.vue'),
      },
    ],
  },
  {
    path: '/results',
    name: 'Results',
    component: Results,
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "results" */ './views/ResultsList.vue'),
      },
      {
        path: ':id',
        component: () => import(/* webpackChunkName: "results" */ './views/ResultsDetail.vue'),
        beforeEnter({ params }) {
          if (+params.id < store.state.results.results.length) {
            return true;
          } else {
            return '/results';
          }
        },
      },
    ],
  },
  {
    path: '/stats',
    name: 'Stats',
    component: () => import(/* webpackChunkName: "stats" */ './views/Stats.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import(/* webpackChunkName: "settings" */ './views/Settings.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/game/empty',
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
