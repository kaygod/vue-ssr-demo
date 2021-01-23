import Vue from 'vue';
import Router from 'vue-router';
import List from './pages/List';
import Search from './pages/Search';

Vue.use(Router);

export const createRouter = () => {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/list',
        component: List,
      },
      {
        path: '/search',
        component: Search,
      },
      {
        path: '/',
        component: List,
      },
    ],
  });
};

export const routerReady = async (router) => {
  return new Promise((resolve) => {
    router.onReady(() => {
      resolve(null);
    });
  });
};
