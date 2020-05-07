<template>
    <div>
        <div class="top">
            <span><img src="../../assets/images/logo.png"
                       style="width: 40px;height: 40px;position: absolute;margin-left: 100px"></span>
            <span style="margin-left: 200px;margin-top: 8px;position: absolute">
         <el-link type="info" v-if="islogin">已登录   您好,{{this.username}}!</el-link>
         <el-link type="info" v-else href="/login">请登录</el-link>
       </span>

            <span style="margin-left: 1300px;margin-top: 8px;position: absolute">
         <el-link type="info" icon="el-icon-star-on" @click="goMain()">首页</el-link>
         <el-link type="info" icon="el-icon-edit" @click="goManage()">个人中心</el-link>
         <el-link type="info" icon="el-icon-data-line">卡包</el-link>
         <el-link type="info" icon="el-icon-user-solid">卖家中心</el-link>
         <el-link type="info" icon="el-icon-phone">联系客服</el-link>
       </span>
        </div>
        <!--      <el-carousel :interval="4000" height="200px" style="width: 1000px;margin-left: 450px;margin-top: 0px;margin-bottom: 50px">-->
        <!--         <el-carousel-item v-for="(item,index) in ImgArr" :key="index">-->
        <!--            <img class="medium" :src='item.img' style="width: 1000px;height: 300px">-->
        <!--         </el-carousel-item>-->
        <!--      </el-carousel>-->
        <div id="main">
            <div id="left">
                <img style="width: 350px;height: 350px" :src="iArr2.officialImageUrl">
            </div>
            <div id="right" style="margin-top: -10px;position:absolute;">
                <p style="font-size: 20px;">{{iArr2.productName}}</p>
                <div>
<!--                    <el-rate-->
<!--                            v-model="value"-->
<!--                            disabled-->
<!--                            show-score-->
<!--                            text-color="#ff9900"-->
<!--                            score-template="{value}"-->
<!--                            style="display: inline-block">-->
<!--                    </el-rate>-->
                    <el-button type="info" icon="el-icon-share" style="margin-left: 350px" plain></el-button>
                    <el-button type="info" icon="el-icon-star-on" plain></el-button>
                </div>

                <div>
                    <span style="color: #8c939d">价格： </span>
                    <span style="font-size: 20px;color: orangered;display: inline-block">${{iArr2.officialPrice}}</span>
                </div>
                <div style="margin-top: 20px;">
                    <span style="color: #8c939d">券后价： </span>
                    <span style="font-size: 30px;color: red;display: inline-block">${{iArr2.couponPrice}}</span>
                </div>
                <div style="margin-top: 50px;">
                    <el-steps :active="active" finish-status="success">
                        <el-step title="购买商品"></el-step>
                        <el-step title="填写订单"></el-step>
                        <el-step title="获取返利"></el-step>
                    </el-steps>

                    <!--               <span style="color: #8c939d">购买数量： </span>-->
                    <!--               <el-input-number v-model="num" :min="1" :max="10" label="购买数量"></el-input-number>-->
                </div>
                <div style="margin-top: 50px;">
                    <el-button type="primary" size="medium" style="margin-left: 50px;width: 150px"
                               @click="dialogVisible = true">填写订单号
                    </el-button>
                    <el-button type="danger" style="margin-left: 100px;width: 150px" @click="GetCouponInfo">获取优惠券
                    </el-button>
                </div>
                <p style="font-weight: bolder">直接跳转至Lazada页面进行购买 购买完毕后填写订单号以获得返利</p>
            </div>
            <div id="right2" style="position:absolute;margin-left: 600px">
                <div>
                    <span style="font-size: 20px;margin-left: 50px"><i class="el-icon-warning"></i>优惠券使用规则</span>
                </div>
                <div style="margin-top:10px">
                    <span style="font-size: 10px;color: #cf9236">欢迎您的到来！这是你的第一次访问吗？如果是，请细看下面的"优惠券使用规则"</span>
                </div>
                <div style="margin-top:15px">
                    <i class="el-icon-platform-eleme"></i>
                    <span style="font-size: 10px;margin-left: 20px;">欢迎注册，成为我们平台的一名新用户;注册完，请登录！</span>
                </div>
                <div style="margin-top:15px">
                    <i class="el-icon-shopping-cart-full"></i>
                    <span style="font-size: 10px;margin-left: 20px;">是否对该商品心动了？那就点击"获取优惠券"吧！</span>
                </div>
                <div style="margin-top:15px">
                    <i class="el-icon-trophy"></i>
                    <span style="font-size: 10px;margin-left: 20px;">领取完优惠券，就可以点击"超链接"前往lazada官网购买商品。</span>
                </div>
                <div style="margin-top:15px">
                    <i class="el-icon-warning"></i>
                    <span style="font-size: 10px">购买完成后，请记得回我们平台填写订单号！</span>
                </div>
                <div style="margin-top:15px">
                    <i class="el-icon-alarm-clock"></i>
                    <span style="font-size: 10px;margin-left: 20px;">填写订单后，那就静等你的心动之物送达;也就是订单完成交易后，请您移步个人中心，提现优惠券上的金额。</span>
                </div>
                <p style="text-align: center">PS：领取优惠券时，注意优惠券是否已过期哦！</p>
            </div>
        </div>
        <el-divider></el-divider>
        <div class="foot">
            <div class="lfoot">
                <div class="tlfoot">
                    <p style="font-size: 25px;font-family: 'Apple Color Emoji'">小米器配件旗舰店</p>
                </div>
                <div class="blfoot">
                    <el-carousel :interval="4000" height="325px" indicator-position="outside" style="width: 350px;">
                        <el-carousel-item v-for="(item,index) in ImgArr" :key="index">
                            <img class="medium" :src='item.img' style="width: 350px;height: 325px">
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
            <div class="rfoot">
                <div class="trfoot">
                    <el-button type="warning" icon="el-icon-delete-location" circle
                               style="margin-top: 10px;display: inline-block"></el-button>
                    <p style="display: inline-block;color: orange">其他好物推荐</p>
                </div>
                <div class="brfoot" ref="aa" v-if="ok">
                    <todo-item v-for="(item,index) of iArr1" :key="index" :img="item[3]" :price="item[4]"
                               :pname="item[1]" :no="item[0]" :index="index"></todo-item>
                    <!--                    <todo-item v-for="(item,index) of iArr1" :key="index" :data.sync="item" :index="index"></todo-item>-->
                </div>
            </div>
        </div>

        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="350px">
            <el-form label-width="100px" class="demo-ruleForm">
                <el-form-item
                        label="订单号"
                >
                    <el-input type="text" v-model="order" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="submitForm" v-loading="loading">提 交</el-button>
                    <!--                          element-loading-text="拼命加载中"-->
                    <!--                          element-loading-spinner="el-icon-loading"-->
                    <!--                          element-loading-background="rgba(0, 0, 0, 0.8)"-->
                    <el-button type="primary" @click="dialogVisible = false">取 消</el-button>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
  </span>
        </el-dialog>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible2"
                width="300px">
            <el-form label-width="10px" class="demo-ruleForm">
                <el-form-item style="margin-right: 80px">
                    <el-link :href=this.info.officialUrl type="success">领取优惠券成功，点击超链接前往购物</el-link>
                </el-form-item>
                <el-form-item style="margin-top: 50px">
                    <el-button type="primary" style="width:100%" @click="dialogVisible2 = false">关 闭</el-button>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
  </span>
        </el-dialog>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible3"
                width="300px">
            <el-form label-width="100px" class="demo-ruleForm">
                <el-form-item label="原价">
                    {{this.info.officialPrice}}
                </el-form-item>
                <el-form-item label="券后价格">
                    {{this.info.couponPrice}}
                </el-form-item>
                <el-form-item label="截止时间">
                    {{this.info.endTime}}
                </el-form-item>
                <el-form-item style="margin-top: 50px;margin-left: -50px">
                    <el-button style="display: inline-block;position: absolute">取 消</el-button>
                    <el-button type="primary" style="margin-left: 70px;display: inline-block;position: absolute"
                               @click="SaveCoupon">领 取
                    </el-button>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
  </span>
        </el-dialog>
        <!--      <div class="copyBox">-->
        <!--         sysAppId：<span>{{sysAppIds}}</span>-->
        <!--         <el-button class="ml10" type="text" size="medium"-->
        <!--                    v-clipboard:copy="sysAppIds"-->
        <!--                    v-clipboard:success="onCopy"-->
        <!--                    v-clipboard:error="onError">点击复制</el-button>-->
        <!--      </div>-->
        <!--      <router-link to="/coupon/share/a">-->
        <!--         <div>我是b组件</div>-->
        <!--      </router-link>-->
        <!--      <router-view></router-view>-->

    </div>
</template>

<script>
    import TodoItem from '../Main/TodoItem1.vue'

    export default {
        data() {
            return {
                loading: false,
                sysAppIds: 'xxxxxxxxxxxsx',
                username: '',
                active: 0,
                ImgArr:
                    [
                        {'img': 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3949364192,3048061643&fm=26&gp=0.jpg'},
                        {'img': 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3825591755,2330163362&fm=26&gp=0.jpg'},
                        {'img': 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=122592915,2313113112&fm=26&gp=0.jpg'},
                        {'img': 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1757638012,1516051550&fm=26&gp=0.jpg'},
                        {'img': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583101657906&di=eee23a5f5fc09873c8c59cf872427435&imgtype=0&src=http%3A%2F%2Fimg.yzcdn.cn%2Fupload_files%2F2018%2F04%2F17%2FFh7neHXL616Eb1lhGDoLWJ87rpxQ.jpg%3FimageView2%2F2%2Fw%2F580%2Fh%2F580%2Fq%2F75%2Fformat%2Fjpg'}
                    ],
                islogin: false,
                value: 3.9,
                num: 1,
                sid: this.$route.query.shareId,
                iid: this.$route.query.itemId,
                sid1: this.$route.params.shareId,
                iid1: this.$route.params.itemId,
                dialogVisible: false,
                dialogVisible2: false,
                dialogVisible3: false,
                order: '',
                info: [],
                product: [],
                iArr1: [],
                iArr2:[],
                a: [],
                ok: false
            }
        },
        components: {
            'todo-item': TodoItem
        },
        name: "Model",
        created() {
            this.getTS();
            console.log(this.a);

            console.log(this.$refs['aa']);
            this.$nextTick(function () {
                console.log(this.$refs['aa']);
            });
        },
        methods: {
            refesh: function () {
                this.ok = false;
                var _this = this;
                this.$nextTick(() => {
                    _this.ok = true;
                })
            },
            getTS() {
                this.$axios.post(this.$api.productAll, {}, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        timeout: 5000
                    }
                }).then(res => {
                    this.product = res.data;
                    console.log('success');
                    console.log(res.data);
                    this.a = JSON.parse(this.product.msg.productsJsonInfo);
                    console.log(this.a);
                    // 定义存放生成随机数的数组
                    var array = [];
                    for (var i = 0; ; i++) {
                        // 只生成10个随机数
                        if (array.length < 3) {
                            generateRandom(20);
                        } else {
                            break;
                        }
                    }

                    function generateRandom(count) {
                        var rand = parseInt(Math.random() * count);
                        for (var i = 0; i < array.length; i++) {
                            if (array[i] == rand) {
                                return false;
                            }
                        }
                        array.push(rand);
                    }

                    for (let i = 0; i < array.length; i++) {
                        console.log(array[i]);
                    }
                    for (let j = 0; j <= array.length - 1; j++) {
                        this.iArr1[j] = this.a[array[j]];
                        console.log(this.iArr1);
                        this.ok = true;
                    }
                    // let _this=this;
                    // setTimeout(function()  {
                    //     for (let j = 0; j <= array.length-1; j++) {
                    //         _this.iArr1[j] = _this.a[array[j]];
                    //         console.log(_this.iArr1);
                    //         _this.ok = true;
                    //     }
                    // }, 4000);
                })
            },
            GetCouponInfo() {
                this.$axios.post(this.$api.cgetcouponinfo, this.$qs.stringify({
                    'shareId': this.sid,
                    'itemId': this.iid
                }), {headers: {contentType: 'application/json;charset=UTF-8'}}).then((response) => {
                    if (response.data.code == 200) {
                        this.dialogVisible3 = true;
                        this.info = response.data.msg;
                        console.log(this.info);
                    } else {
                        this.$message.error('优惠券已失效');
                    }
                })
            },
            SaveCoupon() {
                this.dialogVisible3 = false;
                this.$axios.post(this.$api.savecoupon, this.$qs.stringify({
                    'shareId': this.sid,
                    'itemId': this.iid
                }), {headers: {contentType: 'application/json;charset=UTF-8'}}).then((response) => {
                    console.log(response.data);
                    if (response.data.code == 200) {
                        this.$message.success('领取成功');
                        this.dialogVisible2 = true;
                    } else {
                        this.$message.error('领取失败');
                    }
                })
            },
            onCopy(e) {
                console.log(e);
            },
            // 复制失败
            onError(e) {
                alert("失败");
            },
            next() {
                if (this.active++ > 2) this.active = 0;
            },
            submitForm() {
                this.loading = true;
                this.$axios.post(this.$api.saveorderid, this.$qs.stringify({
                    'itemId': this.iid,
                    'orderId': this.order
                }), {headers: {contentType: 'application/json;charset=UTF-8'}}).then((response) => {
                    console.log(response.data)
                    if (response.data.code == 200) {
                        this.loading = false;
                        this.dialogVisible = false;
                        this.$message.success('保存成功');
                    } else if (response.data.msg === '优惠券已过期，请重新领取') {
                        this.loading = false;
                        this.dialogVisible = false;
                        this.$message.error('保存失败');
                    } else if (response.data.msg === '优惠券保存失败') {
                        this.loading = false;
                        this.dialogVisible = false;
                        this.$message.error('保存失败');
                    } else {
                        this.$message.error('保存失败');
                    }
                })
            },
            getData() {
                console.log(this.sid);
                console.log(this.iid);
                console.log(this.sid1);
                console.log(this.iid1);
            },
            goMain() {
                this.$router.push('/')
            },
            goManage() {
                this.$router.push('/manage')
            },
            ifLogin() {
                if (localStorage.getItem('ms_username') !== null) {
                    this.islogin = true;
                    this.username = localStorage.getItem('ms_username');
                    if(localStorage.getItem('identity') == 1){
                        this.$axios.post(this.$api.cproductToSelect, this.$qs.stringify({
                            'itemId': this.iid
                        }), {headers: {contentType: 'application/json;charset=UTF-8'}}).then((response) => {
                            console.log(response.data);
                            if (response.data.code == 200) {
                                this.iArr2=response.data.msg;
                                console.log(this.iArr2)
                            } else {
                                console.log('网络连接失败');
                            }
                        })
                    }else if(localStorage.getItem('identity') == 3){
                        this.$axios.post(this.$api.sproductToSelect, this.$qs.stringify({
                            'itemId': this.iid
                        }), {headers: {contentType: 'application/json;charset=UTF-8'}}).then((response) => {
                            console.log(response.data);
                            if (response.data.code == 200) {
                                this.iArr2=response.data.msg;
                                console.log(this.iArr2)
                            } else {
                                console.log('网络连接失败');
                            }
                        })
                    }else{
                        this.$axios.post(this.$api.cproductToSelect, this.$qs.stringify({
                            'itemId': this.iid
                        }), {headers: {contentType: 'application/json;charset=UTF-8'}}).then((response) => {
                            console.log(response.data);
                            if (response.data.code == 200) {
                                this.iArr2=response.data.msg;
                                console.log(this.iArr2)
                            } else {
                                console.log('网络连接失败');
                            }
                        })
                    }
                }
            }
        },
        mounted() {
            this.ifLogin();
            console.log(this.$refs['aa']);
            this.$nextTick(function () {
                console.log(this.$refs['aa']);
            });
            //this.refesh();

            // this.$nextTick(()=>{
            //    this.getTS();
            //    console.log("dom更新")
            // });
            // this.nextTick(()=>{
            //    this.getTS();
            //    console.log("数据更新")
            // });
        }

    }
</script>

<style scoped>
    body {
        text-align: center;
        background-color: #bbbbbb
    }

    #main {
        margin: 0 auto;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        width: 1300px;
        height: 500px;
        background-color: snow;
        margin-top: 50px
    }

    .foot {
        margin: 0 auto;
        /*margin-top: 50px;*/
        /*margin-left: 150px;*/
        width: 1600px;
        height: 500px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

    .lfoot {
        position: absolute;
        display: inline-block;
        width: 350px;
        height: 500px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

    .tlfoot {
        width: 100%;
        margin-top: -25px;
        text-align: center;
        line-height: 80px;
        height: 100px;
        background-color: lightblue;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

    .blfoot {
        margin-top: 50px;
        background-color: #00d1b2;
        height: 325px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

    .rfoot {
        position: absolute;
        display: inline-block;
        margin-left: 400px;
        width: 1150px;
        height: 500px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

    .trfoot {
        margin-top: 0;
        height: 50px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

    .brfoot {
        margin-top: 0;
        display: flex;
        justify-content: center;
        flex-flow: row wrap;
        /*align-items: center;*/
        align-content: flex-start;
        padding-right: 70px;
        width: 1080px;
        height: 450px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

    #left {
        display: inline-block;
        width: 350px;
        height: 350px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        margin-left: 20px;
    }

    #left img {
        width: 100%;
        height: 100%;
        margin-bottom: 100px;
    }

    #right {
        display: inline-block;
        width: 500px;
        height: 500px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        margin-left: 10px;
        margin-top: 50px;
    }

    #right2 {
        display: inline-block;
        width: 300px;
        height: 430px;
        margin-left: 50px;
        background-color: #DCDCDC;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin-top: 0px;
    }

    .top {
        margin: 0 auto;
        width: 1880px;
        height: 40px;
        background-color: #F5F5F5;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
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
