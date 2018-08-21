const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackDevServer = require('webpack-dev-server')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const baseConf = require('./webpack.base.conf.js')
const config = require('../config/index.js')
const utils = require('./utils.js')

const devConf = merge(baseConf, {
  // 会将 process.env.NODE_ENV 的值设为 development
  // 启用 NamedChunksPlugin 和 NamedModulesPlugin
  mode: 'development',
  entry: [
    require.resolve('babel-polyfill'),
    require.resolve('webpack-dev-server/client') + '?/',
    require.resolve('webpack/hot/dev-server'),
    config.entry
  ],
  output: {
    path: config.build.assetsRoot,
    publicPath: config.dev.assetsPublicPath
  },
  devtool: config.dev.devtool, // 配置生成Source Maps，选择合适的选项
  module: {
    rules: utils.baseStyleLoader({
      cssModules: config.dev.cssModules,
      sourceMap: true,
      extract: false
    })
  },
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    contentBase: config.dev.contentBase,
    host: config.dev.host,
    port: config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: config.appHtml,
      inject: true
    }),
  ]
})

const server = new webpackDevServer(webpack(devConf), devConf.devServer)

server.listen(config.dev.port, '0.0.0.0', () => {
  console.log(`Starting server on http://localhost:${config.dev.port}`)
})
