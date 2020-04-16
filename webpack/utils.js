const path = require('path')
const config = require('../config/index')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { isString, isArray, isObject, resolveApp } = require('../config/utils');

function baseCssLoader ({ cssModules, sourceMap, extract }) {
  function MakeLoaders (arr) {
    let result = []
    let obj = {}
    for (let i = 0, len = arr.length; i < len; i++) {
      let cnfg = { loader: require.resolve(`${arr[i]}-loader`) }
      cnfg.options = {
        sourceMap: !!sourceMap
      }

      // css-loader 的模块化配置
      if (arr[i] === 'css' && !!cssModules) {
        cnfg.options.modules = !!cssModules
        cnfg.options.localIdentName = '[name]-[local]-[hash:base64:5]'
      }

      if (arr[i] === 'less') {
        cnfg.options.javascriptEnabled = true
        cnfg.options.modifyVars = config.css.lessModifyVars;
      }

      result.push(cnfg)
    }

    // style-loader 放到use数组起始位置 & 是否提取css
    if (!!extract) {
      obj.use = result
      obj.use.unshift({
        loader: require.resolve(MiniCssExtractPlugin.loader)
      })
    } else {
      obj.use = result
      obj.use.unshift({
        loader: require.resolve('style-loader'),
        options: config.css.loaderOptions.style,
      });
    }

    return obj
  }

  return {
    // style-loader 用于脚本的提取，关联html
    // css-loader 可以使脚本直接require *.css文件
    // less-loader 可以使脚本直接require *.less文件
    // postcss-loader + autoprefixer css3前缀自动补全
    // 注意loader加载顺序(style, css, postcss, less)，否则会出错
    css: MakeLoaders(['css', 'postcss']),
    less: MakeLoaders(['css', 'postcss', 'less']),
    scss: MakeLoaders(['css', 'postcss', 'sass']),
  }
}

module.exports = {
  entryHandler (defaultEntry) {
    const filtedEntry = defaultEntry.filter((item) => item);

    function resolveModules(entry) {
      let result = {};
      Object.entries(entry).map(([key, values]) => {
        return {
          [key]: values.map(item => {
            if (item.import) {
              const deepCopy = { ...item }
              deepCopy.import = resolveApp(item.import);
              return deepCopy;
            } else {
              return resolveApp(item);
            }
          }),
        };
      }).forEach((item) => {
        result = {
          ...result,
          ...item
        }
      });

      return result;
    }

    let fin = '';
    if (isString(config.entry)) {
      fin = resolveModules({
        main: [...filtedEntry, config.entry]
      });
    } else if (isArray(config.entry)) {
      fin = resolveModules({
        main: [...filtedEntry, ...config.entry]
      });
    } else if (isObject(config.entry)) {
      fin = resolveModules({
        ...config.entry,
        main: [...filtedEntry, ...config.entry.main]
      })
    }

    return fin;
  },
  assetsPath (_path) {
    return path.join(config.assetsDir, _path)
  },
  baseStyleLoader ({ cssModules, sourceMap, extract }) {
    let arrStyleLoader = ['less', 'scss', 'css'];

    let rules = [];

    for (let i = 0, len = arrStyleLoader.length; i < len; i++) {
      let config = baseCssLoader({ cssModules, sourceMap, extract })[arrStyleLoader[i]];
      config.test = new RegExp(`\\.${arrStyleLoader[i]}$`);
      rules.push(config);
    }

    return rules;
  }
}
