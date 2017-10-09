<!--商品基本信息添加-->
<template>
  <div class="container">
    <div style="position: fixed;top: 0;right: 0px;left: 0px;z-index: 100">
      <NavTop></NavTop>
    </div>

    <div class="nav-page">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index/pageserverlist' }" :replace="true">服务器列表</el-breadcrumb-item>
        <el-breadcrumb-item>服务器信息编辑</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!--基本信息-->
    <div class="content1">
      <div class="left">
        <h3>服务器信息:</h3>
      </div>
      <div class="right">
        <div style="margin-right: 20px;margin-top: 5px">
          <el-form label-width="120px">
            <el-form-item label="交易商：">
              <el-input v-model="brokername"></el-input>
            </el-form-item>
            <el-form-item label="服务器：">
              <el-input v-model="servername"></el-input>
            </el-form-item>
            <el-form-item label="类型：">
              <el-select v-model="type" style="width: 100%" placeholder="请选择" @change="listenState">
                <el-option
                  v-for="item in types"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!--确认提交-->
    <div class="submit-area">
      <el-button type="success" style="height: 48px;width: 120px" @click="submitData()">{{btnTx}}</el-button>
      <el-button type="success" style="height: 48px;width: 120px" @click="closePage()">取消并关闭</el-button>
    </div>
  </div>
</template>

<script>
  import {api} from '../constant/api'
  import {utils} from '../constant/utils'
  import {Loading} from 'element-ui';
  import NavTop from "../components/NavTop.vue"
  export default {
    data () {
      return {
        brokername: "",
        servername: "",
        isModify: false,
        btnTx: "确认新增",
        serverid: "",
        types: [
          {
            value: "0",
            label: '真实'
          },
          {
            value: "1",
            label: '模拟'
          }
        ],
        type: "0"
      }
    },
    components: {
      NavTop
    },
    activated(){
    },
    deactivated () {
      this.$destroy(true)
    },
    beforeRouteLeave (to, from, next) {
      sessionStorage.removeItem("commdity")
      next();
    },
    methods: {
      submitData(){
        if (utils.isEmpty(this.brokername)) {
          this.$message("交易商未填写!");
          return;
        }
        if (utils.isEmpty(this.servername)) {
          this.$message("服务器未填写!");
          return;
        }
        this.addNewPdData();
      },
      listenState(value){
        this.type = value;
      },
      //关闭当前页面
      closePage(){
        this.$router.go(-1);
      },
      addNewPdData(){
        let userid = utils.getToken().userid;
        let random = utils.getRandom();
        let randomkey = utils.getRandomkey(random);
        var _this = this
        var paras = {
          action: "sys_server_add",
          userid: userid,
          random: random,
          randomkey: randomkey,
          brokername: _this.brokername,
          servername: _this.servername,
          demo: _this.type
        }
        $.ajax({
          traditional: true,
          url: api.APPURL,
          data: paras,
          type: 'post',
          async: true,
          success: function (data) {
            _this.handleAddNewPdData(data);
          },
          error: function (data) {
            _this.$message("添加失败!");
          }
        })
      },
      //处理返回的数据
      handleAddNewPdData(data){
        data = eval('(' + data + ')');
        if (data.result === "ok") {
          this.$message("新增成功!");
          this.$router.go(-1);
        } else {
          if (!utils.isEmpty(data.tips)) {
            this.$message(data.tips);
            return;
          }
          this.$message(data.result);
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

  .nav-page {
    width: 1080px;
    margin: 0 auto;
    margin-top: 48px;
    height: 36px;
    border: 1px dashed lightgray;
    > div {
      padding-left: 5px;
      height: 36px;
      line-height: 36px;
      font-size: 16px;
    }
  }

  .content1 {
    width: 1080px;
    min-height: 120px;
    height: auto;
    margin: 0 auto;
    margin-top: 10px;
    border: 1px dashed lightgray;
    .left {
      width: 118px;
      height: 100%;
      display: inline-block;
      float: left;
      h3 {
        height: 48px;
        text-align: center;
        background-color: darksalmon;
        line-height: 48px;
      }
    }
    .right {
      border-left: 1px dashed lightgray;
      width: 960px;
      height: auto;
      min-height: 120px;
      display: inline-block;
    }
  }

  //相册部分样式
  .content2 {
    margin-top: -1px;
    width: 1080px;
    height: auto;
    margin: 0 auto;
    border: 1px dashed lightgray;
    .left {
      width: 118px;
      height: 100%;
      display: inline-block;
      float: left;
      h3 {
        height: 48px;
        text-align: center;
        background-color: darksalmon;
        line-height: 48px;
      }
    }
    .right {
      border-left: 1px dashed lightgray;
      width: 940px;
      height: auto;
      display: inline-block;
      padding: 10px;
      .xc-list {
        height: auto;
        width: auto;
        li {
          height: 150px;
          width: 150px;
          display: inline-block;
          float: left;
          margin-left: 5px;
        }
      }
      .fileupload-button {
        display: inline-block;
        margin-left: 8px;
        margin-top: 5px;
        height: 138px;
        width: 138px;
        position: relative;
        overflow: hidden;
        display: inline-block;
        color: #fff;
        border: 1px solid #4cae4c;
        background-color: white;
        border-radius: 3px;
        color: #4cae4c;
        font-size: 14px;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        cursor: pointer;
        line-height: 150px;
        input {
          height: 0px;
          width: 0px;
          display: none;
        }
        label {
          display: block;
          position: absolute;
          top: 0px;
          left: 0px;
          right: 0;
          bottom: 0;
        }
      }
    }
  }

  //图文
  .content4 {
    margin-top: -1px;
    width: 1080px;
    height: auto;
    margin: 0 auto;
    border: 1px dashed lightgray;
    .left {
      width: 118px;
      height: 100%;
      display: inline-block;
      float: left;
      h3 {
        height: 48px;
        text-align: center;
        background-color: darksalmon;
        line-height: 48px;
      }
    }
    .right {
      border-left: 1px dashed lightgray;
      width: 940px;
      height: auto;
      display: inline-block;
      padding: 10px;

    }
  }

  //图文列表
  .right-title {
    height: 48px;
    width: 100%;
    background-color: lightgray;
    position: relative;
    .btn-title-add {
      position: absolute;
      right: 12px;
      top: 12px;
    }
  }

  .img-tx {
    height: auto;
    width: 100%;
    margin-top: 5px;
    li {
      height: auto;
      width: 100%;
      position: relative;
      .tx {
        height: 156px;
        width: 540px;
        display: inline-block;
      }
      .img {
        width: 380px;
        height: 156px;
        display: inline-block;
        float: right;
        position: relative;
        .fileupload-button {
          display: inline-block;
          height: 142px;
          width: 146px;
          position: absolute;
          overflow: hidden;
          display: inline-block;
          color: #fff;
          border: 1px solid #4cae4c;
          background-color: white;
          border-radius: 3px;
          bottom: 10px;
          right: 60px;
          color: #4cae4c;
          font-size: 14px;
          font-weight: 400;
          text-align: center;
          white-space: nowrap;
          vertical-align: middle;
          cursor: pointer;
          line-height: 150px;
          input {
            height: 0px;
            width: 0px;
            display: none;
          }
          label {
            display: block;
            position: absolute;
            top: 0px;
            left: 0px;
            right: 0;
            bottom: 0;
          }
        }
      }
      .btn-tx-min {
        position: absolute;
        right: 12px;
        top: 60px;
      }
    }
  }

  //提交按钮
  .submit-area {
    height: 180px;
    width: 1080px;
    margin: 0 auto;
    line-height: 180px;
    text-align: center;
  }
</style>
