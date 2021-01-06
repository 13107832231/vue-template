const files = require.context('./modules', false, /\.js$/)
const modules = files.keys().reduce((obj, key) => {
  const name = key.replace(/(\.\/|\.js)/g, '')
  obj[name] = files(key).default
  return obj
}, {})

//登录
export default {
  ...modules.login,
  ...modules.search,
  ...modules.common,
  ...modules.apply,
  ...modules.organization,
  ...modules.standard,
  ...modules.evaluation,
  ...modules.base
}
