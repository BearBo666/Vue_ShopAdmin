<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图 -->
        <el-card>
            <!-- 添加角色按钮区 -->
            <el-row>
                <el-col>
                    <el-button type="primary">添加角色</el-button>
                </el-col>
            </el-row>
            <!-- 角色列表区 -->
            <el-table :data="rolelist" border stripe>
                <!-- 展开列 -->
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-row :class="['bdbottom',i1==0?'bdtop':'','vcenter']" v-for="(item1,i1) in scope.row.children" :key="item1.id">
                            <!-- 渲染一级权限 -->
                            <el-col :span="5">
                                <el-tag closable @close="removeRightById(scope.row,item1.id)">{{item1.authName}}</el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>
                            <!-- 渲染二级和三级权限 -->
                            <el-col :span="19">
                                <!-- 通过for循环嵌套渲染二级权限 -->
                                <el-row  v-for="(item2,i2) in item1.children" :class="[i2==0?'':'bdtop','vcenter']" :key="item2.id">
                                    <!-- 二级权限列 -->
                                    <el-col :span="6">
                                        <el-tag type="success" closable @close="removeRightById(scope.row,item2.id)">{{item2.authName}}</el-tag>
                                        <i class="el-icon-caret-right"></i>
                                    </el-col>
                                    <!-- 三级权限列 -->
                                    <el-col :span="18">
                                        <el-tag v-for="item3 in item2.children" 
                                        type="warning" :key="item3.id" closable @close="removeRightById(scope.row,item3.id)">{{item3.authName}}</el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <!-- 索引列 -->
                <el-table-column type="index"></el-table-column>
                <el-table-column label="角色名称" prop="roleName"></el-table-column>
                <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
                <el-table-column label="操作" width="300px" >
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" icon="el-icon-edit">修改</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
                        <el-button size="mini" type="warning" icon="el-icon-setting" @click="showSetRightDialog(scope.row)">分配权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 分配权限的对话框 -->
        <el-dialog title="分配权限" :visible.sync='setRightDialogVisible'
        width="50%" @close="setRightDialogClosed">
        <!-- 树形空间 -->
        <el-tree :data="rightslist" :props="treeProps"  ref="treeRef"
        show-checkbox default-expand-all :default-checked-keys="defKeys" node-key="id"></el-tree>
        <span slot="footer" class="dialog-footer">
            <el-button @click="setRightDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="allotRights">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return {
            //所有角色列表数据
            rolelist: [],
            //控制分配权限对话框的显示与隐藏
            setRightDialogVisible:false,
            //所有权限的数据
            rightslist:[],
            //树形控件的属性绑定对象
            treeProps:{
                label:'authName',
                children:'children'
            },
            //树形中默认选中节点的id值数组
            defKeys:[],
            //当前即将分配权限的角色的id
            roleId:''
        }
    },
    created(){
        this.getRolesList()
    },
    methods:{
        //获取所有角色的列表
        async getRolesList(){
            const {data:res} = await this.$http.get('roles')
            if(res.meta.status !== 200){
                return this.$message.error('获取角色列表失败')
            }

            this.rolelist=res.data
        },
        async removeRightById(role,rightId){
            // 弹框提示用户是否要删除
            const confirmResult = await this.$confirm('是否移除该权限?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'}).catch(err=>err)
            if(confirmResult !== 'confirm'){
                return this.$message.info('取消了删除')
            }
            const {data:res} = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
            if(res.meta.status !==200){
                return this.$message.error('删除权限失败')
            }
            //this.getRolesList() 调此函数会发生页面整个重新渲染，不建议！
            //故改为下列方式:
            role.children =res.data
        },
        //展示分配权限的对话框
        async showSetRightDialog(role){
            //弹框时就将角色id暂时保存,以便后续向服务器发送
            this.roleId=role.id
            //获取所有权限的数据
            const {data:res} = await this.$http.get('rights/tree')
            if(res.meta.status !== 200){
                return this.$message.error('获取权限列表失败!')
            }
            //获取到的权限数据保存到data中
            this.rightslist=res.data
            //递归获取三级节点的id
            this.getLeafKeys(role,this.defKeys)
            this.setRightDialogVisible=true
        },
        //通过递归的形式,获取角色下所有三级权限的id,并保存到defKeys中
        getLeafKeys(node,arr){
            //如果当前node节点不包含children属性，则是三级节点
            if(!node.children){
                return arr.push(node.id)
            }
            node.children.forEach(item => {
                this.getLeafKeys(item,arr)
            });
        },
        //监听分配权限对话框的关闭事件
        setRightDialogClosed(){
            this.defKeys=[]
        },
        //点击为角色分配权限
        async allotRights(){
            const keys=[
                ...this.$refs.treeRef.getCheckedKeys(),
                ...this.$refs.treeRef.getHalfCheckedNodes()
            ]
            const idStr = keys.join(',')
            const {data:res} = await this.$http.post(`roles/${this.roleId}/rights`,{rids:idStr})
            if(res.meta.status !== 200){
                this.$message.error('分配权限失败!')
            }
            this.$message.success('分配权限成功!')
            this.getRolesList()
            this.setRightDialogVisible=false
        }
    }
}
</script>

<style lang="less" scoped>
.el-tag{
    margin: 7px;
}

.bdtop{
    border-top: 1px solid #eee;
}
.bdbottom{
    border-bottom: 1px solid #eee;
}

.vcenter{
    display: flex;
    align-items: center;
}
</style>