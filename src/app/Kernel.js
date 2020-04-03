import Vue from 'vue';
import router from '../router';
import store from '../store';
import App from '../App';
import Application from './Application';
import { ipcRenderer } from 'electron';
import Loader from '../components/Loader';
import LoaderFullScreen from '../components/LoaderFullScreen';

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

    Application.create(VueApp, bus, ipcRenderer).init();
  }

  registerComponents() {
    Vue.component('loader', Loader);
    Vue.component('loader-full-screen', LoaderFullScreen);
  }
}
