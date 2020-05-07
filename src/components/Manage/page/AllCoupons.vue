<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 我的优惠券
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
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
                    @click="allCoupon"
            >所有优惠券</el-button>

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
            <el-table-column label="商品Id" width="300" align="center">
                <template slot-scope="scope">{{scope.row.itemId}}</template>
            </el-table-column>
            <el-table-column label="商家用户名" width="300" align="center">
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
                            @click="handleEdit(scope.row)"
                    >修改优惠券</el-button>
                    <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row[0])"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="设置优惠券" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="商品Id">
                    <el-input v-model="form.itemId"></el-input>
                </el-form-item>
                <el-form-item label="官方链接">
                    <el-input v-model="form.officialUrl"></el-input>
                </el-form-item>
                <el-form-item label="图片链接">
                    <el-input v-model="form.officialImageUrl"></el-input>
                </el-form-item>
                <el-form-item label="数量">
                    <el-input v-model="form.number"></el-input>
                </el-form-item>
                <el-form-item label="应用码">
                    <el-input v-model="form.voucherId"></el-input>
                </el-form-item>
                <el-form-item label="官方价格">
                    <el-input v-model="form.officialPrice"></el-input>
                </el-form-item>
                <el-form-item label="优惠价格">
                    <el-input v-model="form.couponPrice"></el-input>
                </el-form-item>
                <el-form-item label="优惠信息">
                    <el-input v-model="form.couponInfo"></el-input>
                </el-form-item>
                <el-form-item label="活动时间">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="开始时间" v-model="form.startTime" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2" style="text-align: center">-</el-col>
                    <el-col :span="11">
                        <el-date-picker placeholder="截止时间" v-model="form.endTime" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleEdit()">修 改</el-button>
            </span>
        </el-dialog>
        <el-dialog title="设置优惠券" :visible.sync="editVisible2" width="30%">
            <el-form ref="form" :model="form2" label-width="70px">
                <el-form-item label="商品Id">
                    <el-input v-model="form2.itemId"></el-input>
                </el-form-item>
                <el-form-item label="官方链接">
                    <el-input v-model="form2.officialUrl"></el-input>
                </el-form-item>
                <el-form-item label="图片链接">
                    <el-input v-model="form2.officialImageUrl"></el-input>
                </el-form-item>
                <el-form-item label="数量">
                    <el-input v-model="form2.number"></el-input>
                </el-form-item>
                <el-form-item label="应用码">
                    <el-input v-model="form2.voucherId"></el-input>
                </el-form-item>
                <el-form-item label="官方价格">
                    <el-input v-model="form2.officialPrice"></el-input>
                </el-form-item>
                <el-form-item label="优惠价格">
                    <el-input v-model="form2.couponPrice"></el-input>
                </el-form-item>
                <el-form-item label="优惠信息">
                    <el-input v-model="form2.couponInfo"></el-input>
                </el-form-item>
                <el-form-item label="活动时间">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="开始时间" v-model="form2.startTime" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2" style="text-align: center">-</el-col>
                    <el-col :span="11">
                        <el-date-picker placeholder="截止时间" v-model="form2.endTime" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="editVisible2 = false">修 改</el-button>
            </span>
        </el-dialog>
        <el-dialog title="优惠券信息" :visible.sync="Visible" width="60%">
            <table class="table_default1" style="border: 1px solid white;width:1000px;">
                <tr>
                    <th>商品Id</th>
                    <th>商家名称</th>
                    <th>原价</th>
                    <th>现价</th>
                    <th>截止时间</th>
                    <th>操作</th>
                </tr>
                <tr>
                    <td style="width: 150px;text-align: center">{{this.nitemId}}</td>
                    <td style="width: 500px;text-align: center">{{this.nmerchantAccount}}</td>
                    <td style="width: 150px;text-align: center">{{this.nofficialPrice}}</td>
                    <td style="width: 150px;text-align: center">{{this.ncouponPrice}}</td>
                    <td style="width: 150px;text-align: center">{{this.nendTime}}</td>
                    <td>
                        <el-button type="primary" @click="handleEdit2()" style="margin-left: 10px">修 改</el-button>
                        <el-button @click="Visible = false">取 消</el-button>
                    </td>
                </tr>
            </table>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'AllCoupons',
        data() {
            return {
                query: {
                    sid: '',
                    pageIndex: 1,
                },
                nitemId:'',
                nmerchantAccount:'',
                nofficialPrice:'',
                ncouponPrice:'',
                nendTime:'',
                dialogVisible: false,
                tableData: [],
                tableData1: [],
                multipleSelection: [],
                pageTotal: 0,
                form: {},
                form2:{},
                idx: -1,
                id: -1,
                editVisible:false,
                editVisible2:false,
                Visible:false
            };
        },
        created() {
            this.allCoupon();
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
            allCoupon(){
                this.$axios.post(this.$api.getallcouponinfo,{},{headers: {contentType: 'application/json;charset=UTF-8'}}).then((response) => {
                    if(response.data.msg==="该商家未设置优惠券"){
                        this.$notify.error({
                            title: '错误',
                            message: response.data.msg
                        });
                    }else{
                        console.log(response.data);
                        this.tableData=response.data.msg;
                    }
                })
            },
            handleSearch() {
                this.$axios.post(this.$api.getcouponinfo,this.$qs.stringify({'itemId':this.query.sid}),{headers: {contentType: 'application/json;charset=UTF-8'}}).then((response) => {
                    this.Visible=true;
                    console.log(response.data);
                    this.tableData1=response.data.msg;
                    this.nitemId=this.tableData1.itemId;
                    this.nmerchantAccount=this.tableData1.merchantAccount;
                    this.nofficialPrice=this.tableData1.officialPrice;
                    this.ncouponPrice=this.tableData1.couponPrice;
                    this.nendTime=this.tableData1.endTime;
                })
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
            handleEdit(row) {
                this.form = row;
                this.editVisible = true;
            },
            handleEdit2() {
                this.form2 = this.tableData1;
                this.editVisible2 = true;
            },
            // 保存编辑
            saveEdit() {
                this.editVisible = false;
                this.$message.success('修改成功');
            },
            // 保存编辑
            saveEdit2() {
                this.Visible = false;
                this.$message.success('修改成功');
            }
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
