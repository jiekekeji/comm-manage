<!--订单列表-->
<template>
  <div class="container" id="container-orderlist">
    <!--数据列表的操作区域一-->
    <div class="option-area">
      <ul class="option-item">
        <li>
          <span>服务器:</span>
          <el-select v-model="servername" placeholder="请选择" @change="listenServername"
                     style="display: inline-block;width: 180px">
            <el-option
              v-for="item in servernames.datas"
              :key="item.serverid"
              :label="item.servername"
              :value="item.servername">
            </el-option>
          </el-select>
        </li>
        <li>
          <span>邮箱:</span>
          <el-input v-model="email" style="display: inline-block;width: 180px"></el-input>
        </li>
        <li>
          <span>信号ID:</span>
          <el-input v-model="signalid" style="display: inline-block;width: 180px"></el-input>
        </li>
      </ul>
    </div>
    <!--数据列表的操作区域二-->
    <div class="option-area">
      <ul class="option-item">
        <li>
          <span>状&nbsp;&nbsp;&nbsp;态:</span>
          <el-select v-model="state" placeholder="请选择" @change="listenState" style="display: inline-block;width: 180px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li>
          <span>账号:</span>
          <el-input v-model="accountcode" style="display: inline-block;width: 180px"></el-input>
        </li>
        <li>
          <span style="visibility: hidden">信号ID:</span>
          <el-button type="info" @click="queryOrderById()" style="display: inline-block;width: 180px">查询</el-button>
        </li>
      </ul>
    </div>
    <!--数据列表区域-->
    <div class="data-list">
      <el-table :data="result.datas" :height="tableHeight" border style="width: 100%">
        <el-table-column fixed prop="followerid" label="跟随者ID" min-width="150">
        </el-table-column>
        <el-table-column prop="signalname" label="信号名" min-width="120">
        </el-table-column>
        <el-table-column prop="servername" label="服务器" min-width="180">
        </el-table-column>
        <el-table-column prop="accountcode" label="账号" min-width="160">
        </el-table-column>
        <el-table-column prop="state" label="状态" min-width="140">
          <template scope="scope">
            <p>{{genState(scope.row.state)}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="balance" label="净值" min-width="180">
        </el-table-column>
        <el-table-column prop="equity" label="余额" min-width="180">
        </el-table-column>
        <el-table-column prop="risk" label="风险控制" min-width="120">
        </el-table-column>
        <el-table-column prop="slip" label="最大滑点" min-width="120">
        </el-table-column>
        <el-table-column prop="targetprofit" label="目标利润" min-width="120">
        </el-table-column>
        <el-table-column prop="targetloss" label="最小账户净值" min-width="140">
        </el-table-column>
        <el-table-column label="vps" min-width="120">
          <template scope="scope">
            <p v-bind:style="{ color: genVps(scope.row.vps)}">{{scope.row.vps}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="vps_delay" label="vps延迟" min-width="120">
        </el-table-column>
        <el-table-column prop="ea_state" label="ea_state" min-width="120">
          <template scope="scope">
            <p @click="openError(scope.row.ea_state)" style="cursor: pointer;width: 100%;height: 100%"
               v-bind:style="{ color: genEaStateSty(scope.row.ea_state)}">{{genEaState(scope.row.ea_state)}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="ea_delay" label="ea延迟" min-width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="80">
          <template scope="scope">
            <el-button @click="stopSignal(scope.row)" type="text" size="small">停止</el-button>
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
        options: [
          {
            value: "",
            label: '全部'
          },
          {
            value: "0",
            label: '有效'
          },
          {
            value: '1',
            label: '审核中'
          },
          {
            value: '10',
            label: '无效'
          }
        ],
        servernames: {},
        servername: "",
        state: "",
        accountcode: "",
        email: "",
        signalid: "",
        result: {},
        rowcount: 0,
        pagenum: 1,
        tableHeight: 0,
      }
    },
    components: {},
    activated(){
      this.getServernames();
//      this.getDataSync();
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
      openError(error) {
        if (error === "OK") {
          return;
        }
        this.$alert(error, '错误信息', {
          confirmButtonText: '确定',
          callback: action => {
          }
        });
      },
      getServernames(){
        let userid = utils.getToken().userid;
        let random = utils.getRandom();
        let randomkey = utils.getRandomkey(random);
        var _this = this
        var paras = {
          action: "sys_server_list",
          userid: userid,
          random: random,
          randomkey: randomkey,
        }
        $.ajax({
          url: api.APPURL,
          data: paras,
          type: 'post',
          async: true,
          success: function (data) {
            data = eval('(' + data + ')');
            if (data.result === "ok") {
              if (data.datas.length === 0) {
                _this.servernames = {};
                return;
              }
              _this.servernames = data;
              let kong = {"servername": "全部", "serverid": ""};
              _this.servernames.datas.unshift(kong);
              _this.servername = "全部";
            } else {
              if (!utils.isEmpty(data.tips)) {
                _this.$message(data.tips);
                return;
              }
              _this.$message(data.result);
            }
          },
          error: function (data) {
            _this.$message("网络错误!");
          }
        })
      },
      listenState(value){
        this.state = value;
        this.getDataSync();
      },
      listenServername(value){
        this.servername = value;
        this.getDataSync();
      },
      genState(state){
        if (state === "0") {
          return "有效";
        } else if (state === "1") {
          return "审核中";
        } else if (state === "10") {
          return "无效";
        } else {
          return "状态不明";
        }
      },
      genVps(vps){
        if (vps === "ERROR") {
          return "red";
        }
      },
      genEaState(eastate){
        if (eastate !== "OK") {
          return "ERROR";
        } else {
          return "OK";
        }
      },
      genEaStateSty(eastate){
        if (eastate !== "OK") {
          return "red";
        }
      },
      //页面改变的回调
      changeCurrentPage(currentPage){
        this.pagenum = currentPage;
        this.getDataSync();
      },
      queryOrderById(){
        this.pageno = 1;
        this.getDataSync();
      },
      //获取订单列表
      getDataSync(){
        let userid = utils.getToken().userid;
        let random = utils.getRandom();
        let randomkey = utils.getRandomkey(random);
        var _this = this;
        let sn = "";
        if (_this.servername === "全部") {
          sn = "";
        } else {
          sn = _this.servername;
        }
        var paras = {
          action: "sys_follower_list",
          userid: userid,
          random: random,
          randomkey: randomkey,
          servername: sn,
          state: _this.state,
          email: _this.email,
          signalid: _this.signalid,
          accountcode: _this.accountcode,
          pagenum: _this.pagenum,
          pagesize: 10,
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
          this.rowcount = parseInt(data.rowcount)
          this.result = data;
        } else {
          if (!utils.isEmpty(data.tips)) {
            this.$message(data.tips);
            return;
          }
          this.$message(data.result);
        }
      },
      stopSignal(item){
        let r = confirm("确认要停止跟该信号" + item.followerid + "吗?");
        if (r == true) {
          let userid = utils.getToken().userid;
          let random = utils.getRandom();
          let randomkey = utils.getRandomkey(random);
          var _this = this
          var paras = {
            action: "sys_follower_stop",
            userid: userid,
            random: random,
            randomkey: randomkey,
            followerid: item.followerid,
          }
          $.ajax({
            url: api.APPURL,
            data: paras,
            type: 'post',
            async: true,
            success: function (data) {
              data = eval('(' + data + ')');
              if (data.result === "ok") {
                _this.$message("成功停止!");
                _this.getDataSync();
              } else {
                _this.$message("停止失败!");
              }
            },
            error: function (data) {
              _this.$message("网络错误!");
            }
          })
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

