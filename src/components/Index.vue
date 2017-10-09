<template>
  <div class="container">
    <!--顶部titlebar部分-->
    <NavTop></NavTop>

    <!--主体内容部分-->
    <div class="content">
      <!--左边菜单导航-->
      <div class="content-left">
        <NavLeft></NavLeft>
      </div>

      <!--右侧操作部分-->
      <div class="content-right" id="content-right">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
  import NavTop from "../components/NavTop.vue"
  import NavLeft from "../components/NavLeft.vue"
  import {api} from '../constant/api'
  export default {
    data () {
      return {}
    },
    components: {
      NavLeft,
      NavTop
    },
    activated(){

    },
    beforeRouteLeave (to, from, next) {
      next();
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" scoped="" type="text/scss">

  .container {
    height: 100%;
    width: 100%;
  }

  /*顶部导航*/
  .nav-top {
    height: 48px;
    width: 100%;
    min-width: 1080px;
    background-color: #373D41;
    text-align: center;
    line-height: 48px;
    .nav-logo {
      height: 100%;
      width: 120px;
      float: left;
    }
    .nav-right {
      height: 100%;
      width: 120px;
      float: right;
    }
  }

  /*主体内容部分*/
  .content {
    position: absolute;
    top: 48px;
    bottom: 0px;
    min-width: 1080px;
    width: 100%;
    display: flex;
    .content-left {
      height: 100%;
      /*min-height: 660px;*/
      width: 200px;
      background-color: #324157;
    }
    .content-right {
      flex-grow: 1;
      min-width: 880px;
    }
  }


</style>
