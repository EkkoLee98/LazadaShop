<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 所有商家
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
                    style="width: 100%"
                    height="500"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column label="店铺Id" width="150" align="center">
                    <template slot-scope="scope">{{scope.row.merchantID}}</template>
                </el-table-column>
                <el-table-column label="商家信息" align="center">
                    <template slot-scope="scope">{{scope.row.merchantAccount}}</template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.row.merchantID)"
                        >查看优惠券</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="商家优惠券" :visible.sync="editVisible" width="50%">
            <el-table
                    :data="tableData1"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
                    style="width: 100%"
                    height="500"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column label="商品Id" width="300" align="center">
                    <template slot-scope="scope">{{scope.row.itemId}}</template>
                </el-table-column>
                <el-table-column label="商家用户名" width="300" align="center">
                    <template slot-scope="scope">{{scope.row.merchantAccount}}</template>
                </el-table-column>
                <el-table-column label="原价" width="300" align="center">
                    <template slot-scope="scope">{{scope.row.officialPrice}}</template>
                </el-table-column>
                <el-table-column label="优惠价" width="200" align="center">
                    <template slot-scope="scope">{{scope.row.couponPrice}}</template>
                </el-table-column>
                <el-table-column label="截止时间" align="center">
                    <template slot-scope="scope">{{scope.row.endTime}}</template>
                </el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="getUrl(scope.row)"
                        >生成URL</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog
                title="生成URL成功"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            生成URL成功：<span>您生成的URL为:  {{shareurl}}  快去跟大家分享吧！</span>
            <el-button class="ml10" type="text" size="medium"
                       v-clipboard:copy="shareurl"
                       v-clipboard:success="onCopy"
                       v-clipboard:error="onError">点击复制</el-button>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'AllShops',
        data() {
            return {
                query: {
                    address: '',
                    name: '',
                    pageIndex: 1,
                    pageSize: 10
                },
                tableData: [],
                tableData1:[],
                multipleSelection: [],
                editVisible: false,
                dialogVisible:false,
                shareurl:''
            };
        },
        created() {
            this.GetMerchant();
        },
        methods: {
            getUrl(row){
                this.$axios.post(this.$api.generationShareUrl,this.$qs.stringify({'itemId':row.itemId}),{headers: {contentType: 'application/json;charset=UTF-8'}}).then((response) => {
                    console.log(response.data);
                    if(response.data.code==200){
                        this.dialogVisible=true;
                        this.shareurl='https://siushare.com/coupon/share?shareId='+response.data.msg+'&itemId='+row.itemId;
                    }else if(response.data.code==33){
                        this.$notify({
                            title: '成功',
                            message: '已生成过相同的URL！',
                            type: 'success'
                        });
                    }
                })
            },
            onCopy(e){
                this.$notify({
                    title: '成功',
                    message: '复制成功',
                    type: 'success'
                });
                this.dialogVisible=false;
                console.log(e);
            },
            onError(e){
                this.$notify.error({
                    title: '错误',
                    message: '复制失败'
                });
                this.dialogVisible=false;
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            // 获取 easy-mock 的模拟数据
            GetMerchant(){
                this.$axios.post(this.$api.getMerchant,{},{headers: {contentType: 'application/json;charset=UTF-8'}}).then((response) => {
                    console.log(response.data.msg);
                    this.tableData=JSON.parse(response.data.msg);
                })
            },
            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleEdit(row) {
                this.$axios.post(this.$api.sgetcouponinfo,this.$qs.stringify({
                    // 'merchantId':row[0]
                    'merchantId':row
                }),{headers: {contentType: 'application/x-www-form-urlencoded'}}).then((response) => {
                    if(response.data.msg==="该商铺尚未设置优惠券"){
                        this.$notify.error({
                            title: '错误',
                            message: response.data.msg
                        });
                    }else{
                        this.editVisible=true;
                        console.log(response.data);
                        this.tableData1=response.data.msg;
                    }
                })
            },
            // 保存编辑
        },
        mounted() {
        }
    };
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .table {
        width: 100%;
        font-size: 14px;
    }
    .red {
        color: #ff0000;
    }
    .mr10 {
        margin-right: 10px;
    }
    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
</style>
