<!--左侧菜单栏-->
<template>
  <div class="container">
    <el-col>
      <el-menu :default-active="defaultMenu" class="el-menu-vertical-demo" theme="dark"
               :router="true" :unique-opened="true">
        <el-submenu index="1">
          <template slot="title">系统管理</template>
          <el-menu-item index="/index/pageserverlist" style="width: 180px">服务器列表</el-menu-item>
          <el-menu-item index="/index/pageuserlist" style="width: 180px">用户列表</el-menu-item>
          <el-menu-item index="/index/pagesignallist" style="width: 180px">信号列表</el-menu-item>
          <el-menu-item index="/index/pagefollowerlist" style="width: 180px">跟单列表</el-menu-item>
          <el-menu-item index="/index/pagemodellist" style="width: 180px">模板列表</el-menu-item>
          <el-menu-item index="/index/pagehostlist" style="width: 180px">VPS列表</el-menu-item>
          <el-menu-item index="/index/pageterminallist" style="width: 180px">客户端列表</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">代理及佣金</template>
          <el-menu-item index="/index/pageagentcommlist" style="width: 180px">代理佣金</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
  import {api} from '../constant/api'
  export default {
    data () {
      return {
        defaultMenu: "/index/warehouselist"
      }
    },
    components: {},
    activated(){
      this.switchMenuByPath();
    },
    beforeRouteLeave (to, from, next) {
      next();
    },
    methods: {
      //根据路径修改菜单
      switchMenuByPath(){
        let currentPath = this.$router.currentRoute.path;
        if (currentPath === "/index/pageserverlist") {
          this.defaultMenu = "/index/pageserverlist";
        } else if (currentPath === "/index/pageuserlist") {
          this.defaultMenu = "/index/pageuserlist";
        } else if (currentPath === "/index/pagefollowerlist") {
          this.defaultMenu = "/index/pagefollowerlist";
        } else if (currentPath === "/index/pagehostlist") {
          this.defaultMenu = "/index/pagehostlist";
        } else if (currentPath === "/index/pagemodellist") {
          this.defaultMenu = "/index/pagemodellist";
        } else if (currentPath === "/index/pagesignallist") {
          this.defaultMenu = "/index/pagesignallist";
        } else if (currentPath === "/index/pageterminallist") {
          this.defaultMenu = "/index/pageterminallist";
        } else if (currentPath === "/index/pageagentcommlist") {
          this.defaultMenu = "/index/pageagentcommlist";
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" scoped="" type="text/scss">

  .container {
    height: 100%;
    width: 100%;
  }

</style>
