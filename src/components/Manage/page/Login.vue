<template>
    <div>
        <div class="header1">
            <div class="logo">
                <img src="../../../assets/images/logo.png" style="width: 100px;height:100px;margin-left: 10px">
                <div style="color:darkslategray;font-size: 20px;font-weight: bold;">siushare.com</div>
            </div>
            <div class="title">
                <span><p
                        style="font-size: 25px;font-family: 'Apple Color Emoji';position: absolute;margin-left: -30px;margin-top: 75px">欢迎登录</p></span>
            </div>
        </div>
        <div id="login-wrap">
            <div class="ms-login">
                <div class="ms-title" style="color: black">登录</div>
                <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                    <el-form-item prop="username">
                        <i class="el-icon-lx-people" style="display: inline-block"></i>
                        <el-input v-model="param.username" placeholder="username" autocomplete="off"  style="display: inline-block;width: 270px">
<!--                            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>-->
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <i class="el-icon-lx-lock" style="display: inline-block"></i>
                        <el-input
                                type="password"
                                placeholder="password"
                                v-model="param.password"
                                @keyup.enter.native="submitForm()"
                                autocomplete="off"
                                style="display: inline-block;width: 270px"
                        >
<!--                            <el-button slot="prepend" icon="el-icon-lx-lock" autocomplete="off"></el-button>-->
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="validate">
                        <el-input v-model="param.validate" class="validate-code" placeholder="验证码"
                                  style="display: inline-block;width:150px"></el-input>
                        <div class="code" @click="refreshCode" style="display: inline-block">
                            <s-identify :identifyCode="identifyCode"></s-identify>
                        </div>
                    </el-form-item>
                    <div class="login-btn">
                        <el-button type="primary" @click="submitForm()" style="display: inline-block;width:130px"
                                   v-loading="loading">登录
                        </el-button>
                        <el-button type="success" @click="goRegister()" style="display: inline-block;width:130px">注册
                        </el-button>
                    </div>
                    <!--                <el-link type="info" class="login-tips" href="/login" style="display: inline-block;color: #222222">忘记密码?</el-link>-->
                    <el-link type="info" style="display: inline-block;color: #222222" @click="show2 = !show2">忘记密码?</el-link>
                    <el-link type="info"
                             style="display: inline-block;margin-left: 160px;color: #222222;position: absolute;margin-top:5px"
                             @click="gosmsLogin()">手机登录
                    </el-link>
                    <el-form-item>
                        <el-switch v-model="param.rememberMe"
                                   style="display: inline-block;margin-left:200px"></el-switch>
                        <p style="display: inline-block">记住我</p>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div style="text-align: center;margin-top: 15px;font-size: 20px">
            <el-link type="primary" href="/">关于我们</el-link>
            |
            <el-link type="primary" href="/">联系我们</el-link>
            |
            <el-link type="primary" href="/">广告服务</el-link>
        </div>
        <div style="text-align: center;margin-top: 15px;font-size: 15px">Copyright @ 2019-2020 siushare.com 版权所有</div>
        <el-dialog
                title="提示"
                :visible.sync="show2"
                width="400px">
            <el-form :model="ruleForm" status-icon :rules="rules2" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="旧密码" prop="password" style="width: 300px">
                    <el-input v-model.number="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="newPassword" style="width: 300px">
                    <el-input type="password" v-model="ruleForm.newPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass" style="width: 300px">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile" style="width: 300px">
                    <el-input type="text" v-model="ruleForm.mobile" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="code" style="width: 200px;display: inline-block">
                    <el-input type="text" v-model="ruleForm.code" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item style="display: inline-block;position: absolute;margin-left: -90px">
                    <el-button type="primary" plain size="mini" @click="getCode()" v-if="show">获取验证码</el-button>
                    <el-button type="primary" plain size="mini" @click="getCode()" v-else disabled>获取验证码</el-button>
                </el-form-item>
                <div v-if="error" style="color: red;font-size: 10px;margin-left: 180px;margin-top: -15px">{{errors}}</div>
                <div v-if="!show" style="color: #5daf34;font-size: 10px;margin-left: 130px;margin-top: -15px">短信已发送，{{count}}s后重新发送</div>
                <el-form-item>
                    <el-button type="primary" @click="submitForm2('ruleForm')" style="width: 85%">提交</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="resetForm('ruleForm')" size="medium" style="width: 85%">重置</el-button>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
  </span>
        </el-dialog>
    </div>

</template>

<script>
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.newPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                show2: false,
                loading: false,
                identifyCodes: "1234567890",
                identifyCode: "",
                show: true,
                count: '',
                timer: null,
                errors:'',
                error: false,
                param: {
                    username: '',
                    password: '',
                    validate: '',
                    // rememberMe:''
                },
                rules: {
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}],
                    validate: [
                        {required: true, message: '请输入验证码', trigger: 'blur'}
                    ]
                },
                ruleForm: {
                    newPassword: '',
                    checkPass: '',
                    password: '',
                    code:'',
                    mobile:''
                },
                rules2: {
                    newPassword: [
                        {validator: validatePass, required: true,  trigger: 'blur' },
                        {required: true,message: '请输入密码',trigger: 'blur'},
                        { min: 5,max: 25,message: '长度在 5 到 25个字符'},
                        {pattern: /^(\w){5,25}$/, message: '只能输入5-25个字母、数字、下划线'}],
                    checkPass: [
                        {validator: validatePass2, required: true,  trigger: 'blur' },
                        {required: true,message: '请输入密码',trigger: 'blur'},
                        { min: 5,max: 25,message: '长度在 5 到 25个字符'},
                        {pattern: /^(\w){5,25}$/, message: '只能输入5-25个字母、数字、下划线'}],
                    password: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
                    code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
                    mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' },{pattern: /^1[3456789]\d{9}$/, message: '请输入格式正确的手机号'}],

                },
            };
        },
        methods: {
            // checkstatus(){
            //     const a=localStorage.getItem('ms_username');
            //     if(a!=null){
            //         this.$router.replace('/');
            //     }
            // },
            submitForm() {
                this.loading = true;
                if (this.param.validate === this.identifyCode) {
                    this.$refs.login.validate(valid => {
                        if (valid) {
                            //    this.$message.success('登录成功');
                            this.$axios.post(this.$api.login, this.$qs.stringify(this.param), {headers: {'Content-Type': 'application/x-www-form-urlencoded',timeout:5000,retry: 5, retryDelay: 1000}}).then((response) => {
                                localStorage.setItem('ms_username', this.param.username);
                                console.log(JSON.parse(response.data.msg));
                                if (response != null) {
                                    let item = JSON.parse(response.data.msg)
                                    if (item.role == 1) {
                                        this.loading = false;
                                        localStorage.setItem('identity', JSON.parse(response.data.msg).role);
                                        console.log("普通用户");
                                        sessionStorage.setItem('role', "普通用户");
                                        console.log(this.$route.query.redirect);
                                        let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                                        this.$router.push({path: redirect})// 获取登录成功后要跳转的路由。decodeURIComponent函数编码的 URI 进行解码--xlz
                                        // this.$router.go(-1);
                                        // this.$router.push('/');
                                    } else if (JSON.parse(response.data.msg).role == 2) {
                                        this.loading = false;
                                        localStorage.setItem('identity', JSON.parse(response.data.msg).role);
                                        console.log("商家");
                                        sessionStorage.setItem('role', "商家");
                                        console.log(this.$route.query.redirect);
                                        let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                                        this.$router.push({path: redirect})// 获取登录成功后要跳转的路由。decodeURIComponent函数编码的 URI 进行解码--xlz
                                    } else if (JSON.parse(response.data.msg).role == 3) {
                                        this.loading = false;
                                        localStorage.setItem('identity', JSON.parse(response.data.msg).role);
                                        sessionStorage.setItem('role', "商家");
                                        console.log("分享者");
                                        console.log(this.$route.query.redirect);
                                        let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                                        this.$router.push({path: redirect})// 获取登录成功后要跳转的路由。decodeURIComponent函数编码的 URI 进行解码--xlz
                                    } else {
                                        this.loading = false;
                                        this.$message.error('未知错误，请稍后再尝试1');
                                    }
                                } else {
                                    this.loading = false;
                                    this.$message.error('未知错误，请稍后再尝试2');
                                }
                            }).catch(function(err) {
                                console.log('failed', err);
                            })
                        } else {
                            this.$message.error('请输入账号和密码');
                            console.log('error submit!!');
                            return false;
                        }
                    });
                } else {
                    this.param.username = '';
                    this.param.password = '';
                    this.param.validate = '';
                    this.refreshCode();
                    this.$message.error('验证码错误');
                    this.loading = false;
                }
            },
            randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            },
            refreshCode() {
                this.identifyCode = "";
                this.makeCode(this.identifyCodes, 4);
            },
            makeCode(o, l) {
                for (let i = 0; i < l; i++) {
                    this.identifyCode += this.identifyCodes[
                        this.randomNum(0, this.identifyCodes.length)
                        ];
                }
                console.log(this.identifyCode);
            },
            goRegister() {
                this.$router.push('/register')
            },
            gosmsLogin() {
                this.$router.push('/smslogin')
            },
            submitForm2(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post(this.$api.editUserPassword,this.$qs.stringify(this.ruleForm),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((response) => {
                            console.log(response.data.code);
                            if(response.data.code==200){
                                this.$notify({
                                    title: '成功',
                                    message: '修改成功',
                                    type: 'success'
                                });
                                this.$router.push('/login')
                            }else if(response.data.code==80){
                                this.$notify.error({
                                    title: '错误',
                                    message: '验证码错误'
                                });
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            getCode(){
                let password=this.ruleForm.password;
                let newPassword=this.ruleForm.newPassword;
                let checkPass=this.ruleForm.checkPass;
                // this.$notify({
                //     title: '成功',
                //     message: '短信已发送 有效时间为60S',
                //     type: 'success'
                // });
                if(!password||!newPassword||!checkPass) {
                    this.error=true;
                    this.errors = "资料不能为空"
                    // return false
                } else if(newPassword!==checkPass){
                    this.errors = "两次密码不一致"
                }else {
                    this.$axios.get(this.$api.editUserPasswordsms,{params:{'mobile':this.ruleForm.mobile}}).then((response) => {
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
                console.log(this.ruleForm.password)
            },
        },
        mounted() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        }
    };
</script>

<style scoped>
    .header1 {
        margin-bottom: 5px;
        height: 150px;
    }

    .logo {
        display: inline-block;
        height: 100px;
    }

    .title {
        display: inline-block;
        height: 100px;
        margin-left: 50px;
    }

    #login-wrap {
        background-repeat: no-repeat;
        /*position: relative;*/
        background-image: url("../../../assets/img/login-bg.jpg");
        height: 600px;
        width: 1900px;
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
        height: 370px;
        left: 55%;
        top: 30%;
        width: 350px;
        /*margin: -190px 0 0 -175px;*/
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }
    .transition-box {
        margin: 0 auto;
        width: 350px;
        height: 350px;
        border-radius: 4px;
        background-color: #fff;
        text-align: center;
        color: #fff;
        padding: 40px 20px;
        box-sizing: border-box;
        filter:alpha(Opacity=50);-moz-opacity:0.5;opacity: 0.5
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

    /*@media (max-width: 960px){*/
    /*    #login-wrap {*/
    /*        !*background-repeat: repeat;*!*/
    /*        !*position: relative;*!*/
    /*        background-image: url("../../../assets/img/login-bg.jpg");*/
    /*        height:400px;*/
    /*        width:400px;*/
    /*        background-size: 100%;*/
    /*    }*/
    /*    .ms-login {*/
    /*        margin-left: -250px;*/
    /*    }*/
    /*}*/
</style>
