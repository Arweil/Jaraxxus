module.exports = {
  entry: 'src/index.js',
  needPolyfill: true,
  publicPath: '/',
  assetsDir: 'static',
  outputDir: 'dist',
  srcDir: 'src', // 开发目录
  eslintConfigFile: undefined, // eslint.rules.js为根目录文件
  indexPath: undefined,
  productionSourceMap: false,
  configureWebpack: {},
  bundleAnalyzerReport: false,
  devServer: {
    publicPath: '/',
    port: 9999,
    clientLogLevel: 'info',
    historyApiFallback: true,
    compress: true,
    hot: true,
    open: true,
    overlay: { warnings: false, errors: true },
    contentBase: undefined,
    quiet: true,
  },
  css: {
    extract: false,
    sourceMap: false,
    cssModules: false,
    lessModifyVars: {},
    loaderOptions: {
      style: {}, // style-loader options
    }
  }
}
