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
  assetsSubDirectory: !!confDev.assetsSubDirectory ? confDev.assetsSubDirectory : 'static',
  devtool: !!confDev.devtool ? confDev.devtool : 'eval-source-map',
  port: !!confDev.port ? confDev.port : 8080,
  autoOpenBrowser: mergeBooleanVal(false, confDev.autoOpenBrowser),
  errorOverlay: mergeBooleanVal(true, confDev.errorOverlay),
  poll: mergeBooleanVal(false, confDev.poll), // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
  proxyTable: confDev.proxyTable,
  contentBase: resolveApp(!!confDev.contentBase ? confDev.contentBase : ''),
  useEslint: mergeBooleanVal(true, confDev.useEslint),
  showEslintErrorsInOverlay: mergeBooleanVal(true, confDev.showEslintErrorsInOverlay),
  before: confDev.before, // same as devServer 'before' method
  after: confDev.after, // same as devServer 'after' method
}
dev.eslintRules = dev.useEslint ? require(resolveApp('eslint.rules.js')) : {}

const confBuild = config.build
const build = {
  assetsPublicPath: !!confBuild.assetsPublicPath ? confBuild.assetsPublicPath : '/',
  assetsSubDirectory: !!confBuild.assetsSubDirectory ? confBuild.assetsSubDirectory : 'static',
  assetsRoot: resolveApp(!!confBuild.assetsRoot ? confBuild.assetsRoot : 'dist'),
  productionSourceMap: mergeBooleanVal(false, confBuild.productionSourceMap),
  bundleAnalyzerReport: mergeBooleanVal(true, confBuild.bundleAnalyzerReport),
}

module.exports = {
  entry: resolveApp(config.entry),
  appHtml: resolveApp(config.appHtml),
  srcPath: resolveApp(config.srcPath),
  cssModules: mergeBooleanVal(true, config.cssModules),
  dev,
  build
}
