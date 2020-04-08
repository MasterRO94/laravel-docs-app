export default class Application {
  constructor(VueApp, bus, ipc) {
    if (Application.$instance) {
      throw new Error('Instance already created ');
    }

    this.vueApp = VueApp;
    this.bus = bus;
    this.ipc = ipc;
  }

  static create(VueApp, bus, ipc) {
    Application.$instance = new this(VueApp, bus, ipc);

    return Application.$instance;
  }

  async init() {
    this.vueApp.$mount('#app');

    await this.vueApp.$store.dispatch('loadState');

    this.vueApp.$store.commit('setAppLoading', false);
  }

  static get $app() {
    return Application.$instance.vueApp;
  }

  static get $bus() {
    return Application.$instance.bus;
  }

  static get $ipc() {
    return Application.$instance.ipc;
  }
}
