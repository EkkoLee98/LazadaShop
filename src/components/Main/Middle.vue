<template>
 <div>
    <div id="a">
        <div style="margin-left: 100px;padding-top: 250px" id="c">
            一站式跨境收款<br>
            39万+跨境电商卖家首选<br>
            安心使用放心收款贴心服务<br>
        </div>
<!--        <el-button style="margin-left: 100px;margin-top: 100px;width: 150px" type="success" round @click="show2 = !show2">加入我们</el-button>-->
        <el-button style="margin-left: 100px;margin-top: 90px;width: 350px" type="success" round @click="gologin" v-if="able">加入我们</el-button>
        <el-button style="margin-left: 100px;margin-top: 90px;width: 350px" type="success" round @click="gologin" v-else disabled>加入我们</el-button>
<!--        <el-button style="margin-left: 100px;margin-top: 100px" type="danger" round >-->
<!--            <el-dropdown @command="handleCommand">-->
<!--                   <span class="el-dropdown-link">-->
<!--                     {{$t('nav.Language')}}<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
<!--                   </span>-->
<!--                <el-dropdown-menu slot="dropdown">-->
<!--                    <el-dropdown-item command="zh">中文</el-dropdown-item>-->
<!--                    <el-dropdown-item command="en">English</el-dropdown-item>-->
<!--                    <el-dropdown-item command="ty">หน้าแรก</el-dropdown-item>-->
<!--                </el-dropdown-menu>-->
<!--            </el-dropdown>-->
<!--        </el-button>-->
        <transition name="el-zoom-in-center">
        <div v-show="show2" style="margin-left: 1000px;margin-top: -450px;" >
            <router-view/>
        </div>
        </transition>
        <transition name="el-zoom-in-center">
            <div v-show="show3">
                <div class="transition-box">

                </div>
            </div>
        </transition>
    </div>
     <div style="margin-left: 370px" id="b"></div>
 </div>
</template>

<script>
    export default {
        name: "Middle",
        // data: () => ({
        //
        // }),
        data() {
            return {
                able:true,
                show2: false,
                show3: false
            };
        },
        methods:{
            checkstatus(){
                const a=localStorage.getItem('ms_username');
                if(a!=null){
                    // this.$notify({
                    //     title: '成功',
                    //     message: '您已经登录了~',
                    //     type: 'success'
                    // });
                    this.$message.success('您已经登录了！');
                    this.able=false;
                }
            },
            gologin(){
                this.$router.push('/login');
            },
            // handleCommand(command) {
            //     this.$i18n.locale=command;
            // }
        },
        mounted() {
            this.checkstatus();
        }
    }
</script>

<style scoped>
    .transition-box {
        /*margin-bottom: 10px;*/
        width: 200px;
        height: 100px;
        border-radius: 4px;
        background-color: #409EFF;
        text-align: center;
        color: #fff;
        padding: 40px 20px;
        box-sizing: border-box;
        /*margin-left: 330px;*/
        margin: 0 auto;
    }
    #a {
        background-image: url("../../assets/images/a1.png");
        background-repeat: no-repeat;
        height:900px;
        width:1800px;
        /*margin-left: 50px;*/
        margin: 0 auto;
    }
    #b{
        background-image: url("../../assets/images/a2.png");
        background-repeat: no-repeat;
        height:100px;
        width: 1400px;
        margin-top: -180px;
    }
    #c{
        font-family:"Helvetica Neue",Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif;
        font-size: 45px;
        color: #97a8be;
        font-weight: bold;
    }
</style>
