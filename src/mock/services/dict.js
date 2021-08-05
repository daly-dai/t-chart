/**
 * @desc 数据字典 mock 类
 */
import Mock from 'mockjs2';
import { builder, getQueryParameters } from '../util';

const getDictDataByTypeList = options => {
  const aDictList = [
    {
      name: '融资产品类型',
      data: [
        { id: 1, name: '基金贷' },
        { id: 2, name: '基金担' },
        { id: 3, name: '基金租' },
        { id: 4, name: '基金联投' },
        { id: 5, name: '基金保' },
        { id: 6, name: '基金套保' }
      ]
    },
    {
      name: '产品贷款对象',
      data: [
        { id: 1, name: '企业' },
        { id: 2, name: '个体工商户' },
        { id: 3, name: '企业主' }
      ]
    },
    {
      name: '贷款用途',
      data: [
        { id: 1, name: '固定资产投入' },
        { id: 2, name: '流动资金' },
        { id: 3, name: '项目融资' },
        { id: 4, name: '生产经营' },
        { id: 5, name: '其他' }
      ]
    },
    {
      name: '产品类型',
      data: [
        { id: 1, name: '流动资金贷' },
        { id: 2, name: '房产抵押贷' },
        { id: 3, name: '企业税贷' },
        { id: 4, name: '企业经营贷' },
        { id: 5, name: '项目融资贷' },
        { id: 6, name: '高新企业贷' },
        { id: 7, name: '资产抵押贷' },
        { id: 8, name: '小微企业贷' },
        { id: 9, name: '其他贷款' }
      ]
    },
    {
      name: '担保类型',
      data: [
        { id: 1, name: '房产抵押' },
        { id: 2, name: '车辆抵押' },
        { id: 3, name: '担保保证' },
        { id: 5, name: '纯信用' },
        { id: 6, name: '其他' }
      ]
    },
    {
      name: '还款方式',
      data: [
        { id: 1, name: '分期还款' },
        { id: 2, name: '到期还款' },
        { id: 3, name: '随借随还' },
        { id: 4, name: '其他' }
      ]
    }
  ];
  return builder(aDictList);
};
const getProductClassify = options => {
  const aDictList = [
    {
      name: '产品类型',
      data: [
        { id: 1, name: '流动资金贷' },
        { id: 2, name: '房产抵押贷' },
        { id: 3, name: '企业税贷' },
        { id: 4, name: '企业经营贷' },
        { id: 5, name: '项目融资贷' },
        { id: 6, name: '高新企业贷' },
        { id: 7, name: '资产抵押贷' },
        { id: 8, name: '小微企业贷' },
        { id: 9, name: '其他贷款' }
      ]
    }
  ];
  return builder(aDictList);
};
const getSelectSearchList = options => {
  const parameters = getQueryParameters(options);
  console.info('mock: getSelectSearchList parameters', parameters);
  let aDictList = [
    { id: 1, name: '长城F317' },
    { id: 2, name: '下城区电子商务产业园' },
    { id: 3, name: '尚坤G11' },
    { id: 4, name: '浙江省国家大学科技园' },
    { id: 5, name: '尚坤·丁兰国际' },
    { id: 6, name: '新禾联创数字时尚产业园' },
    { id: 7, name: '新加披科技园' },
    { id: 8, name: '东子智慧产业园' },
    { id: 9, name: '杭州建华文创园' },
    { id: 10, name: '东溪德必易园' },
    { id: 11, name: '西子智慧产业园' },
    { id: 12, name: '天堂软件园' },
    { id: 13, name: '丝联166文创园' },
    { id: 14, name: '运河汽车电商园' },
    { id: 15, name: '泰嘉园' },
    { id: 16, name: '杭州运河汽车互联网产业园' },
    { id: 17, name: '乐富智汇园' },
    { id: 18, name: '天堂e谷电子商务产业园' },
    { id: 19, name: '颐高创业园' },
    { id: 20, name: '杭州互联网创新创业园' },
    { id: 21, name: '翠苑创立方' },
    { id: 22, name: '银江软件园' },
    { id: 23, name: '尚坤云谷中心' },
    { id: 24, name: '杭开科创园' },
    { id: 25, name: '东湖电商创意园' },
    { id: 26, name: '181社区' },
    { id: 27, name: '杭州云墨智谷园区' },
    { id: 28, name: '华星正淘跨境电商产业园' },
    { id: 29, name: '杭州汇林小企业创业基地' },
    { id: 30, name: 'E8信息文创产业园' },
    { id: 31, name: '杭州蔚映生物科技有限公司' },
    { id: 32, name: '杭州蓝韵网络有限公司' },
    { id: 33, name: '杭州莫问科技有限公司' },
    { id: 34, name: '杭州茗器茶具有限公司' },
    { id: 35, name: '北仑区大碶高档模具及汽配产业基地' },
    { id: 36, name: '汇聚产业园' },
    { id: 37, name: '华创科技创业园' },
    { id: 38, name: '晓塘乡工业小区' },
    { id: 39, name: '余姚市电子商务产业园区' },
    { id: 40, name: '嵇师小微园' },
    { id: 41, name: '潘岙小微园' },
    { id: 42, name: '永嘉工艺美术文化创意产业园' },
    { id: 43, name: '温州文博科技产业园' },
    { id: 44, name: '伟丰文化产业园' },
    { id: 45, name: '独树工业园' },
    { id: 46, name: '中国轻纺城创意园' },
    { id: 47, name: '诸暨2025创意产业园' },
    { id: 48, name: '瓷源创意园' },
    { id: 49, name: '力拓工业园区' },
    { id: 50, name: '浙江嵊州云电商信息科技产业园' },
    { id: 51, name: '智创小微企业园' },
    { id: 52, name: '嵊州市贵龙领带服饰小微企业园' },
    { id: 53, name: '绍兴滨海新城科技创业园' },
    { id: 54, name: '德清县完美小微企业园' },
    { id: 55, name: '雷甸镇德力产业园' },
    { id: 56, name: '嘉兴国际创意文化产业园' },
    { id: 57, name: '瑞祥创业园' },
    { id: 58, name: '嘉兴光伏科创园' },
    { id: 59, name: '上海交大嘉兴科技园' },
    { id: 60, name: '嘉善县西塘大舜服装辅料创业园' },
    { id: 61, name: '中节能（嘉善）环保产业园' },
    { id: 62, name: '嘉创智谷新仓远景产业园一期' },
    { id: 63, name: '兴华众创园' },
    { id: 64, name: '桐乡市科技创业园' },
    { id: 65, name: '安云小镇智慧产业园 第一期' },
    { id: 66, name: '金华联冠信息科技产业园' },
    { id: 67, name: '顺丰丰泰电子商务产业园·义乌' },
    { id: 68, name: '义乌市飘娜电子商务园' },
    { id: 69, name: '后宅饰品小微产业园' },
    { id: 70, name: '星马塑胶科技产业园' },
    { id: 71, name: '遂金小微园' },
    { id: 72, name: '云红小微园' },
    { id: 73, name: '慧谷科创园一期' },
    { id: 74, name: '聚星科创园' },
    { id: 75, name: '石柜岙小微工业园' },
    { id: 76, name: '强鹰科技创业园' },
    { id: 77, name: '浙江工量刃具交易中心电商园区' },
    { id: 78, name: '横塘小微园区' },
    { id: 79, name: '遂昌县石练镇健康产业园' },
    { id: 80, name: '云和金沅木制教玩具小微企业产业园' },
    { id: 81, name: '云和县木制玩具滚漆中心' },
    { id: 82, name: '博地影视文创园区' },
    { id: 83, name: '福达格锐创业园' },
    { id: 84, name: '秀洲毛衫制造业科技园' },
    { id: 85, name: '金华雅帅科技园' }
  ];
  aDictList = _map(aDictList, v => {
    return { id: v.id, name: `${v.name}-0-${v.id}` };
  });
  // 名称搜索功能
  if (_has(parameters, 'name') && !_isEmpty(parameters.name)) {
    aDictList = _filter(aDictList, v => {
      if (v.name.includes(parameters.name)) {
        return v;
      }
    });
    console.log('filter ', aDictList);
  }
  const totalRecord = aDictList.length; // 总数量
  const pageNum = parseInt(parameters.current);
  const pageSize = parseInt(parameters.size);
  const totalPage = Math.ceil(aDictList.length / pageSize); // 总页数
  const next = (pageNum >= totalPage ? totalRecord % pageSize : pageSize) + 1; // 每一页的数据量
  console.log(
    `totalRecord：${totalRecord} pageNum：${pageNum} pageSize：${pageSize} totalPage：${totalPage} next：${next}`
  );
  const result = pagination(pageNum, pageSize, aDictList);
  // console.log('aPageDictList ', aPageDictList);
  /* for (let i = 0; i < next - 1; i++) {
    result.push(aDictList[i]);
  } */
  console.log('result', result);
  return builder({
    size: pageSize,
    current: pageNum,
    totalRecord: totalRecord,
    totalPage: totalPage,
    results: result
  });
};
// 数组分页
const pagination = function(pageNo, pageSize, array) {
  var offset = (pageNo - 1) * pageSize;
  return offset + pageSize >= array.length
    ? array.slice(offset, array.length)
    : array.slice(offset, offset + pageSize);
};

Mock.mock(/\/mock\/index\/getDictDataByTypeList/, 'get', getDictDataByTypeList); // 字典列表
Mock.mock(/\/mock\/index\/getProductClassify/, 'get', getProductClassify); // 产品分类
Mock.mock(/\/mock\/index\/getSelectSearchList/, 'get', getSelectSearchList); // 下拉搜索select
