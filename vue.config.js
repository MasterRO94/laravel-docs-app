module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
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
          target: ['AppImage', 'deb', 'pacman', 'apk', 'tar.gz'],
        },
      },
    },
  },
};
