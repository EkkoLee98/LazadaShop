<template>
    <!--  <div>-->
    <!--  {{img}} {{detail}} {{title}}-->
    <!--    <img :src='img'/>-->
    <!--  </div>-->
    <div class="card">
        <img style="width: 200px;height: 200px;margin-top: 10px;display: block;margin-left: 10px" v-lazy='img' class="image"  @click="dd(no)">
        <div style="padding: 14px;">
            <div class="bottom clearfix">
                <p style="text-align: left;color: orangered;font-size: 20px;display: inline-block">原价${{price}}</p>
                <img src="../../assets/images/by.png" style="display: inline-block">
            </div>
            <div class="bottom clearfix">
                <p style="text-align: left;color: red;font-size: 20px;display: inline-block;margin-top: -30px">现价${{price}}</p>
            </div>
            <span><p style="font-size: 10px;text-align: center;font-weight: bold">{{pname}}</p></span>
        </div>
    </div>
</template>

<script>
    import index from '../../router'

    export default {
        data(){
            return{
                name: 'TodoItem',
            }
        },
        props:{
            img: {
              type:String,
              default:''
            },price: {
                type:String,
                default:''
            },pname: {
                type:String,
                default:''
            },no: {
                type:String,
                default:''
            },index},
        methods: {
            dd(value){
                this.$router.push("/coupon/share?shareId=7&itemId="+value);
            }
        },
        watch:{
            img:{
                handler(n,o){
                    this.img=n;
                },

            },
            price:{
                handler(n,o){
                    this.price=n;
                },

            },
            pname:{
                handler(n,o){
                    this.pname=n;
                },

            },
            no:{
                handler(n,o){
                    this.no=n;
                },

            }
        }
    }
</script>

<style scoped>
    .card{
        font-family: "Helvetica Neue", Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        width: 230px;
        height: 450px;
        margin-left: 80px;
        margin-top: 10px;
        display: inline-block;
    }
    .card:hover{
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

<!--<template>-->
<!--    &lt;!&ndash;  <div>&ndash;&gt;-->
<!--    &lt;!&ndash;  {{img}} {{detail}} {{title}}&ndash;&gt;-->
<!--    &lt;!&ndash;    <img :src='img'/>&ndash;&gt;-->
<!--    &lt;!&ndash;  </div>&ndash;&gt;-->
<!--    <div class="card">-->
<!--        <img style="width: 70px;height: 70px;margin-top: 10px;display: block;margin-left: 90px" :src='img' class="image"  @click="dd(detail)">-->
<!--        <div style="padding: 14px;">-->
<!--            <span><p style="font-size: 20px;text-align: center;font-weight: bold">{{title}}</p></span>-->
<!--            <div class="bottom clearfix">-->
<!--&lt;!&ndash;                <p style="text-align: center;">{{detail}}</p>&ndash;&gt;-->
<!--                <p style="text-align: center;">aaa</p>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    import index from '../../router'-->

<!--    export default {-->
<!--        data(){-->
<!--            return{-->
<!--                name: 'TodoItem1'-->
<!--            }-->
<!--        },-->
<!--        props:{img:String,index,detail:String,title:String},-->
<!--        methods: {-->
<!--            dd(value){-->
<!--                this.$router.replace("/detail/"+value);-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</script>-->

<!--<style scoped>-->
<!--    .card{-->
<!--        font-family: "Helvetica Neue", Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif;-->
<!--        border: 1px solid #B3C0D1;-->
<!--        display: block;-->
<!--        width: 250px;-->
<!--        height: 300px;-->
<!--        margin-left: 90px;-->
<!--        margin-top: 50px;-->
<!--    }-->
<!--    .image {-->
<!--        width: 100%;-->
<!--        display: block;-->
<!--    }-->
<!--    .bottom {-->
<!--        margin-top: 13px;-->
<!--        line-height: 12px;-->
<!--    }-->
<!--    .clearfix:before,-->
<!--    .clearfix:after {-->
<!--        display: table;-->
<!--        content: "";-->
<!--    }-->

<!--    .clearfix:after {-->
<!--        clear: both-->
<!--    }-->
<!--</style>-->
