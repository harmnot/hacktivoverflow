import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./components/form/login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./components/form/register.vue'),
    },
    {
      path: '/posting',
      name: 'posting',
      component: () => import('./components/posting/dashboard.vue'),
      children: [],
    },
    {
      path: '/question/:id',
      name: 'afterposting',
      component: () => import('./components/posting/afterpost.vue'),
    },
  ],
});
