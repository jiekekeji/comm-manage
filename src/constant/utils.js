import md5 from 'js-md5'
var utils = {
  // 设置页面标题
  setDocTitle: function (title) {
    setTimeout(function () {
      document.title = title
      var iframe = document.createElement('iframe')
      iframe.src = '/manage/static/logo.png'
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

  //判断对象为undefined或null或""
  isEmpty: function (text) {
    if (typeof (text) === 'undefined' || text === null || text === '') {
      return true
    }
    return false
  },

  //验证手机号的正确性
  isPhoneNum: function (phone) {
    var reg = /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/
    if (reg.test(phone)) {
      return true
    } else {
      return false
    }
  },

  //验证邮箱的格式
  isEmail: function (email) {
    var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (reg.test(email)) {
      return true
    } else {
      return false
    }
  },

  //会话级别存对象
  saveSessionObj: function (key, obj) {
    var str = JSON.stringify(obj)
    sessionStorage.setItem(key, str)
  },

  //会话级别取对象
  getSessionObj: function (key) {
    var str = sessionStorage.getItem(key)
    return JSON.parse(str)
  },

  //生成一个 0 - 1000 之间的随机整数
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

  //设置body元素的背景颜色
  setBodyBgColor: function (color) {
    var bodys = document.getElementsByTagName("body");
    var body = bodys[0];
    body.setAttribute("bgcolor", color);
  },

  //保留两位小数
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
