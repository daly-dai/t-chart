/**
 * @desc 认证 mock 类
 */
import Mock from 'mockjs2';
import { builder, getBody } from '../util';

// mock 时登录的用户和密码
const username = ['admin', 'super'];
const password = [
  '21232f297a57a5a743894a0e4a801fc3',
  '1b3231655cebb7a1f783eddf27d254ca',
  'e10adc3949ba59abbe56e057f20f883e',
  'aed3bef2994e9cb1dd5aae7e01eac9d3',
  'e8142efcb737a3b391cf4b40b7775f56'
]; // admin, super

const login = options => {
  const body = getBody(options);
  console.log('mock: body', body);
  if (!username.includes(body.userName) || !password.includes(body.password)) {
    return builder({ isLogin: true }, '账户或密码错误', 401, '4001');
  }
  return builder({
    clauseStatus: 1,
    isFirstLogin: 1,
    loginMsg: '登陆成功',
    permission: '',
    specailFlag: 1,
    token:
      'eyJhbGciOiJIUzI1NiJ9.eyJMT0dJTl9VU0VSX0tFWSI6IjdlNTI3MWVkLTVhM2ItNGFlZC05ODgwLWJjOTUxMmU0ZTEyYiJ9.iotqwneW0qlCng36VKh0J0Geo5TkVewlAo_NFSUcrmM',
    type: 2,
    userId: Mock.mock('@increment(100)'), // 91
    userName: 'admin'
  });
};

const logout = options => {
  return builder({}, '[测试接口] 注销成功');
};

Mock.mock(/\/mock\/user\/login/, 'post', login); // 登录
Mock.mock(/\/mock\/user\/logout/, 'post', logout); // 登出
