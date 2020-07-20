<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>分类参数</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图 -->
        <el-card>
            <!-- 警告区域 -->
            <el-alert title="注意:只允许为第三级分类设置相关参数!" show-icon type="warning"></el-alert>
            <!-- 选中商品分类区域 -->
            <el-row class="cat_opt">
                <el-col>
                    <span id="text">选中商品分类:</span>
                    <!-- 选中商品分类的级联选择框 -->
                    <el-cascader v-model="selectedCateKeys" :options="cateList" :props="cateProps" @change="handleChange"></el-cascader>
                </el-col>
            </el-row>

            <!-- tab页签区域 -->
            <el-tabs v-model="activeName" @tab-click="handleTabClick">
                <!-- 添加动态参数的面板 -->
                <el-tab-pane label="动态参数" name="many">
                    <el-button type="primary" size="middle" :disabled="isBtnDisable" @click="addDialogVisible=true">添加参数</el-button>
                    <!-- 动态参数表格 -->
                    <el-table :data="manyTabData" border stripe>
                        <!-- 扩展列 -->item
                        <el-table-column type="expand">
                            <template slot-scope="scope">
                                <!-- 循环渲染Tag标签 -->
                                <el-tag closable v-for="(item,i) in scope.row.attr_vals" :key="i" @close="handleClose(i,scope.row)">{{item}}</el-tag>
                                <!-- 输入的文本框 -->
                                <el-input v-if="scope.row.inputVisible" v-model="scope.row.inputValue" ref="saveTagInput" class="input-new-tag"
                                size="small" @blur="handleInputConfirm(scope.row)">
                                </el-input>
                                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">添加</el-button>
                            </template>
                        </el-table-column>
                        <!-- 索引列 -->
                        <el-table-column type="index"></el-table-column>
                        <el-table-column label="参数名称" prop="attr_name"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.attr_id)">编辑</el-button>
                                <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeParams(scope.row.attr_id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <!-- 添加静态属性的面板 -->
                <el-tab-pane label="静态属性" name="only">
                    <el-button type="primary" size="middle" 
                    :disabled="isBtnDisable" @click="addDialogVisible=true">添加参数</el-button>
                    <!-- 静态属性表格 -->
                    <el-table :data="onlyTabData" border stripe>
                        <!-- 扩展列 -->
                        <el-table-column type="expand">
                            <template slot-scope="scope">
                                <!-- 循环渲染Tag标签 -->
                                <el-tag closable v-for="(item,i) in scope.row.attr_vals" :key="i" @close="handleClose(i,scope.row)">{{item}}</el-tag>
                                <!-- 输入的文本框 -->
                                <el-input v-if="scope.row.inputVisible" v-model="scope.row.inputValue" ref="saveTagInput" class="input-new-tag"
                                size="small" @blur="handleInputConfirm(scope.row)">
                                </el-input>
                                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">添加</el-button>
                            </template>
                        </el-table-column>
                        <!-- 索引列 -->
                        <el-table-column type="index"></el-table-column>
                        <el-table-column label="属性名称" prop="attr_name"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.attr_id)">编辑</el-button>
                                <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeParams(scope.row.attr_id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-card>

        <!-- 添加参数的对话框 -->
        <el-dialog :title="'添加'+titleText" :visible.sync="addDialogVisible"
        width="50%" @close="addDialogClosed">
            <!-- 添加参数的输入框 -->
            <el-form :model="addForm" :rules="addFormRules" 
            ref="addFormRef" label-width="100px">
                <el-form-item :label="titleText" prop="attr_name">
                    <el-input v-model="addForm.attr_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addParams">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 修改参数的对话框 -->
        <el-dialog :title="'修改'+titleText" :visible.sync="editDialogVisible"
        width="50%" @close="editDialogClosed">
            <!-- 添加参数的输入框 -->
            <el-form :model="editForm" :rules="editFormRules" 
            ref="editFormRef" label-width="100px">
                <el-form-item :label="titleText" prop="attr_name">
                    <el-input v-model="editForm.attr_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editParams">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            //商品分类列表
            cateList:[],
            //级联选择框的配置对象
            cateProps:{
                value:'cat_id',
                label:'cat_name',
                children:'children'
            },
            //级联选择器双向绑定到的数组
            selectedCateKeys:[],
            //被激活的页签的name
            activeName:'many',
            //动态参数的数据
            manyTabData:[],
            //静态属性的数据
            onlyTabData:[],
            // 控制添加对话框的显示与隐藏
            addDialogVisible:false,
            //添加参数的表单数据对象
            addForm:{
                attr_name:''
            },
            //添加表单的验证规则对象
            addFormRules:{
                attr_name:[
                    {
                        required:true, message:'请输入参数名称!', 
                        trigger:'blur'
                    }
                ]
            },
            //控制修改对话框的显示与隐藏
            editDialogVisible:false,
            //修改参数的表单数据对象
            editForm:{
                attr_name:''
            },
            //修改表单的验证规则对象
            editFormRules:{
                attr_name:[
                    {
                        required:true, message:'请输入参数名称!', 
                        trigger:'blur'
                    }
                ]
            },
            
        }
    },
    created(){
        this.getCateList()
    },
    methods:{
        //获取所有的商品分类列表
        async getCateList(){
            const {data:res} = await this.$http.get(`categories`)
            if(res.meta.status!=200){
                return this.$message.error('获取商品分类失败!');
            }
            this.cateList=res.data
        },
        //级联选择框选择项发生变化，会触发这个函数
        handleChange(){
           this.getParamsData()
        },
        //tab页签点击事件的处理函数
        handleTabClick(){
            this.getParamsData()
        },
        //获取参数列表的数据
        async getParamsData(){
            //判断选中的是不是三级分类
            if(this.selectedCateKeys.length!==3){
                //清空属性列表并return
                this.selectedCateKeys=[]
                this.manyTabData=[]
                this.onlyTabData=[]
                return
            }
            //根据所选分类的id和当前所处的面板获取对应的参数
            const { data: res } = await this.$http.get
            (`categories/${this.cateId}/attributes`,{
                params: { sel: this.activeName }
            })
            if(res.meta.status !== 200){
                return this.$message.error('获取参数列表失败!')
            }
            res.data.forEach(item=>{
                item.attr_vals = item.attr_vals? item.attr_vals.split(' '):[]
                //控制添加的文本框的显示与隐藏
                item.inputVisible=false
                item.inputValue=''
            })
            if(this.activeName=='many'){
                this.manyTabData = res.data
            }else{
                this.onlyTabData = res.data
            }
        },
        //监听添加对话框的关闭事件
        addDialogClosed(){
            //添加表单内的数据
            this.$refs.addFormRef.resetFields()
        },
        //点击按钮添加属性
        addParams(){
            this.$refs.addFormRef.validate(async valid =>{
                if(!valid) return
                const {data:res} = await this.$http.post(`categories/${this.cateId}/attributes`,{
                    attr_name:this.addForm.attr_name,
                    attr_sel:this.activeName
                })
                if(res.meta.status!==201){
                    return this.$message.error('添加参数失败!')
                }
                this.getParamsData()
                this.$message.success('添加参数成功!')
                this.addDialogVisible=false
            })
        },
        //点击按钮展示修改的对话框
        async showEditDialog(attr_id){
            //查询当前参数的信息
            const {data:res} = await this.$http.get(`categories/${this.cateId}/attributes/${attr_id}`,{
                params:{attr_sel:this.activeName}
            })
            if(res.meta.status !== 200){
                return this.$message.error('获取参数信息失败!')
            }
            this.editForm=res.data
            this.editDialogVisible=true
        },
         //监听修改对话框的关闭事件
        editDialogClosed(){
            //重置表单内的数据
            this.$refs.editFormRef.resetFields()
        },
        //点击按钮修改属性
        editParams(){
            this.$refs.editFormRef.validate(async valid =>{
                if(!valid) return
                const {data:res} = await this.$http.put(`categories/${this.cateId}/attributes/${this.editForm.attr_id}`,{
                    attr_name:this.editForm.attr_name,
                    attr_sel:this.activeName
                })
                if(res.meta.status!==200){
                    return this.$message.error('修改参数失败!')
                }
                this.getParamsData()
                this.$message.success('修改参数成功!')
                this.editDialogVisible=false
            })
        },
        //根据id删除对应参数
        async removeParams(attr_id){
            //提示用户是否删除
            const confirmResult = await this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err=>err)

            //用户取消了删除操作
            if(confirmResult!='confirm'){
                return this.$message.info('已取消删除')
            }
            //删除的业务逻辑
            const {data:res} = await this.$http.delete(`categories/${this.cateId}/attributes/${attr_id}`)
            if(res.meta.status!==200){
                return this.$message.error('删除参数失败!')
            }
            this.$message.success('删除参数成功!')
            this.getParamsData()
        },
        //点击按钮展示文本输入框
        showInput(row){
            //让文本框自动获得焦点
            //$nextTick方法作用:当页面上元素被重新渲染之后,执行回调函数
            row.inputVisible=true
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        //文本框失去焦点或摁下了Enter都会触发
        handleInputConfirm(row){
            //如果输入无效内容，则return
            if(row.inputValue.trim().length==0){
                row.inputValue=''
                this.$message.error('请输入有效内容!')
                row.inputVisible=false
                return
            }
           //如果没有return,则进行后续处理
           row.attr_vals.push(row.inputValue.trim())
           row.inputValue=''
           row.inputVisible=false
           //发起网络请求保存此次操作
           this.saveAttrVals(row)
        },
        //将对attr_vals的操作,保存到数据库
        async saveAttrVals(row){
            const {data:res} = await this.$http.put(`categories/${this.cateId}/attributes/${row.attr_id}`,{
                   attr_name:row.attr_name,
                   attr_sel:row.attr_sel,
                   attr_vals:row.attr_vals.join(' ')
           })
           if(res.meta.status!==200){
               return this.$message.error('操作参数项失败!')
           }
           this.$message.success('操作参数项成功!')
        },
        //删除对应的参数可选项
        handleClose(i,row){
            row.attr_vals.splice(i,1)
            //发起网络请求保存这次操作
            this.saveAttrVals(row)
        }
    },
    computed:{
        //控制添加参数按钮的禁用属性
        isBtnDisable(){
            //不等于三表示为选中三级分类,则禁用按钮
            if(this.selectedCateKeys.length!==3){
                return true
            }
            return false
        },
        //当前选中的三级分类的id
        cateId(){
            if(this.selectedCateKeys.length == 3){
                return this.selectedCateKeys[2]
            }
            return null
        },
        // 动态计算标题的文本
        titleText(){
            if(this.activeName=='many'){
                return '动态参数'
            }
            return '静态属性'
        }
    }
}
</script>

<style lang="less" scoped>
.cat_opt{
    margin: 15px;
}
#text{
    margin-right: 15px;
}
.el-tag{
    margin: 10px;
}
.input-new-tag{
    width: 120px;
}
</style>