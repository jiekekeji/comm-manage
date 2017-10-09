<!--订单列表-->
<template>
  <div class="container" id="container-orderlist">
    <!--数据列表的操作区域-->
    <div class="option-area">
      <ul class="option-item">
        <li>
          <span>电子邮箱:</span>
          <el-input v-model="email" style="display: inline-block;width: 180px"></el-input>
        </li>
        <li>
          <el-button type="info" @click="queryOrderById()">查询</el-button>
        </li>
        <li></li>
      </ul>
    </div>
    <!--数据列表区域-->
    <div class="data-list">
      <el-table :data="result.datas" :max-height="tableHeight" border style="width: 100%">
        <el-table-column prop="userid" label="用户ID" min-width="150">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="240">
        </el-table-column>
        <el-table-column
          prop="signalok"
          label="信号发布"
          min-width="100">
          <template scope="scope">
            <p>{{genSignalok(scope.row.is_signal)}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="accountok"
          label="模拟跟单"
          min-width="100">
          <template scope="scope">
            <p>{{genAccountok(scope.row.is_follower_demo)}}</p>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template scope="scope">
            <el-button @click="modifyCommodity(scope.row)" type="text" size="small">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--翻页-->
    <div class="page-area">
      <el-pagination
        layout="total,prev, pager, next"
        :total="rowcount"
        :page-size="10"
        @current-change="changeCurrentPage">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import {api} from '../constant/api'
  import {utils} from '../constant/utils'
  import {Loading} from 'element-ui';
  export default {
    data () {
      return {
        result: {},
        rowcount: 0,
        pageno: 1,
        tableHeight: 0,
        email: ""
      }
    },
    components: {},
    activated(){
      this.getDataSync();
      this.reSize();
    },
    beforeRouteLeave (to, from, next) {
      next();
    },
    methods: {
      reSize(){
        let _this = this;
        _this.tableHeight = $("#content-right").height() - 215;
        $(window).resize(function () {
          _this.tableHeight = $("#content-right").height() - 215;
        })
      },
      queryOrderById(){
        this.pageno = 1;
        this.getDataSync();
      },
      //页面改变的回调
      changeCurrentPage(currentPage){
        this.pageno = currentPage;
        this.getDataSync();
      },
      genSignalok(signalok){
        if (signalok === "0") {
          return "No";
        } else if (signalok === "1") {
          return "Yes";
        }
      },
      genAccountok(accountok){
        if (accountok === "0") {
          return "No";
        } else if (accountok === "1") {
          return "Yes";
        }
      },
      modifyCommodity(commdity){
        //先存到中间人,在那边再取
        let temp = JSON.stringify(commdity);
        sessionStorage.setItem("commdity", temp);
        this.$router.push({path: "/pageusermodify"});
      },
      //获取订单列表
      getDataSync(){
        let userid = utils.getToken().userid;
        let random = utils.getRandom();
        let randomkey = utils.getRandomkey(random);
        var _this = this
        var paras = {
          action: "sys_user_list",
          userid: userid,
          random: random,
          randomkey: randomkey,
          pagenum: _this.pageno,
          pagesize: 10,
          email: _this.email
        }
        $.ajax({
          url: api.APPURL,
          data: paras,
          type: 'post',
          async: true,
          success: function (data) {
            _this.handleData(data);
          },
          error: function (data) {
            this.$message("网络错误!");
          }
        })
      },
      //处理返回的数据
      handleData(data){
        data = eval('(' + data + ')');
        if (data.result === "ok") {
          if (data.datas.length === 0) {
            this.rowcount = 0;
            this.result = {};
            return;
          }
          this.rowcount = parseInt(data.rowcount);
          this.result = data;
        } else {
          if (!utils.isEmpty(data.tips)) {
            this.$message(data.tips);
            return;
          }
          this.$message(data.result);
        }
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" scoped="" type="text/scss">

  .container {
    height: 100%;
    width: 100%;
  }

  .option-area {
    margin-left: 10px;
    margin-right: 10px;
    height: 59px;
    border-top: 1px solid #FFFFFF;
    .option-item {
      height: 40px;
      width: 100%;
      display: flex;
      margin-top: 10px;
      li {
        line-height: 40px;
        height: 40px;
        min-width: 156px;
        float: left;
        flex-grow: 1;
      }
    }
  }

  .data-list {
    margin-left: 10px;
    margin-right: 10px;
  }

  /*翻页区域*/
  .page-area {
    margin-top: 30px;
    height: auto;
    text-align: center;
    margin-bottom: 30px;
  }
</style>

