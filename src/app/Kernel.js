import Vue from 'vue';
import router from '../router';
import store from '../store';
import App from '../views/App';
import Application from './Application';
import { ipcRenderer } from 'electron';
import Loader from '../components/Loader';
import LoaderFullScreen from '../components/LoaderFullScreen';
import ProcessBus from './ProcessBus';

export default class Kernel {
  static create() {
    return new this();
  }

  init() {
    Vue.config.productionTip = false;

    this.registerComponents();

    const VueApp = new Vue({
      router,
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
}
