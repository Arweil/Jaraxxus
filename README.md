# Jaraxxus
用此工具包可以快速创建一个React开发环境。提高项目创建效率。

## Usage
* 创建React项目后，在根目录添加*jaraxxus.config.js*配置文件进行webpack的基本配置；
* *jaraxxus start* 命令用作dev环境；
* *jaraxxus build* 命令用作项目打包。
* dev环境中需要 node >= 8.10.0

## API
jaraxxus.config.js

```javascript
module.exports = {
  entry: 'src/index.js', // webpack entry
  needPolyfill: true, // 是否需要自动引入polyfill
  publicPath: '/', // output.publicPath
  assetsDir: 'static', // 资源目录
  outputDir: 'dist', // 打包目录
  srcDir: 'src', // 开发目录
  eslintConfigFile: undefined, // eslint.rules.js为根目录文件
  indexPath: undefined, // SPA入口HTML
  productionSourceMap: false, // 生成环境是否需要sourcemap js
  configureWebpack: {}, // webpack 配置，最后通过webpack-merge合并配置
  bundleAnalyzerReport: false, // webpack-bundle-analyzer 是否启用
  devServer: { // 和devServer配置相同，可以全量配置
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
    extract: false, // 是否需要在生产环境提取css打包
    cssModules: false, // 是否启用css模块化
    sourceMap: false, // css sourceMap
    lessModifyVars: {}, // less modifyVars 配置
    loaderOptions: {
      style: {}, // style-loader options
    }
  }
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
    [
      require.resolve('@babel/preset-react'),
      {
        development: process.env.NODE_ENV === 'development',
        useBuiltIns: true,
      },
    ],
    require.resolve('@babel/preset-typescript'), // support ts
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
