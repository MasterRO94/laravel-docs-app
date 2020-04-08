import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import DocsPage from '../views/DocsPage.vue';
import External from '../views/External.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: `/docs/${store.state.currentVersion}/installation`,
  },
  {
    path: '/docs/:version/:page',
    name: 'docsPage',
    component: DocsPage,
  },
  {
    path: '*',
    name: 'external',
    component: External,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    };
  },
  routes,
});

export default router;
