import { app, Menu, dialog, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';

export default class AppMenu {
  static defineMenu(kernel) {
    const isMac = process.platform === 'darwin';

    const template = [
      ...(isMac ? [{
        label: app.name,
        submenu: [
          { role: 'about' },
          { type: 'separator' },
          {
            label: 'Check for Updates...',
            click: (menuItem, focusedWindow, event) => {
              kernel.updaterMenuItem = menuItem;
              kernel.updaterMenuItem.enabled = false;
              autoUpdater.checkForUpdates();
            },
          },
          { type: 'separator' },
          { role: 'hide' },
          { role: 'hideothers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit' },
        ],
      }] : []),
      {
        label: 'File',
        submenu: [
          {
            label: 'Fetch Fresh Docs',
            click: () => {
              kernel.mainWindow.webContents.send('loadDocs');
            },
          },
          isMac ? { role: 'close' } : { role: 'quit' },
        ],
      },
      {
        label: 'Edit',
        submenu: [
          { role: 'undo' },
          { role: 'redo' },
          { type: 'separator' },
          { role: 'cut' },
          { role: 'copy' },
          { role: 'paste' },
          ...(isMac ? [
            { role: 'delete' },
            { role: 'selectAll' },
            { type: 'separator' },
            {
              label: 'Speech',
              submenu: [
                { role: 'startspeaking' },
                { role: 'stopspeaking' },
              ],
            },
          ] : [
            { role: 'delete' },
            { type: 'separator' },
            { role: 'selectAll' },
          ]),
        ],
      },
      {
        label: 'View',
        submenu: [
          { role: 'reload' },
          { role: 'forcereload' },
          ...(kernel.isDevelopment ? [
            { role: 'toggledevtools' }
          ] : []),
          { type: 'separator' },
          { role: 'resetzoom' },
          { role: 'zoomin' },
          { role: 'zoomout' },
          { type: 'separator' },
          { role: 'togglefullscreen' },
        ],
      },
      { role: 'windowMenu' },
      {
        role: 'help',
        submenu: [
          ...(!isMac ? [{
            label: 'Check for Updates...',
            click: (menuItem, focusedWindow, event) => {
              kernel.updaterMenuItem = menuItem;
              kernel.updaterMenuItem.enabled = false;
              autoUpdater.checkForUpdates();
            },
          }] : []),
          {
            label: 'View Web Version',
            click: async () => {
              await shell.openExternal('https://laravel.com/docs');
            },
          },
        ],
      },
    ];

    Menu.setApplicationMenu(
      Menu.buildFromTemplate(template),
    );
  };
}
