<template>
    <div>
        <div class="header" style="margin-bottom: 80px">
            <el-menu
                    router
                    unique-opened
                    :default-active="activeIndex2"
                    mode="horizontal"
                    background-color="#36648B"
                    text-color="#FF7F00"
                    active-text-color="#FF7F00"
                    id="nav-fixed"
                    :class="{nav_fixed : isFixed}"
            >
                <el-menu-item style="float: left;margin-left: 150px">
                    <img src="../../assets/images/logo.png" style="width: 50px;height:50px">
                </el-menu-item>
                <el-menu-item style="float: right;">
                    <el-dropdown>
                   <span class="el-dropdown-link" @click="handleCommand">
                     返回顶部<i class="el-icon-arrow-down el-icon--right"></i>
                   </span>
                        <el-dropdown-menu slot="dropdown">
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-menu-item>
                <el-menu-item style="float: right;">
                    <el-dropdown @command="handle" trigger="click">
                   <span class="el-dropdown-link">
                     {{$t('nav.Language')}}<i class="el-icon-arrow-down el-icon--right"></i>
                   </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="zh">中文</el-dropdown-item>
                            <el-dropdown-item command="en">English</el-dropdown-item>
                            <el-dropdown-item command="ty">หน้าแรก</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-menu-item>
                <el-menu-item style="float: right;">
                    <el-dropdown class="user-name" trigger="click" @command="handleCommand1">
                    <span class="el-dropdown-link" v-if="aab">
                        Hello,{{username}}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <span class="el-dropdown-link" v-else @click="goLogin()">
                        请先登录！
                    </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item divided command="/manage" v-if="this.name=='1'?true:false">个人中心</el-dropdown-item>
                            <el-dropdown-item divided command="/manage" v-if="this.name!=='1'?true:false">管理后台</el-dropdown-item>
                            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                   </el-menu-item>
            </el-menu>
        </div>

<!--      <div class="box">-->
<!--          <div class="card" style="margin-right: 600px">-->
<!--              <img style="display: block;margin-top: 5px;width: 280px;height: 70px" src="../../assets/images/ShapeCopy.png" @click="test()"/>-->
<!--          </div>-->
<!--          <div class="card" style="margin-right: 200px">-->
<!--              <img style="display: block;width: 270px;height: 120px;margin-top: -20px" src="../../assets/images/logo.jpg"/>-->
<!--          </div>-->
<!--      </div>-->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex2: '1',
                isFixed: false,
                offsetTop: 0,
                aab:false,
                name: localStorage.getItem('identity')
            };
        },
        computed: {
            username() {
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        methods: {
            handle(command) {
                this.$i18n.locale=command;
            },
            goLogin(){
                this.$router.push('/login')
            },
            ifLogin(){
                this.$store.dispatch("addFun",(localStorage.getItem('ms_username')));
                localStorage.setItem('ok',this.$store.state.message);
                if(localStorage.getItem('ok')!=='null'){
                     this.aab=true;
                     console.log(this.aab)
                }
            },
            handleScroll() {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if (scrollTop >= this.offsetTop) {
                    this.isFixed = true;
                } else {
                    this.isFixed = false;
                }
            },
            handleCommand() {
                var top = document.body.scrollTop || document.documentElement.scrollTop
                scrollBy(0,-top);
            },
            handleCommand1(command) {
                if(command==='/manage') {
                    this.$router.push(command);
                }else if(command==='loginout'){
                    localStorage.removeItem('ms_username');
                    localStorage.removeItem('identity');
                    localStorage.removeItem('ok');
                    this.$axios.post('/api/logout',{},{headers: {contentType: 'application/json;charset=UTF-8'}}).then((response) => {
                        console.log(response.data)
                    });
                    this.$router.push('/login');
                }
            },
            test(){
                this.$router.push({ name: 'coupon', params: { shareId: 123,itemId:123456}})
            }
        },
        mounted() {
            this.ifLogin();
            // 设置bar浮动阈值为 #fixedBar 至页面顶部的距离
            this.offsetTop = document.querySelector('#nav-fixed').offsetTop;
            // 开启滚动监听
            window.addEventListener('scroll', this.handleScroll);
        },
        destroyed() {
            // 离开页面 关闭监听 不然会报错
            window.removeEventListener('scroll', this.handleScroll);
        }
    }
</script>
<style scoped>

    .user-name {
        margin-left: 10px;
    }
    .el-dropdown-link {
        color: #fff;
        cursor: pointer;
    }
    #nav-fixed {
        position: fixed;
        z-index: 2;
        top: 0;
        width: 100%;
        border-bottom: none !important;
        border: 0;
        border-radius: 10px;
    }
    .nav_fixed {
        position: fixed;
        z-index: 2;
        top: 0;
        width: 100%;
    }
</style>
