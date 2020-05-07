<template>
   <div>
    <v-header></v-header>
    <v-body></v-body>
    <v-bottom></v-bottom>
    <v-foot></v-foot>
   </div>
</template>

<script>
    import Header from "../components/Main/Hnav.vue";
    import Body from "../components/Main/Middle.vue";
    import Bottom from "../components/Main/NBottom.vue";
    import Foot from "../components/Main/Foot.vue";
    export default {
        data() {
            return {
                product: [], //接受后台返回的数组，在vue页面直接显示
                iArr1:[],}
        },
        components: {
            'v-header': Header,
            'v-body': Body,
            'v-bottom': Bottom,
            'v-foot': Foot
        },
        methods:{
            ifLogin(){
                console.log(localStorage.getItem('ms_username'));
            }
            // handleScroll() {
            //     var t = document.documentElement.scrollTop || document.body.scrollTop;
            //     if (t > 27) {
            //         console.log(t)
            //     }
            //     else if (t == 0) {
            //         console.log(0)
            //     }else {
            //
            //     }
            //
            // }
        },
        mounted() {
            this.ifLogin();
        }
    }
</script>

<style scoped>

</style>
