<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="15">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                        <el-button style="float: right; padding: 3px 0" type="text">基本信息</el-button>
                    <div class="user-info">
                        <div>
                            <img src="../../../assets/img/img.jpg" class="user-avator" alt />
                            <el-link type="primary" href="/" style="margin-left: -85px;margin-bottom: -25px">修改头像</el-link>
                        </div>
                        <div class="user-info-cont">
                            <div style="margin-bottom: 10px">用户名：{{userinfo.username}}</div>
                            <div style="margin-bottom: 10px">身份：{{role}}</div>
                            <div style="margin-bottom: 10px" v-if="role1!==3?true:false">优惠券：{{this.$store.state.couponnum}}</div>
                            <div style="margin-bottom: 10px" v-if="role1==3?true:false">成功分享的URL：15</div>
                            <div>手机号：{{userinfo.phone}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        上次登录时间：
                        <span>2019-11-01</span>
                    </div>
                    <div class="user-info-list">
                        上次登录地点：
                        <span>广州</span>
                    </div>
                </el-card>
                <el-card shadow="hover" style="height:452px;">
                    <div slot="header" class="clearfix">
                        <span>修改信息</span>
                    </div>
                    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="旧密码" prop="password" style="width: 500px">
                            <el-input v-model.number="ruleForm.password"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="newPassword" style="width: 500px">
                            <el-input type="password" v-model="ruleForm.newPassword" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass" style="width: 500px">
                            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item prop="code" style="display: inline-block;width:300px">
                            <el-input
                                    placeholder="验证码"
                                    v-model="ruleForm.code"
                            >
                            </el-input>
                        </el-form-item>
                        <el-form-item style="display: inline-block">
                            <el-button type="primary" plain size="mini" @click="getCode()" v-if="show">获取验证码</el-button>
                            <el-button type="primary" plain size="mini" @click="getCode()" v-else disabled>获取验证码</el-button>
                        </el-form-item>
                        <div v-if="error" style="color: red;font-size: 10px;margin-left: 180px;margin-top: -15px">{{errors}}</div>
                        <div v-if="!show" style="color: #5daf34;font-size: 10px;margin-left: 130px;margin-top: -15px">短信已发送，{{count}}s后重新发送</div>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')" style="width: 35%">提交</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="resetForm('ruleForm')" size="medium" style="width: 35%">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
            <el-col :span="9">
                <el-card shadow="hover" style="height:725px;">
                    <div slot="header" class="clearfix">
                        <span>我的日历</span>
                    </div>
                    <el-calendar v-model="value">
                    </el-calendar>
                </el-card>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import bus from '../../common/bus';
    export default {
        name: 'edit',
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
                value:new Date(),
                role1: localStorage.getItem('identity'),
                ruleForm: {
                    newPassword: '',
                    checkPass: '',
                    password: '',
                    code:''
                },
                rules: {
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

                },
                userinfo:[],
                show: true,
                count: '',
                timer: null,
                errors:'',
                error: false,
                name: localStorage.getItem('identity')
            };
        },
        created() {
            if(localStorage.getItem('identity')==1){
                this.$axios.post(this.$api.showAllCoupon,{},{headers: {contentType: 'application/json;charset=UTF-8'}}).then((response) => {
                    console.log(response.data.msg.length);
                    if(response.data.msg==="您的卡包为空"){
                        this.$store.dispatch("countcp",response.data.msg)
                    }else(
                        this.$store.dispatch("countcp",response.data.msg.length)
                        )
                })
            }
        },
        computed: {
            role() {
                return this.name === '2' ? '商家' : (this.name==='1'?'消费者':'分享者');
            }
        },
        methods: {
            getInfo(){
                this.$axios.post(this.$api.getuserinfo,{}).then((response) => {
                    console.log(response.data.msg);
                    this.userinfo=response.data.msg;
                })
            },
            submitForm(formName) {
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
                    this.$axios.get(this.$api.editUserPasswordsms,{params:{'mobile':this.userinfo.phone}}).then((response) => {
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
            changeDate() {
                const now = new Date().getTime();
                this.data.forEach((item, index) => {
                    const date = new Date(now - (6 - index) * 86400000);
                    item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
                });
            }
        },
        mounted() {
            this.getInfo();
        }
    };
</script>


<style scoped>
    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    /*.user-info-cont div:first-child {*/
    /*    font-size: 30px;*/
    /*    color: #222;*/
    /*}*/

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

</style>
