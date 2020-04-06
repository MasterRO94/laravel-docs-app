import Vue from 'vue';
import VueRouter from 'vue-router';
import config from '../config';
import Installation from '../views/Installation.vue';
import DocsPage from '../views/DocsPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: `/docs/${config.defaultVersion}/installation`
  },
  {
    path: '/installation',
    name: 'installation',
    component: Installation,
  },
  {
    path: '/docs/:version/:page',
    name: 'docsPage',
    component: DocsPage,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes,
});

export default router;
