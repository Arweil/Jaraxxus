const utils = require('./utils.js')
const config = require('../config/index.js')

const createLintingRule = () => ({
  test: /\.(js|jsx)$/,
  loader: require.resolve('eslint-loader'),
  enforce: 'pre',
  include: [config.srcDir],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: true,
    configFile: config.eslintConfigFile,
  },
})

const baseConf = {
  resolve: {
    symlinks: false,
  },
  module: {
    rules: [
      // Disable require.ensure as it's not a standard language feature.
      {
        parser: {
          requireEnsure: false
        }
      },
      ...(config.eslintConfigFile ? [createLintingRule()] : []),
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [config.srcDir],
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: false,
            }
          },
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
}

module.exports = baseConf
