const fs = require('fs')
const path = require('path')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

// 获取配置信息
const config = require(resolveApp('jaraxxus.config.js'))

function isBoolean (val) {
  return Object.prototype.toString.call(val) === '[object Boolean]'
}

function mergeBooleanVal (defaultVal, newVal) {
  return isBoolean(newVal) ? newVal : !!newVal ? !!newVal : defaultVal
}

const confDev = config.dev
let dev = {
  assetsPublicPath: !!confDev.assetsPublicPath ? confDev.assetsPublicPath : '/',
  assetsSubDirectory: resolveApp(!!confDev.assetsSubDirectory ? confDev.assetsSubDirectory : 'static'),
  cssModules: mergeBooleanVal(true, confDev.cssModules),
  devtool: !!confDev.devtool ? confDev.devtool : 'eval-source-map',
  port: !!confDev.port ? confDev.port : 8080,
  autoOpenBrowser: mergeBooleanVal(true, confDev.autoOpenBrowser),
  errorOverlay: mergeBooleanVal(true, confDev.errorOverlay),
  notifyOnErrors: mergeBooleanVal(true, confDev.notifyOnErrors),
  poll: mergeBooleanVal(false, confDev.poll), // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
  proxyTable: confDev.proxyTable,
  contentBase: resolveApp(!!confDev.contentBase ? confDev.contentBase : 'public'),
  useEslint: mergeBooleanVal(true, confDev.useEslint),
  showEslintErrorsInOverlay: mergeBooleanVal(true, confDev.showEslintErrorsInOverlay),
  before: confDev.before, // same as devServer 'before' method
  after: confDev.after, // same as devServer 'after' method
}
dev.eslintRules = dev.useEslint ? require(resolveApp('eslint.rules.js')) : {}

const build = {
  assetsPublicPath: resolveApp(''),
  assetsSubDirectory: 'static',
  assetsRoot: resolveApp('dist'),
  cssModules: true,
  productionSourceMap: true,
  bundleAnalyzerReport: true
}

module.exports = {
  entry: resolveApp(config.entry),
  appHtml: resolveApp(config.appHtml),
  srcPath: resolveApp(config.srcPath),
  dev,
  build
}
