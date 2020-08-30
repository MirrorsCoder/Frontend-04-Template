学习笔记

# TicTacToe
 - 规则：3*3方格
 - 双方持有圆圈和叉两种棋子
 - 双方交替落子
 - 率先连成三子直线的一方获胜

棋盘表示：二维数组

## 策略
 - 第一层策略：我要赢
 - 第二层策略：别输
 - 第三层策略：......
 - 棋谱

## 棋盘表示？ 一维数组

- 复制二维数组
JSON.parse(JSON.stringify(pattern));
- 利用JavaScript的原型机制
Object.create(pattern);
这个clone只是创建了一个新对象，以原有的pattern为原型（继承方法和数据）新clone的生命周期短于老的pattern
以此代替JSON的clone，节省很多内存空间

# JavaScript中三种异步处理机制

- callback
- Promise
- async/await

# 学习方法

- 整理法
    - HTML中有多少个标签（whatwg--114个 谷歌控制台查看HTMLElement子类：75个）
    ```
    let count = 0;
    for (let name of Object.getOwnPropertyNames(window)){
        if (window[name] && window[name].prototype instanceof HTMLElement){
            console.log(name);
            count++;
        }
    }
    ```
- 追溯法
    - 源头
    - 标准和文档
    - 大师