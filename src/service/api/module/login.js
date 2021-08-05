/**
 * 系统登录 api 文档接口 领域模型
 */
export default [
  {
    name: 'doLogin',
    method: 'POST',
    desc: '用户登录',
    path: '/user/login',
    mockPath: '/mock/user/login',
    data: { userName: '', password: '' },
    // mock: false, // 单独使用 mockPath
    isLogin: true, // 是否登录接口
    isWhite: true, // 白名单 （设置为 true 则会去除 token 参数）
    // headers: { token: 'test_123' } // 会和 api.js 插件中的 this.headerOptions 通用请求头参数进行对比，如果参数冲突会以接口中的参数替换 this.headerOptions 中的对应参数
    validator: {
      userName: [
        { required: true, type: String, not: '', msg: '用户名不能为空!' },
        { sqlXss: true, msg: '用户名含有特殊字符!' }
      ],
      password: [
        {
          required: true,
          type: String,
          sqlXss: true,
          not: '',
          msg: '密码不能为空!'
        },
        { sqlXss: true, msg: '密码含有特殊字符!' }
      ]
      /* token: [
        {
          required: true,
          type: String,
          not: null,
          msg: null // 验证但不进行弹框提示
        }
      ] */
    }
  },
  {
    name: 'logout',
    method: 'POST',
    desc: '用户登出',
    path: '/user/logout',
    mockPath: '/mock/user/logout',
    headers: { token: '' }
  }
];
