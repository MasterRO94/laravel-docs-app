import Vue from 'vue';
import RoutesManager from '@/router/RoutesManager';
import store from '../store';
import App from '../views/App';
import Application from './Application';
import { ipcRenderer } from 'electron';
import Loader from '../components/Loader';
import LoaderFullScreen from '../components/LoaderFullScreen';
import ProcessBus from './ProcessBus';
import DocsPage from '@/views/DocsPage';

export default class Kernel {
  static create() {
    return new this();
  }

  init() {
    Vue.config.productionTip = false;

    this.registerComponents();

    this.registerModuleRoutes();

    const VueApp = new Vue({
      router: RoutesManager.getRouter(),
      store,
      render: h => h(App),
    });

    const bus = new Vue();

    window.App = Application.create(VueApp, bus, ipcRenderer);
    ProcessBus.registerEvents();

    window.App.init();
  }

  registerComponents() {
    Vue.component('loader', Loader);
    Vue.component('loader-full-screen', LoaderFullScreen);
  }

  registerModuleRoutes() {
    RoutesManager.addChildRoute(
      {
        path: '/docs/:version/:page/children',
        name: 'docsPageChildren',
        component: DocsPage,
      },
      'docsPage',
    );
  }
}
