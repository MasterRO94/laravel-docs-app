import { ipcRenderer } from 'electron';
import Application from './Application';

export default class ProcessBus {
  static registerEvents() {
    ipcRenderer.on('loadDocs', () => {
      Application.$app.$store.dispatch('loadDocs');
    });

    [
      'message',
      'error',
      'checking-for-update',
      'update-available',
      'update-not-available',
      'update-downloaded',
      'download-progress',
    ].forEach((event) => {
      ipcRenderer.on(event, function (event, message) {
        Application.$app.$store.commit('setMessage', { event, message });
      });
    });
  }
}

// 'update-available', 'checking-for-update', 'update-not-available', 'update-downloaded', 'download-progress'
