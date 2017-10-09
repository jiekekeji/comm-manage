<template>
  <div class="container" id="container-orderlist">
    <!--数据列表的操作区域一-->
    <div class="option-area">
      <ul class="option-item">
        <li>
          <span>主机IP:</span>
          <el-input v-model="hostip" style="display: inline-block;width: 180px"></el-input>
        </li>
        <li>
          <span>FM类型:</span>
          <el-select v-model="fmtype" placeholder="请选择" @change="listenState"
                     style="display: inline-block;width: 180px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li>
          <span style="visibility: hidden">信号ID:</span>
          <el-button type="info" @click="queryOrderById()" style="display: inline-block;">查询</el-button>
          <el-button type="success" @click="addNewHost()" style="display: inline-block;">新增</el-button>
        </li>
      </ul>
    </div>
    <!--数据列表区域-->
    <div class="data-list">
      <el-table :data="result.datas" :max-height="tableHeight" border style="width: 100%">
        <el-table-column fixed prop="hostid" label="主机ID" min-width="120">
        </el-table-column>
        <el-table-column prop="hostip" label="主机IP" min-width="120">
        </el-table-column>
        <el-table-column prop="fmtype" label="FM类型" min-width="120">
          <template scope="scope">
            <p>{{genState(scope.row.fmtype)}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="terminals" label="客户端数量" min-width="120">
        </el-table-column>
        <el-table-column prop="oks" label="正常" min-width="120">
        </el-table-column>
        <el-table-column prop="errors" label="异常" min-width="120">
          <template scope="scope">
            <p style="color: red">{{scope.row.errors}}</p>
          </template>
        </el-table-column>
        <!--<el-table-column fixed="right" label="操作" min-width="80">-->
        <!--<template scope="scope">-->
        <!--<el-button @click="stopSignal(scope.row)" type="text" size="small">停止</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->
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
        hostip: "",
        fmtype: "",
        result: {},
        rowcount: 0,
        pagenum: 1,
        tableHeight: 0,
        options: [
          {
            value: "",
            label: '全部'
          },
          {
            value: "0",
            label: '信号'
          },
          {
            value: '1',
            label: '跟单'
          }
        ],
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
      listenState(value){
        this.fmtype = value;
        this.getDataSync();
      },
      genState(state){
        if (state === "0") {
          return "信号";
        } else if (state === "1") {
          return "跟单";
        }
      },
      changeCurrentPage(currentPage){
        this.pagenum = currentPage;
        this.getDataSync();
      },
      addNewHost(){
        this.$router.push("/pagehostadd")
      },
      queryOrderById(){
        this.pageno = 1;
        this.getDataSync();
      },
      getDataSync(){
        let userid = utils.getToken().userid;
        let random = utils.getRandom();
        let randomkey = utils.getRandomkey(random);
        var _this = this
        var paras = {
          action: "sys_host_list",
          userid: userid,
          random: random,
          randomkey: randomkey,
          hostip: _this.hostip,
          fmtype: _this.fmtype,
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

