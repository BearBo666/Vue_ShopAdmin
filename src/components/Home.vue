<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <img class="bear" src="../assets/bear1.png" alt="">
                <span>电商后台管理系统</span>
            </div>
            <el-button type="info" @click="logout" class="logoutBtn">退出</el-button>
        </el-header>
        <!-- 页面主体区域 -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse? '64px':'200px'">
                <div class="toggle-button" @click="toggleCpllapse">丨丨丨</div>
                <!-- 侧边栏菜单区域 -->
                <el-menu unique-opened background-color="#333744" text-color="#fff" 
                    active-text-color="#409EFF" :collapse='isCollapse' :collapse-transition="false"
                    router :default-active="activePath">
                    <!-- 一级菜单 -->
                    <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
                        <!-- 一级菜单模板区 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i :class="iconsObj[item.id]"></i>
                            <!-- 文本 -->
                            <span>{{item.authName}}</span>
                        </template>
                        
                        <!-- 二级菜单 -->
                        <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" 
                        :key="subItem.id" @click="saveNavState('/'+subItem.path)">
                            <template slot="title">
                                <!-- 图标 -->
                                <i class="el-icon-menu"></i>
                                <!-- 文本 -->
                                <span>{{subItem.authName}}</span>
                            </template>
                        </el-menu-item>

                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 右侧内容主题 -->
            <el-main>
                <!-- 路由占位符 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data(){
        return {
            menulist: [],
            iconsObj: {
                '125': 'iconfont icon-user',
                '103': 'iconfont icon-tijikongjian',
                '101': 'iconfont icon-shangpin',
                '102': 'iconfont icon-danju',
                '145': 'iconfont icon-baobiao',
            },
            //菜单折叠方式，默认不折叠
            isCollapse:false,
            //被激活的链接地址
            activePath: ''
        }
    },
    created(){
        this.getMenuList()
        this.activePath = window.sessionStorage.getItem('activePath')
    },
    methods: {
        logout() {
            window.sessionStorage.clear();
            this.$router.push("/login");
        },
        //获取所有菜单
        async getMenuList(){
            const { data:res } = await this.$http.get('menus')
            if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
            this.menulist = res.data
            //console.log(res)
        },
        //点击按钮切换菜单的折叠与展开
        toggleCpllapse(){
            this.isCollapse = !this.isCollapse;
        },
        //保存链接的激活状态
        saveNavState(activePath) {
            window.sessionStorage.setItem('activePath',activePath)
            this.activePath = activePath
        }
    }
}
</script>

<style lang="less" scoped>
.home-container{
    height: 100%;
}
.el-header{
    width: 100%;
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    color: #fff;
    align-self: center;
    font-size: 20px;
    > div {
        display: flex;
        align-items: center;
        span {
            margin-left: 15px;
        }
    }
}
.bear{
    height: 50px;
    width: 60px;
    
    margin-bottom: 3px;
    margin-left: 10px;
}
.logoutBtn{
    margin-top: 10px;
    margin-bottom: 10px;
}
.el-aside{
    background-color: #333744;
    .el-menu {
        border-right: none;
    }
}
.el-main{
    background-color: #eaedf1;
}

.iconfont{
    margin-right: 10px;
}
.toggle-button{
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>