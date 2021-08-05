/**
 * @desc 贷款需求管理列表 mock 类-自定义分页参数
 */
import Mock from 'mockjs2';
import _filter from 'lodash/filter';
import _includes from 'lodash/includes';
import { builder, getQueryParameters } from '../../util';

const gardenList = options => {
  let totalRecord = 238; // 总数量
  const parameters = getQueryParameters(options);
  const key = parameters.key;
  console.info('paging mock: parameters', parameters);
  const result = [];
  const pageNum = parseInt(parameters.current);
  const pageSize = parseInt(parameters.size);
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
      id: i,
      name: Mock.mock({ 'number|1-9': 1 }).number,
      code: Mock.mock('@datetime()'),
      area: Mock.mock('@pick(' + aFundCodeUserNameList + ')'), // Mock.mock('@csentence(5)')
      state: Mock.mock('@datetime()'),
      account: Mock.mock(
        '@pick(["中银结算通宝","融信达","税易贷","冀业通达","药商e贷"])'
      ), // Mock.mock('@ctitle(5,8)')
      person: Mock.mock('@integer(1, 999)'),
      telephone: Mock.mock({ 'number|0-6': 1 }).number
    });
  }
  return builder({
    size: pageSize,
    current: pageNum,
    total: totalRecord,
    page: totalPage,
    records: result
  });
};

Mock.mock(/\/mock\/bank\/paging\/list/, 'get', gardenList); // 贷款需求管理列表
