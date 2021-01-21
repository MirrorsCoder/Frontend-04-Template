学习笔记

# 持续集成

前面各自开发--最终集成联调（持续集成提出前，客户端主要开发模式）

持续集成：两个特别重要的概念

1. daily build 客户端 build 时间成本高
   通过服务端代码，每天晚上进行一次 build
2. BVT(build verification test)
   构建的验证测试，冒烟测试

前端
lint 对代码风格、一些常见代码模式校验
PhantomJS 无头浏览器 进行测试
（利用无头浏览器，把整棵 DOM 树生成起来，检查 DOM 树里某些特点的格式）通过 CSSOM 拿到元素位置

- BVT 来检查一些性能上常见的反 pattern

## Git Hooks 完成检查的时机

https://www.git-scm.com/docs/githooks

- Client-Side Hooks

1. mkdir git-demo
2. cd git-demo
3. touch README.md
4. git init
5. git add README.md
6. git commit -a -m 'init'
7. git status
8. git log
   which node node 路径
   ls -a 显示隐藏文件夹
   open ./.git
   /hooks 文件夹存放.sample 文件，去除后缀就是可执行文件

- pre-commit
  lint 操作
- pre-push
  最终的 check 操作
- pre-receive 钩子处理服务端的一个 repo

touch pre-commit
ls -l ./pre-commit（显示仅有 rw 权限，无法执行）
chmod +x ./pre-commit（所有用户添加执行权限）

```
#!/usr/bin/env node
let process = require('process')
console.log('Hello, hooks!')

process.exitCode = 1
```

- 注意：边界情况

```
for (const i of [1, 2, 3]) {
  console.log(i)
}
# 添加4 git status 出现 红色index.js
for (const i of [1, 2, 3, 4]) {
  console.log(i)
}
# git add . | git status 变绿色
let a;
for (const i of [1, 2, 3, 4]) {
  console.log(i)
}
# 再次编辑 git status 出现一红一绿两个index.js

git commit 检查是当前版本
如何让他检查的是将要提交的版本呢？
git stash push 创建一条git stash命令
git stash list 查询记录
git stash pop
git stash push -k 绿色的变更仍然在，此时调eslint通过
```

## ESLint 轻量级代码检查方案

https://eslint.bootcss.com/
npm install --save-dev eslint
配置 npx eslint --init
npx eslint ./index.js

## PhantomJS 基于无头浏览器对代码最后生成的样子做一些规则校验和检查

## Chrome 的 Headless 模式

http://developers.google.com/web/updates/2017/04/headless-chrome

```
alias chrome="/Applacations/Google\ Chrome.app/Contents/MacOS/Google\ Chrome"

chrome --headless 无头浏览器
chrome --headless --dump-dom about:blank 无头浏览器把DOM树打印到屏幕上
chrome --headless --dump-dom about:blank > tmp.txt
```

puppeteer 代替 PhantomJS 和命令行的方式
https://www.npmjs.com/package/puppeteer
npm install --save-dev puppeteer
