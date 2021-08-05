/**
 * @desc 测试 api
 */
export default [
  {
    name: 'getRollGrid',
    method: 'GET',
    desc: '获取滚动列表',
    path: '',
    mockPath: '/mock/roll/grid',
    isAbandonCheckedParams: true // 是否放弃校验请求参数，默认会校验
  },
  {
    name: 'getNestingGrid',
    method: 'GET',
    desc: '获取嵌套grid列表',
    path: '',
    mockPath: '/mock/nesting/grid',
    isAbandonCheckedParams: true // 是否放弃校验请求参数，默认会校验
  }
];
