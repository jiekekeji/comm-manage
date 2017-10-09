import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/components/Index'
import Login from "../components/Login.vue"
import PageServerList from "../components/PageServerList.vue"
import PageServerAdd from "../components/PageServerAdd"
import PageUserList from "../components/PageUserList"
import PageSignalList from "../components/PageSignalList"
import PageFollowerList from "../components/PageFollowerList"
import PageHostList from "../components/PageHostList"
import PageModelList from "../components/PageModelList"
import PageTerminalList from "../components/PageTerminalList"
import PageServerModify from "../components/PageServerModify.vue"
import PageHostAdd from "../components/PageHostAdd.vue"
import PageModelModify from "../components/PageModelModify.vue"
import PageAgentCommList from "../components/PageAgentCommList.vue"
import PageUserModify from "../components/PageUserModify.vue"
import {utils} from '../constant/utils'

Vue.use(VueRouter)

//路由映射配置
const routes = [
  {
    path: '/',
    redirect: '/index/pageserverlist'
  },
  {
    path: "/pageserveradd",
    component: PageServerAdd
  },
  {
    path: "/pageservermodify",
    component: PageServerModify
  },
  {
    path: "/pagehostadd",
    component: PageHostAdd
  },
  {
    path: "/pagemodelmodify",
    component: PageModelModify
  },
  {
    path: "/pageusermodify",
    component: PageUserModify
  },
  {
    path: '/index',
    name: 'Index',
    component: Index,
    children: [
      {
        path: "pageserverlist",
        component: PageServerList
      },
      {
        path: "pageuserlist",
        component: PageUserList
      },
      {
        path: "pageagentcommlist",
        component: PageAgentCommList
      },
      {
        path: "pagesignallist",
        component: PageSignalList
      },
      {
        path: "pagefollowerlist",
        component: PageFollowerList
      },
      {
        path: "pagemodellist",
        component: PageModelList
      },
      {
        path: "pagehostlist",
        component: PageHostList
      },
      {
        path: "pageterminallist",
        component: PageTerminalList
      }
    ]
  },
  {
    path: "/login",
    name: 'Login',
    component: Login,
  },
]

//创建实例
const router = new VueRouter({
  routes
})

//全局导航钩子
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next();
    return;
  }

  if (!utils.isUserLogin()) {
    next("/login");
    return;
  }
  next();
})

router.afterEach(route => {
})


//导出实例
export default router
