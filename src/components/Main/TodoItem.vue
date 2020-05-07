<template>
    <!--  <div>-->
    <!--  {{img}} {{detail}} {{title}}-->
    <!--    <img :src='img'/>-->
    <!--  </div>-->
    <div class="card">
        <img style="width: 200px;height: 200px;margin-top: 10px;display: block;margin-left: 10px" :src='imgs'
             class="image" @click="dd(no)">
        <div style="padding: 14px;">
            <div class="bottom clearfix">
                <p style="text-align: left;color: orangered;font-size: 20px;display: inline-block">原价${{price}}</p>
                <img src="../../assets/images/by.png" style="display: inline-block">
            </div>
            <div class="bottom clearfix">
                <p style="text-align: left;color: red;font-size: 20px;display: inline-block;margin-top: -30px">
                    现价${{cprice}}</p>
            </div>
            <span><p style="font-size: 10px;text-align: center;font-weight: bold">{{pname}}</p></span>
        </div>
    </div>
</template>

<script>
    import index from '../../router'

    export default {
        name: 'TodoItem',
        data() {
            return {
                imgs: '',
                price: '',
                pname: '',
                no: '',
                cprice:''
            }
        },
        /*props:{img:String,index,price:String,pname:String,no:String},*/
        // props:['data'],
        props: {
            data: {
                //type: Array
                // type:Object
            }
        },
        methods: {
            dd(value) {
                this.$router.push("/coupon/share?shareId=3&itemId=" + value);
                //this.$router.push("/detail/" + value);
            }
        },
        watch: {
            data: {
                handler(newValue, oldValue) {
                    console.log(newValue.officialImageUrl);
                    console.log(newValue.officialPrice);
                    console.log(newValue.productName);
                    console.log(newValue.itemId);
                    console.log(newValue.couponPrice);
                    this.imgs = newValue.officialImageUrl;
                    this.price = newValue.officialPrice;
                    this.cprice = newValue.couponPrice;
                    this.pname = newValue.productName;
                    this.no = newValue.itemId;
                    // this.imgs = newValue[3];
                    // this.price = newValue[8];
                    // this.pname = newValue[13];
                    // this.no = newValue[0];
                    this.$nextTick(() => {
                        console.log("节点变化")
                    })
                },
                immediate: true,// 获取初始值 并非第一次改变的值
                deep: true //当data为对象时 需要深度监控
            }
            // 冒号前边这个就是从父组件传过来的，后边的就是变化了的监听函数
        }
    }
</script>

<style scoped>
    .card {
        font-family: "Helvetica Neue", Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        width: 230px;
        height: 450px;
        margin-left: 80px;
        margin-top: 50px;
        display: inline-block;
    }

    .card:hover {
        cursor: pointer;
        color: #409EFF;
    }

    .image {
        width: 100%;
        display: block;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
</style>
