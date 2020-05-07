<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div>
        <div class="logo" v-if="role!=1?true:false">后台管理</div>
        <div class="logo" v-if="role==1?true:false">个人中心</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 消息中心 -->
                <div class="btn-bell" v-if="role==2?true:false">
                    <el-tooltip
                        effect="dark"
                        :content="message?`有${message}条未读消息`:`消息中心`"
                        placement="bottom"
                    >
                        <router-link to="/manage/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div>
                <!-- 用户头像 -->
                <div class="user-avator">
                    <img src="../../assets/img/img.jpg" />
                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand" style="margin-right: 30px">
                    <span class="el-dropdown-link">
                        {{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
<!--                        <a href="https://github.com/lin-xin/vue-manage-system" target="_blank">-->
<!--                            <el-dropdown-item>项目仓库</el-dropdown-item>-->
<!--                        </a>-->
                        <el-dropdown-item divided command="bind">更改绑定</el-dropdown-item>
                        <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span style="margin-left: 10px;margin-right: 20px">
                  <el-link type="info" icon="el-icon-discount" style="color: white" @click="goMain()">首页</el-link>
                </span>
                <span style="margin-left: 10px;margin-right: 20px">
                  <el-link type="info" icon="el-icon-phone" style="color: white" @click="">联系客服</el-link>
                </span>
            </div>
        </div>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%">
            <el-form ref="form" :model="sizeForm" label-width="80px" size="mini" :rules="rules">
                <el-form-item label="旧手机号" prop="mobile" style="width: 70%">
                    <el-input v-model="sizeForm.mobile" disabled></el-input>
                </el-form-item>
                <el-form-item prop="code" label="验证码" style="display: inline-block;width: 60%">
                    <el-input
                            placeholder="验证码"
                            v-model="sizeForm.code"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item style="display: inline-block;width: 20%">
                    <el-button type="primary" plain size="mini" @click="getCode()" v-if="show" style="margin-left: -100px">获取验证码</el-button>
                    <el-button type="primary" plain size="mini" @click="getCode()" v-else disabled style="margin-left: -100px">获取验证码</el-button>
                </el-form-item>
                <div v-if="error" style="color: red;font-size: 10px;margin-left: 180px;margin-top: -15px">{{errors}}</div>
                <div v-if="!show" style="color: #5daf34;font-size: 10px;margin-left: 130px;margin-top: -15px">短信已发送，{{count}}s后重新发送</div>
                <el-form-item size="large" style="width: 70%">
                    <el-button type="primary" @click="onSubmit">检验验证码</el-button>
                    <el-button @click="dialogVisible = false">取 消</el-button>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
  </span>
        </el-dialog>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible2"
                width="30%">
            <el-form ref="form2" :model="sizeForm2" label-width="80px" size="mini" :rules="rules2">
                <el-form-item label="新手机号" prop="mobile" style="width: 70%">
                    <el-input v-model="sizeForm2.mobile" ></el-input>
                </el-form-item>
                <el-form-item prop="code" label="验证码" style="display: inline-block;width:300px">
                    <el-input
                            placeholder="验证码"
                            v-model="sizeForm2.code"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item style="display: inline-block">
                    <el-button type="primary" plain size="mini" @click="getCode()" v-if="show" style="margin-left: -100px">获取验证码</el-button>
                    <el-button type="primary" plain size="mini" @click="getCode()" v-else disabled style="margin-left: -100px">获取验证码</el-button>
                </el-form-item>
                <div v-if="error" style="color: red;font-size: 10px;margin-left: 180px;margin-top: -15px">{{errors}}</div>
                <div v-if="!show" style="color: #5daf34;font-size: 10px;margin-left: 130px;margin-top: -15px">短信已发送，{{count}}s后重新发送</div>
                <el-form-item size="large">
                    <el-button type="primary" @click="susbind()">确认绑定</el-button>
                    <el-button @click="dialogVisible = false">取 消</el-button>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
  </span>
        </el-dialog>
    </div>
</template>
<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            sizeForm: {
                mobile: '',
                code:''
            },
            sizeForm2: {
                mobile: '',
                code:''
            },
            rules: {
                code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
            },
            rules2: {
                mobile: [
                    {required: true,message: '请输入手机号',trigger: 'blur'},
                    {pattern: /^1[3456789]\d{9}$/, message: '请输入格式正确的手机号'}
                    ],
                code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
            },
            dialogVisible: false,
            dialogVisible2: false,
            role: localStorage.getItem('identity'),
            collapse: false,
            fullscreen: false,
            name: 'lien',
            message: 2,
            show: true,
            count: '',
            timer: null,
            errors:'',
            error: false,
        };
    },
    computed: {
        username() {
            let username = localStorage.getItem('ms_username');
            return username ? username : this.name;
        }
    },
    methods: {
        susbind(){
            this.$refs.form2.validate((valid) => {
                if (valid) {
                    this.$axios.post('/api/editUserPhone',this.$qs.stringify(this.sizeForm2),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((response) => {
                        console.log(response.data.code);
                        if(response.data.code==200){
                            this.$notify({
                                title: '成功',
                                message: '修改成功',
                                type: 'success'
                            });
                            this.dialogVisible2=false;
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
        onSubmit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.$axios.post(this.$api.editUserPhone,this.$qs.stringify({'code':this.sizeForm.code}),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((response) => {
                        console.log(response.data.code);
                        if(response.data.code==200){
                            this.$notify({
                                title: '成功',
                                message: '验证成功',
                                type: 'success'
                            });
                            this.dialogVisible=false;
                            this.dialogVisible2=true;
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
        getCode(){
            let mobile=this.sizeForm.mobile;
            if(!mobile) {
                this.error=true;
                this.errors = "资料不能为空"
                // return false
            } else {
                this.$axios.post(this.$api.editUserPhonesms,this.$qs.stringify({'mobile':mobile}),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((response) => {
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
        // handleClose(done) {
        //     this.$confirm('确认关闭？')
        //         .then(_ => {
        //             done();
        //         })
        //         .catch(_ => {});
        // },
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command == 'loginout') {
                localStorage.removeItem('ms_username');
                localStorage.removeItem('identity');
                localStorage.removeItem('ok');
                this.$axios.post('/api/logout',{},{headers: {contentType: 'application/json;charset=UTF-8'}}).then((response) => {
                    console.log(response.data)
                });
                this.$router.push('/login');
            }else if(command == 'bind'){
                this.$axios.post('/api/getuserinfo',{}).then((response) => {
                    this.sizeForm.mobile=response.data.msg.phone;
                });
                this.dialogVisible=true
            }else{
                this.$router.push('/');
            }
        },
        // 侧边栏折叠
        collapseChage() {
            this.collapse = !this.collapse;
            bus.$emit('collapse', this.collapse);
        },
        goMain(){
            this.$router.push('/')
        },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        }
    },
    mounted() {
        if (document.body.clientWidth < 1500) {
            this.collapseChage();
        }
    }
};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
}
.header .logo {
    float: left;
    width: 250px;
    line-height: 70px;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}
.btn-bell .el-icon-bell {
    color: #fff;
}
.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
</style>
