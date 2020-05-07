<template>
   <div>
       <div class="header1">
           <div class="logo">
               <img src="../../../assets/images/logo.png" style="width: 100px;height:100px;margin-left: 10px">
               <div style="color:darkslategray;font-size: 20px;font-weight: bold;">siushare.com</div>
           </div>
           <div class="title">
               <span><p style="font-size: 25px;font-family: 'Apple Color Emoji';position: absolute;margin-left: -30px;margin-top: 75px">欢迎注册</p></span>
           </div>
       </div>
    <div id="login-wrap">
        <div class="ms-login">
            <div class="ms-title" style="color: black">注册</div>
            <el-form :model="param" :rules="rules" ref="register" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <i class="el-icon-lx-people" style="display: inline-block"></i>
                    <el-input v-model="param.username" placeholder="用户名" style="display: inline-block;width: 270px">
<!--                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>-->
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <i class="el-icon-lx-lock" style="display: inline-block"></i>
                    <el-input
                            type="password"
                            placeholder="输入密码"
                            v-model="param.password"
                            @keyup.enter.native="submitForm()"
                            style="display: inline-block;width: 270px"
                    >
<!--                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>-->
                    </el-input>
                </el-form-item>
                <el-form-item prop="password2">
                    <i class="el-icon-lx-lock" style="display: inline-block"></i>
                    <el-input
                            type="password"
                            placeholder="再次输入密码"
                            v-model="param.password2"
                            @keyup.enter.native="submitForm()"
                            style="display: inline-block;width: 270px"
                    >
<!--                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>-->
                    </el-input>
                </el-form-item>
<!--                <el-form-item label="" prop="region" style="width: 100px;margin-left: 180px">-->
<!--                    <el-select v-model="param.region" placeholder="身份" size="mini">-->
<!--                        <el-option label="商家" value="0"></el-option>-->
<!--                        <el-option label="Sharer" value="1"></el-option>-->
<!--                        <el-option label="消费者" value="2"></el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
                <el-form-item prop="phone">
                    <i class="el-icon-phone-outline" style="display: inline-block"></i>
                    <el-input v-model="param.phone" placeholder="输入你的手机号" style="display: inline-block;width: 270px">
<!--                        <el-button slot="prepend" icon="el-icon-phone-outline"></el-button>-->
                    </el-input>
                </el-form-item>
                <el-form-item prop="code" style="display: inline-block;width:190px">
                    <i class="el-icon-sunset" style="display: inline-block"></i>
                    <el-input
                            placeholder="验证码"
                            v-model="param.code"
                            @keyup.enter.native="submitForm()"
                            style="display: inline-block;width: 170px"
                    >
<!--                        <el-button slot="prepend" icon="el-icon-sunset"></el-button>-->
                    </el-input>
                </el-form-item>
                <el-form-item style="display: inline-block">
                    <el-button type="primary" plain size="mini" @click="getCode()" v-if="show">获取验证码</el-button>
                    <el-button type="primary" plain size="mini" @click="getCode()" v-else disabled>获取验证码</el-button>
                </el-form-item>
                <div v-if="error" style="color: red;font-size: 10px;margin-left: 180px;margin-top: -15px">{{errors}}</div>
                <div v-if="!show" style="color: #5daf34;font-size: 10px;margin-left: 130px;margin-top: -15px">短信已发送，{{count}}s后重新发送</div>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">注册</el-button>
                </div>
                <div>
                    <el-button  type="success" @click="goLogin()" size="mini" style="margin-left: 30px;display: inline-block">登录</el-button>
                    <el-button @click="resetForm('register')" type="success" size="mini" style="margin-left: 120px;display: inline-block">重置</el-button>
                </div>
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
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                        if (this.param.password !== '') {
                        this.$refs.register.validateField('password2');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.param.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                show: true,
                count: '',
                timer: null,
                errors:'',
                error: false,
                param: {
                    username: '',
                    password: '',
                    password2: '',
                    phone: '',
                    code: ''
                    //region: ''
                },
                rules: {
                    // region: [
                    //     { required: true, message: '请选择要注册的身份', trigger: 'change' }
                    // ],
                    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                    password: [
                        {validator: validatePass, required: true,  trigger: 'blur' },
                        {required: true,message: '请输入密码',trigger: 'blur'},
                        { min: 5,max: 25,message: '长度在 5 到 25个字符'},
                        {pattern: /^(\w){5,25}$/, message: '只能输入5-25个字母、数字、下划线'}],
                    password2: [
                        {validator: validatePass2, required: true,  trigger: 'blur' },
                        {required: true,message: '请输入密码',trigger: 'blur'},
                        { min: 5,max: 25,message: '长度在 5 到 25个字符'},
                        {pattern: /^(\w){5,25}$/, message: '只能输入5-25个字母、数字、下划线'}],
                    phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
                    code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
                },
            };
        },
        methods: {
            goLogin(){
                this.$router.push('/login')
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            submitForm() {
                this.$refs.register.validate(valid => {
                    if (valid) {
                        this.$axios.post(this.$api.register,this.$qs.stringify(this.param),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((response) => {
                            if(response.data.code==200){
                                this.$notify({
                                    title: '成功',
                                    message: '注册成功',
                                    type: 'success'
                                });
                                this.$router.push('/login');
                            }else if(response.data.code=='该用户名已注册'){
                                this.$notify.error({
                                    title: '错误',
                                    message: '该用户名已注册'
                                });
                            }else if(response.data.msg=='验证码错误'){
                                this.$notify.error({
                                    title: '错误',
                                    message: '验证码错误'
                                });
                                this.$router.push('register');
                            }
                        })
                    } else {
                        this.$message.error('未知错误');
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            getCode(){
                let phone=this.param.phone;
                let username=this.param.username;
                let password=this.param.password;
                let password2=this.param.password2;
                // this.$notify({
                //     title: '成功',
                //     message: '短信已发送 有效时间为60S',
                //     type: 'success'
                // });
                if(!phone||!username||!password||!password2) {
                    this.error=true;
                    this.errors = "资料不能为空"
                    // return false
                } else if(password!==password2){
                    this.errors = "两次密码不一致"
                }else if(!/^1[345678]\d{9}$/.test(phone)) {
                    this.error=true;
                    this.errors = "请输入正确的手机号"
                } else {
                    this.$axios.get(this.$api.registersms,{params:{'mobile':phone}}).then((response) => {
                        console.log(response.data)
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
