## vue-web-admin

<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.6.11-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/ElemeFE/element">
    <img src="https://img.shields.io/badge/element--ui-2.13.1-brightgreen.svg" alt="element-ui">
  </a>
  <a href="https://github.com/ElemeFE/element">
    <img src="https://img.shields.io/badge/base--sc--vue--ui-0.1.0-brightgreen.svg" alt="base-sc-vue-ui">
  </a>
  <a href="http://nodejs.cn/">
    <img src="https://img.shields.io/badge/node-v12.18.3-blue.svg" alt="node">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/npm-v0.1.0-blue.svg" alt="npm">
  </a>
  <a href="#">
    <img src="http://badges.github.io/stability-badges/dist/stable.svg" alt="stable">
  </a>
</p>

#### 一个后台前端解决方案，它基于 vue、element-ui 和 base-sc-ui 实现。

运行后网站的登录用户名：admin，密码：admin

- vue ：
  使用 2.6.11 版本
- css 样式
  建议使用 less 编写，支持 less 和 scss 的编译

- node：
  高于：12.18.3
- git：
  不低于：git version 2.20.1

axios 的封装 api 文档请看：https://gitee.com/zhangh-design/js-libs/tree/master/axios-api-query

项目内浏览器的缓存设置：
https://github.com/robinvdvleuten/vuex-persistedstate#readme

```
使用 vuex-persistedstate 插件控制 localStorage 或者 sessionStorage内的缓存变量，一般不允许直接在代码中设置
sessionStorage.setItem("lastname", "Smith"); 这样的操作。
```

安装（推荐，会生成 package-lock.json 用于锁定版本）：

```

npm install

```

或者
（不推荐，不会生成 package-lock.json，在版本安装上面可能会出现冲突 ）

```

cnpm install

```

项目初始 git 仓库注意：

1、在 clone 项目后先进行 git add 和 git commit 的提交不执行 `npm install`命令，如果先进行`npm install`在进行 git add 和 git commit 的提交可能会出现文件过多导致`lint-staged`校验失败。

注意：

1、clone 后并且在 `npm i` 之前删除 patches 目录，这个目录是用于展示修改源码的示例

2、在 clone 项目后先执行 git init 命令，将目录初始化为 git 仓库，为后续 npm install 时 husky 可以安装成功。
如果先执行 npm install 在执行 git init 会出现 husky 的错误：

```

can't find .git directory, skipping Git hooks installation

> husky@4.3.7 install E:\vue-local\vue-test-spa\node_modules\husky
> node husky install

husky > Setting up git hooks
fatal: not a git repository (or any of the parent directories): .git
husky > Failed to install

```

运行：

| 指令                      | 说明                                                                                                                                                   |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| npm run dev-port          | 开发环境服务 可以修改 ip 和端口号（执行 eslint 语法检查）                                                                                              |
| npm run dev               | 开发环境服务 （执行 eslint 语法检查）                                                                                                                  |
| npm run serve             | 开发环境服务                                                                                                                                           |
| npm run serve:dev-preview | 预览模式服务                                                                                                                                           |
| npm run build             | 生产环境构建                                                                                                                                           |
| npm run lint              | eslint 代码校验                                                                                                                                        |
| npm run lint:no-fix       | eslint 代码校验 （同 npm run lint 但在没有 eslint 错误时会输出提示 `No lint errors found!`）                                                           |
| npm run lint-fix          | eslint 代码修复                                                                                                                                        |
| npm run clear             | 删除 node_modules 依赖并重新安装                                                                                                                       |
| npm run changelog         | 生成 changelog 日志文件（新发布版本时生成日志文件推荐将版本号`version`进行修改）                                                                       |
| npm run dev:test          | 开发环境服务（如果需要区分测试环境可以配置 .env.test）                                                                                                 |
| npm run build:test        | 生产环境服务（如果需要区分生产环境可以配置 .env.testProd）                                                                                             |
| npm run icon              | 生成 iconfont 相关的样式图标文件 `iconfont-classname.js                                                                                                |
| npm run createProxySelf   | 生成 dev 请求代理文件 proxy-self.js 用于代理请求的发送，proxy-self.js 是被 .gitignore 收录的过滤文件不需要传递上远端                                   |
| postinstall               | 用于第三方库的修改指令，`patch-package`插件自身会调用，自动为依赖包打上我们编写的补丁，注意：需要使用 npm install 安装                                 |
| stylelint-check           | 帮助你检查配置中是否包含与 Prettier 冲突的任何规则 `No conflicting rules detected in your stylelint configuration` 在 stylelint 配置中未检测到冲突规则 |
| npm run lint:style        | 检测 html 和 vue 文件中的 style 标签内部的样式代码错误，暂未配置 scss 类型的检测                                                                       |
| npm run lint:css          | 检测 css,less 文件中的样式代码错误，暂未配置 scss 类型的检测                                                                                           |
| npm run lint:css-fix      | --fix 选项可以指定 stylelint 自动修复不符合可修复规则的代码，暂未配置 scss 类型的检测                                                                  |
| lint:css-cache-fix        | --fix 选项可以指定 stylelint 自动修复不符合可修复规则的代码（使用缓存），暂未配置 scss 类型的检测                                                      |
| format                    | 按照 prettierrc 设置的规则格式化指定类型的所有文件                                                                                                     |
| dev:no-login              | 全局的路由拦截器 beforeEach 里面不走登录逻辑，直接访问 to 的路由                                                                                       |
| dev-userConfigEnv         | 打包使用自定义环境，环境文件存放在 config/user-config-env，CONFIG_ENV=my 中的 my 对应 config/user-config-env 中的配置文件名的 xx.env.js                |
| p                         | 自动创建文件，文件会根据创建过程提示进行选择性创建                                                                                                     |

获取 iconfont.css 文件下的 class 名称方法：
（图标文件放在`css-theme/common/font/iconfont/`）

```

步骤一、将 iconfont 包更新下
步骤二、在 build 目录下执行命令 npm run icon
步骤三、assets/font/iconfont 目录下会生成 iconfont-classname.js

```

浏览器地址：

```

http://localhost:8010/spa

```

目录结构：

```

build webpack 配置文件目录
|-create-proxy-self.js 创建 devServer 代理配置文件 config/proxy-self.js
|-css-loader.conf.js css 模块化配置
|-read-icon.js 创建图表选择器
|-utils.js
|-vue.base.conf.js webpack 基础配置
|-vue.dev.conf.js 开发配置
|-vue.prod.conf.js 生产配置
config webpack 配置参数
|-user-config-js 自定义环境配置目录
|-my.env.js
|-dev.env.js 开发环境变量
|-index.js 开发和生产配置参数
|-prod.env.js 生产环境变量
|-proxy-self.js
|-proxy-table.js webpackDevServer 代理配置文件
patches 源码修改对比 diff 目录
public
|-favicon.ico
|-index.html
|-link.html
|-meta.html
src
|-assets 静态资源
|-font
|-iconfont iconfont 图标
|-packages 组件库图标
|-images 普通图片资源文件目录
|-images-webpack 生成环境打包会通过 images-webpack-loader 进行图片压缩（体积比较大的图推荐放在这里）
|-config 全局配置目录
|-interceptor 拦截器
|-index.js
|-directives 全局指令
|-filters 全局过滤器
|-packages 全局组件
|-common-view 公共视图组件（比如：个人中心 ）
|-components
|-views 布局视图（比如：网站整体的布局）
|-plugins 全局插件
|-axios ajax 请求封装
|-data-dict-filter 字典数据转全局过滤器
|-components.js 加载全局组件
|-link.js 跨层级获取组件实例
|-unicom.js 组件通信插件
|-vbus.js 巴士事件
|-router router 实例构建
|-service
|-api api 请求目录
|-data-dict 数据字典
|-router 路由目录
|-store vuex 目录
|-store store 实例构建
|-views 视图层
|-login 登录
|-index.vue
|-home 主页
|-index.vue
|-personal 个人中心
|-index.vue
|-cognate-charts 企业关联图谱
|-working-monitor 工业经济运行监测
|-electronics-map 产业地图
|-view-portray 企业全景画像
|-achievement 高质量评价
|-data-manage 数据管理
|-data-analyse 数据分析
|-service-platform 综合服务平台
|-helper 帮助中心
|-log 平台日志
|-notice 公告管理
|-setting 系统设置
|-frame 组织架构
|-permission 权限管理
|-function 功能权限
|-role 角色管理
|-utils 工具类
static 静态资源
|-images 图片目录（推荐 背景图 background: url() 放到这里）
|-plugins // 外部插件
|-babel-modules 使用 babel 处理的 js 插件
|-font 自定义字体库文件
.browserslistrc 浏览器兼容性配置
.editorconfig 统一不同编辑器的代码风格
.env 公共 环境变量参数配置
.env.development 开发环境环境变量配置文件
.env.preview 预览环境环境变量配置文件
.env.test 测试开发环境环境变量配置文件
.env.testProd 测试生产环境环境变量配置文件
.eslintignore eslint 校验忽略配置
.eslintrc.js eslint 配置
.gitattributes Git 属性 一些设置项
.gitignore git 忽略配置
.huskyrc git 提交钩子校验定义
.lintstagedrc.json lint-staged 校验配置文件（lint-staged 可以让 husky 只检验 git 暂存区的文件，不会导致你一下出现成百上千个错误）
.prettierignore 不使用 prettier 格式化的文件填写在项目的.prettierignore 文件中
.prettierrc.js prettierrc 排版配置
.stylelintignore 过滤不受 stylelint 校验的目录或文件
.vcmrc 用于检验 git 提交信息是否符合格式
babel.config.js babel 配置
frame.config.js 框架自定义构建配置
package.json 依赖包
postcss.config.js css 后置处理器配置
README.md 说明文档
stylelint.config.js stylelint 配置文件
tsconfig.json typeScript 配置文件
vue.config.js vue 项目构建配置

```

.vcmrc

```

# Node >= 10 and Git >= 2.13.0

# [Husky](https://github.com/typicode/husky#readme)

# [validate-commit-msg](https://github.com/conventional-changelog-archived-repos/validate-commit-msg)

# [Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)

# [Change log 示例 1](https://github.com/karma-runner/karma/blob/master/CHANGELOG.md)

# [Change log 示例 2](https://github.com/btford/grunt-conventional-changelog/blob/master/CHANGELOG.md)

# feat 新增功能（feature）

# fix 修补 bug

# docs 仅仅修改了文档，比如 README, CHANGELOG, CONTRIBUTE 等等

# style 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑

# refactor 重构（即不是新增功能，也不是修改 bug 的代码变动）

# perf 优化相关，比如提升性能、体验

# test 增加测试，包括单元测试、集成测试等

# build

# ci 自动化流程配置修改

# chore 构建过程或辅助工具的变动

# revert 回滚到上一个版本

# scope.required 用于定义是否所有提交消息都需要一个作用域

# scope.allowed 允许任何作用域名称

# warnOnFail 如果设置为 true，则错误将记录到控制台，但是提交仍将通过

# maxSubjectLength 这将控制主题的最大长度 100 个字符。

```

npm 镜像及配置方法

`持久使用（推荐使用）`

```

打开 cmd 使用命令：

npm config set registry https://registry.npm.taobao.org

// 配置后可通过下面命令来验证是否成功

npm config ls

// 此时：metrics-registry = "http://registry.npm.taobao.org/"表示设置成功

npm config get registry

// 或
npm info express

```

如何修改 node_modules 里的文件

1. 使用 patch-package 来修改（需要使用 npm i，cnpm 不能生成 `package-lock.json`文件用于锁定安装依赖版本）

使用 patch-package 来修改 node_modules 里面的文件更方便

步骤也很简单：

1. 安装 patch-package：npm i patch-package --save-dev
2. 修改 package.json，新增命令 postinstall:

```

"scripts": {
"postinstall": "patch-package"
}

```

3. 修改 node_modules 里面的代码
4. 执行命令：npx patch-package element-ui （这里以 `element-ui` 作为示例）

第一次使用 patch-package 会在项目根目录生成 patches 文件夹，里面有修改过的文件 diff 记录。

```

patches
|-element-ui+2.14.1.patch
|-vue-count-to+1.0.13.patch

```

当这个包版本更新后，执行命令：git apply --ignore-whitespace patches/element-ui+2.14.1.patch 即可。其中 element-ui+2.14.1.patch 是它生成的文件名。

```

```

```

```
