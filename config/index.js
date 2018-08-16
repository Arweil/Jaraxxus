// const dev = require('./dev.js')
// const build = require('./prod.js')
const fs = require('fs')
const path = require('path')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

console.log(resolveApp('src/index.js'))

const dev = {
  assetsPublicPath: '/',
  assetsSubDirectory: resolveApp('static'),
  cssModules: true,
  definePluginEnv: '"development"',
  devtool: 'eval-source-map',
  // Various Dev Server settings
  host: 'localhost', // can be overwritten by process.env.HOST
  port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
  autoOpenBrowser: true,
  errorOverlay: true,
  notifyOnErrors: true,
  poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
  proxyTable: {},
  contentBase: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),

  // 因为babel 6+暂时不提供动态配置，所以直接使用babel-loader实现动态配置
  // babelPresets: [
  //   'babel-preset-es2015',
  //   'babel-preset-react'
  // ],
  // babelPlugin: [
  //   'react-hot-loader/babel'
  // ]
}

const build = {
  assetsPublicPath: resolveApp(''),
  assetsSubDirectory: resolveApp('static'),
  assetsRoot: resolveApp('dist'),
  cssModules: true,
  definePluginEnv: '"production"',
}

module.exports = {
  entry: resolveApp('src/index.js'),
  srcPath: resolveApp('src'),
  dev,
  build
}
