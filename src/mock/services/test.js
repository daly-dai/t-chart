import Mock from 'mockjs2';
import { builder, getQueryParameters } from '../util';

const rollGridList = options => {
  const parameters = getQueryParameters(options);
  console.info('mock: parameters', parameters);
  const result = [];
  for (let i = 1; i < 8; i++) {
    result.push({
      id: i,
      state: i,
      date: Mock.mock('@datetime()'),
      name: Mock.mock('@cname()') + '-' + i,
      address: Mock.mock('@county(true)')
    });
  }
  return builder({ results: result });
};
const nestingGridList = options => {
  const parameters = getQueryParameters(options);
  console.info('mock: parameters', parameters);
  const result = [];
  for (let i = 1; i < 5; i++) {
    result.push({
      id: i,
      state: i,
      date: Mock.mock('@datetime()'),
      name: Mock.mock('@cname()') + '-' + i,
      address: Mock.mock('@county(true)')
    });
  }
  return builder({ results: result });
};
const menuButtons = options => {
  const parameters = getQueryParameters(options);
  console.info('mock: parameters', parameters);
  const result = [
    { id: 1, name: '添加' },
    { id: 2, name: '删除' },
    { id: 3, name: '启用' },
    { id: 4, name: '作废' }
  ];
  return builder(result);
};
Mock.mock(/\/mock\/roll\/grid/, 'get', rollGridList); // 贷款需求管理列表
Mock.mock(/\/mock\/nesting\/grid/, 'get', nestingGridList); // 贷款需求管理列表
Mock.mock(/\/mock\/role\/buttons/, 'get', menuButtons); // 功能权限按钮-checkbox-group
