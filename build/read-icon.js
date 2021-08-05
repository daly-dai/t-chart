/* eslint-disable no-unused-vars */
const fs = require('fs');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}
// 读取iconfont.css文件并且格式化成数组，获取其中 className
function readFile(path) {
  const str = fs.readFileSync(path).toString();
  return str
    .replace(/iconfont/g, '')
    .replace(/\s*/gi, '')
    .match(/icon[a-zA-Z-1-9_]+/g);
}

// 将读取的 className 转换成js代码写入 iconfont-class-name.js
function writeFile(path, str) {
  fs.writeFileSync(path, str);
}
function createStr(arr) {
  console.info('图标：', arr);
  if (arr === null) return '';
  return 'export const iconClassName =  [' + arr.map(v => `'${v}'`) + ']';
}
// console.log('reading....');
const filePath = resolve('./src/assets/font/iconfont/iconfont.css');
const iconfontFileName = '../src/assets/font/iconfont/iconfont-classname.js';
try {
  fs.statSync(filePath);
  console.info('生成新 iconfont 文件');
  try {
    fs.statSync(resolve('./src/assets/font/iconfont/iconfont-classname.js'));
    fs.unlink(
      resolve('./src/assets/font/iconfont/iconfont-classname.js'),
      function(error) {
        if (error) {
          console.log(error);
          return false;
        }
        console.log('删除 iconfont 旧文件成功');
        writeFile(
          path.join(__dirname, iconfontFileName),
          createStr(readFile(filePath))
        );
        console.log('iconfont 图标文件创建成功');
      }
    );
  } catch (e) {
    // 不存在
    writeFile(
      path.join(__dirname, iconfontFileName),
      createStr(readFile(filePath))
    );
    console.log('iconfont 图标文件创建成功');
  }
} catch (e) {
  // 捕获异常
  console.log('未找到 iconfont 相关的文件');
  writeFile(path.join(__dirname, iconfontFileName), createStr([]));
}
