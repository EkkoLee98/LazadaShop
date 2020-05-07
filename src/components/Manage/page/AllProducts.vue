<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 所有商品
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                        type="primary"
                        icon="el-icon-delete"
                        class="handle-del mr10"
                        @click="getProducts"
                        style="width: 100px"
                >所有商品
                </el-button>

                <el-input v-model="query.sid" placeholder="商品名" class="handle-input mr10" style="width: 400px"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch" style="width: 100px">搜索</el-button>
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
                <el-table-column prop="id" label="ID" width="150" align="center">
                    <template slot-scope="scope">{{scope.row[0]}}</template>
                </el-table-column>
                <el-table-column prop="name" label="商品名">
                    <template slot-scope="scope">{{scope.row[1]}}</template>
                </el-table-column>
                <el-table-column label="商品价格" width="150">
                    <template slot-scope="scope">￥{{scope.row[4]}}</template>
                </el-table-column>
                <el-table-column label="商品图片" align="center" width="200">
                    <template slot-scope="scope">
                        <el-image
                                class="table-td-thumb"
                                :src="scope.row[3]"
                                :preview-src-list="[scope.row[3]]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.row)"
                        >设置优惠券
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="设置优惠券" :visible.sync="editVisible" width="500px">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="商品Id">
                    <el-input v-model="form.itemId" disabled></el-input>
                </el-form-item>
                <el-form-item label="商品名">
                    <el-input v-model="form.productName" disabled></el-input>
                </el-form-item>
                <el-form-item label="官方链接">
                    <el-input v-model="form.officialUrl" disabled></el-input>
                </el-form-item>
                <el-form-item label="图片链接">
                    <el-input v-model="form.officialImageUrl" disabled></el-input>
                </el-form-item>
                <el-form-item label="数量">
                    <el-input v-model="form.number"></el-input>
                </el-form-item>
                <el-form-item label="应用码">
                    <el-input v-model="form.voucherId"></el-input>
                </el-form-item>
                <el-form-item label="官方价格">
                    <el-input v-model="form.officialPrice" disabled></el-input>
                </el-form-item>
                <el-form-item label="优惠价格">
                    <el-input v-model="form.couponPrice"></el-input>
                </el-form-item>
                <el-form-item label="优惠信息">
                    <el-input v-model="form.couponInfo"></el-input>
                </el-form-item>
                <el-form-item label="活动时间">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="开始时间" v-model="form.startTime"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2" style="text-align: center">-</el-col>
                    <el-col :span="11">
                        <el-date-picker placeholder="截止时间" v-model="form.endTime" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>


        <el-dialog title="设置优惠券" :visible.sync="editVisible2" width="500px">
            <el-form ref="form" :model="form2" label-width="70px">
                <el-form-item label="商品Id">
                    <el-input v-model="form2.itemId" disabled></el-input>
                </el-form-item>
                <el-form-item label="商品名">
                    <el-input v-model="form2.productName" disabled></el-input>
                </el-form-item>
                <el-form-item label="官方链接">
                    <el-input v-model="form2.officialUrl" disabled></el-input>
                </el-form-item>
                <el-form-item label="图片链接">
                    <el-input v-model="form2.officialImageUrl" disabled></el-input>
                </el-form-item>
                <el-form-item label="数量">
                    <el-input v-model="form2.number"></el-input>
                </el-form-item>
                <el-form-item label="应用码">
                    <el-input v-model="form2.voucherId"></el-input>
                </el-form-item>
                <el-form-item label="官方价格">
                    <el-input v-model="form2.officialPrice" disabled></el-input>
                </el-form-item>
                <el-form-item label="优惠价格">
                    <el-input v-model="form2.couponPrice"></el-input>
                </el-form-item>
                <el-form-item label="优惠信息">
                    <el-input v-model="form2.couponInfo"></el-input>
                </el-form-item>
                <el-form-item label="活动时间">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="开始时间" v-model="form2.startTime"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2" style="text-align: center">-</el-col>
                    <el-col :span="11">
                        <el-date-picker placeholder="截止时间" v-model="form2.endTime"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit2">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="单品信息" :visible.sync="Visible" width="1200px">
            <table class="table_default1" style="border: 1px solid white;width:1000px;">
                <tr>
                    <th>商品Id</th>
                    <th>商品介绍</th>
                    <th>商品价格</th>
                    <th>图片</th>
                    <th>操作</th>
                </tr>
                <tr>
                    <td style="width: 150px;text-align: center">{{this.nid}}</td>
                    <td style="width: 500px">{{this.ntitle}}</td>
                    <td style="width: 150px;text-align: center">{{this.nprice}}</td>
                    <td style="width: 200px"><img style="width: 50px;height: 50px;margin-left: 70px" :src=this.nimg>
                    </td>
                    <td>
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit2()"
                        >设置优惠券
                        </el-button>`
                    </td>
                </tr>
            </table>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'allproducts',
        data() {
            return {
                query: {
                    sid: '',
                    pageIndex: 1,
                },
                tableData: [],
                nid: '',
                ntitle: '',
                nprice: '',
                nimg: '',
                products: [],
                product: [],
                multipleSelection: [],
                delList: [],
                editVisible: false,
                editVisible2: false,
                Visible: false,
                pageTotal: 0,
                form: {
                    'itemId': '',
                    'officialUrl': '',
                    'officialImageUrl': '',
                    'number': '',
                    'voucherId': '',
                    'officialPrice': '',
                    'couponPrice': '',
                    'couponInfo': '',
                    'startTime': '',
                    'endTime': '',
                    'productName': ''
                },
                form2: {
                    'itemId': '',
                    'officialUrl': '',
                    'officialImageUrl': '',
                    'number': '',
                    'voucherId': '',
                    'officialPrice': '',
                    'couponPrice': '',
                    'couponInfo': '',
                    'startTime': '',
                    'endTime': '',
                    'productName': ''
                },
                idx: -1,
                id: -1
            };
        },
        created() {
            // this.getData();
            this.getProducts();
        },
        methods: {
            getProducts() {            //使用axios的get请求，es6语法的箭头函数
                // this.$axios.post('/api/test1.php',tdata,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
                this.$axios.post(this.$api.productAll, {}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
                    //  /api/test01/axiosphp.php是后台文件URL，api代表本
                    //机Apache端口：http://localhost:8080，需要在index.js设置
                    this.all = true;
                    this.products = res.data;    //将PHP返回数组的值付给users
                    console.log('success');      //打印结果
                    console.log(res.data);
                    this.tableData = JSON.parse(this.products.msg.productsJsonInfo);
                    this.pageTotal = this.tableData.length;
                    console.log(this.tableData);
                    console.log(this.pageTotal);

                })
            },
            handleSearch() {
                var reg =  new RegExp(this.query.sid);
                var arr = [];
                for (var i = 0; i < this.tableData.length; i++) {
                    if (reg.test(this.tableData[i][1])) {
                        arr.push(this.tableData[i]);
                    }
                }
                console.log(arr)
                if(arr!=null){
                   // this.tableData=[];
                    this.tableData=arr;
                }
                // for(let i=0;i<this.tableData.length;i++){
                //     console.log(this.tableData[i][1])
                // }
                // this.Visible = true;
                // this.$axios.post(this.$api.getinfo, this.$qs.stringify({'itemId': this.query.sid}), {headers: {contentType: 'application/json;charset=UTF-8'}}).then((response) => {
                //     if (response == null) {
                //         this.$message.success('没有此商品');
                //     } else {
                //         this.product = response.data;
                //         this.oneTable = this.product.msg;
                //         this.nid = this.oneTable[0];
                //         this.ntitle = this.oneTable[1];
                //         this.nprice = this.oneTable[4];
                //         this.nimg = this.oneTable[3];
                //         this.form2.itemId = this.oneTable[0];
                //         this.form2.officialUrl = this.oneTable[2];
                //         this.form2.officialImageUrl = this.oneTable[3];
                //         this.form2.officialPrice = this.oneTable[4];
                //         this.form2.productName = this.oneTable[1];
                //     }
                // })
            },
            // 删除操作
            // handleDelete(index, row) {
            //     // 二次确认删除
            //     this.$confirm('确定要删除吗？', '提示', {
            //         type: 'warning'
            //     })
            //         .then(() => {
            //             this.$message.success('删除成功');
            //             this.tableData.splice(index, 1);
            //         })
            //         .catch(() => {
            //         });
            // },
            // handleDelete2(index, row) {
            //     // 二次确认删除
            //     this.$confirm('确定要删除吗？', '提示', {
            //         type: 'warning'
            //     })
            //         .then(() => {
            //             this.$message.success('删除成功');
            //             this.tableData.splice(index, 1);
            //         })
            //         .catch(() => {
            //         });
            // },
            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // delAllSelection() {
            //     const length = this.multipleSelection.length;
            //     let str = '';
            //     this.delList = this.delList.concat(this.multipleSelection);
            //     for (let i = 0; i < length; i++) {
            //         str += this.multipleSelection[i].name + ' ';
            //     }
            //     this.$message.error(`删除了${str}`);
            //     this.multipleSelection = [];
            // },
            // 编辑操作
            handleEdit(row) {
                this.editVisible = true;
                this.form.itemId = row[0];
                this.form.officialUrl = row[2];
                this.form.officialImageUrl = row[3];
                this.form.officialPrice = row[4];
                this.form.productName = row[1];
            },
            handleEdit2() {
                this.Visible = false;
                this.editVisible2 = true;
            },
            // 保存编辑
            saveEdit() {
                this.$axios.post(this.$api.couponOperate, JSON.stringify(this.form), {
                    headers: {
                        contentType: 'application/json;charset=UTF-8',
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    console.log(response.data)
                    if (response.data.msg == 1) {
                        this.$message.success('设置成功');
                        this.form.number = '';
                        this.form.voucherId = '';
                        this.form.couponPrice = '';
                        this.form.couponInfo = '';
                        this.form.startTime = '';
                        this.form.endTime = '';
                        this.editVisible = false;
                    } else if(response.data.msg !== 1){
                        this.$message.error('设置失败');
                        this.form.number = '';
                        this.form.voucherId = '';
                        this.form.couponPrice = '';
                        this.form.couponInfo = '';
                        this.form.startTime = '';
                        this.form.endTime = '';
                        this.editVisible = false;
                    }
                }).catch((e) => {
                        console.log(e.message)
                        console.log(e.request)
                        console.log(e.code)
                })
            },
            saveEdit2() {
                this.editVisible2 = false;
                this.$axios.post('/api/merchant/couponOperate', JSON.stringify(this.form), {
                    headers: {
                        contentType: 'application/json;charset=UTF-8',
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    console.log(response.data)
                    if (response.data.msg == 1) {
                        this.$message.success('设置成功');
                        this.form2.number = '';
                        this.form2.voucherId = '';
                        this.form2.couponPrice = '';
                        this.form2.couponInfo = '';
                        this.form2.startTime = '';
                        this.form2.endTime = '';
                    } else {
                        this.$message.error('设置失败');
                        this.form2.number = '';
                        this.form2.voucherId = '';
                        this.form2.couponPrice = '';
                        this.form2.couponInfo = '';
                        this.form2.startTime = '';
                        this.form2.endTime = '';
                    }
                })
            },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'pageIndex', val);
                this.getData();
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
