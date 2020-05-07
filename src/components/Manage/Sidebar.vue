<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#fff"
            text-color="#838B8B"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items2" v-if="identity">
                <!--            text-color="#9C9C9C"-->
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title" style="font-size: 15px">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                    v-if="subItem.subs"
                                    :index="subItem.index"
                                    :key="subItem.index"
                            >
                                <template slot="title" style="font-size: 15px">{{ subItem.title }}</template>
                                <el-menu-item
                                        v-for="(threeItem,i) in subItem.subs"
                                        :key="i"
                                        :index="threeItem.index"
                                        style="font-size: 15px"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                    v-else
                                    :index="subItem.index"
                                    :key="subItem.index"
                                    style="font-size: 20px"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title" style="font-size: 15px">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
            <template v-for="item in items" v-if="identity1">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title" style="font-size: 15px">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title" style="font-size: 15px">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                    style="font-size: 15px"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                                style="font-size: 15px"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title" style="font-size: 15px">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
            <template v-for="item in items3" v-if="identity2">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title" style="font-size: 15px">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                    v-if="subItem.subs"
                                    :index="subItem.index"
                                    :key="subItem.index"
                            >
                                <template slot="title" style="font-size: 15px">{{ subItem.title }}</template>
                                <el-menu-item
                                        v-for="(threeItem,i) in subItem.subs"
                                        :key="i"
                                        :index="threeItem.index"
                                        style="font-size: 15px"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                    v-else
                                    :index="subItem.index"
                                    :key="subItem.index"
                                    style="font-size: 15px"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title" style="font-size: 15px">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            identity:false,
            identity1:false,
            identity2:false,
            collapse: false,
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: '/manage/dashboard',
                    title: '流量监控'
                },
                {
                    icon: 'el-icon-user',
                    index: '/manage/infoedit',
                    title: '个人资料'
                },
                {
                    icon: 'el-icon-lx-cascades',
                    index: '/manage/allproducts',
                    title: '商品列表'
                },
                {
                    icon: 'el-icon-present',
                    index: '/manage/allcoupons',
                    title: '优惠券列表'
                },
                {
                    icon: 'el-icon-money',
                    index: '/manage/card',
                    title: '卡包'
                },
                {
                    icon: 'el-icon-lx-copy',
                    index: '/manage/tabs',
                    title: '系统公告'
                },
                {
                    icon: 'el-icon-lx-warn',
                    index: '/manage/permission',
                    title: '授权处理'
                }
            ],
            items2:[
                {
                    icon: 'el-icon-user',
                    index: '/manage/infoedit',
                    title: '个人资料'
                },
                {
                    icon: 'el-icon-money',
                    index: '/manage/card',
                    title: '卡包'
                },
                {
                    icon: 'el-icon-lx-warn',
                    index: '/manage/permission',
                    title: '授权处理'
                }
            ],
            items3:[
                {
                    icon: 'el-icon-lx-home',
                    index: '/manage/dashboard',
                    title: '流量监控'
                },
                {
                    icon: 'el-icon-user',
                    index: '/manage/infoedit',
                    title: '个人资料'
                },
                {
                    icon: 'el-icon-office-building',
                    index: '/manage/allshops',
                    title: '所有商家'
                },
                {
                    icon: 'el-icon-present',
                    index: '/manage/getallcoupons',
                    title: '优惠券列表'
                },
                {
                    icon: 'el-icon-paperclip',
                    index: '/manage/getallurls',
                    title: 'URL列表'
                },
                {
                    icon: 'el-icon-lx-copy',
                    index: '/manage/tabs',
                    title: '系统公告'
                }
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    methods:{
        ifLogin() {
            if (localStorage.getItem('identity') !== null) {
                let no=localStorage.getItem('identity');
                if(no == 1){
                    this.identity = true;
                    this.identity1 = false;
                    this.identity2 = false;
                }else if(no == 2){
                    this.identity1 = true;
                    this.identity = false;
                    this.identity2 = false;
                }else if(no == 3){
                    this.identity2 = true;
                    this.identity = false;
                    this.identity1 = false;
                }
            }
        }
    },
    mounted() {
        this.ifLogin();
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
