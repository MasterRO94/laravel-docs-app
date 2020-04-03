import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Installation from '../views/Installation.vue';
import DocsPage from '../views/DocsPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/installation',
    name: 'Installation',
    component: Installation,
  },
  {
    path: '/docs/:version/:page',
    name: 'docsPage',
    component: DocsPage,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
