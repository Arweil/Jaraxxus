/**
 * 此文件只对rules进行自定义编写，
 * config, plugins, formatter均在Jaraxxus中配置完毕
 * 
 * config:
 *  eslint-config-airbnb
 *  eslint-config-react-app
 * plugins:
 *  eslint-plugin-flowtype
 *  eslint-plugin-import
 *  eslint-plugin-jsx-a11y
 *  eslint-plugin-react
 * formatter:
 *  eslint-friendly-formatter
 */

module.exports = {
  'import/no-unresolved': 'off',
  'jsx-a11y/href-no-hash': 'off',
  'react/jsx-filename-extension': 'off',
  'react/prefer-stateless-function': 'off'
}
