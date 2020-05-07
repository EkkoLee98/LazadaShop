<template>
    <div>
        <div class="box">
            <todo-item v-for="(item,index) of iArr1" :key="index" :data.sync="item" :index="index"></todo-item>
        </div>
        <hr style="margin-bottom: 50px;width: 900px;margin-top: 70px">
    </div>
</template>
<script>

    import TodoItem from './TodoItem.vue'

    export default {
        name: "NBottom",
        data() {
            return {
                product: [], //接受后台返回的数组，在vue页面直接显示
                iArr1: [],
            }
        },
        components: {
            'todo-item': TodoItem
        },
        methods: {
            aa() {            //使用axios的get请求，es6语法的箭头函数
                let tdata = {username: 'a2523332960@163.com'};
                // this.$axios.post('/api/test1.php',tdata,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
                this.$axios.post(this.$api.productAll, {}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
                    //  /api/test01/axiosphp.php是后台文件URL，api代表本
                    //机Apache端口：http://localhost:8080，需要在index.js设置
                    this.product = res.data;    //将PHP返回数组的值付给users
                    console.log('success');      //打印结果
                    console.log(res.data);
                    if(res.data.msg==='没有访问权限'){
                        console.log(res.data.msg);
                    }else{
                        this.iArr1 = JSON.parse(this.product.msg.productsJsonInfo);
                        console.log(this.iArr1);
                    }
                })
            },
            bb() {            //使用axios的get请求，es6语法的箭头函数
                // this.$axios.post('/api/test1.php',tdata,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
                this.$axios.post(this.$api.getTop, {}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
                    //  /api/test01/axiosphp.php是后台文件URL，api代表本
                    //机Apache端口：http://localhost:8080，需要在index.js设置
                    this.product = res.data;    //将PHP返回数组的值付给users
                    console.log('success');      //打印结果
                    console.log(res.data);
                    if(res.data.msg==='没有访问权限'){
                        console.log(res.data.msg);
                    }else{
                       // this.iArr1 = JSON.parse(this.product.msg);
                        this.iArr1 = this.product.msg;
                        console.log(this.iArr1[0].itemId);
                    }
                })
            },
        },
        mounted() {
            // this.aa();
            this.bb();
        }
    }
</script>

<style scoped>
    .box {
        display: flex;
        justify-content: center;
        flex-flow: row wrap;
        align-content: flex-start;
        padding-right: 70px;
        width: 1600px;
        margin: 0 auto;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
</style>
