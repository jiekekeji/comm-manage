import Vue from 'vue'
import VueRouter from 'vue-router'
import Container from "../components/Container.vue"
import Plogin from "../components/Plogin.vue"
Vue.use(VueRouter)

//路由映射配置
const routes = [
  {
    path: "/plogin",
    component: Plogin,
  },
  {
    path: '/container',
    component: Container,
  }
]

//创建实例
const router = new VueRouter({
  routes
})

//全局导航钩子,路由进入之前
router.beforeEach((to, from, next) => {
  // if (to.path === "/login") {
  //   next();
  //   return;
  // }
  //
  // if (!utils.isUserLogin()) {
  //   next("/login");
  //   return;
  // }
  // next();
})

router.afterEach(route => {
})


export default router
