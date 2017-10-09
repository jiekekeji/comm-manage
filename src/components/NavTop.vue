<template>
  <div class="container">
    <!--顶部titlebar部分-->
    <div class="nav-top">
      <p class="nav-logo">Fxcnh 管理后台</p>
      <div class="nav-right">
        <p class="nav-logout">{{phonenum}}</p>
        <el-button type="success" v-show="isLogin" @click="logout()">退出</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        phonenum: "",
        isLogin: false
      }
    },
    components: {},
    activated(){
      this.checkLogin();
    },
    methods: {
      //检测是否已登录
      checkLogin(){
        if (this.$utils.isUserLogin()) {
          this.phonenum = this.$utils.getToken().email;
          this.isLogin = true;
        } else {
          this.phonenum = "欢迎您";
          this.isLogin = false;
        }
      },
      //退出登录
      logout(){
        this.$utils.clearToken();
        this.$router.replace({path: "/login"});
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
      width: 180px;
      float: left;
      font-weight: bolder;
      color: white;
    }
    .nav-right {
      height: 100%;
      width: 420px;
      float: right;
      font-weight: bolder;
      color: white;
      p {
        height: 100%;
        width: 320px;
        text-overflow: ellipsis;
        display: inline-block;
      }
    }
  }
</style>
