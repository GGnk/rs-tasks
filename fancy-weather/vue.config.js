module.exports = {
  productionSourceMap: false,
  publicPath: './',

  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "@/main.scss";',
      },
    },
  },

  transpileDependencies: [
    "vuetify"
  ],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
