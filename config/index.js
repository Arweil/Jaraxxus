const fs = require('fs')
const path = require('path')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

// 获取配置信息
const config = require(resolveApp('jaraxxus.config.js'))

function isBoolean(val) {
  return Object.prototype.toString.call(val) === '[object Boolean]'
}

function isUndefined(val) {
  return Object.prototype.toString.call(val) === '[object Undefined]';
}

function isString(val) {
  return Object.prototype.toString.call(val) === '[object String]';
}

function isArray(val) {
  return Object.prototype.toString.call(val) === '[object Array]';
}

function mergeBooleanVal(defaultVal, newVal) {
  return isBoolean(newVal) ? newVal : !!newVal ? !!newVal : defaultVal
}

const confDev = config.dev || {}
let dev = {
  assetsPublicPath: !!confDev.assetsPublicPath ? confDev.assetsPublicPath : '/',
  assetsSubDirectory: !!confDev.assetsSubDirectory ? confDev.assetsSubDirectory : 'static',
  devtool: !!confDev.devtool ? confDev.devtool : 'cheap-module-eval-source-map',
  port: !!confDev.port ? confDev.port : 8080,
  autoOpenBrowser: mergeBooleanVal(false, confDev.autoOpenBrowser), // error with WDS
  errorOverlay: mergeBooleanVal(true, confDev.errorOverlay),
  poll: mergeBooleanVal(false, confDev.poll), // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
  proxyTable: confDev.proxyTable,
  hot: mergeBooleanVal(true, confDev.hot),
  contentBase: resolveApp(!!confDev.contentBase ? confDev.contentBase : ''), // error with WDS
  useEslint: mergeBooleanVal(true, confDev.useEslint),
  eslintConfigFile: !!confDev.eslintConfigFile ? confDev.eslintConfigFile : '.eslintrc',
  showEslintErrorsInOverlay: mergeBooleanVal(true, confDev.showEslintErrorsInOverlay),
  before: confDev.before, // same as devServer 'before' method
  after: confDev.after, // same as devServer 'after' method
}

const confBuild = config.build || {}
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
  srcPath: (() => {
    const srcPath = config.srcPath;

    if (isString(srcPath)) {
      return resolveApp(config.srcPath);
    } else if (isArray(srcPath)) {
      return srcPath.map((src) => {
        return resolveApp(src);
      });
    } else {
      return '';
    }
  })(),
  cssModules: mergeBooleanVal(true, config.cssModules),
  resolveExtensions: (config.resolveExtensions && config.resolveExtensions.length > 0) ? config.resolveExtensions : ['.js', '.jsx', '.ts', 'tsx'],
  resolveAlias: (() => {
    const alias = config.resolveAlias;
    const arrAliasKey = Object.keys(alias);
    if (alias && arrAliasKey.length > 0) {
      arrAliasKey.forEach((key) => {
        alias[key] = resolveApp(alias[key]);
      });
      return alias;
    } else {
      return {};
    }
  })(),
  dev,
  build
}
