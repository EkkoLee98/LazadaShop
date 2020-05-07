<template xmlns:style="http://www.w3.org/1999/xhtml">
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 所有商家
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                        type="primary"
                        icon="el-icon-delete"
                        class="handle-del mr10"
                        @click="delAllSelection"
                >批量删除</el-button>
                <el-button
                        type="primary"
                        icon="el-icon-delete"
                        class="handle-del mr10"
                        @click="GetallCoupon"
                >所有Url</el-button>
                <el-input v-model="query.sid" placeholder="商品Id" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
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
                <el-table-column label="SharerId" width="300" align="center">
                    <template slot-scope="scope">{{scope.row.shareId}}</template>
                </el-table-column>
                <el-table-column label="商品Id" width="300" align="center">
                    <template slot-scope="scope">{{scope.row.itemId}}</template>
                </el-table-column>
                <el-table-column label="使用状态"  align="center">
                    <template slot-scope="scope">
<!--                        <el-tag-->
<!--                                :type="scope.row.status='0'?'success':(scope.row.status='1'?'danger':'')"-->
<!--                        >{{scope.row.status}}</el-tag>-->
<!--                        <el-tag :type="scope.row.status=0?'success':'danger'">aa</el-tag>-->
                        <div style="color: #5daf34" v-if="scope.row.status==0?true:false">可使用</div>
                        <div style="color: red" v-if="scope.row.status==1?true:false">已过期</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="CopyUrl(scope.row)"
                        >复制Url</el-button>
                        <el-button
                                type="text"
                                icon="el-icon-check"
                                @click="getMoney(scope.row)"
                        >提现</el-button>
                        <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleDelete(scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog
                title="生成URL成功"
                :visible.sync="dialogVisible"
                width="30%">
<!--                :before-close="handleClose">-->
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
        name: 'GetAllUrls',
        data() {
            return {
                query: {
                    sid: '',
                    pageIndex: 1,

                },
                dialogVisible: false,
                tableData: [],
                multipleSelection: [],
                delList: [],
                pageTotal: 0,
                form: {},
                idx: -1,
                id: -1,
                shareurl:'',
                status:''
            };
        },
        created() {
            this.GetallCoupon();
        },
        methods: {
            getMoney(row){
                this.$notify.error({
                    title: '错误',
                    message: '你在想屁吃'
                });
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
            // 复制失败
            onError(e){
                this.$notify.error({
                    title: '错误',
                    message: '复制失败'
                });
                this.dialogVisible=false;
            },
            // handleClose(done) {
            //     this.$confirm('确认关闭？')
            //         .then(_ => {
            //             done();
            //         })
            //         .catch(_ => {});
            // },
            // 获取 easy-mock 的模拟数据
            GetallCoupon(){
                this.$axios.post(this.$api.getAllUrl,{},{headers: {contentType: 'application/json;charset=UTF-8'}}).then((response) => {
                    console.log(response.data);
                    this.tableData=response.data.msg;
                })
            },
            handleSearch() {

            },
            CopyUrl(row){
                this.dialogVisible=true;
                this.shareurl='https://siushare.com/coupon/share?shareId='+row.shareId+'&itemId='+row.itemId;
            },
            // 删除操作
            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        //     this.msg=row;//每一条数据的记录
                        //    this.delarr.push(this.msg.PackingId);//把单行删除的每条数据的id添加进放删除数据的数组
                        this.$message.success('删除成功');
                        this.tableData.splice(index, 1);
                    })
                    .catch(() => {});
            },
            delAllSelection() {
                const length = this.multipleSelection.length;
                let str = '';
                this.delList = this.delList.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                console.log(this.delList);
                for (let j = 0; j < this.delList.length; j++) {
                    this.tableData.splice(this.delList[j].$index, 1);
                }
                this.$message.error(`删除了${str}`);
                this.multipleSelection = [];
            },
            // 编辑操作
            // 保存编辑
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
