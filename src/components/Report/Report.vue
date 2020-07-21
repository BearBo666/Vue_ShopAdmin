<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>数据统计</el-breadcrumb-item>
            <el-breadcrumb-item>数据报表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 为echarts准备一个具备大小的Dom -->
            <div id="main" style="width: 750px;height:400px;"></div>
        </el-card>
    </div>
</template>

<script>
//1.导入echarts
import echarts from 'echarts'
//2.为echarts准备一个具备大小的Dom

import _ from 'lodash'

export default {
    data(){
        return {
            //需要合并的数据
            option : {
                title: {
                    text: '用户来源'
                },
                tooltip: {},
               
                
                yAxis: {},
                series: [{
                   
                   
                    data: [5, 20, 36, 10, 10, 20]
                }]
            }
        }
    },
    //此时,页面上的元素,已经被渲染完毕了
    async mounted(){
        //3.基于准备好的Dom,初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        
        //发起网络请求获得折线图数据
        const {data:res} = await this.$http.get(`reports/type/1`)
        if(res.meta.status!==200){
            return this.$message.error('获取折线图数据失败!')
        }
        
        //4.准备数据和配置项
        const result = _.merge(res.data,this.option)
        //5.展示数据
        myChart.setOption(result);
    },
    methods:{

    }
}
</script>

<style lang="less" scoped>

</style>