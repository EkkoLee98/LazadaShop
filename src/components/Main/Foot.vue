<template>
    <div>
    <div class="foots">
        <div class="foot" style="margin-left: 530px">
            <span><p style="font-size: 20px;text-align: center;font-weight: bold">产品服务</p></span>
            <p style="text-align: center"><a class="clj" href="">跨境收款</a></p>
            <p style="text-align: center"><a class="clj" href="">VAT付款</a></p>
            <p style="text-align: center"><a class="clj" href="">索赔大师</a></p>
            <p style="text-align: center"><a class="clj" href="">一键开店</a></p>
            <p style="text-align: center"><a class="clj" href="">小程序</a></p>
        </div>
        <div class="foot" style="margin-left: 50px">
            <span><p style="font-size: 20px;text-align: center;font-weight: bold">更多服务</p></span>
            <p style="text-align: center"><a class="clj" href="">安全保障</a></p>
            <p style="text-align: center"><a class="clj" href="">跨境资讯</a></p>
            <p style="text-align: center"><a class="clj" href="">全部新闻</a></p>
            <p style="text-align: center"><a class="clj" href="">帮助中心</a></p>
        </div>
        <div class="foot" style="margin-left: 50px">
            <span><p style="font-size: 20px;text-align: center;font-weight: bold">关于我们</p></span>
            <p style="text-align: center"><a class="clj" href="">了解协议</a></p>
            <p style="text-align: center"><a class="clj" href="">协议</a></p>
        </div>
<!--        <div class="foot" style="margin-left: 400px">-->
<!--            <img v-lazy="img1"/>-->
<!--        </div>-->
    </div>
        <div class="sm" style="">Copyright @ 2019-2020 siushare.com 版权所有</div>
    </div>
</template>

<script>
    export default {
        name: "Foot",
        data(){
            return{
                img1:'../../assets/images/ewm.jpg'
            }
        }
    }
</script>

<style scoped>
    .clj{
        text-decoration: none;
        color: #B3C0D1;
    }
   .foots{
       width: 1500px;
       height: 300px;
       font-family: "Helvetica Neue", Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif;
       display: flex;
       justify-content: left;
   }
    .foot{
        font-family: "Helvetica Neue", Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif;
        display: block;
        width: 250px;
        height: 300px;
    }
    .foot img{
        width: 270px;
        height: 270px;
    }
    .sm{
        background-color: #DCDFE6;
        width: 1600px;
        height: 25px;
        text-align: center;
        font-family: "Helvetica Neue", Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif;
        margin-left: 100px;
    }
</style>
