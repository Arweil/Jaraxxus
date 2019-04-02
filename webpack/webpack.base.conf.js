const utils = require('./utils.js')
const config = require('../config/index.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const createLintingRule = () => ({
  test: /\.(js|jsx)$/,
  loader: require.resolve('eslint-loader'),
  enforce: 'pre',
  include: [config.srcPath],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay,
    configFile: config.dev.eslintConfigFile,
  },
})

const babelLoader = {
  loader: require.resolve('babel-loader'),
  options: {
    cacheDirectory: false,
  }
}

const baseConf = {
  resolve: {
    alias: config.resolveAlias,
    symlinks: false,
    extensions: config.resolveExtensions,
  },
  module: {
    rules: [
      // Disable require.ensure as it's not a standard language feature.
      {
        parser: {
          requireEnsure: false
        }
      },
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.ts(x?)$/,
        include: [config.srcPath],
        use: [
          babelLoader,
          {
            loader: require.resolve('ts-loader'),
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        include: [config.srcPath],
        use: [
          babelLoader,
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
  ]
}

module.exports = baseConf
