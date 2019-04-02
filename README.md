# Jaraxxus
用此工具包可以快速创建一个React开发环境。提高项目创建效率。

## Usage
* 创建React项目后，在根目录添加*jaraxxus.config.js*配置文件进行webpack的基本配置；
* *jaraxxus start* 命令用作dev环境；
* *jaraxxus build* 命令用作项目打包。
* dev环境中需要 node >= 8.10.0 & npm > 6

## API
jaraxxus.config.js

```javascript
const dev = {
  assetsPublicPath: '/', // output.publicPath | devServer.publicPath
  assetsSubDirectory: 'static', // 资源目录
  devtool: 'cheap-module-eval-source-map', // source-map 类型
  port: 8080, // 服务启用地址
  errorOverlay: true, // devServer.overlay
  poll: false, // devServer.watchOptions.poll https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
  proxyTable: {}, // devServer.proxyTable
  hot: true, // devServer.hot
  useEslint: false, // 是否使用 eslint
  eslintConfigFile: '.eslintrc', // useEslint为true时生效，eslint.rules.js为根目录文件
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
  resolveExtensions: ['.js', '.jsx'], // resolve.extensions
  dev,
  build
}
```

## 配置babel

babel.config.js
```javascript
module.exports = {
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        modules: false,
        targets: {
          browsers: [
            'last 3 versions',
            'ie >= 9',
            'ie_mob >= 10',
            'ff >= 30',
            'chrome >= 34',
            'safari >= 6',
            'opera >= 12.1',
            'ios >= 6',
            'android >= 4.4',
            'bb >= 10',
            'and_uc 9.9',
          ],
        },
      },
    ],
    require.resolve('@babel/preset-react'),
  ],
  plugins: [
    require.resolve('react-hot-loader/babel'),
    require.resolve('@babel/plugin-syntax-dynamic-import'),
    require.resolve('@babel/plugin-proposal-class-properties'),
    require.resolve('@babel/plugin-proposal-export-default-from'),
  ],
};
```

## What means Jaraxxus
![Load Jaraxxus](https://github.com/Arweil/Jaraxxus/blob/master/jaraxxus.png)
![Infernal](https://github.com/Arweil/Jaraxxus/blob/master/infernal.png)

Jaraxxus是炉石中的一个恶魔，他非常强大，2费可以召唤一个666的地狱火。

我希望此项目也能通过简单的配置创建出强大的React项目。
