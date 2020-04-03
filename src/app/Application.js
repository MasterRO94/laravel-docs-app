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
    return Application.$instance = new this(VueApp, bus, ipc);
  }

  init() {
    this.vueApp.$mount('#app');

    const messages = [
      'Connecting to server...',
      'Creating database...',
      'Fetching fresh data...',
      'Configuring staff...',
    ];

    for (let i in messages) {
      setTimeout(() => {
        this.vueApp.$store.commit('setAppLoadingCaption', messages[i]);
      }, i * 3000);
    }
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
