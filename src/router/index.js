import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import Welcome from '@/components/Welcome.vue'
import Users from '@/components/User/Users.vue'
import Rights from '@/components/Power/Rights.vue'
import Roles from '@/components/Power/Roles.vue'
import Cate from '@/components/Goods/Cate.vue'
import Params from '@/components/Goods/Params.vue'
import List from '@/components/Goods/List.vue'
import Add from '@/components/Goods/Add.vue'
Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/',redirect: '/login '},
    { path: '/login', component: Login },
    { path: '/home', 
      component: Home, 
      redirect: 'welcome',
      children:[{ path: '/welcome',component:Welcome },
                { path: '/users', component:Users },
                { path: '/rights', component:Rights },
                { path: '/roles', component:Roles },
                { path: '/categories', component:Cate },
                { path: '/params', component:Params },
                { path: '/goods', component:List },
                { path: '/goods/add', component:Add }
               ]
    }
  ]
})
 
//挂载路由导航守卫
router.beforeEach((to,from,next)=>{
  /*to 将要访问的路径,from 代表从哪个路径跳转而来,
   next 是一个函数,表示放行*/
  if(to.path == '/login' ) return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()
})

export default router
