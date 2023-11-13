
const path = require('path')

const resolve = (dir) => {
    const parentDir = path.resolve(__dirname, '..'); // 获取上一级目录
    const dirPath = path.join(parentDir, dir); // 进入dir目录
    return dirPath;
}

module.exports.resolve = resolve;
  