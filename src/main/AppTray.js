import path from 'path';
import { Menu, Tray } from 'electron';

export default class AppTray {
  static defineTray(kernel) {
    const tray = new Tray(!kernel.isDevelopment
      ? path.join(process.resourcesPath, 'tray-icon.png')
      : 'src/assets/main/tray-icon.png',
    );

    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Activate',
        click: () => {
          if (null === kernel.mainWindow) {
            kernel.createWindow();
          }

          kernel.mainWindow.show();
        },
      },
      { type: 'separator' },
      {
        label: 'Fetch Fresh Docs',
        click: () => {
          kernel.mainWindow.webContents.send('loadDocs');
        },
      },
      { type: 'separator' },
      { role: 'quit' },
    ]);

    // tray.setToolTip('Это мое приложение.');
    tray.setContextMenu(contextMenu);

    return tray;
  }
}

