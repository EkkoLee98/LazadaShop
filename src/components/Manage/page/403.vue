<template>
  <div class="error-page">
<!--      <div class="error-code">4<span>0</span>3</div>-->
      <div class="error-desc">普通用户登录后，必须通过Lazada官方授权才可以成为商家。</div>
      <div class="error-handle">
          <router-link to="/">
            <el-button type="primary" size="large" style="margin-left: 200px">返回首页</el-button>
          </router-link>
          <el-button class="error-btn" type="primary" size="large" @click="goBack">返回上一页</el-button>
          <div class="error-desc">想尝试一下，请<el-link style="font-size: 40px" type="primary" href="http://auth.lazada.com/oauth/authorize?response_type=code&force_auth=true&redirect_uri=http://siushare.com/api/code&client_id=113967">前往授权</el-link>如授权成功，将开通流量监控</div>
      </div>
  </div>
</template>

<script>
export default {
  methods: {
      goBack(){
          this.$router.go(-1);
      }
  }
}
</script>


<style scoped>
    .error-page{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background: #f3f3f3;
        box-sizing: border-box;
    }
    .error-code{
        line-height: 1;
        font-size: 250px;
        font-weight: bolder;
        color: #f02d2d;
    }
    .error-code span{
        color: #00a854;
    }
    .error-desc{
        font-size: 30px;
        color: #777;
        margin-top: 50px;
    }
    .error-handle{
        margin-top: 30px;
        padding-bottom: 200px;
    }
    .error-btn{
        margin-left: 100px;
    }
</style>
