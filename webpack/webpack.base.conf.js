const utils = require('./utils.js')
const config = require('../config/index.js')

const createLintingRule = () => ({
  test: /\.(js|jsx)$/,
  loader: require.resolve('eslint-loader'),
  enforce: 'pre',
  include: [config.srcPath],
  options: {
    formatter: require('eslint-friendly-formatter'),
    baseConfig: {
      parser: require.resolve('babel-eslint'),
      env: {
        browser: true
      },
      extends: [
        require.resolve('eslint-config-airbnb')
      ],
      plugins: [
        'import',
        'jsx-a11y',
        'react'
      ],
      rules: config.dev.eslintRules
    },
    useEslintrc: false,
    emitWarning: !config.dev.showEslintErrorsInOverlay
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
})

const baseConf = {
  resolve: {
    alias: {
      '@': config.srcPath,
    },
    symlinks: false
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
        test: /\.(js|jsx)$/,
        loader: require.resolve('babel-loader'),
        include: [config.srcPath],
        options: {
          cacheDirectory: false
        }
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
  }
}

module.exports = baseConf
