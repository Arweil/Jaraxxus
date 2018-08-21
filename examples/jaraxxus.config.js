const dev = {
  assetsPublicPath: '/',
  assetsSubDirectory: 'static',
  cssModules: true,
  devtool: 'eval-source-map',
  port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
  autoOpenBrowser: true,
  errorOverlay: true,
  notifyOnErrors: true,
  poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
  proxyTable: {},
  contentBase: 'public',
  appHtml: 'public/index.html'
}

const build = {
}

module.exports = {
  entry: 'src/index.js',
  srcPath: 'src',
  dev,
  build
}
