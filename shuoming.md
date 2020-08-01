# 1.目标

## 	1.1	学习目的

​    ①能够基于vue初始化项目

​	②能够基于vue技术栈进行项目初始化

​	③能够使用vue的第三方组件进行项目开发

​	④能够说出前后端分离的开发模式

# 2.目录

## 	2.1	目录

​    1.项目概述

​	2.项目初始化

​	3.登录/退出功能

​	4.主页布局

​	5.用户管理模块

​	6.权限管理模块

​	7.商品管理模块

​	8.订单管理模块

​	9.数据统计模块

​	10.其他

# 3.项目概述

## 	3.1	设计想法

本项目专为PC端的电商管理者开发，用于管理用户账号，商品分类，商品信息，订单，数据统计等业务功能。设计想法为：将不同的权限细化，然后将不同的权限给予给不用的角色，再给具体的用户分配角色。从而达到权限的细化到集中再到分配的功能。

## 	3.2	技术选型

​			1.前端技术栈：

​					①vue

​					②vue-router

​					③Element-UI

​					④Axios

​					⑤Echarts

​			2.后端技术栈：

​					①Node.js

​					②Express

​					③Jwt

​					④Mysql

​					⑤Sequelize

​			3.辅助工具:

​				git+github

​				vs code

# 4.项目初始化

## 	4.1前端项目初始化步骤

​			①安装vue脚手架

​				1.提前下载好node：http://nodejs.cn/download/与npm(或者cnpm：http://npm.taobao.org/)

​				2.Windows电脑打开命令行工具分别输入node -v和cnpm -v 查看版本号如图

​					<img src="C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801161519510.png" alt="image-20200801161519510" style="zoom:50%;" />

​				3.安装vue-cli

​					在命令框内输入cnpm install -g @vue/cli

​				4.快速原型开发

​					你可以使用 `vue serve` 和 `vue build` 命令对单个 `*.vue` 文件进行快速原型开发，不过这需要先额外安装一个					全局的扩展：

​					cnpm install -g @vue/cli-service-global

​				ps：具体操作与提示按Vue cli官网为准：https://cli.vuejs.org/zh/

​				5.输入vue ui打开vue 可视化面板

​					一，傻瓜式创建项目，二，选好项目所在文件夹后进入预设面板，点击手动配置预设，勾选Babel，Router，Linter/Formatter(可不勾，此插件用来校验和规范代码格式)，使用配置文件。三，进入配置步骤，Use history mode for router?取消勾选。四，点击创建项目

​			②通过vue脚手架

​			③配置vue路由

​			④配置Element-UI组件库

​				打开项目仪表盘，点击插件面板，安装vue-cli-plugin-element，在element-ui的配置处将导入方式从Fully import(全部导入)改为Import on demand(按需导入)以免项目过于臃肿。

​			⑤配置axios库

​				打开项目仪表盘，点击依赖面板，运行依赖中搜索axios，并安装。

​			⑥初始化git远程仓库

​				提前下载好git，并配置好ssh公钥。

​			⑦将本地项目托管到github中

​				新建一个仓库，CMD命令框内输入git status查看工作状态,输入git add .  再输入git commit -m "提交的备注"提交到暂存区，输入git remote add origin 仓库地址，再输入git push -u origin master将本地仓库与云端仓库做关联。

​			⑧后台接口

​				因本项目主要为一个前端项目，所以后台接口直接调用黑马程序员已写好的后台：https://www.liulongbin.top:8888/api/private/v1/   ，支持get,post,put,patch,delete,head,options请求方法

# 5.登录/退出功能

## 	5.1 登录概述

### 		5.1.1 登录业务流程

​			1.登录页面输入用户名和密码

​			2.调用后台接口进行验证

​			3.通过验证后，根据后台的响应状态跳转到项目主页。

### 		5.1.2  登录业务的相关技术点

​			1.http是无状态的

​			2.通过cookie在客户端记录状态

​			3.通过session在服务端记录状态

​			4.通过token方式维持状态

​				<img src="C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801165051147.png" alt="image-20200801165051147" style="zoom: 80%;" />

### 		5.1.3 登录页面的布局通过Element-UI实现布局

​			①命令框输入git checkout -b login 创建新分支再开发(每次开发新功能或者进行大的修改均要创建新分支，并在开发完成后立刻进行提交)

​			②在vue ui可视化面板中打开任务面板，找到serve任务，点击运行，然后点击启动app

​			③打开App.vue删除源代码

​			④打开router.js，清空原有的routes

​			⑤打开components创建Login.vue

​			⑥导入登录组件，并在routes中导入。

​			![image-20200801170246875](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801170246875.png)

![image-20200801170300040](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801170300040.png)

​			⑤编写Login组件的代码并指定校验规则

​				<img src="C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801165541295.png" alt="image-20200801165541295" style="zoom: 80%;" />

<img src="C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801165606840.png" alt="image-20200801165606840" style="zoom: 80%;" />

​		⑤CSS添加样式

## 5.2	完成效果

​			![image-20200801170640538](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801170640538.png)

# 6.主页布局

## 6.1	整体布局

​		在Element-UI官网(https://element.eleme.cn/#/zh-CN)组件中的容器布局容器中选择此类布局模式

​		![image-20200801171151555](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801171151555.png)

## 6.2	完成布局

​		同登录/退出组件的编写，引入组件，编写代码。

​		且在每次引入新的Element-UI的新组件时，都需在plugins文件的element.js中进行声明。

![image-20200801180624447](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801180624447.png)

## 6.3	完成效果

​		![image-20200801171429432](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801171429432.png)

# 7.	用户管理模块

## 7.1	整体布局

​		模块主要分两部分，面包屑导航区域和卡片视图区域，同时，面包屑导航中的首页二字点击后还得跳转回Home界面，卡片视图区域中又包括搜索与添加区域，用户列表区域，分页区域。

![image-20200801171659818](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801171659818.png)

![image-20200801175241657](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801175241657.png)

## 7.2	完成效果

​		![image-20200801171852079](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801171852079.png)

## 7.3	功能具体实现

​		在进入用户列表前需要获取用户列表，通过get方法获取。

​		![image-20200801174653105](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801174653105.png)

​		同理，从完成图中看出添加用户，状态按钮，修改，设置，删除按钮均需向后台发起请求，所以给这些按钮都绑定点击事件，并编写异步函数。请求方法分别为post,put,get,put,delete.并且在点击时还需要渲染出一个对话框，提交后再隐藏。

# 8.权限管理模块

## 8.1	整体布局

​		权限管理有两个子分支，角色列表与权限管理，布局与用户管理也是大同小异，面包屑导航加卡片视图。

## 8.2	完成效果

![image-20200801175414285](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801175414285.png)

![image-20200801175430309](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801175430309.png)

## 8.3	功能具体实现

​		同用户管理组件，提前获取角色列表，并为各种按钮绑定对应的函数。

# 9.商品管理模块

## 9.1整体布局

​		商品管理有三个子分支，商品列表分支同用户列表，商品分类分支同权限列表，仅多了添加分类，编辑删除分类的按钮。在点击添加分类之后跳转到对应页面。分类参数分两页，商品的动态参数与静态属性。需要添加一个级联选择器。

## 9.2完成效果

​		![image-20200801180243658](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801180243658.png)

![image-20200801180302376](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801180302376.png)

<img src="C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801180314102.png" alt="image-20200801180314102" style="zoom:25%;" />

![image-20200801180934687](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801180934687.png)

## 9.3	功能具体实现

​		大部分功能同前，仅多了两个组件：级联选择器组件与进度条组件，在Element.js中声明即可。同时，由于添加商品页面的级联选择器绑定的是一个数组，而服务器所需要的为一个字符串，使用浅拷贝会出现错误，所以还需引入一个lodash包来使用它所带的深拷贝方法。

![image-20200801181502312](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801181502312.png)

# 10.订单管理模块

## 10.1	整体布局

​		同上，主要为面包屑导航，与卡片视图区域。

## 10.2	完成效果

![image-20200801184529327](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801184529327.png)

![image-20200801184602153](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801184602153.png)

![image-20200801184545106](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801184545106.png)



## 10.3	具体功能实现

### 		10.3.1	修改地址

​				由于本次主要是学习用途，所以修改地址不需要真的实现修改，仅需要导入一个级联选择器，并绑定中国所有城市数据即可。

![image-20200801184811427](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801184811427.png)

### 		10.3.2	物流消息查询

​				物流进度采用Element-UI中的时间线组件完成渲染，测试单号为：804909574412544580。

![image-20200801185033938](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801185033938.png)

# 11.数据统计模块

## 11.1	整体布局

​		采用面包屑导航和一个表格。

## 11.2	完成效果

![image-20200801185233881](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801185233881.png)

## 11.3	具体功能实现

​		1.在el-card中为表格准备一个具备大小的Dom元素

​		2.导入echarts绘表

​		3.基于准备好的Dom，初始化echarts实例

​		4.发起网络请求获得折线图的数据并配置展示

![image-20200801185534718](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801185534718.png)

![image-20200801185547626](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801185547626.png)

# 12.其他

## 12.1	服务器请求的地址及方法以及成功的状态码

### 	   12.1.1	用户列表

​		获取用户列表	../users													 get方法 	200

​		![image-20200801193637862](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801193637862.png)

​		改变用户状态	../users/用户的id/state/user的状态    put方法	200

​		![image-20200801193700289](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801193700289.png)

​		添加新用户	../users														  post方法	201

​		![image-20200801193717557](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801193717557.png)

​		修改用户信息 	../users/用户的id									put方法	200

​		![image-20200801193738583](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801193738583.png)

​		给用户分配角色	../users/用户的id/role						 put方法	200

​		![image-20200801193819161](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801193819161.png)

​		删除用户	../users/用户的id		delete方法		200

​		![image-20200801193757524](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801193757524.png)

### 	12.1.2	权限管理

#### 		12.1.2.1	角色列表

​			获取角色列表	../roles													get方法	200

​			![image-20200801193849242](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801193849242.png)

​			删除角色的权限	../roles/角色的id/rights/权限的id	delete方法	200

​			![image-20200801194002760](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801194002760.png)

​			获取角色的权限	../rights/tree									get方法	200

​			![image-20200801194200893](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801194200893.png)

​			为角色分配权限	../roles/角色的id/rights				post方法	200

​			![image-20200801193912447](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801193912447.png)

#### 		12.1.2.2	权限列表

​			获取所有权限		../rights/list				get方法	200

​			![image-20200801194217656](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801194217656.png)

### 12.1.3	商品管理

#### 		12.1.3.1	商品列表

​			获取商品列表	../goods					get方法	200

​			![image-20200801194247725](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801194247725.png)

​			删除商品	../goods/商品的id			delete方法	200

​		![image-20200801194307228](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801194307228.png)

#### 		12.1.3.2	商品分类

​			获取商品分类	../categories			get方法	200

​			![image-20200801194502739](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801194502739.png)

​			添加新分类	../categories				post方法	201

​			![image-20200801194522752](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801194522752.png)

#### 		12.1.3.3	分类参数	

​			获取指定商品的参数列表	../categories/商品的id/attributes			get方法	200

​			![image-20200801194806930](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801194806930.png)

​			添加属性	../categories/商品的id/attributes									post方法	201

​			![image-20200801194828860](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801194828860.png)

​			修改商品属性	../categories/商品的id/attributes							put方法	200

​			![image-20200801194907070](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801194907070.png)

​			删除商品属性	../categories/商品的id/attributes						delete方法	200

​			![image-20200801194922758](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801194922758.png)

### 		  12.1.4	订单管理

​			获取订单	../orders													get方法	200

​			![image-20200801194953169](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801194953169.png)

​			获取物流数据	../kuaidi/804909574412544580	get方法	200

​			![image-20200801195007846](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801195007846.png)

### 		  12.1.5	数据报表

​				获取折线图数据	../reports/type/1					get方法	200

​				![image-20200801195029259](C:\Users\PengYuYan\AppData\Roaming\Typora\typora-user-images\image-20200801195029259.png)

## 12.2	上线准备

​			默认情况下，通过import语法导入的第三方依赖包，最终会被打包合并到同一个文件中，从而导致打包成功后，单文件体积过大的问题。

​			为了解决上述问题，可以通过webpack的externals节点，来配置并加载外部的CDN资源，凡是声明在externals中的第三方依赖包，都不会被打包：https://www.bilibili.com/video/BV1EE411B7SU?p=200