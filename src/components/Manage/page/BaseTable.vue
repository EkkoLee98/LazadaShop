<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 基础表格
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
                <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>
                <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="用户名"></el-table-column>
                <el-table-column label="账户余额">
                    <template slot-scope="scope">￥{{scope.row.money}}</template>
                </el-table-column>
                <el-table-column label="头像(查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.thumb"
                            :preview-src-list="[scope.row.thumb]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')"
                        >{{scope.row.state}}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="date" label="注册时间"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
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
import { fetchData } from '../../../api/index';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            dialogVisible: false,
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            shareId:'7',
            itemId:'305965244',
            shareurl:''
        };
    },
    created() {
        this.getData();
    },
    methods: {
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
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(this.query).then(res => {
                console.log(res.list.length);
                this.tableData = res.list;
                this.pageTotal = res.pageTotal || 50;
            });
        },
        getData1(){
            this.$axios.post('/api/share/getMerchant',{},{headers: {contentType: 'application/json;charset=UTF-8'}}).then((response) => {
                console.log(response.data)
            })
        },
        getData2(){
            this.$axios.post('/api/share/getcouponinfo',this.$qs.stringify({
                'merchantId':'100123896'
            }),{headers: {contentType: 'application/x-www-form-urlencoded'}}).then((response) => {
                console.log(response.data)
            })
        },
        getData3(){
            this.$axios.post('/api/share/getallcoupon',{},{headers: {contentType: 'application/json;charset=UTF-8'}}).then((response) => {
                console.log(response.data)
            })
        },
        getData4(){
            this.$axios.post('/api/share/generationShareUrl',this.$qs.stringify({'itemId':'305965244'}),{headers: {contentType: 'application/json;charset=UTF-8'}}).then((response) => {
                console.log(response.data);
                if(response.data.code==200){
                    this.dialogVisible=true;
                    this.shareurl='http://siushare.com/coupon/share?shareId='+response.data.msg+'&itemId='+this.itemId;
                }else if(response.data.code==33){
                    this.$notify({
                        title: '成功',
                        message: '已生成过相同的URL！',
                        type: 'success'
                    });
                }
            })
        },
        getData5(){
            this.$axios.post('/api/share/getAllUrl',{},{headers: {contentType: 'application/json;charset=UTF-8'}}).then((response) => {
                console.log(response.data)
            })
        },
        // getData1(){
        //     this.$axios.post('/api/merchant/product/getinfo',this.$qs.stringify({'itemId':'305965244'}),{headers: {contentType: 'application/json;charset=UTF-8'}}).then((response) => {
        //         console.log(response.data)
        //     })
        // },
        // getData3(){
        //     this.$axios.post('/api/merchant/couponOperate',this.$qs.stringify({
        //         'itemId':'305965244',
        //         'officialUrl':'test',
        //         'officialImageUrl':'madepi',
        //         'number':'1',
        //         'voucherId':'123',
        //         'officialPrice':'40',
        //         'couponPrice':'40',
        //         'couponInfo':'test',
        //         'startTime':'2020-2-18',
        //         'endTime':'2020-2-19'
        //     }),{headers: {contentType: 'application/x-www-form-urlencoded'}}).then((response) => {
        //         console.log(response.data)
        //     })
        // },
        // getData4(){
        //     this.$axios.post('/api/merchant/getcouponinfo',{'itemId':'305965244'},{headers: {contentType: 'application/json;charset=UTF-8'}}).then((response) => {
        //         console.log(response.data)
        //     })
        // },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
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
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
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
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    },
    mounted() {
      //this.getData1();
     // this.getData2();
     // this.getData3();
       this.getData4();
     //  this.getData5();
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
