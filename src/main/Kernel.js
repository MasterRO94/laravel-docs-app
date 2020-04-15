import { app, BrowserWindow, dialog, protocol, shell } from 'electron';
import AppMenu from './AppMenu';
import { installVueDevtools } from 'vue-cli-plugin-electron-builder/lib';
import Url from 'url';
import createProtocol from 'vue-cli-plugin-electron-builder/lib/createProtocol';
import unhandled from 'electron-unhandled';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

export default class Kernel {
  constructor() {
    // Keep a global reference of the window object, if you don't, the window will
    // be closed automatically when the JavaScript object is garbage collected.
    this.mainWindow = null;
    this.updaterMenuItem = null;
    this.isDevelopment = process.env.NODE_ENV !== 'production';
    unhandled();
    autoUpdater.autoDownload = false;
    this.showUpdaterNotification = false;
  }

  static create() {
    return new this();
  }

  init() {
    this.registerSchemesAsPrivileged();
    this.defineMenu();
    this.registerAppEvents();
  }

  registerSchemesAsPrivileged() {
    // Scheme must be registered before the app is ready
    protocol.registerSchemesAsPrivileged([
      {
        scheme: 'app',
        privileges: {
          secure: true,
          standard: true,
        },
      },
    ]);
  }

  defineMenu() {
    AppMenu.defineMenu(this);
  }

  sendStatusToWindow(text) {
    log.info(text);
    this.mainWindow.webContents.send('message', text);
  }

  createWindow() {
    // Create the browser window.
    this.mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      minWidth: 400,
      minHeight: 400,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false,
      },
      titleBarStyle: 'hidden',
      show: false,
    });

    this.mainWindow.once('ready-to-show', async () => {
      this.mainWindow.show();

      setTimeout(async () => {
        await autoUpdater.checkForUpdates();
        this.showUpdaterNotification = true;
      }, 3000);
    });

    this.mainWindow.flashFrame(true);
    this.mainWindow.once('focus', () => {
      this.mainWindow.flashFrame(false);
    });

    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      this.mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL);

      if (!process.env.IS_TEST) {
        this.mainWindow.webContents.openDevTools();
      }
    } else {
      createProtocol('app');
      // Load the index.html when not in development
      this.mainWindow.loadURL('app://./index.html');


      autoUpdater.logger = log;
      autoUpdater.logger.transports.file.level = 'debug';
      log.info('App starting...');
    }

    this.mainWindow.on('closed', () => {
      this.mainWindow = null;
    });

    this.mainWindow.webContents.on('will-navigate', (e, reqUrl) => {
      let getHost = url => Url.parse(url).host;
      let reqHost = getHost(reqUrl);

      if (reqHost && reqHost !== getHost(this.mainWindow.webContents.getURL())) {
        e.preventDefault();
        shell.openExternal(reqUrl);
      }
    });
  }

  registerAppEvents() {
    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
      // On macOS it is common for applications and their menu bar
      // to stay active until the user quits explicitly with Cmd + Q
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', async () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (this.mainWindow === null) {
        this.createWindow();
      }
    });

    process.on('exit', () => {
      app.quit();
    });

    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on('ready', async () => {
      if (this.isDevelopment && !process.env.IS_TEST) {
        try {
          await installVueDevtools();
        } catch (e) {
          console.error('Vue Devtools failed to install:', e.toString());
        }
      }

      this.createWindow();
    });

    // Exit cleanly on request from parent process in development mode.
    if (this.isDevelopment) {
      if (process.platform === 'win32') {
        process.on('message', data => {
          if (data === 'graceful-exit') {
            app.quit();
          }
        });
      } else {
        process.on('SIGTERM', () => {
          app.quit();
        });
      }
    }

    autoUpdater.on('checking-for-update', () => {
      if (this.showUpdaterNotification) {
        this.sendStatusToWindow('Checking for update...');
      }
    });

    autoUpdater.on('update-available', async (info) => {
      this.sendStatusToWindow('Update available.');

      const response = await dialog.showMessageBoxSync({
        type: 'info',
        title: 'Found Updates',
        message: 'Found updates, do you want to update now?',
        buttons: ['Sure', 'No'],
      });

      if (response === 0) {
        autoUpdater.downloadUpdate();

        if (this.isWindows()) {
          this.sendStatusToWindow('Update downloading started. It will be downloaded in the background.');
        }
      } else if (this.updaterMenuItem) {
        this.updaterMenuItem.enabled = true;
        this.updaterMenuItem = null;
      }
    });

    autoUpdater.on('update-not-available', (info) => {
      if (this.showUpdaterNotification) {
        this.sendStatusToWindow(`Current version (${info.version}) is up-to-date.`);

        dialog.showMessageBox({
          title: 'No Updates',
          message: `Current version (${info.version}) is up-to-date.`,
        });
      }

      if (this.updaterMenuItem) {
        this.updaterMenuItem.enabled = true;
        this.updaterMenuItem = null;
      }
    });

    autoUpdater.on('error', (err) => {
      this.sendStatusToWindow(`Error in auto-updater. ${err}`);

      if (this.updaterMenuItem) {
        this.updaterMenuItem.enabled = true;
        this.updaterMenuItem = null;
      }
    });

    autoUpdater.on('download-progress', (progressObj) => {
      let message = `Downloading update <strong>${progressObj.percent.toFixed(2)}%</strong>`;
      message += ` (${Math.round(progressObj.transferred / 1000)}/${Math.round(progressObj.total / 1000)}).`;
      message += ` Download speed: ${Math.round(progressObj.bytesPerSecond / 1000)} Kb/s.`;

      this.sendStatusToWindow(message);
    });

    autoUpdater.on('update-downloaded', async (info) => {
      this.sendStatusToWindow('Update downloaded. It will be installed after application relaunch.');

      const response = await dialog.showMessageBoxSync({
        type: 'info',
        title: 'Update downloaded',
        message: 'Do you want to update now?',
        buttons: ['Sure', 'No'],
      });

      if (response === 0) {
        autoUpdater.quitAndInstall();
      }
    });
  }

  isMac() {
    return 'darwin' === process.platform;
  }

  isWindows() {
    return 'win32' === process.platform;
  }

  isLinux() {
    return 'linux' === process.platform;
  }
}

// In Dev Console
// require('devtron').install()
