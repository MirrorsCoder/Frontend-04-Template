学习笔记

单元测试工具 ｜ Mocha
cnpm install -g mocha

cnpm install --save-dev @babel/core @babel/register

.babelrc
cnpm install --save-dev @babel/preset-env

mocha --require @babel/register

./node_modules/.bin/mocha --require @babel/register

// 计算测试覆盖的比例
cnpm install -g nyc
nyc ./node_modules/.bin/mocha --require @babel/register

// 结合 babel&nyc
cnpm install --save-dev @istanbuljs/nyc-config-babel babel-plugin-istanbul

1. npm init
2. 复制 scripts 和 devDependencies
3. cnpm install
