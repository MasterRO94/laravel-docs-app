import { ipcRenderer } from 'electron';
import Application from './Application';

export default class ProcessBus {
  static registerEvents() {
    ipcRenderer.on('loadDocs', () => {
      Application.$app.$store.dispatch('loadDocs');
    });

    ipcRenderer.on('message', function(event, text) {
      Application.$app.$store.commit('setMessage', text);
    });
  }
}
