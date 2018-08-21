
const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const baseConf = require('./webpack.base.conf.js')
const config = require('../config');
const utils = require('./utils');

let webpackProdConfig = merge(baseConf, {
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  mode: 'production',
  entry: [
    require.resolve('babel-polyfill'),
    config.entry
  ],
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash:8].js')
  },
  module: {
    rules: utils.baseStyleLoader({
      cssModules: config.build.cssModules,
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash:8].css')
    }),
    new OptimizeCSSPlugin(), // css优化最小化
    new HtmlWebpackPlugin({
      template: config.appHtml,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      }
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({ // 代码压缩
        uglifyOptions: {
          comments: false,
          compress: {
            warnings: false
          },
          sourceMap: config.build.productionSourceMap
        }
      })
    ],
    splitChunks: {
      chunks: 'all',
      name: 'vendors',
    }
  }
});

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackProdConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackProdConfig;
