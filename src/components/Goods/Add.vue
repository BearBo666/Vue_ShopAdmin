<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
            <el-breadcrumb-item>添加商品</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 提示区域 -->
            <el-alert title="添加商品区域" center show-icon type="info" :closable="false"></el-alert>
            <!-- 步骤条区域 -->
            <el-steps :space="200" :active="activeIndex-'0'" align-center finish-status="success">
                <el-step title="基本信息"></el-step>
                <el-step title="商品参数"></el-step>
                <el-step title="商品属性"></el-step>
                <el-step title="商品图片"></el-step>
                <el-step title="商品内容"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>

            <!-- tab栏区域 -->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" label-position="top">
                <el-tabs :before-leave="beforeTabLeave" :tab-position="'left'" v-model="activeIndex" @tab-click="tabClicked">
                    <!-- 步骤一 -->
                    <el-tab-pane label="基本信息" name='0'>
                        <el-form-item label="商品名称" prop="goods_name">
                            <el-input v-model="addForm.goods_name"></el-input>
                        </el-form-item>
                        <el-form-item label="商品价格" prop="goods_price">
                            <el-input v-model="addForm.goods_price" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品重量" prop="goods_weight">
                            <el-input v-model="addForm.goods_weight" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品数量" prop="goods_number">
                            <el-input v-model="addForm.goods_number" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品分类" prop="goods_cat">
                            <el-cascader v-model="addForm.goods_cat" :options="catelist" 
                            :props="cateProps" @change="handleChange"></el-cascader>
                        </el-form-item>
                    </el-tab-pane>
                    <!-- 步骤二 -->
                    <el-tab-pane label="商品参数" name="1">
                        <!-- 渲染表单的item项 -->
                        <el-form-item :label="item.attr_name" v-for="item in manyTableData" :key="item.attr_id">
                            <el-checkbox-group v-model="item.attr_vals">
                                <el-checkbox border="" :label="cb" v-for="(cb,i) in item.attr_vals" :key="i"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-tab-pane>
                    <!-- 步骤三 -->
                    <el-tab-pane label="商品属性" name="2">
                        <el-form-item :label="item.attr_name" v-for="item in onlyTableData" :key="item.attr_id">
                            <el-input v-model="item.attr_vals"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <!-- 步骤四 -->
                    <el-tab-pane label="商品图片" name="3">
                        <!-- action表示图片上传到的后台API地址 -->
                        <el-upload :action="uploadURL" :on-preview="handlePreview" :on-remove="handleRemove"
                         list-type="picture" :headers="headerObj" :on-success="handleSuccess">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-tab-pane>
                    <!-- 步骤五 -->
                    <el-tab-pane label="商品内容" name="4">
                        <!-- 富文本编辑器组件 -->
                        <quill-editor ref="myQuillEditor" v-model="addForm.goods_introduce" />
                        <!-- 添加商品的按钮 -->
                        <el-button type="primary" class="addBtn" @click="add">添加商品</el-button>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
        </el-card>

        <!-- 图片预览 -->
        <el-dialog title="图片预览" :visible.sync="previewVisible" width="50%">
            <img :src="previewPath" alt="" class="previewImg">
        </el-dialog>
    </div>
</template>

<script>
import _ from 'lodash'

export default {
    data(){
        return{
            activeIndex:'0',
            //添加商品的表单数据对象
            addForm:{
                goods_name:'',
                goods_price:0,
                goods_weight:0,
                goods_number:0,
                //商品所属的分类数组
                goods_cat:[],
                //图片的数组
                pics:[],
                //商品的详情描述
                goods_introduce:'',
                attrs:[]
            },
            addFormRules:{
                goods_name:[
                    { required:true,message:'请输入商品名称',trigger:'blur' }
                ],
                goods_price:[
                    { required:true,message:'请输入商品价格',trigger:'blur' }
                ],
                goods_weight:[
                    { required:true,message:'请输入商品重量',trigger:'blur' }
                ],
                goods_number:[
                    { required:true,message:'请输入商品数量',trigger:'blur' }
                ],
                goods_cat:[
                    { required:true,message:'请选择商品分类' }
                ]
            },
            //商品分类列表
            catelist:[],
            //级联选中器选中的对象
            cateProps:{
                label:'cat_name',
                value:'cat_id',
                children:'children'
            },
            //动态参数列表数据
            manyTableData:[],
            //静态属性列表数据
            onlyTableData:[],
            //上传图片的地址
            uploadURL:'https://www.liulongbin.top:8888/api/private/v1/upload',
            //图片上传组件的headers请求头对象
            headerObj:{
                Authorization:window.sessionStorage.getItem('token')
            },
            //图片预览的路径
            previewPath:'',
            //控制图片预览对话框的显示与隐藏
            previewVisible:false
        }
    },
    created(){
        this.getCateList()
    },
    methods:{
        async getCateList(){
            const {data:res} = await this.$http.get(`categories`)
            if(res.meta.status!==200){
                return this.$message.error('获取商品分类数据失败!');
            }
            this.catelist=res.data
            console.log(this.catelist)
        },
        //级联选择器选中项发生变化时,会触发这个函数
        handleChange(){
        },
        //监听添加商品步骤转换的函数
        beforeTabLeave(activeName,oldActiveName){
            if(oldActiveName=='0' &&
            this.addForm.goods_cat.length!=3){
                this.$message.error('请先选择商品分类!')
                return false
            }
        },
        async tabClicked(){
            //证明访问的动态参数面板
            if(this.activeIndex == '1'){
                const {data:res} = await this.$http.get(`categories/${this.cateId}/attributes`,
                    {
                        params: { sel: 'many' }
                    }
                )
                if(res.meta.status!==200){
                    return this.$message.error('获取动态参数列表失败!')
                }
                res.data.forEach(item=>{
                    item.attr_vals=
                    item.attr_vals.length==0?
                    []:item.attr_vals.split(' ')
                })
                this.manyTableData=res.data
            }else if(this.activeIndex == '2'){ //证明访问静态属性面板
                const {data:res} = await this.$http.get(`categories/${this.cateId}/attributes`,
                    {
                        params: { sel: 'only' }
                    }
                )
                if(res.meta.status!==200){
                    return this.$message.error('获取动态参数列表失败!')
                }
                this.onlyTableData=res.data
            }
        },
        //处理图片预览的函数
        handlePreview(file){
            this.previewPath=file.response.data.url
            this.previewVisible=true
        },
        //处理移除图片的函数
        handleRemove(file){
            //1.获取将要删除的图片的临时路径
            const filePath = file.response.data.tmp_path
            //2.从pics临时数组中,找到图片对应的索引值
            const i = this.addForm.pics.findIndex(x=>
            x.pic==filePath)
            //3.调用数组的splice方法,把图片信息对象,从pics数组中移除
            this.addForm.pics.splice(i,1)
        },
        //监听图片上传成功的事件
        handleSuccess(response){
            //1.拼接得到一个图片信息对象
            const picInfo={pic:response.data.tmp_path}
            //2.将图片信息对象，push到pics数组中
            this.addForm.pics.push(picInfo)
        },
        //添加商品
        add(){
            this.$refs.addFormRef.validate(async valid=>{
                if(!valid) return this.$message.error('请填写完整的商品信息!')
                //执行添加的业务逻辑
                /*
                    this.addForm.goods_cat=
                    this.addForm.goods_cat.join(',')
                    服务器需要的时字符串,原来的是数组，但是级联选择器双向绑定要求的
                    是数组,转换为字符串会矛盾报错,故使用lodash包中的cloneDeep(obj)
                    深拷贝一份数组出来
                */
                const form=_.cloneDeep(this.addForm)
                //将拷贝出来的数组改造成字符串
                form.goods_cat=form.goods_cat.join(',')
                //处理动态参数
                this.manyTableData.forEach(item=>{
                    const newInfo ={ 
                        attr_id: item.attr_id ,
                        attr_value: item.attr_vals.join(' ')
                    }
                    this.addForm.attrs.push(newInfo)
                })
                //处理静态属性
                this.onlyTableData.forEach(item=>{
                    const newInfo ={ 
                        attr_id: item.attr_id ,
                        attr_value: item.attr_vals
                    }
                    this.addForm.attrs.push(newInfo)
                })
                form.attrs=this.addForm.attrs
                //发起请求添加商品,名称必须唯一
                const {data:res} = await this.$http.post(`goods`,form)
                if(res.meta.status!==201){
                    return this.$message.error('添加商品失败!')
                }
                this.$message.success('添加商品成功!')
                this.$router.push('/goods')
            })
        }
    },
    computed:{
        //选中的三级分类的id
        cateId(){
            //判断是否选中三级分类
            if(this.addForm.goods_cat.length==3){
                return this.addForm.goods_cat[2]
            }
            return null
        }
    }
}
</script>

<style lang="less" scoped>
.el-checkbox{
    margin: 0 10px 0 0!important;
}
.previewImg{
    width: 100%;
}
.addBtn{
    margin-top: 15px;
}
</style>