module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "~@/assets/style/_init.scss";`
      }
    }
  },
  // devServer: {
  //   disableHostCheck: true,
  //   hot: true,
  //   port: '6000',
  //   public: `https://local.star.104-dev.com.tw/${BASE_URL}/${FOLDER}`,
  //   publicPath: `/${BASE_URL}/${FOLDER}/`
  // },
  // publicPath: `/${BASE_URL}/${FOLDER}/`,
  productionSourceMap: false
}
