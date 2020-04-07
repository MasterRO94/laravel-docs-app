module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'com.laravel-docs-app.app',
        productName: 'Laravel Docs App',
        mac: {
          category: 'public.app-category.developer-tools',
          icon: 'public/img/logomark.png'
        },
      }
    }
  }
}
