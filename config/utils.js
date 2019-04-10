function isBoolean(val) {
  return Object.prototype.toString.call(val) === '[object Boolean]'
}

function isUndefined(val) {
  return Object.prototype.toString.call(val) === '[object Undefined]';
}

function isString(val) {
  return Object.prototype.toString.call(val) === '[object String]';
}

function isArray(val) {
  return Object.prototype.toString.call(val) === '[object Array]';
}

function mergeBooleanVal(defaultVal, newVal) {
  return isBoolean(newVal) ? newVal : !!newVal ? !!newVal : defaultVal
}

const appDirectory = fs.realpathSync(process.cwd())

const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
  appDirectory,

  resolveApp,

  isBoolean,
  isUndefined,
  isString,
  isArray,

  mergeBooleanVal,
}