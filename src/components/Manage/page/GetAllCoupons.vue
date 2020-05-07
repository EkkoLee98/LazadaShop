<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 所有优惠券
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                        type="primary"
                        icon="el-icon-delete"
                        class="handle-del mr10"
                        @click="GetallCoupon"
                >所有优惠券
                </el-button>
                <el-input v-model="query.sid" placeholder="商品Id" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                    :data="tableData"
                    border
                    cla744ss="table"
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
                <el-table-column label="商家名称" width="300" align="center">
                    <template slot-scope="scope">{{scope.row.merchantAccount}}</template>
                </el-table-column>
                <el-table-column label="原价" width="300" align="center">
                    <template slot-scope="scope">{{scope.row.officialPrice}}</template>
                </el-table-column>
                <el-table-column label="现价" width="200" align="center">
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
                        >生成Url
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog
                title="生成URL成功"
                :visible.sync="dialogVisible"
                width="30%">
            生成URL成功：<span>您生成的URL为:  {{shareurl}}  快去跟大家分享吧！</span>
            <el-button class="ml10" type="text" size="medium"
                       v-clipboard:copy="shareurl"
                       v-clipboard:success="onCopy"
                       v-clipboard:error="onError">点击复制
            </el-button>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'GetAllCoupons',
        data() {
            return {
                query: {
                    sid: '',
                    pageIndex: 1,
                },
                dialogVisible: false,
                tableData: [],
                multipleSelection: [],
                pageTotal: 0,
                form: {},
                idx: -1,
                id: -1,
                shareurl: ''
            };
        },
        created() {
            this.GetallCoupon();
        },
        methods: {
            onCopy(e) {
                this.$notify({
                    title: '成功',
                    message: '复制成功',
                    type: 'success'
                });
                this.dialogVisible = false;
                console.log(e);
            },
            // 复制失败
            onError(e) {
                this.$notify.error({
                    title: '错误',
                    message: '复制失败'
                });
                this.dialogVisible = false;
            },
            // 获取 easy-mock 的模拟数据
            GetallCoupon() {
                this.$axios.post(this.$api.getallcoupon, {}, {headers: {contentType: 'application/json;charset=UTF-8'}}).then((response) => {
                    console.log(response.data);
                    this.tableData = response.data.msg;
                })
            },
            handleSearch() {
                // this.Visible = true;
                // this.$axios.post('/api/merchant/product/getinfo',this.$qs.stringify({'itemId':this.query.sid}),{headers: {contentType: 'application/json;charset=UTF-8'}}).then((response) => {
                //     if(response==null){
                //         this.$message.success('没有此商品');
                //     }else{
                //         this.product = response.data;
                //         this.oneTable=this.product.msg;
                //         this.nid=this.oneTable[0];
                //         this.ntitle=this.oneTable[1];
                //         this.nprice=this.oneTable[4];
                //         this.nimg=this.oneTable[3];
                //         this.form2.itemId=this.oneTable[0];
                //         this.form2.officialUrl=this.oneTable[2];
                //         this.form2.officialImageUrl=this.oneTable[3];
                //         this.form2.officialPrice=this.oneTable[4]
                //     }
                // })
            },
            getUrl(row) {
                this.$axios.post(this.$api.generationShareUrl, this.$qs.stringify({'itemId': row.itemId}), {headers: {contentType: 'application/json;charset=UTF-8'}}).then((response) => {
                    console.log(response.data);
                    if (response.data.code == 200) {
                        this.dialogVisible = true;
                        this.shareurl = 'https://siushare.com/coupon/share?shareId=' + response.data.msg + '&itemId=' + row.itemId;
                    } else if (response.data.code == 33) {
                        this.$notify({
                            title: '成功',
                            message: '已生成过相同的URL！',
                            type: 'success'
                        });
                    }
                })
            },
            // 删除操作
            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            saveEdit() {
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                this.$set(this.tableData, this.idx, this.form);
            },
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
