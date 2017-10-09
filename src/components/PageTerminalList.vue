<template>
  <div class="container" id="container-orderlist">
    <!--数据列表的操作区域一-->
    <div class="option-area">
      <ul class="option-item">
        <li>
          <span>主机ID:</span>
          <el-input v-model="hostid" style="display: inline-block;width: 180px"></el-input>
        </li>
        <li>
          <span>交易帐号:</span>
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
        <el-table-column fixed prop="terminalid" label="客户端ID" min-width="150">
        </el-table-column>
        <el-table-column prop="fmtype" label="FM类型" min-width="120">
        </el-table-column>
        <el-table-column prop="fmid" label="FMID" min-width="120">
        </el-table-column>
        <el-table-column prop="hostid" label="主机ID" min-width="120">
        </el-table-column>
        <el-table-column prop="hostip" label="主机IP" min-width="120">
        </el-table-column>
        <el-table-column prop="modelname" label="模板名称" min-width="260">
        </el-table-column>
        <el-table-column prop="servername" label="服务器" min-width="240">
        </el-table-column>
        <el-table-column prop="accountcode" label="账号" min-width="120">
        </el-table-column>
        <el-table-column prop="loginstate" label="状态" min-width="120">
          <template scope="scope">
            <p v-bind:style="{ color: genVps(scope.row.loginstate)}">{{scope.row.loginstate}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="loginstatus" label="登录信息" min-width="160">
        </el-table-column>
        <el-table-column prop="login_delay" label="延迟(s)" min-width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="80">
          <template scope="scope">
            <el-button @click="deleteItem(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--翻页-->
    <div class="page-area" style="display: none">
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
        hostid: "",
        accountcode: "",
        result: {},
        rowcount: 0,
        pagenum: 1,
        tableHeight: 0,
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
      changeCurrentPage(currentPage){
        this.pagenum = currentPage;
        this.getDataSync();
      },
      genVps(vps){
        if (vps !== "OK") {
          return "red";
        }
      },
      queryOrderById(){
        this.pageno = 1;
        this.getDataSync();
      },
      deleteItem(item){
        let r = confirm("确认要删除" + item.terminalid + "吗？")
        if (r == true) {
          let userid = utils.getToken().userid;
          let random = utils.getRandom();
          let randomkey = utils.getRandomkey(random);
          var _this = this
          var paras = {
            action: "sys_terminal_delete",
            userid: userid,
            random: random,
            randomkey: randomkey,
            terminalid: item.terminalid,
          }
          $.ajax({
            url: api.APPURL,
            data: paras,
            type: 'post',
            async: true,
            success: function (data) {
              data = eval('(' + data + ')');
              if (data.result === "ok") {
                _this.$message("删除成功!");
                _this.getDataSync();
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
        }
      },
      getDataSync(){
        let userid = utils.getToken().userid;
        let random = utils.getRandom();
        let randomkey = utils.getRandomkey(random);
        var _this = this
        var paras = {
          action: "sys_terminal_list",
          userid: userid,
          random: random,
          randomkey: randomkey,
          hostid: _this.hostid,
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

