/**
 *加密处理
 */
import * as CryptoJS from 'crypto-js'
export const encryption = (params) => {
  let { data, type, param, key } = params
  const result = JSON.parse(JSON.stringify(data))
  if (type === 'Base64') {
    param.forEach((ele) => {
      result[ele] = window.btoa(result[ele])
    })
  } else {
    param.forEach((ele) => {
      var data = result[ele]
      key = CryptoJS.enc.Latin1.parse(key)
      var iv = key
      // 加密
      var encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
      })
      result[ele] = encrypted.toString()
    })
  }
  return result
}

/**
 * 检测手机号格式是否正确（11位且手机格式）
 * @param {*} mobile
 */
export const mobileCheck = (mobile) => {
  const reg = /^1[34578]\d{9}$/
  if (reg.test(mobile)) {
    return true
  } else {
    return false
  }
}
/**
 * 检测验证码格式是否正确（4位且纯数字）
 * @param {*} code
 */
export const codeCheck = (code) => {
  let reg = /^\d{4}$/
  if (reg.test(code)) {
    return true
  } else {
    return false
  }
}

/**
 * 身份证号教研
 */

export const IDNumCheck = (IDNum) => {
  let reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/
  if (reg.test(IDNum)) {
    return true
  } else {
    return false
  }
}

//防抖
let timeout = null
export const debounce = (cb, wait = 1000) => {
  if (timeout !== null) {
    clearTimeout(timeout)
  }
  timeout = setTimeout(() => {
    timeout = null
    cb && cb()
  }, wait)
}
