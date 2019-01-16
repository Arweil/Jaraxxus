# Jaraxxus
用此工具包可以快速创建一个React开发环境。提高项目创建效率。

## Usage
1. 目前此项目还在开发测试阶段，所以下载后需要使用npm link来创建命令；
2. 创建React项目后，在根目录添加*jaraxxus.config.js*配置文件进行webpack的基本配置；
3. *jaraxxus start* 命令用作dev环境；
4. *jaraxxus build* 命令用作项目打包。

## API
jaraxxus.config.js

```javascript
const dev = {
  assetsPublicPath: '/', // output.publicPath | devServer.publicPath
  assetsSubDirectory: 'static', // 资源目录
  devtool: 'eval-source-map', // source-map 类型
  port: 3000, // 服务启用地址
  errorOverlay: true, // devServer.overlay
  poll: false, // devServer.watchOptions.poll https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
  proxyTable: {}, // devServer.proxyTable
  useEslint: false, // 是否使用 eslint
  eslintRules: 'eslint.rules.js', // useEslint为true时生效，eslint.rules.js为根目录文件
  showEslintErrorsInOverlay: true, // eslint-loader emitWarning
  before: function(app) { // devServer.before
  },
  after: function(app) { // devServer.after
  }
}

const build = {
  assetsPublicPath: '/', // output.publicPath
  assetsSubDirectory: 'static', // 资源目录
  assetsRoot: 'dist', // 打包目录
  productionSourceMap: false, // sourcemap css + js
  bundleAnalyzerReport: true, // webpack-bundle-analyzer 是否启用
}

module.exports = {
  entry: 'src/index.js', // webpack entry
  srcPath: 'src', // 开发目录 在各loader的includes选项中使用
  appHtml: 'public/index.html', // SPA入口HTML
  cssModules: true, // 是否启用css模块化
  dev,
  build
}
```

## What means Jaraxxus
![Load Jaraxxus](https://github.com/Arweil/Jaraxxus/blob/master/jaraxxus.png)
![Infernal](https://github.com/Arweil/Jaraxxus/blob/master/infernal.png)

Jaraxxus是炉石中的一个恶魔，他非常强大，2费可以召唤一个666的地狱火。

我希望此项目也能通过简单的配置创建出强大的React项目。
