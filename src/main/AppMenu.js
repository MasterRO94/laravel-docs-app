import { app, Menu, shell, ipcMain } from 'electron';

export default class AppMenu {
  static defineMenu(kernel) {
    const isMac = process.platform === 'darwin';

    const template = [
      ...(isMac ? [{
        label: app.name,
        submenu: [
          { role: 'about' },
          { type: 'separator' },
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
