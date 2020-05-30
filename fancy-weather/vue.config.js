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
  ]
}
