/* eslint-env node */
module.exports = {
    '*': ['ls-lint'], // 检查文件名称是否规范
    'package.json': ['prettier --write'], // prettier package.json
    'src/**/*.{vue,ts,tsx,scss,css}': ['prettier --write'],
    'src/**/*.{vue,ts,tsx}': ['eslint --fix'],
    'src/**/*.{scss,vue}': ['stylelint --fix'],
};
