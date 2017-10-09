<template>
  <div class="container">
    <!--主体内容操作部分-->
    <div class="content">
      <div class="main" v-loading.body="isLoading">
        <div style="padding: 20px">
          <el-form :label-position="labelPosition" label-width="80px">
            <el-form-item label="邮箱：">
              <el-input v-model="email"></el-input>
            </el-form-item>
            <el-form-item label="密码：">
              <el-input v-model="password" type="password"></el-input>
            </el-form-item>
            <el-form-item style="text-align: center">
              <el-button type="success" @click="checkInput()" style="width: 100%">立即登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!--顶部导航条-->
    <div style="position: absolute;height: auto;right: 0px;left: 0px">
      <NavTop></NavTop>
    </div>
  </div>
</template>

<script>
  import md5 from 'js-md5'
  import {api} from '../constant/api'
  import {utils} from '../constant/utils'
  import {Loading} from 'element-ui';
  import NavTop from "../components/NavTop.vue"
  export default {
    data () {
      return {
        labelPosition: 'right',
        email: "",
        password: "",
        checkcode: "",
        isLoading: false,
      }
    },
    components: {
      NavTop,
    },
    activated(){
      this.requertWebInfo();
    },
    methods: {
      //校验输入
      checkInput(){
        if (utils.isEmpty(this.email) || !utils.isEmail(this.email)) {
          this.$message({
            showClose: true,
            message: "邮箱未输入或格式不正确!",
            type: 'warning'
          });
          return;
        }
        if (utils.isEmpty(this.password)) {
          this.$message({
            showClose: true,
            message: "密码未输入!",
            type: 'warning'
          });
          return;
        }
        this.send2Login();
      },
      /********************发送登录请求****************************************/
      send2Login(){
        let _this = this
        let paras = {
          action: 'user_login',
          email: _this.email,
          password: _this.password
        }
        $.ajax({
          url: this.$api.APPURL,
          data: paras,
          type: 'post',
          async: true,
          success: function (data) {
            data = eval('(' + data + ')');
            if (data.result === "ok") {
              _this.$message("登录成功!");
              _this.$utils.saveToken(data);
              _this.$router.replace({path: "/index/pageserverlist"});
            } else {
              _this.$message(data.tips);
            }
          },
          error: function (data) {
            _this.$message("网络错误，请稍微重试!");
          }
        })
      },
      requertWebInfo(){
        let _this = this;
        let paras = {
          action: "web_info",
        }
        $.ajax({
          url: this.$api.APPURL,
          data: paras,
          type: 'post',
          async: true,
          success: function (data) {
            data = eval('(' + data + ')');
            if (data.result === "ok") {
              _this.$utils.setDocumentTitle(data.webpage_title);
            } else if (!_this.$utils.isEmpty(data.tips)) {
              _this.$message(_this.$utils.getTips(_this, data.tips));
            } else {
              _this.$message(data.result);
            }
          },
          error: function (data) {
            _this.$message(_this.$utils.getLMsg(_this).error_net);
          }
        })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" scoped="" type="text/scss">

  .container {
    height: 100%;
    width: 100%;
    min-width: 1080px;
  }

  .content {
    width: 100%;
    height: 100%;
    min-width: 1080px;
    background-image: url("../assets/images/icon_bg_login.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    left: 0px;
    top: 0px;
    bottom: 0px;
    right: 0px;
    .main {
      border-radius: 10px;
      height: 200px;
      width: 300px;
      background-color: white;
      position: absolute;
      margin-top: 120px;
      right: 240px;
    }
  }

</style>
