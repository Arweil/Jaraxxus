const webpack = require('webpack')
const merge = require('webpack-merge')
const ora = require('ora')
const chalk = require('chalk');
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
    require.resolve('@babel/polyfill'),
    require.resolve('webpack-dev-server/client') + '?/',
    require.resolve('webpack/hot/dev-server'),
    config.entry
  ],
  output: {
    publicPath: config.dev.assetsPublicPath
  },
  devtool: config.dev.devtool, // 配置生成Source Maps，选择合适的选项
  module: {
    rules: utils.baseStyleLoader({
      cssModules: config.cssModules,
      sourceMap: true,
      extract: false
    })
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: config.appHtml,
      inject: true
    }),
  ]
})

const devServerConf = {
  clientLogLevel: 'info',
  historyApiFallback: true,
  hot: config.dev.hot, 
  compress: true, // gzip压缩
  contentBase: config.dev.contentBase, // https://github.com/webpack/webpack-dev-server/issues/362
  host: config.dev.host,
  port: config.dev.port,
  open: config.dev.autoOpenBrowser, // https://github.com/webpack/webpack-dev-server/issues/1510
  overlay: config.dev.errorOverlay
    ? { warnings: false, errors: true }
    : false,
  publicPath: config.dev.assetsPublicPath,
  proxy: config.dev.proxyTable,
  quiet: true, // necessary for FriendlyErrorsPlugin
  watchOptions: {
    poll: config.dev.poll,
  },
  before: config.dev.before,
  after: config.dev.after
}

const compiler = webpack(devConf)
const server = new webpackDevServer(compiler, devServerConf)

let spinner; 

server.listen(config.dev.port, '0.0.0.0', () => {
  console.log(`🥛  Start server on http://localhost:${config.dev.port}`)

  spinner = ora('compiling for development...');
  spinner.start();
})

compiler.hooks.done.tap('CompilerProgressPlugins', function (stats) {
  spinner.stop();
  console.log(chalk.cyan('compiling complete.'));
})
