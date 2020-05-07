<template>
    <div class="wrapper">

      <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
<!--                    <keep-alive>-->
<!--                    <keep-alive :exclude="tagsList">-->
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from '../components/Manage/Header.vue';
import vSidebar from '../components/Manage/Sidebar.vue';
import vTags from '../components/Manage/Tags.vue';
import bus from '../components/common/bus';
export default {
    data() {
        return {
            tagsList: [],
            collapse: false,
            role:'',
            buyer:false,
            business:false,
            sharer:false
        };
    },
    components: {
        vHead,
        vSidebar,
        vTags
    },
    methods: {
         getRole(){
             this.role=localStorage.getItem('identity');
             if(this.role==='2'){
                 this.buyer=false;
                 this.business=true;
                 this.sharer=false;
                 console.log(this.buyer);
                 console.log(this.business);
                 console.log(this.sharer);
             }
         }
    },
    mounted() {
        this.getRole();
    },
    created() {
        bus.$on('collapse-content', msg => {
            this.collapse = msg;
        });

        // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
        bus.$on('tags', msg => {
            let arr = [];
            for (let i = 0, len = msg.length; i < len; i++) {
                msg[i].name && arr.push(msg[i].name);
            }
            this.tagsList = arr;
        });
    }
};
</script>
<style>
    @import "../assets/styles/main.css";
    @import "../assets/styles/color-dark.css";    /* 深色主题*/
    /*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
</style>
