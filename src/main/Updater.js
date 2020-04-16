import { autoUpdater } from 'electron-updater';
import { dialog } from 'electron';
import log from 'electron-log';

export default class Updater {
  constructor(kernel) {
    this.kernel = kernel;
    this.showNotification = false;
  }

  static create(kernel) {
    return new this(kernel);
  }

  init() {
    autoUpdater.autoDownload = false;
    autoUpdater.logger = log;
    autoUpdater.logger.transports.file.level = 'info';

    autoUpdater.on('checking-for-update', () => {
      if (this.showNotification) {
        this.kernel.sendStatusToWindow('checking-for-update', 'Checking for update...');
      }
    });

    autoUpdater.on('update-available', async (info) => {
      this.kernel.sendStatusToWindow('update-available', 'Update available.');

      const response = await dialog.showMessageBoxSync({
        type: 'info',
        title: 'Found Updates',
        message: 'Found updates, do you want to update now?',
        buttons: ['Sure', 'No'],
      });

      if (response === 0) {
        autoUpdater.downloadUpdate();

        if (this.kernel.isWindows()) {
          this.kernel.sendStatusToWindow('Update downloading started. It will be downloaded in the background.');
        }
      } else if (this.updaterMenuItem) {
        this.updaterMenuItem.enabled = true;
        this.updaterMenuItem = null;
      }
    });

    autoUpdater.on('update-not-available', (info) => {
      if (this.showNotification) {
        this.kernel.sendStatusToWindow(
          'update-not-available',
          `Current version (${info.version}) is up-to-date.`,
        );

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
      this.kernel.sendStatusToWindow('error', `Error in auto-updater. ${err}`);

      if (this.updaterMenuItem) {
        this.updaterMenuItem.enabled = true;
        this.updaterMenuItem = null;
      }
    });

    autoUpdater.on('download-progress', (progress) => {
      const message = this.prepareDownloadProgressMessage(progress);

      this.kernel.sendStatusToWindow('download-progress', message);
    });

    autoUpdater.on('update-downloaded', async (info) => {
      this.kernel.sendStatusToWindow(
        'update-downloaded',
        'Update downloaded. It will be installed after application relaunch.'
      );

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

    if (this.kernel.isWindows()) {
      this.handleWindowsUpdateDownloadProgress();
    }
  }

  checkForUpdates() {
    setTimeout(async () => {
      await autoUpdater.checkForUpdates();
      this.showNotification = true;
    }, 3000);
  }

  prepareDownloadProgressMessage(progress) {
    let message = `Downloading update <strong>${progress.percent.toFixed(2)}%</strong>`;
    message += ` (${Math.round(progress.transferred / 1000)}/${Math.round(progress.total / 1000)}).`;
    message += ` Download speed: ${Math.round(progress.bytesPerSecond / 1000)} Kb/s.`;

    return message;
  }

  handleWindowsUpdateDownloadProgress() {
    let diffDown = {
      percent: 0,
      bytesPerSecond: 0,
      total: 0,
      transferred: 0
    };

    let diffDownHelper = {
      startTime: 0,
      lastTime: 0,
      lastSize: 0
    };

    log.hooks.push((message, transport) => {
      if (transport !== log.transports.console) {
        return message;
      }

      let match = /Full: ([\d\,\.]+) ([GMKB]+), To download: ([\d\,\.]+) ([GMKB]+)/.exec(
        message.data[0]
      );

      if (match) {
        let multiplier = 1;
        if (match[4] === 'KB') multiplier *= 1024;
        if (match[4] === 'MB') multiplier *= 1024 * 1024;
        if (match[4] === 'GB') multiplier *= 1024 * 1024 * 1024;

        diffDown = {
          percent: 0,
          bytesPerSecond: 0,
          total: Number(match[3].split(',').join('')) * multiplier,
          transferred: 0
        };

        diffDownHelper = {
          startTime: Date.now(),
          lastTime: Date.now(),
          lastSize: 0
        };

        return message;
      }

      match = /download range: bytes=(\d+)-(\d+)/.exec(message.data[0]);
      if (match) {
        const currentSize = Number(match[2]) - Number(match[1]);
        const currentTime = Date.now();
        const deltaTime = currentTime - diffDownHelper.startTime;

        diffDown.transferred += diffDownHelper.lastSize;
        diffDown.bytesPerSecond = Math.floor(
          (diffDown.transferred * 1000) / deltaTime
        );
        diffDown.percent = (diffDown.transferred * 100) / diffDown.total;

        diffDownHelper.lastSize = currentSize;
        diffDownHelper.lastTime = currentTime;

        const progressMessage = this.prepareDownloadProgressMessage(diffDown);

        this.kernel.sendStatusToWindow('download-progress', progressMessage);

        return message;
      }

      return message;
    });
  }
}
