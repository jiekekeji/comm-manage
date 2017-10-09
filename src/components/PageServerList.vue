<!--商品列表页-->
<template>
  <div class="container" id="container-commodity" ref="containerCommodity">

    <!--数据列表的操作区域-->
    <div class="option-area">
      <el-button type="success" @click="toCommodityAdd()">新增</el-button>
      <!--<el-button type="success" @click="toCommodityprice()">售价批量修改</el-button>-->
    </div>
    .

        <!--数据列表区域-->
    <div class="data-list">
      <el-table
        :height="tableHeight"
        :data="results.datas"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="serverid"
          label="服务ID"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="brokername"
          label="交易商"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="servername"
          label="服务器"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="servertype"
          label="服务类型"
          min-width="100">
        </el-table-column>
        <el-table-column
          label="账户类型"
          min-width="180">
          <template scope="scope">
            <p>{{genState(scope.row.demo)}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="signalok"
          label="信号状态"
          min-width="100">
          <template scope="scope">
            <p>{{genSignalok(scope.row.signalok)}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="accountok"
          label="跟单状态"
          min-width="100">
          <template scope="scope">
            <p>{{genAccountok(scope.row.accountok)}}</p>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template scope="scope">
            <!--<el-button @click="deleteCommodity(scope.row)" type="text" size="small">删除</el-button>-->
            <el-button @click="modifyCommodity(scope.row)" type="text" size="small">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
  import {Loading} from 'element-ui';
  export default {
    data () {
      return {
        results: [],
        tableHeight: 0
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
      //根据窗口变化改变
      reSize(){
        let _this = this;
        _this.tableHeight = $("#content-right").height() - 100;
        $(window).resize(function () {
          _this.tableHeight = $("#content-right").height() - 100;
        })
      },
      genState(demo){
        if (demo === "0") {
          return "真实";
        } else if (demo === "1") {
          return "模拟";
        }
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
      toCommodityAdd(){
        this.$router.push("/pageserveradd")
      },
      modifyCommodity(commdity){
        //先存到中间人,在那边再取
        let temp = JSON.stringify(commdity);
        sessionStorage.setItem("commdity", temp);
        this.$router.push({path: "/pageservermodify"});
      },
      deleteCommodity(commdity){
        let r = confirm("确定删除该商品吗？");
        if (r == true) {
          this.deleteCommodityData(commdity.productid);
        } else {
        }
      },
      /*************获取商品列表*************************/
      getDataSync(){
        let userid = this.$utils.getToken().userid;
        let random = this.$utils.getRandom();
        let randomkey = this.$utils.getRandomkey(random);
        var _this = this
        var paras = {
          action: "sys_server_list",
          userid: userid,
          random: random,
          randomkey: randomkey,
        }
        $.ajax({
          url: this.$api.APPURL,
          data: paras,
          type: 'post',
          async: true,
          success: function (data) {
            _this.handleData(data);
          },
          error: function (data) {
            _this.$message(data);
          }
        })
      },
      //处理返回的数据
      handleData(data){
        data = eval('(' + data + ')');
        if (data.result === "ok") {
          if (data.datas.length === 0) {
            this.results = {};
            return;
          }
          this.results = data;
        } else {
          if (!this.$utils.isEmpty(data.tips)) {
            this.$message(data.tips);
            return;
          }
          this.$message(data.result);
        }
      },

      /*************删除商品*************************/
      deleteCommodityData(productid){
        let userid = utils.getToken().userid;
        let random = utils.getRandom();
        let randomkey = utils.getRandomkey(random);
        var _this = this
        var paras = {
          action: "sf_sys_product_delete",
          userid: userid,
          random: random,
          randomkey: randomkey,
          productid: productid
        }
        $.ajax({
          url: api.APPURL + '/sf',
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
            _this.$message(data);
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
  }

  .option-area {
    margin-left: 10px;
    margin-right: 10px;
    height: 60px;
    line-height: 60px;
  }

  .data-list {
    margin-left: 10px;
    margin-right: 10px;
    text-align: center;
  }

</style>
