<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img src="../../../assets/img/img.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        上次登录时间：
                        <span>2019-11-01</span>
                    </div>
                    <div class="user-info-list">
                        上次登录地点：
                        <span>广州</span>
                    </div>
                </el-card>
                <el-card shadow="hover" style="height:252px;">
                    <div slot="header" class="clearfix">
                        <span>商品热度</span>
                    </div>零食
                    <el-progress :percentage="71.3" color="#42b983"></el-progress>电子产品
                    <el-progress :percentage="24.1" color="#f1e05a"></el-progress>家具
                    <el-progress :percentage="13.7"></el-progress>精品
                    <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">1234</div>
                                    <div>购买量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-notice grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">321</div>
                                    <div>系统消息</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">5000</div>
                                    <div>商品数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height:403px;">
                    <div slot="header" class="clearfix">
                        <span>待处理订单</span>
                        <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
                    </div>
                    <el-table :show-header="false" :data="todoList" style="width:100%;">
                        <el-table-column width="40">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.status"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <div
                                        class="todo-item"
                                        :class="{'todo-item-del': scope.row.status}"
                                >{{scope.row.title}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template>
                                <i class="el-icon-edit"></i>
                                <i class="el-icon-delete"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>


        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                   <chart ref="chart1" :options="orgOptions" :auto-resize="true" autoresize theme="light"></chart>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <chart ref="chart2" :options="orgOptions2" :auto-resize="true"></chart>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
   // import Schart from 'vue-schart';
    import bus from '../../common/bus';
    export default {
        name: 'dashboard',
        data() {
            return {
                name: localStorage.getItem('identity'),
                orgOptions: {},
               // orgOptions2: {},
                todoList: [
                    {
                        title: '广州',
                        status: false
                    },
                    {
                        title: '广州',
                        status: false
                    },
                    {
                        title: '广州',
                        status: false
                    },
                    {
                        title: '广州',
                        status: false
                    },
                    {
                        title: '广州',
                        status: true
                    },
                    {
                        title: '广州',
                        status: true
                    }
                ],
                data: [
                    {
                        name: '2018/09/04',
                        value: 1083
                    },
                    {
                        name: '2018/09/05',
                        value: 941
                    },
                    {
                        name: '2018/09/06',
                        value: 1139
                    },
                    {
                        name: '2018/09/07',
                        value: 816
                    },
                    {
                        name: '2018/09/08',
                        value: 327
                    },
                    {
                        name: '2018/09/09',
                        value: 228
                    },
                    {
                        name: '2018/09/10',
                        value: 1065
                    }
                ],
                options: {
                    type: 'bar',
                    title: {
                        text: '最近一周各品类销售图'
                    },
                    xRorate: 25,
                    labels: ['周一', '周二', '周三', '周四', '周五'],
                    datasets: [
                        {
                            label: '家电',
                            data: [234, 278, 270, 190, 230]
                        },
                        {
                            label: '百货',
                            data: [164, 178, 190, 135, 160]
                        },
                        {
                            label: '食品',
                            data: [144, 198, 150, 235, 120]
                        }
                    ]
                },
                options2: {
                    type: 'line',
                    title: {
                        text: '最近几个月各品类销售趋势图'
                    },
                    labels: ['6月', '7月', '8月', '9月', '10月'],
                    datasets: [
                        {
                            label: '家电',
                            data: [234, 278, 270, 190, 230]
                        },
                        {
                            label: '百货',
                            data: [164, 178, 150, 135, 160]
                        },
                        {
                            label: '食品',
                            data: [74, 118, 200, 235, 90]
                        }
                    ]
                },
                orgOptions2 : {
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        axisLabel: {
                            color: "#BB3137",
                            fontSize: 10
                        },
                        // 修改轴线的颜色
                        axisLine: {
                            lineStyle: {
                                color: "#BB3137"
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            color: "#BB3137",
                            fontSize: 10
                        },
                        // 修改y轴横向分割线的颜色
                        splitLine: {
                            lineStyle: {
                                color: ["#FFC9CB"]
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#BB3137"
                            }
                        }
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line',
                        smooth: true
                    }]
                }
            };
        },
        components: {

        },
        computed: {
            role() {
                return this.name === '2' ? '商家' : (this.name==='1'?'消费者':'分享者');
            }
        },
        methods: {
            changeDate() {
                const now = new Date().getTime();
                this.data.forEach((item, index) => {
                    const date = new Date(now - (6 - index) * 86400000);
                    item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
                });
            }
        },
        mounted() {
            this.orgOptions = {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'bar',
                    smooth: true
                }]
            }
        }
    };
</script>


<style scoped>
    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

    .schart {
        width: 100%;
        height: 300px;
    }
</style>
