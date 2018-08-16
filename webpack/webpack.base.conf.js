const utils = require('./utils.js')
const config = require('../config/index.js')

function babelDynamicConfig (configArr) {
  let arr = []
  configArr.forEach((item) => {
    arr.push(require.resolve(item))
  })
  return arr
}

const baseConf = {
  resolve: {
    alias: {
      '@': config.srcPath,
    }
  },
  module: {
    rules: [
      // Disable require.ensure as it's not a standard language feature.
      {
        parser: {
          requireEnsure: false
        }
      },
      // ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [config.srcPath],
        options: {
          cacheDirectory: true,
          // babelrc: false,
          // presets: babelDynamicConfig(config.dev.babelPresets),
          // plugins: babelDynamicConfig(config.dev.babelPlugin)
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}

module.exports = baseConf
