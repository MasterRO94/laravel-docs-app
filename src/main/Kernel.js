import { app, BrowserWindow, protocol, shell } from 'electron';
import AppMenu from './AppMenu';
import { installVueDevtools } from 'vue-cli-plugin-electron-builder/lib';
import Url from 'url';
import createProtocol from 'vue-cli-plugin-electron-builder/lib/createProtocol';
import unhandled from 'electron-unhandled';
import log from 'electron-log';
import Updater from './Updater';
import AppTray from './AppTray';

export default class Kernel {
  constructor() {
    // Keep a global reference of the window object, if you don't, the window will
    // be closed automatically when the JavaScript object is garbage collected.
    this.mainWindow = null;
    this.updaterMenuItem = null;
    this.tray = null;
    this.isDevelopment = process.env.NODE_ENV !== 'production';
    unhandled();

    if (!this.isLinux()) {
      this.updater = Updater.create(this);
    }
  }

  static create() {
    return new this();
  }

  init() {
    const gotTheLock = app.requestSingleInstanceLock();

    if (!gotTheLock) {
      app.quit();
    } else {
      this.registerSchemesAsPrivileged();
      this.defineMenu();
      this.registerAppEvents();

      if (!this.isLinux()) {
        this.updater.init();
      }
    }
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

  defineTray() {
    this.tray = AppTray.defineTray(this);
  }

  sendStatusToWindow(channel, message) {
    if (!message) {
      message = channel;
      channel = 'message';
    }

    log.info(`${channel}: ${message}`);
    this.mainWindow.webContents.send(channel, message);
  }

  createWindow() {
    // Create the browser window.
    this.mainWindow = new BrowserWindow({
      width: 1250,
      height: 850,
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
    });

    this.mainWindow.flashFrame(true);
    this.mainWindow.once('focus', () => {
      setTimeout(() => {
        this.mainWindow.flashFrame(false);
      }, 3000);
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

    this.mainWindow.webContents.on('devtools-opened', () => {
      this.mainWindow.webContents.focus();
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
      if (null === this.mainWindow) {
        this.createWindow();
      }
    });

    process.on('exit', () => {
      app.quit();
    });

    app.on('second-instance', (event, commandLine, workingDirectory) => {
      if (this.mainWindow) {
        if (this.mainWindow.isMinimized()) {
          this.mainWindow.restore();
        }

        this.mainWindow.focus();
      }
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
      this.defineTray();

      if (!this.isLinux()) {
        this.updater.checkForUpdates();
      }
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
