<template>
   <div>
       <div class="header1">
           <div class="logo">
               <img src="../../../assets/images/logo.png" style="width: 100px;height:100px;margin-left: 10px">
               <div style="color:darkslategray;font-size: 20px;font-weight: bold;">siushare.com</div>
           </div>
           <div class="title">
               <span><p style="font-size: 25px;font-family: 'Apple Color Emoji';position: absolute;margin-left: -30px;margin-top: 75px">欢迎登录</p></span>
           </div>
       </div>
    <div id="login-wrap">
        <div class="ms-login">
            <div class="ms-title" style="color: black">手机登录</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="phone">
                    <i class="el-icon-lx-people" style="display: inline-block"></i>
                    <el-input v-model="param.mobile" placeholder="输入你的手机号" style="display: inline-block;width: 270px">
<!--                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>-->
                    </el-input>
                </el-form-item>
                <el-form-item prop="code" style="display: inline-block;width:190px">
                    <i class="el-icon-lx-lock" style="display: inline-block"></i>
                    <el-input
                            placeholder="验证码"
                            v-model="param.smsCode"
                            @keyup.enter.native="submitForm()"
                            style="display: inline-block;width: 170px"
                    >
<!--                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>-->
                    </el-input>
                </el-form-item>
                <el-form-item style="display: inline-block">
                    <el-button type="primary" plain size="mini" @click="getCode()" v-if="show">获取验证码</el-button>
                    <el-button type="primary" plain size="mini" @click="getCode()" v-else disabled>获取验证码</el-button>
                </el-form-item>
                <div v-if="error" style="color: red;font-size: 10px;margin-left: 180px;margin-top: -15px">{{errors}}</div>
                <div v-if="!show" style="color: #5daf34;font-size: 10px;margin-left: 130px;margin-top: -15px">短信已发送，{{count}}s后重新发送</div>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <el-form-item style="margin-top: -20px">
                    <el-link type="info"
                             style="display: inline-block;margin-top:5px;color: #222222;"
                             @click="goLogin()">账密登录
                    </el-link>
                    <div style="display: inline-block;margin-left: 130px">
                        <el-switch v-model="param.rememberMe" style="display: inline-block"></el-switch>
                        <p style="display: inline-block">记住我</p>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
       <div style="text-align: center;margin-top: 15px;font-size: 20px"><el-link type="primary" href="/">关于我们</el-link>  |  <el-link type="primary" href="/">联系我们</el-link>  |  <el-link type="primary" href="/">广告服务</el-link></div>
       <div style="text-align: center;margin-top: 15px;font-size: 15px">Copyright @ 2019-2020 siushare.com 版权所有</div>
   </div>
</template>

<script>
    export default {
        data: function() {
            return {
                show: true,
                count: '',
                timer: null,
                errors:'',
                error: false,
                param: {
                    mobile: '',
                    smsCode: ''
                },
                rules: {
                    mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
                    smsCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
                },
            };
        },
        methods: {
            goLogin(){
                this.$router.push('/login')
            },
            submitForm() {
                this.$refs.login.validate(valid => {
                    if (valid) {
                        this.$axios.post(this.$api.loginsms,this.$qs.stringify(this.param),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((response) => {
                            if(response.data!==null){
                                console.log(response);
                                console.log(JSON.parse(response.data.msg));
                                console.log(JSON.parse(response.data.msg).name);
                                console.log(JSON.parse(response.data.msg).role);
                                if(JSON.parse(response.data.msg).role==1){
                                    localStorage.setItem('ms_username', JSON.parse(response.data.msg).name);
                                    localStorage.setItem('identity', JSON.parse(response.data.msg).role);
                                    console.log("消费者");
                                    sessionStorage.setItem('role',"消费者");
                                    this.$message.success('登录成功');
                                }else if(JSON.parse(response.data.msg).role==2){
                                    localStorage.setItem('ms_username', JSON.parse(response.data.msg).name);
                                    localStorage.setItem('identity', JSON.parse(response.data.msg).role);
                                    console.log("商家");
                                    sessionStorage.setItem('role',"商家");
                                    this.$message.success('登录成功');
                                }else if(JSON.parse(response.data.msg).role==3){
                                    localStorage.setItem('ms_username', JSON.parse(response.data.msg).name);
                                    localStorage.setItem('identity', JSON.parse(response.data.msg).role);
                                    console.log("分享者");
                                    sessionStorage.setItem('role',"分享者");
                                    this.$message.success('登录成功');
                                }
                            }
                            this.$router.replace('/');
                        })
                    } else {
                        this.$message.error('请输入手机号和验证码');
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            getCode(){
                let phone=this.param.mobile;
                // this.$notify({
                //     title: '成功',
                //     message: '短信已发送 有效时间为60S',
                //     type: 'success'
                // });
                if(!phone) {
                    this.error=true;
                    this.errors = "手机号码不能为空"
                    // return false
                } else if(!/^1[345678]\d{9}$/.test(phone)) {
                    this.error=true;
                    this.errors = "请输入正确的手机号"
                } else {
                    this.$axios.get(this.$api.loginsms,{params:{'mobile':phone},timeout:5000,retry: 5, retryDelay: 1000}).then((response) => {
                    //this.$axios.post('api/login/sms',this.$qs.stringify({'phone':phone}),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((response) => {
                        console.log(response.data);
                        console.log('aaa')
                    });
                    const TIME_COUNT = 60;
                    this.error=false;
                    if (!this.timer) {
                        this.count = TIME_COUNT;
                        this.show = false;
                        this.timer = setInterval(()=>{
                            if (this.count>0&&this.count<=TIME_COUNT){
                                this.count--;
                            }else{
                                this.show = true;
                                clearInterval(this.timer);
                                this.timer = null;
                            }
                        }, 1000)
                    }
                }
            }
        },
        mounted() {
        }
    };
</script>

<style scoped>
    .header1{
        margin-bottom: 5px;
        height: 150px;
    }
    .logo{
        display: inline-block;
        height: 100px;
    }
    .title{
        display: inline-block;
        height: 100px;
        margin-left: 50px;
    }
    #login-wrap {
        background-repeat: no-repeat;
        /*position: relative;*/
        background-image: url("../../../assets/img/login-bg.jpg");
        height:600px;
        width:1900px;
        margin: 0 auto;
        background-size: 100%;
    }
    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .ms-login {
        position: absolute;
        height: 300px;
        left: 55%;
        top: 30%;
        width: 350px;
        /*margin: -190px 0 0 -175px;*/
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }
    .ms-content {
        padding: 30px 30px;
    }
    .login-btn {
        text-align: center;
    }
    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }
    .login-tips {
        font-size: 12px;
        line-height: 30px;
        color: #fff;
    }
</style>
