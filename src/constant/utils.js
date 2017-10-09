import md5 from 'js-md5'
var utils = {
  // 设置页面标题
  setDocumentTitle: function (title) {
    'use strict'
    setTimeout(function () {
      document.title = title
      var iframe = document.createElement('iframe')
      // 打包时
      iframe.src = '/manage/static/logo.png' // 必须
      // iframe.src = '../../static/public/logo.png' // 必须
      iframe.style.visibility = 'hidden'
      iframe.style.width = '1px'
      iframe.style.height = '1px'
      iframe.onload = function () {
        setTimeout(function () {
          document.body.removeChild(iframe)
        }, 0)
      }
      document.body.appendChild(iframe)
    }, 0)
  },

  /**
   * 判断是否为空
   * @param text
   * @returns {boolean}
   */
  isEmpty: function (text) {
    if (typeof (text) === 'undefined' || text === null || text === '') {
      return true
    }
    return false
  },

  /**
   * 正则校验手机号
   * @param phoneNum
   * @returns {boolean}
   */
  isPhoneNum: function (phoneNum) {
    var reg = /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/
    if (reg.test(phoneNum)) {
      return true
    } else {
      return false
    }
  },

  /**
   * 验证是否为邮箱
   * @param phoneNum
   * @returns {boolean}
   */
  isEmail: function (email) {
    var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (reg.test(email)) {
      return true
    } else {
      return false
    }
  },

  /**
   * 获取对应语言的值
   * that :VueI18n对象
   * key：对应的语言
   * @returns {boolean}
   */
  getLMsg: function (that) {
    let la = that._i18n.locale;
    if (la === "zh") {
      return that._i18n.messages.zh.message;
    } else {
      return that._i18n.messages.en.message;
    }
  },

  /**
   * 会话级别存对象
   * @param key
   * @param obj
   */
  saveSessionObj: function (key, obj) {
    var str = JSON.stringify(obj)
    sessionStorage.setItem(key, str)
  },

  /**
   * 会话级别取对象
   * @param key
   */
  getSessionObj: function (key) {
    var str = sessionStorage.getItem(key)
    return JSON.parse(str)
  },


  /**
   * 保存登录的token信息
   * @param token
   */
  saveToken: function (token) {
    this.saveSessionObj('token', token)
  },

  /**
   *获取保存的token
   */
  getToken: function () {
    return this.getSessionObj('token')
  },

  /**
   * 清楚token信息
   */
  clearToken: function () {
    sessionStorage.removeItem('token')
  },

  /**
   * 判断用户是否已登录
   */
  isUserLogin: function () {
    let token = this.getToken()
    if (this.isEmpty(token)) {
      return false
    }
    return true
  },

  /**
   * 生成一个 0 - 1000 之间的随机整数
   * @returns {Number}
   */
  getRandom: function () {
    let s = []
    let hexDigits = '0123456789abcdef'
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4'  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-'

    let uuid = s.join('')
    let tm = parseInt(new Date().getTime() / 1000)
    return uuid + '-' + tm
  },

  /**
   * 获取随机键
   * @param random
   * @returns {*}
   */
  getRandomkey: function (random) {
    let userid = this.getToken().userid
    let userkey = this.getToken().userkey
    return md5('' + userid + random + userkey + userid + random + userkey)
  },


  //设置body元素的背景颜色
  setBodyBgColor: function (color) {
    $("body").css("background-color", color);
  },

  /**
   * 保留两位小数
   * @param x
   * @returns {*}
   */
  toDecimal2: function (x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
      return false;
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + 2) {
      s += '0';
    }
    return s;
  }
}

export {utils}
