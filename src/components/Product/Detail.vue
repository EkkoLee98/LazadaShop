<template>
    <div>
        <div class="top">
      <span style="margin-left: 400px">
         <el-link type="info" v-if="islogin">已登录   您好,{{this.username}}!</el-link>
         <el-link type="info" v-else>请登录</el-link>
      </span>
            <span style="margin-left: 50px">
         <el-link type="info" @click="goMain()">首页</el-link>
      </span>
            <span style="margin-left: 600px">
         <el-link type="info" icon="el-icon-edit" @click="goManage()">个人中心</el-link>
      </span>
            <span style="margin-left: 20px">
         <el-link type="info" icon="el-icon-data-line">购物车</el-link>
      </span>
            <span style="margin-left: 20px">
         <el-link type="info" icon="el-icon-star-on">收藏夹</el-link>
      </span>
            <span style="margin-left: 20px">
         <el-link type="info" icon="el-icon-user-solid">卖家中心</el-link>
      </span>
            <span style="margin-left: 20px">
         <el-link type="info" icon="el-icon-phone">联系客服</el-link>
      </span>
        </div>
<!--        <el-carousel :interval="4000" height="200px" style="width: 1000px;margin-left: 450px;margin-top: 0px;margin-bottom: 50px">-->
<!--            <el-carousel-item v-for="(item,index) in ImgArr" :key="index">-->
<!--                <img class="medium" :src='item.img' style="width: 1000px;height: 300px">-->
<!--            </el-carousel-item>-->
<!--        </el-carousel>-->
        <div id="main">
            <div id="left">
                <img src="../../assets/images/1.png">
            </div>
            <div id="right" style="margin-top: -200px">
                <p style="font-size: 20px;">HI-820 Volume Up In-ear Earphone 3.5mm 1.2m Noise Cancelling Stereo Wired Earphones with Microphone For Mobile Phone</p>
                <div>
                    <el-rate
                            v-model="value"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="{value}"
                            style="display: inline-block">
                    </el-rate>
                    <el-button type="info" icon="el-icon-share" style="margin-left: 200px" plain></el-button>
                    <el-button type="info" icon="el-icon-star-on" plain></el-button>
                </div>

                <div>
                    <span style="color: #8c939d">价格： </span>
                    <span style="font-size: 20px;color: orangered;display: inline-block">$65.59</span>
                </div>
                <div style="margin-top: 20px;">
                    <span style="color: #8c939d">券后价： </span>
                    <span style="font-size: 30px;color: red;display: inline-block">$45.59</span>
                </div>
                <div style="margin-top: 50px;">
                    <el-steps :active="active" finish-status="success">
                        <el-step title="购买商品"></el-step>
                        <el-step title="填写`订单"></el-step>
                        <el-step title="获取返利"></el-step>
                    </el-steps>

                    <!--               <span style="color: #8c939d">购买数量： </span>-->
                    <!--               <el-input-number v-model="num" :min="1" :max="10" label="购买数量"></el-input-number>-->
                </div>
                <div style="margin-top: 50px;">
                    <el-button type="primary" size="medium" style="margin-left: 50px;width: 150px" @click="dialogVisible = true">填写订单号</el-button>
                    <el-button type="danger" style="margin-left: 100px;width: 150px">获取优惠券</el-button>
                </div>
                            <p style="font-weight: bolder">直接跳转至Lazada页面进行购买 购买完毕后填写订单号以获得返利</p>
<!--                <el-button type="primary" style="margin-left: 200px" @click="dialogVisible = true">填写订单号</el-button>-->
            </div>
            <div id="right2">
                <div>
                    <span style="font-size: 10px">Delivery Options</span>
                    <i class="el-icon-warning" style="margin-left: 150px"></i>
                </div>
                <div style="margin-top:30px">
                    <i class="el-icon-location"></i>
                    <span style="font-size: 10px;margin-left: 20px;">Wp Kuala Lumpur,Kuala Lumpur,50450</span>
                </div>
                <div style="margin-top:30px">
                    <i class="el-icon-platform-eleme"></i>
                    <span style="font-size: 10px;margin-left: 20px;">Ship from Overseas. Due to current business restrictions & closures in China, please expect shipments to be delayed.</span>
                </div>
                <div style="margin-top:30px">
                    <i class="el-icon-shopping-cart-full"></i>
                    <span style="font-size: 10px;margin-left: 20px;">Ocean Standard
22 - 37 day(s)</span>
                </div>
                <div style="margin-top:30px">
                    <i class="el-icon-trophy"></i>
                    <span style="font-size: 10px;margin-left: 20px;">Standard Delivery
9 - 22 day(s)</span>
                </div>
                <p style="text-align: center">Enjoy RM4.00 shipping promotion with minimum 3 items.</p>
                <div>
                    <span style="font-size: 10px">Return & Warranty</span>
                    <i class="el-icon-warning" style="margin-left: 150px"></i>
                </div>
                <div style="margin-top:10px">
                    <i class="el-icon-alarm-clock"></i>
                    <span style="font-size: 10px;margin-left: 20px;">7 days easy return
Change of mind is not applicable</span>
                </div>
            </div>
        </div>
        <el-divider></el-divider>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
                <el-form-item
                        label="订单号"
                        prop="order"
                >
                    <el-input type="text" v-model.number="numberValidateForm.order" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="submitForm('numberValidateForm')">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                active: 0,
                username:'',
                product:[],
                ImgArr:
                    [
                        {'img':'http://localhost:809/assets/images/banner-1a.png'},
                        {'img':'http://localhost:809/assets/images/banner-4a.png'},
                        {'img':'http://localhost:809/assets/images/category-tea.png'},
                        {'img':'http://localhost:809/assets/images/1@theme-head.png'},
                        {'img':'http://localhost:809/assets/images/3@theme.png'}
                    ],
                islogin:false,
                value: 3.9,
                num: 1,
                id: this.$route.params.value,
                dialogVisible: false,
                numberValidateForm: {
                    itemId:this.$route.params.value,
                    order: ''
                }
            }
        },
        name: "Detail",
        methods: {
            next() {
                if (this.active++ > 2) this.active = 0;
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/api/customer/savecoupon/saveorderid',this.$qs.stringify(this.numberValidateForm),{headers: {contentType: 'application/json;charset=UTF-8'}}).then((response) => {
                            console.log(response.data)
                        });
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            getData(){
                this.$axios.post('/api/merchant/product/getinfo',this.$qs.stringify({'itemId':this.$route.params.value}),{headers: {contentType: 'application/json;charset=UTF-8'}}).then((response) => {
                    console.log(response.data);
                    this.product=response.data.msg;
                })
            },
            goMain(){
                this.$router.push('/')
            },
            goManage(){
                this.$router.push('/manage')
            },
            ifLogin() {
                if (localStorage.getItem('ms_username') !== null) {
                    this.islogin = true;
                    this.username=localStorage.getItem('ms_username');
                }
            }
        },
        mounted() {
            this.ifLogin();
            this.getData();
        }

    }
</script>

<style scoped>
    body{ text-align:center;background-color: #bbbbbb}
    #main{margin:0 auto;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);width:1300px;height:500px;background-color: #F8F8FF}
    #left{
        display: inline-block;
        width: 350px;
        height: 350px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        margin-left: 20px;
    }
    #left img{
        width: 100%;
        height: 100%;
        margin-bottom: 100px;
    }
    #right{
        display: inline-block;
        width: 500px;
        height: 500px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        margin-left: 10px;
        margin-top: 50px;
    }
    #right2{
        display: inline-block;
        width: 300px;
        height: 430px;
        margin-left: 50px;
        background-color: #DCDCDC;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin-top: 0px;
    }
    .top{
        width: 2000px;
        height: 25px;
        background-color: #DCDCDC;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>
