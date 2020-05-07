<template>
    <!--  <div id="app" @mousemove="moveEvent" @click="moveEvent">-->
    <div id="app">
        <router-view/>
    </div>
</template>

<script>


    import router from "./router";

    export default {
        name: "App",
        // created() {
        //   this.$cookieStore.setCookie( 'name' ,'13', 60);
        //   var a=this.$cookieStore.getCookie( 'JSESSIONID' );
        //   console.log(a)
        // },
        components: {},
        mounted() {
            if (this.isMobile()) {
                // this.$router.push("/mobileIndex");
                console.log('手机')
            } else {
                console.log('电脑')
                // this.$router.push("/pcIndex");
            }
        },


        methods: {
            isMobile() {
                let flag = navigator.userAgent.match( // match方法可在字符串内检索指定的值，
                    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone|MicroMessenger)/i
                );
                // console.log(flag)
                return flag;
            }
        }
        // moveEvent(){//				console.log("清除了定时器！！！！！")
        //   let path = ['/login'];
        //   if(!path.includes(this.$route.path)) { //如果不是登录页面的话页面停止进行30分钟后清空session
        //     clearTimeout(this.timmer);
        //     this.init();
        //   }
        // },
        // init(){
        //   this.timmer=setTimeout(()=>{
        //     //清除session
        //     sessionStorage.removeItem("token");
        //     sessionStorage.clear();
        //     localStorage.removeItem('ms_username');
        //     localStorage.removeItem('identity');
        //     localStorage.removeItem('ok');
        //     //清除缓存
        //     this.$cache.reset();
        //     //跳往登录页面
        //     this.$router.push({
        //       path: "/login",
        //     });
        //   },30*60*1000);//设置半小时清空session进入屏保
        // },
    }
</script>


<style>

</style>
