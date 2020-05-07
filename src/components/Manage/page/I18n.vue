<template>
    <section class="main">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-global"></i> {{$t('manager.breadcrumb')}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <span>{{$t('manager.tips')}}</span>
            <el-button type="primary" @click="$i18n.locale = $i18n.locale === 'zh'?'en':'zh'">{{$t('manager.btn')}}</el-button>
            <div class="list">
            <h2>{{$t('manager.title1')}}</h2>
                <p>{{$t('manager.p1')}}</p>
                <p>{{$t('manager.p2')}}</p>
                <p>{{$t('manager.p3')}}</p>
            </div>
            <h2>{{$t('manager.title2')}}</h2>
            <div>
                <i18n path="manager.info" tag="p">
                    <a place="action" href="https://element.eleme.cn/2.0/#/zh-CN/component/i18n">{{ $t('manager.value') }}</a>
                </i18n>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data(){
        return {
        }
    }
}
</script>

<style scoped>
.list{
    padding: 30px 0;
}
.list p{
    margin-bottom: 20px;
}
a{
    color: #409eff;
}
</style>
