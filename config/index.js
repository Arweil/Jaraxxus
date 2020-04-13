const _ = require('lodash');

const { appDirectory, resolveApp, isBoolean, isUndefined, isString, isArray, mergeBooleanVal } = require('./utils');
const defaultConfig = require('./defaultConfig');

// 获取配置信息
const customConfig = require(resolveApp('jaraxxus.config.js'));

const config = _.merge(defaultConfig, customConfig);

config.srcDir = (() => {
  const srcDir = config.srcDir;

  if (isString(srcDir)) {
    return resolveApp(srcDir);
  } else if (isArray(srcDir)) {
    return srcDir.map((src) => {
      return resolveApp(src);
    });
  } else {
    return '';
  }
})();

module.exports = config;
