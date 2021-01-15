## v3.1.1
1. npm包版本升级，导致一些API的变更
2. 移除了*thread-loader*对样式的处理（因为部分冲突），postcss加入了默认plugins，依旧支持*postcss.config.js*的支持，使用*postcss.config.js*会全量覆盖默认配置
3. 添加*babel-loader*的默认处理，依旧支持*babel.config.js*的配置，使用*babel.config.js*会全量覆盖默认配置
