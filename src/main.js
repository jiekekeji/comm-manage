// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

import {api} from "./constant/api"
import {utils} from "./constant/utils"
import {constant} from "./constant/constant"
import {pathno} from "./constant/pathno"
Vue.prototype.$api = api;
Vue.prototype.$utils = utils;
Vue.prototype.$constant = constant;
Vue.prototype.$pathno = pathno;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
