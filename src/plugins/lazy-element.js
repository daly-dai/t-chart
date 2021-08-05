/**
 * @desc 按需加载 element-ui 组件库（安装 babel-plugin-component 并在 babel.config.js 中就行配置）
 */
import { Button, Select, Message } from 'element-ui';

Vue.use(Button);
Vue.use(Select);
Vue.prototype.$message = Message;
