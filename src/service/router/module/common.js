/**
 * @desc 公共路由
 */
import { LOGIN_PAGE_NAME, ROOT_PAGE_NAME } from '@config/index.js';
import { BasicLayout } from '@packages/views/index.js';

const commonRoutes = [
  {
    path: '/',
    name: ROOT_PAGE_NAME,
    component: BasicLayout,
    // 控制布局组件的展示
    props: {
      /* renderNavMenu: false,
      renderDropColumnDown: false,
      renderDropDown: false */
      isPadding: false
    },
    children: []
  },
  {
    path: `/${LOGIN_PAGE_NAME}`,
    name: LOGIN_PAGE_NAME,
    component: () =>
      import(/* webpackChunkName:"views/login" */ '@views/login/index.vue'),
    meta: { title: '登录' },
    beforeEnter: (to, from, next) => {
      next();
    }
  },
  {
    path: '/401',
    name: '401',
    component: () =>
      import(
        /* webpackChunkName:"views/error-page" */ '@packages/views/error-page/401.vue'
      ),
    meta: { title: '401' }
  },
  {
    path: '/403',
    name: '403',
    component: () =>
      import(
        /* webpackChunkName:"views/error-page" */ '@packages/views/error-page/403.vue'
      ),
    meta: { title: '403' }
  },
  {
    path: '/500',
    name: '500',
    component: () =>
      import(
        /* webpackChunkName:"views/error-page" */ '@packages/views/error-page/500.vue'
      ),
    meta: { title: '500' }
  },
  {
    path: '/404',
    name: '404',
    component: () =>
      import(
        /* webpackChunkName:"views/error-page" */ '@packages/views/error-page/404.vue'
      ),
    meta: { title: '404' }
  },
  {
    path: '*', // 404 页面
    redirect: '/404'
  }
];
export default commonRoutes;
