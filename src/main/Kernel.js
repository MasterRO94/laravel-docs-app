import { app, BrowserWindow, protocol, shell } from 'electron';
import AppMenu from './AppMenu';
import { createProtocol, installVueDevtools } from 'vue-cli-plugin-electron-builder/lib';
import Url from 'url';

export default class Kernel {
  constructor() {
    // Keep a global reference of the window object, if you don't, the window will
    // be closed automatically when the JavaScript object is garbage collected.
    this.mainWindow = null;
    this.isDevelopment = process.env.NODE_ENV !== 'production';
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

  createWindow() {
    // Create the browser window.
    this.mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false,
      },
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
  }
}

// In Dev Console
// require('devtron').install()
