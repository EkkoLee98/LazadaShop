<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 我的卡包
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
                    style="width: 100%"
                    height="500"
            >
                <el-table-column label="SharerId" width="300" align="center">
                    <template slot-scope="scope">{{scope.row.shareId}}</template>
                </el-table-column>
                <el-table-column label="商品Id" width="300" align="center">
                    <template slot-scope="scope">{{scope.row.itemId}}</template>
                </el-table-column>
                <el-table-column label="使用状态"  align="center">
                    <template slot-scope="scope">
                        <div style="color: #5daf34" v-if="scope.row.orderId!==null?true:false">已填写订单</div>
                        <div style="color: red" v-if="scope.row.orderId==null?true:false">未填写订单</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
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
    </div>
</template>
<script>
    export default {
        name:"card",
        data() {
            return{
                tableData: [],
            }
        },
        methods: {
            getMoney(row){
                this.$notify.error({
                    title: '错误',
                    message: '你在想屁吃'
                });
            },
            handleDelete(row) {
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
            myCoupon(){
                this.$axios.post('/api/customer/showAllCoupon',{},{headers: {contentType: 'application/json;charset=UTF-8'}}).then((response) => {
                    this.tableData=response.data.msg;
                })
            },
        },
        created(){
            this.myCoupon()
        }
    }
</script>

<style scoped>

</style>
