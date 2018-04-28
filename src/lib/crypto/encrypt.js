/**
 * 签名工具类
 * @see https://github.com/brix/crypto-js
 */
import CryptoJS from 'crypto-js/core'
import MD5 from 'crypto-js/md5'

let encrypt = {}
let getMd5Str = function(obj) {
  if (typeof (obj) === 'object') {
    let keys = []
    for (let key in obj) {
      if (obj[key] !== '') {
        keys.push(key)
      }
    }
    if (keys.length) {
      keys.sort()
      let md5Str = ''
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i]
        if (obj[key] != null) {
          let value = md5Obj(obj[key])
          if (value != null) {
            md5Str += '&' + key + '=' + value
          }
        }
      }
      return md5Str ? md5Str.substring(1) : ''
    }
  }
  return ''
}
/**
 * 获取MD5签名
 */
let md5 = function(str) {
  return MD5(str).toString(CryptoJS.enc.Hex)
}
/**
 * 获取对象的MD5值
 */
let md5Obj = function(obj) {
  if (typeof (obj) === 'object') {
    let md5Str = getMd5Str(obj)
    if (md5Str) {
      return md5(md5Str)
    }
  } else {
    return obj
  }
}

function trimAll(obj) {
  if (typeof (obj) === 'string') {
    return obj.replace(/(^\s*)|(\s*$)/g, '')
  }
}
/**
 * 自定义MD5签名
 */
encrypt.sign = function(obj, signKey) {
  // 加如果uid为空，把tokrn置为固定token
  let _params = {}
  for (let i in obj) {
    // 先去掉前后空格
    if (typeof (obj[i]) === 'string') {
      obj[i] = trimAll(obj[i])
    }
    if ((obj[i] !== '' && obj[i] !== null) && (i !== 'token')) {
      // 中文encodeURIComponent
      if (/[+\u4e00-\u9fa5]/gm.test(obj[i])) {
        _params[i] = encodeURIComponent(obj[i])
      } else {
        _params[i] = obj[i]
      }
    }
  }
  obj = _params
  let md5Str = getMd5Str(obj)
  let finalStr = ''
  if (md5Str) {
    finalStr = md5Str + '&' + signKey
  } else {
    finalStr = signKey
  }
  let salt = md5(finalStr).toUpperCase()
  return $.extend(obj, {
    'salt': salt
  })
}
export default encrypt
