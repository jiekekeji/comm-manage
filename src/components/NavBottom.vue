<template>
  <div class="container">
    <!--底部-->
    <div class="nav-bottom">
    </div>
  </div>
</template>

<script>
  import {api} from '../constant/api'
  export default {
    data () {
      return {}
    },
    components: {},
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
    height: auto;
    width: 100%;
  }

  .nav-bottom {
    height: 100px;
  }
</style>
