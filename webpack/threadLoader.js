const threadLoader = require('thread-loader');
const config = require('../config/index');

const isWatch = config.devServer.watch;

const workerPoolJS = {
  poolTimeout: isWatch ? Infinity : 2000,
};

const workerPoolSass = {
  workerParallelJobs: 2,
  poolTimeout: isWatch ? Infinity : 2000,
};

const workerPoolLess = {
  poolTimeout: isWatch ? Infinity : 2000,
}

function initThreadLoader() {
  threadLoader.warmup(workerPoolJS, ['babel-loader']);
  // TODO: has issus about css-loader & less-loader https://github.com/webpack-contrib/thread-loader/issues/96 postcss will not run.
  // threadLoader.warmup(workerPoolSass, ['sass-loader', 'css-loader']);
  // threadLoader.warmup(workerPoolLess, ['less-loader', 'css-loader']);
}

module.exports = {
  initThreadLoader,
  workerPoolJS,
  // workerPoolSass,
  // workerPoolLess,
}
