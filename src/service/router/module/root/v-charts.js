/* eslint-disable no-unused-vars */
import { BasicLayout } from '@packages/views/index.js';

export default [
  {
    path: '/v-chart',
    name: 'v-chart',
    meta: {
      title: '图表'
    },
    // redirect: '/v-chart/bar',
    component: () =>
      import(
        /* webpackChunkName:"views/error-page" */ '@views/echarts/index.vue'
      ),
    children: [
      {
        path: 'bar',
        name: 'bar',
        meta: {
          title: '图表标题'
        },
        component: () =>
          import(
            /* webpackChunkName:"views/error-page" */ '@views/echarts/bar/bar.vue'
          )
      },
      {
        path: 'line',
        name: 'line',
        meta: {
          title: '图表标题'
        },
        component: () =>
          import(
            /* webpackChunkName:"views/error-page" */ '@views/echarts/line/line.vue'
          )
      },
      {
        path: 'pie',
        name: 'pie',
        meta: {
          title: '图表标题'
        },
        component: () =>
          import(
            /* webpackChunkName:"views/error-page" */ '@views/echarts/pie/pie.vue'
          )
      }
    ]
  }
];
