<!--商品列表页-->
<template>
  <div class="container" id="container-commodity" ref="containerCommodity">
    <div style="height: 20px"></div>
    <!--数据列表区域-->
    <div class="data-list">
      <el-table
        :max-height="tableHeight"
        :data="results.datas"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="userid"
          label="用户ID"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="email"
          label="电子邮件"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="user_count"
          label="发展用户数"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="comm"
          label="佣金"
          min-width="150">
        </el-table-column>
        <!--<el-table-column fixed="right" label="操作" min-width="80">-->
        <!--<template scope="scope">-->
        <!--<el-button @click="modifyModel(scope.row)" type="text" size="small">修改</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->
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
      reSize(){
        let _this = this;
        _this.tableHeight = $("#content-right").height() - 80;
        $(window).resize(function () {
          _this.tableHeight = $("#content-right").height() - 80;
        })
      },
      modifyModel(commdity){
        let temp = JSON.stringify(commdity);
        sessionStorage.setItem("commdity", temp);
        this.$router.push({path: "/pagemodelmodify"});
      },
      getDataSync(){
        let userid = this.$utils.getToken().userid;
        let random = this.$utils.getRandom();
        let randomkey = this.$utils.getRandomkey(random);
        var _this = this
        var paras = {
          action: "sys_agent_comm_list",
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
    height: 60px;
    line-height: 60px;
  }

  .data-list {
    margin-left: 10px;
    margin-right: 10px;
    text-align: center;
  }

</style>
