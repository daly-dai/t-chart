路由/菜单说明
====


格式和说明
----

```

const routerObject = {
  redirect: noredirect,
  name: 'router-name',
  path: 'router-path',
  meta: {
    buttons: [],
    title: 'title',
    icon: 'a-icon',
    target: '_blank|_self|_top|_parent',
    keepAlive: true,
    isOpen: true,
    approve: true,
    toType: 'menu'
  }
}

```


`{ Route }` 对象

| 参数     | 说明                                      | 类型    | 默认值 |
| -------- | ----------------------------------------- | ------- | ------ |
| redirect | 重定向地址, 访问这个路由时,自定进行重定向 | string  | -      |
| name     | 路由名称, 必须设置, 且不能重名           | string  | -      |
| path     | 路由路径, 可选设置, 如果以 / 开头的嵌套路径会被当作根路径 | string  | -      |
| meta     | 路由元信息（路由附带扩展信息）            | object  | {}     |


`{ Meta }` 路由元信息对象

| 参数                | 说明                                                         | 类型    | 默认值 |
| ------------------- | ------------------------------------------------------------ | ------- | ------ |
| title               | 路由标题, 可以用于显示面包屑, 页面标题推荐设置                 | string  | -      |
| icon                | 路由在 menu 上显示的图标                                     | [string,svg]  | -      |
| keepAlive           | 缓存该路由                                                   | boolean | false  |
| target              | 菜单链接跳转目标（参考 html a 标记）                          | string | -  |
| buttons              | 路由页面对应的权限按钮 | Array | -  |
| isOpen              | 路由是否可访问，通常这是和菜单动态匹配后得到的结果（由 approve 进行控制，不要手动） | Boolean | -  |
| approve              | 控制路由是否需要进行菜单的匹配来得到isOpen（设置 approve: true 后页面没有权限刷新浏览器也可以访问） | Boolean | -  |
| toType               | 标识路由是从哪里点击打开的，可选值 menu 从菜单打开、push 通过 push 程序的形式打开         | string  | menu      | 

> 路由自定义 `Icon` 请引入自定义 `svg` Icon 文件，然后传递给路由的 `meta.icon` 参数即可

路由构建例子方案1

路由例子
----

```
const routerMap = [
  {
    path: '/',
    name: 'root',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/analysis',
    children: [
      {
        path: '/dashboard',
        component: BaseRouteView,
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        meta: {title: '仪表盘', icon: 'dashboard' },
        children: [
          {
            path: '/dashboard/analysis',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: {title: '分析页', buttons: [
              { id: 12, name: '添加', code: 'add', status: 0 },
              { id: 13, name: '删除', code: 'delete', status: 1 }
            ]}
          },
          {
            path: '/dashboard/monitor',
            name: 'Monitor',
            hidden: true,
            component: () => import('@/views/dashboard/Monitor'),
            // isOpen: false 该路由在浏览器上访问时不能展示对应的页面，可以跳转到 404 页面
            meta: {title: '监控页', isOpen: false}
          },
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: {title: '工作台'}
          }
        ]
      },

      // result
      {
        path: '/result',
        name: 'result',
        component: BlankLayout,
        redirect: '/result/success',
        meta: { title: '结果页', icon: 'check-circle-o' },
        children: [
          {
            path: '/result/success',
            name: 'ResultSuccess',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
            meta: { title: '成功' }
          },
          {
            path: '/result/fail',
            name: 'ResultFail',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
            meta: { title: '失败' }
          }
        ]
      },
      ...
    ]
  },
]
```

> 1. 请注意 `component: () => import('..') ` 方式引入路由的页面组件为 懒加载模式。具体可以看 [Vue 官方文档](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html)
> 2. 增加新的路由应该增加在 '/' (root) 路由的 `children` 内, 获取在您指定的另一个根路由的 `children` 内
> 3. 子路由的父级路由必须有 `router-view` 才能让子路由渲染出来，请仔细查阅 vue-router 文档
> 4. 权限路由和路由定义无关，权限路由是和菜单树进行关联匹配后动态得到的。
