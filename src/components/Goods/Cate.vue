<template>
    <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
        <el-row>
            <el-col>
                <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
            </el-col>
        </el-row>

        <!-- 表格 -->
        <tree-table class="treeTable" :data="catelist" :columns="columns"
        :selection-type="false" :expand-type="false" show-index
        index-text="#" border>
            <!-- 是否有效列 -->
            <template slot="isok" slot-scope="scope">
                <i class="el-icon-success" v-if="scope.row.cat_deleted == false"
                style="color:lightgreen"></i>
                <i class="el-icon-error" v-else style="color:red"></i>
            </template>
            <!-- 排序列 -->
            <template slot="order" slot-scope="scope">
                <el-tag size="mini" v-if="scope.row.cat_level == 0">一级</el-tag>
                <el-tag size="mini" type="success" v-else-if="scope.row.cat_level ==1">二级</el-tag>
                <el-tag size="mini" type="warning" v-else>三级</el-tag>
            </template>
            <!-- 操作列 -->
            <template slot="opt">
                <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            </template>
        </tree-table>

        <!-- 分页区域 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum" :page-sizes="[1,2,5,10,15]"
        :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination>

    </el-card>

    <!-- 添加分类的对话框 -->
    <el-dialog title="添加分类" :visible.sync="addCateDialogVisable" width="50%" @close="addCateDialogClosed">
        <!-- 添加分类的表单 -->
        <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" label-width="100px">
            <el-form-item label="分类名称:" prop="cat_name">
                <el-input v-model="addCateForm.cat_name"></el-input>
            </el-form-item>
            <el-form-item label="父级分类:" >
                <!-- options用来指定数据源 -->
                <!-- cascader用来指定分配对象 -->
                 <el-cascader v-model="seletedKeys" :options="parentCateList"
                  @change="parenCateChange" :props="cascaderProps" 
                  ></el-cascader>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addCateDialogVisable = false">取 消</el-button>
            <el-button type="primary" @click="addCate">确 定</el-button>
        </span>
    </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            //查询条件
            queryInfo:{
                type:3,
                pagenum:1,
                pagesize:5
            },
            //商品分类的数据列表，默认为空
            catelist:[],
            //总数据条数
            total:0,
            //为table指定列的定义
            columns:[{
                label:'分类名称',
                prop:'cat_name'
            },{
                label:'是否有效',
                //表示将当前列定义为模板列
                type:'template',
                template:'isok'
            },{
                label:'排序',
                //表示将当前列定义为模板列
                type:'template',
                template:'order'
            },{
                label:'操作',
                //表示将当前列定义为模板列
                type:'template',
                template:'opt'
            }
            ],
            //控制分类对话框的显示与隐藏
            addCateDialogVisable:false,
            //添加分类的表单数据
            addCateForm:{
                //将要添加的分类的名称
                cat_name:'',
                //父级分类的id(一级分类则为0),默认一级
                cat_pid:0,
                //当前分类的等级(0为一级分类),默认一级
                cat_level:0
            },
            //添加分类表单的验证规则的对象
            addCateFormRules:{
                cat_name:[
                    {
                        required:true,message:'请输入分类名称',
                        trigger:'blur'
                    }
                ]
            },
            //父级分类的列表
            parentCateList:[],
            //指定级联选择器的配置对象
            cascaderProps:{
                value:'cat_id',
                label:'cat_name',
                children:'children',
                checkStrictly:true
            },
            //选中的父级分类的id数组
            seletedKeys:[]
        }
    },
    created(){
        this.getCateList()
    },
    methods:{
        //获取商品分类数据
        async getCateList(){
            const {data:res} = await this.$http.get('categories',{
                params:this.queryInfo
            })
            if(res.meta.status !== 200){
                return this.$message.error('获取商品分类失败!');
            }
            //把数据列表赋值给catelist
            this.catelist=res.data.result
            //为总数据条数赋值
            this.total=res.data.total
        },
        //监听pagesize改变的事件
        handleSizeChange(newSize){
            this.queryInfo.pagesize=newSize
            this.getCateList()
        },
        //监听pagenum改变的事件
        handleCurrentChange(newPage){
            this.queryInfo.pagenum=newPage
            this.getCateList()
        },
        //点击按钮展示添加分类的对话框
        showAddCateDialog(){
            //获取父级分类的数据列表
            this.getParentCateList()
            //展示对话框
            this.addCateDialogVisable=true
        },
        //获得父级分类的数据列表
        async getParentCateList(){
            const {data:res} = await this.$http.get(`categories`,{params:{type:2}})
            if(res.meta.status !== 200){
                return this.$message.error('获取父级分类失败!')
            }
            this.parentCateList=res.data
        },
        //父级选择项发生变化触发这个函数
        parenCateChange(){
            //如果seletedKeys数组中的length大于0,证明选中父级分类
            if(this.seletedKeys.length>0){
                //父级分类的id为数组最后一个的值
                this.addCateForm.cat_pid = this.seletedKeys
                [this.seletedKeys.length-1]
            //为当前分类的等级赋值
            this.addCateForm.cat_level=this.seletedKeys.length
            return
            }else{
                this.addCateForm.cat_level=0
                this.addCateForm.cat_pid=0
            }
        },
        //点击按钮添加新的分类
        addCate(){
            this.$refs.addCateFormRef.validate(async  valid=>{
                if(!valid) return 
                const {data:res} = await this.$http.post(`categories`,this.addCateForm)
                if(res.meta.status !== 201){
                    return this.$message.error('添加分类失败!')
                }
                this.$message.success('添加分类成功!')
                this.getCateList()
                this.addCateDialogVisable=false
            })
        },
        //监听添加新分类对话框的关闭事件,重置表单数据
        addCateDialogClosed(){
            this.$refs.addCateFormRef.resetFields()
            this.seletedKeys=[]
            this.addCateForm.cat_level=0
            this.addCateForm.cat_pid=0
        }
    }
}
</script>

<style lang="less" scoped>
.treeTable{
    margin-top: 15px;
}
.el-cascader{
    width: 100%;
}
</style>