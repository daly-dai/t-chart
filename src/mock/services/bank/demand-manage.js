/**
 * @desc 贷款需求管理列表 mock 类
 */
import Mock from 'mockjs2';
import _filter from 'lodash/filter';
import _includes from 'lodash/includes';
import { builder, getQueryParameters } from '../../util';

const bankProductsList = options => {
  let totalRecord = 571; // 总数量
  const parameters = getQueryParameters(options);
  const key = parameters.key;
  console.info('mock: parameters', parameters);

  const result = [];
  const pageNum = parseInt(parameters.pageNum);
  const pageSize = parseInt(parameters.pageSize);
  const totalPage = Math.ceil(totalRecord / pageSize); // 总页数
  let next = (pageNum >= totalPage ? totalRecord % pageSize : pageSize) + 1; // 每一页的数据量

  // console.info('pageNum：', pageNum, 'pageSize：', pageSize, 'totalPage：', totalPage, 'next：', next);

  let aFundCodeUserNameList = [
    '浙江连枝互联网金融信息服务股份有限公司',
    '杭州有数金融信息服务有限公司',
    '长春易航智能科技有限公司',
    '青铜互娱文化[深圳]有限公司',
    '上海声曜文化传播有限公司',
    '西安赛富乐斯半导体科技有限公司'
  ];
  if (key.length > 0) {
    aFundCodeUserNameList = _filter(aFundCodeUserNameList, function(item) {
      return _includes(item, key);
    });
    totalRecord = 200; // 修改下总数量
    if (aFundCodeUserNameList.length === 0) {
      totalRecord = 0;
      next = 1;
    }
  }
  for (let i = 1; i < next; i++) {
    result.push({
      id: `${pageNum}-${i}`,
      productType: Mock.mock({ 'number|1-6': 1 }).number,
      applyProId: Mock.mock('@id'),
      fundCodeUserName: Mock.mock(
        '@pick(["浙江连枝互联网金融信息服务股份有限公司", "杭州有数金融信息服务有限公司", "长春易航智能科技有限公司", "青铜互娱文化[深圳]有限公司", "上海声曜文化传播有限公司","西安赛富乐斯半导体科技有限公司"])'
      ), // Mock.mock('@csentence(5)')
      createTime: Mock.mock('@datetime()'),
      productName: Mock.mock(
        '@pick(["中银结算通宝","融信达","税易贷","冀业通达","药商e贷"])'
      ), // Mock.mock('@ctitle(5,8)')
      applyQuota: Mock.mock('@integer(1, 999)'),
      nodeStatus: Mock.mock({ 'number|0-6': 1 }).number,
      address: Mock.mock('@county(true)'),
      state: Mock.mock('@pick(["1","2","3","4"])'),
      name: Mock.mock('@cname()'),
      isUsing: Mock.mock('@pick([0,1])'),
      countyId: Mock.mock('@pick([2,3,4,5,6,7,8,9])'),
      county: Mock.mock(
        '@pick(["余杭区","西湖区","上城区","下城区","拱墅区","江干区","滨江区","萧山区"])'
      )
    });
  }

  return builder({
    pageSize: pageSize,
    pageNum: pageNum,
    totalRecord: totalRecord,
    totalPage: totalPage,
    results: result
  });
};

const dragGridList = options => {
  const result = [];
  const parameters = getQueryParameters(options);
  console.info('mock: parameters', parameters);

  for (let i = 1; i < 10; i++) {
    result.push({
      id: Mock.mock('@increment'),
      productType: Mock.mock({ 'number|1-6': 1 }).number,
      applyProId: Mock.mock('@id'),
      fundCodeUserName: Mock.mock(
        '@pick(["浙江连枝互联网金融信息服务股份有限公司", "杭州有数金融信息服务有限公司", "长春易航智能科技有限公司", "青铜互娱文化[深圳]有限公司", "上海声曜文化传播有限公司","西安赛富乐斯半导体科技有限公司"])'
      ), // Mock.mock('@csentence(5)')
      createTime: Mock.mock('@datetime()'),
      productName: Mock.mock(
        '@pick(["中银结算通宝","融信达","税易贷","冀业通达","药商e贷"])'
      ), // Mock.mock('@ctitle(5,8)')
      applyQuota: Mock.mock('@integer(1, 999)'),
      state: Mock.mock('@pick(["1","2","3","4"])'),
      name: Mock.mock('@cname()')
    });
  }

  return builder({
    pageSize: 10,
    pageNum: 1,
    totalRecord: 10,
    totalPage: 1,
    results: result
  });
};

Mock.mock(
  /\/mock\/bank\/demandManage\/bankProductsList/,
  'get',
  bankProductsList
); // 贷款需求管理列表

Mock.mock(/\/mock\/bank\/demandManage\/dragGridList/, 'get', dragGridList); // 拖拽grid
