module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        publish: ['github'],
        appId: 'com.laravel-docs-app.app',
        productName: 'Laravel Docs App',
        icon: 'public/img/logomark.png',
        mac: {
          category: 'public.app-category.developer-tools',
        },
        dmg: {
          title: '${productName} ${version}',
        },
        linux: {
          target: ['snap', 'AppImage', 'deb', 'pacman', 'apk', 'rpm', 'tar.gz', 'tar.xz'],
        },
      },
    },
  },
};
