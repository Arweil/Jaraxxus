const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const baseConf = require('./webpack.base.conf.js')
const config = require('../config');
const utils = require('./utils');
const { resolveApp } = require('../config/utils');

let webpackProdConfig = merge(baseConf, {
  devtool: config.productionSourceMap ? '#source-map' : false,
  mode: 'production',
  entry: utils.entryHandler([config.needPolyfill ? require.resolve('@babel/polyfill') : undefined]),
  output: {
    publicPath: config.publicPath,
    path: resolveApp(config.outputDir),
    filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].js')
  },
  module: {
    rules: utils.baseStyleLoader({
      cssModules: config.css.cssModules,
      sourceMap: config.css.sourceMap,
      extract: config.css.extract,
    })
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash:8].css')
    }),
    new OptimizeCSSPlugin(), // css优化最小化
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({ // 代码压缩
        uglifyOptions: {
          comments: false,
          compress: {
            warnings: false
          },
          sourceMap: config.productionSourceMap
        }
      })
    ],
    // splitChunks: {
    //   chunks: 'all',
    //   name: 'vendors',
    // }
  }
});

if (config.indexPath) {
  webpackProdConfig.plugins.push(
    new HtmlWebpackPlugin({
      template: config.indexPath,
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
  )
}

if (config.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackProdConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = merge(webpackProdConfig, config.configureWebpack);
